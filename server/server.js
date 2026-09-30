import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import userRouter from "./routes/user.js";
import sellerRoute from "./routes/sellerRoute.js";
import { connectCloudinary } from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import contactRouter from "./routes/contactRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Origins never carry a trailing slash, so strip quotes/slashes from env values
const rawOrigins = process.env.CLIENT_ORIGINS || "http://localhost:5173,https://grocery-rho-five.vercel.app";
const allOrigins = rawOrigins
  .split(",")
  .map((s) => s.trim().replace(/^['"]|['"]$/g, "").replace(/\/+$/, ""))
  .filter(Boolean);

// Routes are registered synchronously so Vercel can pick up the exported app
// immediately; the DB connection is awaited per request instead of at boot
const ensureDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    res.status(503).json({ success: false, message: "Database connection failed" });
  }
};

app.post('/stripe', express.raw({ type: 'application/json' }), ensureDB, stripeWebhooks);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or curl
      if (!origin || allOrigins.includes("*") || allOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Reject without throwing: the browser blocks it instead of us returning a 500
      console.warn(`CORS: origin not allowed: ${origin}`);
      callback(null, false);
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});
app.use("/api", ensureDB);
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRoute);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/contact", contactRouter);

// Return JSON (and log) instead of Express's default HTML error page
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({ success: false, message: err.message || "Internal Server Error" });
});

// Vercel invokes the exported app; only bind a port when running locally
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB().catch((err) => console.error("❌ MongoDB connection error:", err));
  });
}

export default app;
