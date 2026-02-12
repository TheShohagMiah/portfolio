import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import dotenv from "dotenv";

dotenv.config();
export const Protected = asyncHandler(async (req, res, next) => {
  // 1. Grab token from cookies
  const { token } = req.cookies;

  if (!token) {
    throw new ApiError(401, "Authentication required. Please login.");
  }

  try {
    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
});
