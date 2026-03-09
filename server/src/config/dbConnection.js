import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodb_url = process.env.MONGODB_URL;

const dbConnection = async () => {
  try {
    await mongoose.connect(mongodb_url);
    console.log("DB is connected.");
  } catch (error) {
    console.log("DB is not connected:", error);
    process.exit(1);
  }
};

export default dbConnection;
