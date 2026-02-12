import { Router } from "express";
import { Protected } from "../middlewares/protected.js";
import { validate } from "../middlewares/validate.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  createProject,
  getAllProjects,
} from "../controllers/projectControllers.js";
import {
  projectValidationSchema,
  updateProjectSchema,
} from "../validations/projectValidation.js";
import {
  deleteService,
  updateService,
} from "../controllers/serviceControllers.js";

const projectRouter = Router();

// Public Route
projectRouter.get("/", getAllProjects);

projectRouter.post(
  "/",
  Protected,
  isAdmin,
  validate(projectValidationSchema),
  createProject,
);

projectRouter.patch(
  "/:id",
  Protected,
  isAdmin,
  validate(updateProjectSchema),
  updateService,
);

projectRouter.delete("/:id", Protected, isAdmin, deleteService);

export default projectRouter;
