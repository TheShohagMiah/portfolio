import { Router } from "express";
import { Protected } from "../middlewares/protected.js";
import { validate } from "../middlewares/validate.js";
import {
  serviceValidationSchema,
  updateServiceSchema,
} from "../validations/serviceValidation.js";
import {
  addService,
  deleteService,
  getServices,
  updateService,
} from "../controllers/serviceControllers.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const serviceRouter = Router();

// Public Route
serviceRouter.get("/", getServices);

serviceRouter.post(
  "/",
  Protected,
  isAdmin,
  validate(serviceValidationSchema),
  addService,
);

serviceRouter.patch(
  "/:id",
  Protected,
  isAdmin,
  validate(updateServiceSchema),
  updateService,
);

serviceRouter.delete("/:id", Protected, isAdmin, deleteService);

export default serviceRouter;
