import { Router } from "express";
import { addOrUpdateHero, getHero } from "../controllers/heroControllers.js";
import { Protected } from "../middlewares/protected.js";
import { validate } from "../middlewares/validate.js";
import { updateHeroSchema } from "../validations/heroValidation.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const heroRouter = Router();

heroRouter.get("/", getHero);
heroRouter.put(
  "/update",
  Protected,
  isAdmin,
  validate(updateHeroSchema),
  addOrUpdateHero,
);

export default heroRouter;
