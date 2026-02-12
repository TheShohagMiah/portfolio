import Service from "../models/services/serviceModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Add New Service
export const addService = asyncHandler(async (req, res) => {
  const newService = await Service.create(req.body);
  res.status(201).json({ success: true, data: newService });
});

// @desc    Get All Services
export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({}).sort({ order: 1 }); // Order অনুযায়ী সর্টিং

  if (services.length === 0) {
    throw new ApiError(404, "No services found");
  }

  res.json({
    success: true,
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
