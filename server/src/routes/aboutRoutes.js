import { Router } from "express";
import { Protected } from "../middlewares/protected.js";
import { validate } from "../middlewares/validate.js";
import { aboutValidationSchema } from "../validations/aboutValidation.js";
import { addOrUpdateAbout, getAbout } from "../controllers/aboutControllers.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const aboutRouter = Router();

aboutRouter.get("/", getAbout);
aboutRouter.put(
  "/update",
  Protected,
  isAdmin,
  validate(aboutValidationSchema),
  addOrUpdateAbout,
);

export default aboutRouter;
