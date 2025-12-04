import express from "express";
import { upload } from "../configs/multer.js";
import { isSellerAuth } from "../controllers/sellerController.js";
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js";
import authSeller from "../middleware/authSeller.js";

const productRouter = express.Router();

// Corrected middleware order and array usage
productRouter.post("/add", authSeller, upload.array("images", 5), addProduct);

productRouter.get("/list", productList);
productRouter.get("/id", productById);
productRouter.post("/stock", authSeller, changeStock);

export default productRouter;
