import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a headline"],
      trim: true,
    },
    subTitle: {
      type: String,
      required: [true, "Please add a sub-headline"],
    },
    description: {
      type: String,
      required: [true, "Please add a brief description"],
    },
    ctaText: { type: String, default: "view works" },
    ctaLink: { type: String, default: "/works" },

    // Adding this to match your Postman data
    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Hero = mongoose.model("Hero", heroSchema);

export default Hero;
