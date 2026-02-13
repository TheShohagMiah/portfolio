import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    // Image object to handle Cloudinary data
    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    category: {
      type: String,
      required: true,
      enum: ["Full Stack", "Frontend", "Backend"],
    },
    technologies: [{ type: String }],
    github: { type: String, default: "#" },
    live: { type: String, default: "#" },
  },
  { timestamps: true },
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
