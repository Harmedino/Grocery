import express from "express";
import authUser from "../middleware/authUser.js";
import { updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router(); // ✅ Express Router, not Mongoose

// Route to update cart
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
