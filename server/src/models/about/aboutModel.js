import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    mainTitle: {
      type: String,
      required: [true, "Please add a main title"],
      trim: true,
      default: "Design. Code. Iterate.",
    },
    subTitle: {
      type: String,
      required: [true, "Please add a sub-headline"],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, "Please add your biography"],
    },

    // Quick Stats
    experienceYears: { type: String, default: "3.5+" },
    location: { type: String, default: "Cyprus" },
    freelanceStatus: {
      type: String,
      enum: ["Available", "Busy", "Not Looking"], // Enum দিলে ভুল ডাটা আসবে না
      default: "Available",
    },

    // Academic Timeline - Simplified
    education: [
      {
        duration: {
          from: { type: String, required: true }, // e.g., "2018"
          to: { type: String, required: true }, // e.g., "2022" or "Present"
        },
        subject: { type: String, required: true },
        courseTitle: { type: String, required: true },
        institution: { type: String, required: true },
        description: { type: String },
      },
    ],

    // // Categorized Skills
    // skills: [
    //   {
    //     category: {
    //       type: String,
    //       required: true,
    //       enum: ["Frontend", "Backend", "Tools", "Soft Skills"],
    //     },
    //     items: [{ type: String }], // e.g., ["React", "Next.js"]
    //   },
    // ],

    profileImage: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    resumeUrl: { type: String },
  },
  { timestamps: true },
);

const About = mongoose.model("About", aboutSchema);
export default About;
