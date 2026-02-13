import { Router } from "express";
import { Protected } from "../middlewares/protected.js";
import { validate } from "../middlewares/validate.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../controllers/projectControllers.js";
import {
  projectValidationSchema,
  updateProjectSchema,
} from "../validations/projectValidation.js";
import {
  deleteService,
  updateService,
} from "../controllers/serviceControllers.js";
import { upload } from "../middlewares/multer.js";

const projectRouter = Router();

// Public Route
projectRouter.get("/", getAllProjects);

projectRouter.post(
  "/",
  Protected,
  isAdmin,
  upload.single("image"),
  validate(projectValidationSchema),
  createProject,
);

projectRouter.patch(
  "/:id",
  Protected,
  isAdmin,
  upload.single("image"),
  validate(updateProjectSchema),
  updateProject,
);

projectRouter.delete("/:id", Protected, isAdmin, deleteProject);

export default projectRouter;
