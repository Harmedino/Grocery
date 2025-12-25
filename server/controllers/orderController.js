 // optional, for stock check

import Order from "../models/order.js";
import Product from "../models/product.js";
import stripe from "stripe"

export const placeOrderCod = async (req, res) => {
  try {
   
    const { userId, items, address } = req.body;

    if (!userId || !items || items.length === 0 || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add tax (2%)
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
      isPaid: false,
      status: "Order Placed",
    });

    res.status(201).json({ message: "Order placed successfully", order, success:true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
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

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

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

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ orders , success:true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!userId || !items || items.length === 0 || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let productData = [];

    // Calculate total amount
    let amount = await items.reduce(async (acc, item) => {
      const total = await acc;
      const product = await Product.findById(item.product);

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });

      return total + product.offerPrice * item.quantity;
    }, 0);

    // Add tax (2%)
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
      isPaid: false,
      status: "Order Placed",
    });

    // stripe init
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // create line items_
    const lineItems = productData.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
        },
        quantity: item.quantity,
      };
    });

    // create session
    const session = await stripeInstance.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


