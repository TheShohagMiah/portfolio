import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Cloudinary-তে ফাইল আপলোড
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "portfolio_projects", // নির্দিষ্ট ফোল্ডারে সেভ হবে
    });

    // সফলভাবে আপলোড হলে লোকাল ফাইলটি ডিলিট করে দিন
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // আপলোড ফেইল করলে টেম্পোরারি ফাইলটি সার্ভার থেকে সরিয়ে ফেলুন
    fs.unlinkSync(localFilePath);
    return null;
  }
};
