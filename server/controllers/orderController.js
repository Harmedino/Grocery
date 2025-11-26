 // optional, for stock check

import Order from "../models/order.js";
import Product from "../models/product.js";

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

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

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

    res.status(200).json({ orders });
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

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

