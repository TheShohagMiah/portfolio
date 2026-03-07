import Service from "../models/services/serviceModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Add New Service
export const addService = asyncHandler(async (req, res) => {
  const newService = await Service.create(req.body);
  if (!newService) {
    throw new ApiError(102, "Not worked");
  }
  res.status(201).json({
    success: true,
    message: "Service was added successfully.",
    data: newService,
  });
});

// @desc    Get All Services
export const getServices = asyncHandler(async (req, res) => {
  const {
    search,

    tags,
    sortBy = "createdAt",
    order = "desc",

    page = 1,
    limit = 5,
  } = req.query;

  // ========================
  // 🔴 FILTER
  // ========================
  const filter = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (tags) {
    const tagsArray = tags.split(",").map((t) => t.trim());
    filter.tags = { $in: tagsArray };
  }

  // ========================
  // 🟡 SORT
  // ========================
  const validSortFields = ["createdAt", "updatedAt", "title", "order"];
  const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
  const sortOrder = order === "asc" ? 1 : -1;
  const sortObj = { [sortField]: sortOrder };

  // ========================
  // 🟢 PAGINATION
  // ========================
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 5;
  const skip = (pageNum - 1) * limitNum;

  // ========================
  // ✅ DB Query
  // ========================
  const total = await Service.countDocuments(filter);
  const services = await Service.find(filter)
    .sort(sortObj)
    .skip(skip)
    .limit(limitNum)
    .select("-__v");

  res.status(200).json({
    success: true,
    total,
    count: services.length,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    data: services,
  });
});

// @desc    Update Service by ID
export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedService = await Service.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  );

  if (!updatedService) {
    throw new ApiError(404, "Service not found with this ID");
  }

  res.status(200).json({
    success: true,
    message: "Service updated successfully",
    data: updatedService,
  });
});

// @desc    Delete Service by ID
export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedService = await Service.findByIdAndDelete(id);

  if (!deletedService) {
    throw new ApiError(404, "Service not found to delete");
  }

  res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });
});
