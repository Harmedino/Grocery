import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import "dotenv/config";
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

await connectDB();


const allOrigins = ["http://localhost:5173", 'https://grocery-rho-five.vercel.app'];

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allOrigins, credentials: true }));

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
