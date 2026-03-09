import Contact from "../models/contact/contactModel.js";
import Project from "../models/projects/projectModel.js";
import Service from "../models/services/serviceModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Show total projects count on the dashboard
export const totalProjects = asyncHandler(async (req, res) => {
  const count = await Project.countDocuments();
  res.json({
    success: true,
    total: count,
  });
});

// Show total services count on the dashboard
export const totalServices = asyncHandler(async (req, res) => {
  const count = await Service.countDocuments();
  res.json({
    success: true,
    total: count,
  });
});

// Show total contact/messages count on the dashboard
export const totalQueries = asyncHandler(async (req, res) => {
  const count = await Contact.countDocuments();
  res.json({
    success: true,
    total: count,
  });
});
