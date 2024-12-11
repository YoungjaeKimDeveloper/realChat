import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// It enables to access the variables in env
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
