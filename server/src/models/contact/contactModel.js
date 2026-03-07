import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters."],
      maxlength: [60, "Name must not exceed 60 characters."],
      match: [
        /^[a-zA-Z\s'-]+$/,
        "Name can only contain letters, spaces, hyphens, and apostrophes.",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      maxlength: [100, "Email must not exceed 100 characters."],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address.",
      ],
    },
    phone: {
      type: String,
      trim: true,
      default: null,
      match: [
        /^\+?[1-9]\d{1,14}$/,
        "Please provide a valid phone number (E.164 format).",
      ],
    },
    subject: {
      type: String,
      required: [true, "Subject is required."],
      trim: true,
      minlength: [3, "Subject must be at least 3 characters."],
      maxlength: [100, "Subject must not exceed 100 characters."],
    },
    message: {
      type: String,
      required: [true, "Message is required."],
      trim: true,
      minlength: [20, "Message must be at least 20 characters."],
      maxlength: [2000, "Message must not exceed 2000 characters."],
    },
    isReplied: {
      type: Boolean,
      default: false,
    },
    reply: {
      type: String,
      trim: true,
      default: null,
      maxlength: [5000, "Reply must not exceed 5000 characters."],
    },
    replyDate: {
      type: Date,
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
contactSchema.index({ email: 1 });
contactSchema.index({ isReplied: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ isReplied: 1, createdAt: -1 });

// ─── Instance Method: mark as replied ✅ THIS WAS MISSING ────────────────────
contactSchema.methods.markReplied = async function (replyText) {
  this.isReplied = true;
  this.reply = replyText;
  this.replyDate = new Date();
  return await this.save();
};

// ─── Instance Method: mark as read ✅ THIS WAS MISSING ───────────────────────
contactSchema.methods.markRead = async function () {
  this.isRead = true;
  return await this.save();
};

// ─── Static Methods ───────────────────────────────────────────────────────────
contactSchema.statics.getPending = function () {
  return this.find({ isReplied: false }).sort({ createdAt: -1 });
};

contactSchema.statics.getReplied = function () {
  return this.find({ isReplied: true }).sort({ replyDate: -1 });
};

contactSchema.statics.getUnreadCount = function () {
  return this.countDocuments({ isRead: false });
};

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
