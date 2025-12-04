import {v2 as  cloudinary } from 'cloudinary'
import Product from '../models/product.js';
import { connectCloudinary } from '../configs/cloudinary.js';



export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    console.log("Parsed product data:", productData);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    // Upload all images to Cloudinary
    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        const result = await connectCloudinary(file.path, "products");
        if (!result.success) throw new Error(result.error);
        return result.url;
      })
    );

    // Save product to database
    const product = new Product({
      ...productData,
      image: imageUrls,
    });

    await product.save();

    return res.json({ success: true, message: "Product added", product });
  } catch (error) {
    console.error("Error in addProduct:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};




// GET PRODUCT LIST
export const productList = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find({}) 
    // sorted so newest products come first

    // Respond with product list
    return res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Product List Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};


// GET SINGLE PRODUCT
export const productById = async (req, res) => {
  try {
    const { id } = req.body;

    // Find product by MongoDB ObjectId
    const product = await Product.findById(id);

    // If product doesn't exist
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Return found product
    return res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("Product By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};


// CHANGE PRODUCT inStock STATUS
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    // Validate required fields
    if (!id || inStock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product ID and inStock value are required",
      });
    }

    // Update product stock status
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true } // return updated document
    );

    // If product not found
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Success response
    return res.json({
      success: true,
      message: "Product stock updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log("Change Stock Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update stock",
    });
  }
};
