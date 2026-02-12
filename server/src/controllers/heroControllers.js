import Hero from "../models/hero/heroModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addOrUpdateHero = asyncHandler(async (req, res) => {
  const { title, subTitle, description, ctaText, ctaLink, socialLinks } =
    req.body;

  const hero = await Hero.findOneAndUpdate(
    {},
    {
      title,
      subTitle,
      description,
      ctaText,
      ctaLink,
      socialLinks,
    },
    { new: true, upsert: true, runValidators: true },
  );

  res.json({
    success: true,
    message: "Hero section saved successfully.",
    data: hero,
  });
});

export const getHero = asyncHandler(async (req, res) => {
  const hero = await Hero.findOne();

  if (!hero) {
    throw new ApiError(404, "Hero data no found.");
  }

  res.json({
    success: true,
    data: hero,
  });
});
