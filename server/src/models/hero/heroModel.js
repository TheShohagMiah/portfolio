import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Headline required"], trim: true },
    subTitle: { type: String, required: [true, "Sub-headline required"] },
    freelanceStatus: {
      type: String,
      enum: ["available", "busy", "unavailable"],
      default: "available",
      required: [true, "Freelance status is required"],
    },
    description: { type: String, required: [true, "Description required"] },
    ctaText: { type: String, default: "view works" },
    ctaLink: { type: String, default: "/works" },
    downloadText: { type: String, default: "Download CV" },
    downloadLink: { type: String, default: "#" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Hero = mongoose.model("Hero", heroSchema);
export default Hero;
