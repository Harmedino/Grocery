import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// Configure Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




// Upload function
export const connectCloudinary = async (filePath, folderName = "uploads") => {
  if (!filePath) {
    console.error("Cloudinary Upload Error: No file path provided");
    return { success: false, error: "No file path provided" };
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
      resource_type: "auto",
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return { success: false, error: error.message };
  }
};

