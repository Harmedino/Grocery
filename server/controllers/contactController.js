import Message from "../models/message.js";
import Subscriber from "../models/subscriber.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Save a message from the contact page
export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email and message are required" });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    await Message.create({ name, email, subject, message });
    return res.status(201).json({ success: true, message: "Message sent. We'll get back to you soon." });
  } catch (error) {
    console.error("Contact Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Add an email to the newsletter list (re-subscribing is not an error)
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    await Subscriber.updateOne(
      { email: email.toLowerCase().trim() },
      { $setOnInsert: { email: email.toLowerCase().trim() } },
      { upsert: true }
    );
    return res.json({ success: true, message: "You're subscribed! Watch your inbox for deals." });
  } catch (error) {
    console.error("Subscribe Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
