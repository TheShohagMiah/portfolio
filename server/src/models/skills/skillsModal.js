import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      maxlength: [50, "Skill name cannot exceed 50 characters"],
    },

    // "frontend" | "backend"
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["frontend", "backend"],
        message: "Category must be 'frontend' or 'backend'",
      },
    },

    // icon component name — e.g. "FaReact", "SiMongodb"
    iconName: {
      type: String,
      required: [true, "Icon name is required"],
      trim: true,
      default: "FaReact",
    },

    // hex color string — e.g. "#61DAFB"
    color: {
      type: String,
      trim: true,
      default: "#61DAFB",
      match: [
        /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
        "Color must be a valid hex value",
      ],
    },

    // display order for sorting
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// ── Indexes ──────────────────────────────────────────────────────
skillSchema.index({ category: 1, order: 1 });
skillSchema.index({ name: "text" });

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
