import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: [String], // array of strings
      required: true,
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
      type: [String], // array of image URLs
      default: [],
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    unit: {
      type: String, // pack size shown to shoppers, e.g. "1 kg" or "6 pcs"
      default: "",
      trim: true,
    },

    tags: {
      type: [String], // e.g. "bestseller", "organic"
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
