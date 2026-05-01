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
import { stripeWebhooks } from "./controllers/orderController.js";

const app = express();
const PORT = process.env.PORT || 4000;

const rawOrigins = process.env.CLIENT_ORIGINS || "http://localhost:5173,https://grocery-rho-five.vercel.app";
const allOrigins = rawOrigins.split(",").map(s => s.trim());

(async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
  }

  app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

  app.use(express.json());
  app.use(cookieParser());

  // Configure CORS: if CLIENT_ORIGINS contains '*' allow all origins
  if (allOrigins.includes("*")) {
    app.use(cors({ origin: true, credentials: true }));
  } else {
    app.use(
      cors({
        origin: function (origin, callback) {
          // allow requests with no origin like mobile apps or curl
          if (!origin) return callback(null, true);
          if (allOrigins.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback(new Error("CORS policy: This origin is not allowed."));
          }
        },
        credentials: true,
      })
    );
  }

  app.get("/", (req, res) => {
    res.send("Hello from the server!");
  });
  app.use("/api/user", userRouter);
  app.use("/api/seller", sellerRoute);
  app.use("/api/product", productRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/address", addressRouter);
  app.use("/api/order", orderRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
