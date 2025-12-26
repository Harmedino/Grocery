import express from "express";
import { isSellerAuth } from "../controllers/sellerController.js";
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js";
import authSeller from "../middleware/authSeller.js";

const productRouter = express.Router();

// Only import multer when the /add route is called
productRouter.post("/add", authSeller, async (req, res, next) => {
  const { upload } = await import("../configs/multer.js"); // dynamic import
  upload.array("images", 5)(req, res, async (err) => {
    if (err) return next(err);
    await addProduct(req, res, next);
  });
});

productRouter.get("/list", productList);
productRouter.get("/id", productById);
productRouter.post("/stock", authSeller, changeStock);

export default productRouter;
