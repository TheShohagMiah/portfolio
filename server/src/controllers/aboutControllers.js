import About from "../models/about/aboutModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addOrUpdateAbout = asyncHandler(async (req, res) => {
  const about = await About.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  if (!about) {
    throw new ApiError(301, "Something went wrong");
  }

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

export const deleteEducation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedAbout = await About.findOneAndUpdate(
    {},
    {
      $pull: { education: { _id: id } },
    },
    { new: true },
  );

  if (!updatedAbout) {
    throw new ApiError(404, "About document not found");
  }

  res.json({
    success: true,
    message: "Education record deleted successfully.",
    data: updatedAbout,
  });
});
