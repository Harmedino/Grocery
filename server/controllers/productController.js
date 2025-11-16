import {v2 as  cloudinary } from 'cloudinary'
import Product from '../models/product.js';



// ADD PRODUCT CONTROLLER
export const addProduct = async (req, res) => {
  try {
    // req.body.productData comes as a JSON string (because files + fields are sent using FormData)
    // So we must parse it back into a normal JS object
    let productData = JSON.parse(req.body.productData);

    // req.files contains all uploaded images (handled by multer)
    const images = req.files;

    // Upload each image to Cloudinary and collect the secure URLs
    let imageUrls = await Promise.all(
      images.map(async (item) => {
        // Upload to Cloudinary (auto-detects file type)
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });

        // Return the Cloudinary hosted image URL
        return result.secure_url;
      })
    );

    // Save product to DB with uploaded Cloudinary images
    await Product.create({
      ...productData, // spread user product fields (name, price, etc.)
      image: imageUrls, // attach array of image URLs
    });

    // Send success response
    return res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add product" });
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
