import {v2 as  cloudinary } from 'cloudinary'
import Product from '../models/product.js';



export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    console.log("Parsed product data:", productData);

    const images = req.files;
    console.log("Uploaded files:", images);

    let imageUrls = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        console.log("Uploaded image result:", result);
        return result.secure_url;
      })
    );
    console.log("All uploaded image URLs:", imageUrls);

    const product = new Product({
      ...productData,
      image: imageUrls,
    });
    console.log("Saving product to DB:", product);

    await product.save();
    console.log("Product saved successfully");

    return res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.error("Error in addProduct:", error);
    return res.status(500).json({ success: false, message: "Failed to add product" });
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
