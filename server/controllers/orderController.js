 // optional, for stock check

import Order from "../models/order.js";
import Product from "../models/product.js";
import stripe from "stripe"
import User from"../models/user.js"
import { deliveryFeeFor } from "../configs/pricing.js";

// Look up each ordered product and total it up (plus delivery), rejecting bad items
const buildOrderItems = async (items) => {
  const lines = [];
  let subtotal = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) {
      return { error: `Product ${item.product} not found` };
    }
    if (!product.inStock) {
      return { error: `${product.name} is out of stock` };
    }
    const quantity = Math.max(1, Number(item.quantity) || 1);
    lines.push({ product, quantity });
    subtotal += product.offerPrice * quantity;
  }
  const deliveryFee = deliveryFeeFor(subtotal);
  // Round to 2 decimals so float maths never leaks into stored totals
  const amount = Math.round((subtotal + deliveryFee) * 100) / 100;
  return { lines, deliveryFee, amount };
};

export const placeOrderCod = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;

    if (!items || items.length === 0 || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const { error, lines, deliveryFee, amount } = await buildOrderItems(items);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const order = await Order.create({
      userId,
      items: lines.map(({ product, quantity }) => ({ product: product._id, quantity })),
      amount,
      deliveryFee,
      address,
      paymentType: "COD",
      isPaid: false,
      status: "Order Placed",
    });

    // Order is placed, so the saved cart is no longer needed
    await User.findByIdAndUpdate(userId, { cartItems: {} });

    res.status(201).json({ message: "Order placed successfully", order, success:true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



export const getUserOrders = async (req, res) => {
  try {
    const userId  = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders, success:true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await Order.find( { $or: [{ paymentType: "COD" }, { isPaid: true }],})
      .populate("items.product") // populate product details for each item
      .populate("address").sort({ createdAt: -1 })  // optional: user info
      // latest orders first

    res.status(200).json({ orders , success:true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;
    const { origin } = req.headers;

    if (!items || items.length === 0 || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const { error, lines, deliveryFee, amount } = await buildOrderItems(items);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const order = await Order.create({
      userId,
      items: lines.map(({ product, quantity }) => ({ product: product._id, quantity })),
      amount,
      deliveryFee,
      address,
      paymentType: "Online",
      isPaid: false,
      status: "Order Placed",
    });

    // stripe init
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // create line items (Naira, in kobo)
    const lineItems = lines.map(({ product, quantity }) => {
      return {
        price_data: {
          currency: "ngn",
          product_data: {
            name: product.unit ? `${product.name} (${product.unit})` : product.name,
          },
          unit_amount: Math.round(product.offerPrice * 100),
        },
        quantity,
      };
    });
    if (deliveryFee > 0) {
      lineItems.push({
        price_data: {
          currency: "ngn",
          product_data: { name: "Delivery" },
          unit_amount: Math.round(deliveryFee * 100),
        },
        quantity: 1,
      });
    }

    // create session
    const session = await stripeInstance.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId: String(userId),
      },
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
// stripe webbook to verify payment

export const stripeWebhooks = async (req, res) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`webhook Error: ${error.message}`);
  }

  // handle event

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;
      // getting session metadata

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      if (!session.data[0]) break;
      const { orderId, userId } = session.data[0].metadata;
      await Order.findByIdAndUpdate(orderId, { isPaid: true });

      // clear user data
      await User.findByIdAndUpdate(userId, { cartItems: {} });
    }

      break;

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;
      // getting session metadata

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      if (!session.data[0]) break;
      const { orderId } = session.data[0].metadata;
      await Order.findByIdAndDelete(orderId);
    }
      break;

    default:
      console.log(`Unhandled stripe event: ${event.type}`);
      break;
  }

  res.json({ received: true });
};




export const ORDER_STATUSES = ["Order Placed", "Packing", "Out for delivery", "Delivered", "Cancelled"];

// Seller moves an order along; a delivered cash order counts as paid
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!ORDER_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const update = { status };
    if (status === "Delivered") update.isPaid = true;

    const order = await Order.findByIdAndUpdate(orderId, update, { new: true });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: `Order marked as ${status}`, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
