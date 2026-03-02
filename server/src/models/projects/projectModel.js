import mongoose from "mongoose";
import slugify from "slugify";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    // ✅ FIX 2: sparse: true prevents duplicate-key errors when slug is missing
    slug: { type: String, trim: true, unique: true, sparse: true },

    image: {
      url: { type: String },
      public_id: { type: String },
    },

    category: {
      type: String,
      required: true,
      enum: ["Full Stack", "Frontend", "Backend"],
    },

    status: {
      type: String,
      required: true,
      enum: ["published", "pending", "draft"],
      default: "draft",
    },

    technologies: [{ type: String }],
    githubRepo: { type: String, default: "#" },
    liveLink: { type: String, default: "#" },

    order: { type: Number },
  },
  { timestamps: true },
);

// ─── MIDDLEWARE: CREATE ────────────────────────────────────────
// Fires on .save() — handles create & save-based updates
projectSchema.pre("save", async function () {
  if (!this.slug || this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

// ─── MIDDLEWARE: UPDATE ────────────────────────────────────────
// ✅ FIX 1: Fires on .findByIdAndUpdate() — bypassed by pre('save')
projectSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();
  const title = update?.$set?.title ?? update?.title;

  if (title) {
    const slug = slugify(title, { lower: true, strict: true });
    this.setUpdate({
      ...update,
      $set: { ...(update.$set ?? {}), slug },
    });
  }
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
