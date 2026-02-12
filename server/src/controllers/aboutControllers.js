import About from "../models/about/aboutModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addOrUpdateAbout = asyncHandler(async (req, res) => {
  const aboutData = req.body;

  const about = await About.findOneAndUpdate({}, aboutData, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  res.json({
    success: true,
    message: "About section updated successfully.",
    data: about,
  });
});

export const getAbout = asyncHandler(async (req, res) => {
  const about = await About.findOne();

  if (!about) {
    throw new ApiError(404, "About data no found.");
  }

  res.json({
    success: true,
    data: about,
  });
});
