import Project from "../models/projects/projectModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const parseBody = (body) => {
  const { "technologies[]": techArr, technologies, ...rest } = body;
  return {
    ...rest,

    technologies: [techArr ?? technologies ?? []].flat().filter(Boolean),
  };
};

// @desc    Create New Project
export const createProject = asyncHandler(async (req, res) => {
  const imageLocalPath = req.file?.path;
  console.log(req.body);
  if (!imageLocalPath) {
    throw new ApiError(400, "Project image is required");
  }

  const uploadedImage = await uploadOnCloudinary(imageLocalPath);

  if (!uploadedImage) {
    throw new ApiError(400, "Error while uploading image to Cloudinary");
  }

  const project = await Project.create({
    ...parseBody(req.body),

    image: {
      url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
    },
  });

  res.status(201).json({
    success: true,
    message: "Project was added successfully",
    data: project,
  });
});

// @desc    Get All Projects
export const getAllProjects = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    status,
    technologies,
    sortBy = "createdAt",
    order = "desc",
    page = 1,
    limit = 5,
  } = req.query;

  // ========================
  // 🔍 SEARCH + 🔴 FILTER
  // ========================
  const filter = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  if (status) {
    filter.status = status;
  }

  if (technologies) {
    const techArray = technologies.split(",").map((t) => t.trim());
    filter.technologies = { $in: techArray };
  }

  // ========================
  // 🟡 SORT
  // ========================
  const validSortFields = ["createdAt", "updatedAt", "order", "title"];

  const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
  const sortOrder = order === "asc" ? 1 : -1;
  const sortObj = { [sortField]: sortOrder };

  // ========================
  // 🟢 PAGINATION
  // ========================
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 5;
  const skip = (pageNum - 1) * limitNum;

  const total = await Project.countDocuments(filter);

  const projects = await Project.find(filter)
    .sort(sortObj)
    .skip(skip)
    .limit(limitNum)
    .select("-__v");

  res.status(200).json({
    success: true,
    total,
    count: projects.length,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    data: projects,
  });
});

// @desc    Get Single Project by ID
// @route   GET /api/projects/:id
export const getById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found in the vault");
  }

  res.status(200).json({
    success: true,
    data: project, // Returns a single object, not an array
  });
});

// @desc    Update Project by ID
export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let updateData = parseBody(req.body); // FIX 3: normalise here too

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

  // Only delete the old image once we know the DB write succeeded
  if (req.file && existingProject.image?.public_id) {
    await deleteFromCloudinary(existingProject.image.public_id);
  }

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

  if (project.image?.public_id) {
    await deleteFromCloudinary(project.image.public_id);
  }

  await Project.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Project and associated image deleted successfully",
  });
});
