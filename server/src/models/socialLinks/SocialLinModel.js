import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: [true, "Platform name is required"],
      trim: true,
      // যেসব platform support করবে
      enum: {
        values: [
          "GitHub",
          "LinkedIn",
          "Facebook",
          "Twitter",
          "Instagram",
          "YouTube",
          "Email",
          "Website",
          "Discord",
          "Telegram",
        ],
        message: "{VALUE} is not a supported platform",
      },
    },

    url: {
      type: String,
      required: [true, "URL is required"],
      trim: true,
      validate: {
        validator: function (v) {
          // Email অথবা valid URL হতে হবে
          return /^https?:\/\/.+/.test(v) || /^mailto:.+@.+\..+/.test(v);
        },
        message: "Please provide a valid URL or mailto link",
      },
    },

    // Display order (1 = প্রথমে দেখাবে)
    order: {
      type: Number,
      default: 0,
    },

    // Show/Hide করার জন্য
    isActive: {
      type: Boolean,
      default: true,
    },

    // Optional: custom label override
    label: {
      type: String,
      trim: true,
    },

    // Optional: custom hex color (না দিলে frontend default ব্যবহার করবে)
    color: {
      type: String,
      match: [/^#([0-9A-F]{3}){1,2}$/i, "Please provide a valid hex color"],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto add হবে
  },
);

// Index: order অনুযায়ী sort করার জন্য
socialLinkSchema.index({ order: 1 });

const SocialLink = mongoose.model("SocialLink", socialLinkSchema);

export default SocialLink;
