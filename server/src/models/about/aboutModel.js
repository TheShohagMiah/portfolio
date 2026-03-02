import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    // Executive Summary Section
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

    // Quick Stats Section (Matches the Right-Side Bento Card)
    experienceYears: {
      type: String,
      default: "3.5+",
    },
    location: {
      type: String,
      default: "Cyprus",
    },
    freelanceStatus: {
      type: String,
      enum: ["available", "busy", "unavailable"],
      default: "available",
    },

    // Academic Timeline Section (Matches useFieldArray keys)
    education: [
      {
        courseTitle: {
          type: String,
          required: [true, "Course title is required"],
        }, // e.g., "Bachelor of Science"
        subject: {
          type: String,
          required: [true, "Subject is required"],
        }, // e.g., "Computer Science"
        institution: {
          type: String,
          required: [true, "Institution is required"],
        },
        duration: {
          from: { type: String, required: true }, // Matches register(`education.${index}.duration.from`)
          to: { type: String, required: true }, // Matches register(`education.${index}.duration.to`)
        },
        description: {
          type: String,
        }, // Optional extra detail
      },
    ],

    // Media Assets (For future uploads in the panel)
    profileImage: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    resume: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  },
);

// Prevent model overwrite on HMR (Hot Module Replacement)
const About = mongoose.models.About || mongoose.model("About", aboutSchema);

export default About;
