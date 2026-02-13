import Project from "../models/projects/projectModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

// @desc    Create New Project
export const createProject = asyncHandler(async (req, res) => {
  const imageLocalPath = req.file?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, "Project image is required");
  }

  const uploadedImage = await uploadOnCloudinary(imageLocalPath);

  if (!uploadedImage) {
    throw new ApiError(400, "Error while uploading image to Cloudinary");
  }

  const project = await Project.create({
    ...req.body,
    image: {
      url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
    },
  });

  res.status(201).json({
    success: true,
    message: "Project added sucessfully",
    data: project,
  });
});

// @desc    Get All Projects
export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({});

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

// @desc    Update Project by ID
export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let updateData = { ...req.body };

  const existingProject = await Project.findById(id);
  if (!existingProject) {
    throw new ApiError(404, "Project not found");
  }

  if (req.file) {
    const imageLocalPath = req.file.path;

    const uploadedImage = await uploadOnCloudinary(imageLocalPath);
    if (!uploadedImage) {
      throw new ApiError(400, "Error while uploading new image");
    }

    if (existingProject.image?.public_id) {
      await deleteFromCloudinary(existingProject.image.public_id);
    }

    updateData.image = {
      url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
    };
  }

  const updatedProject = await Project.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: updatedProject,
  });
});

// @desc    Delete Project by ID
export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  await deleteFromCloudinary(project.image.public_id);

  await Project.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Project and associated image deleted successfully",
  });
});
