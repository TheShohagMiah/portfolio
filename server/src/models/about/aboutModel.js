import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    // ── Executive Summary ──────────────────────────────────────────
    title: {
      type: String,
      required: [true, "Please add a main title"],
      trim: true,
      default: "Design. Code. Iterate.",
    },
    bio: {
      type: String,
      required: [true, "Please add your biography"],
    },

    // ── Quick Stats ────────────────────────────────────────────────
    experienceYears: { type: String, default: "3.5+" },
    location: { type: String, default: "Cyprus" },
    freelanceStatus: {
      type: String,
      enum: ["available", "busy", "unavailable"],
      default: "available",
    },

    // ── Academic Timeline ──────────────────────────────────────────
    education: [
      {
        courseTitle: {
          type: String,
          required: [true, "Course title is required"],
        },
        subject: { type: String, required: [true, "Subject is required"] },
        institution: {
          type: String,
          required: [true, "Institution is required"],
        },
        duration: {
          from: { type: String, required: true }, // ✅ matches Zod min(1)
          to: { type: String, required: true }, // Fix 2 ✅ matches Zod min(1)
        },
        description: { type: String, default: "" },
        status: {
          type: String,
          enum: ["ongoing", "completed"],
        },
      },
    ],

    // ── Media Assets ──────────────────────────────────────────────
    profileImage: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    resume: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

const About = mongoose.models.About || mongoose.model("About", aboutSchema);
export default About;
