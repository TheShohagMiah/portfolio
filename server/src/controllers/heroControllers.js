import Hero from "../models/hero/heroModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addOrUpdateHero = asyncHandler(async (req, res) => {
  console.log(req.body);
  const hero = await Hero.findOneAndUpdate(
    {},
    { $set: req.body },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    },
  );
  console.log(req.body);
  res.json({
    success: true,
    message: "Hero section saved successfully.",
    data: hero,
  });
});

export const getHero = asyncHandler(async (req, res) => {
  const hero = await Hero.findOne();
  res.json({
    success: true,
    data: hero,
  });
});
