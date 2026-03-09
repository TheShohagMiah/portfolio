import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String, // browser/device info
    },
    page: {
      type: String,
      default: "/", // which page they visited
    },
    country: {
      type: String,
      default: "Unknown",
    },
    visitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Visitor = mongoose.model("Visitor", visitorSchema);
export default Visitor;
