import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isAdmin = asyncHandler(async (req, res, next) => {
  // Check if user exists AND if they are NOT an admin
  if (req.user?.role !== "admin") {
    throw new ApiError(403, "Access denied. Admin only.");
  }
  next();
});
