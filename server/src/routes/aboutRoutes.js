import { Router } from "express";
import { Protected } from "../middlewares/protected.js";
import { validate } from "../middlewares/validate.js";
import { aboutValidationSchema } from "../validations/aboutValidation.js";
import {
  addOrUpdateAbout,
  deleteEducation,
  getAbout,
} from "../controllers/aboutControllers.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const aboutRouter = Router();

aboutRouter.get("/", getAbout);
aboutRouter.patch(
  "/update",
  Protected,
  isAdmin,
  validate(aboutValidationSchema),
  addOrUpdateAbout,
);

aboutRouter.delete("/education/:id", Protected, isAdmin, deleteEducation);

export default aboutRouter;
