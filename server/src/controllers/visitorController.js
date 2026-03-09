import Visitor from "../models/visitors/visitorsModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ──────────────────────────────────────────
// @desc    Track / Record a new visitor
// @route   POST /api/visitors/track
// @access  Public
// ──────────────────────────────────────────
export const trackVisitor = asyncHandler(async (req, res) => {
  const ipAddress =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    "Unknown";

  const userAgent = req.headers["user-agent"] || "Unknown";
  const page = req.body.page || "/";

  // Avoid duplicate visits from same IP on same page within 1 hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const alreadyVisited = await Visitor.findOne({
    ipAddress,
    page,
    visitedAt: { $gte: oneHourAgo },
  });

  if (!alreadyVisited) {
    await Visitor.create({ ipAddress, userAgent, page });
  }

  res.status(200).json({
    success: true,
    message: "Visitor tracked successfully",
  });
});

// ──────────────────────────────────────────
// @desc    Get total visitor count
// @route   GET /api/visitors/total
// @access  Private (dashboard)
// ──────────────────────────────────────────
export const totalVisitors = asyncHandler(async (req, res) => {
  const total = await Visitor.countDocuments();
  res.json({
    success: true,
    total,
  });
});

// ──────────────────────────────────────────
// @desc    Get today's visitor count
// @route   GET /api/visitors/today
// @access  Private (dashboard)
// ──────────────────────────────────────────
export const todayVisitors = asyncHandler(async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const total = await Visitor.countDocuments({
    visitedAt: { $gte: startOfDay },
  });

  res.json({
    success: true,
    total,
  });
});

// ──────────────────────────────────────────
// @desc    Get visitors stats (last 7 days)
// @route   GET /api/visitors/stats
// @access  Private (dashboard)
// ──────────────────────────────────────────
export const visitorStats = asyncHandler(async (req, res) => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const stats = await Visitor.aggregate([
    { $match: { visitedAt: { $gte: sevenDaysAgo } } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$visitedAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json({
    success: true,
    stats,
  });
});
