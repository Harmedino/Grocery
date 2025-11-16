import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: Array,
      required: true,
      trim: true,
    },
     price: {
      type: Number,
      required: true,
    },

     offerPrice: {
      type: Number,
      required: true,
    },

    images: {
      type: Array, 
      default: [],
    },

   category: {
      type: String,
      required: true,
      trim: true,
    },
     inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
    
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema) || mongoose.models.product;

export default Product;
