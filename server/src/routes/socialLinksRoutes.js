import { Router } from "express";

import {
  createSocialLink,
  deleteSocialLink,
  getAllSocialLinks,
  toggleSocialLink,
  updateSocialLink,
} from "../controllers/socialLinkControllers.js";
import { Protected } from "../middlewares/protected.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const socialLinkRouter = Router();

// 🌐 Public route — Footer এ use হবে
socialLinkRouter.get("/", getAllSocialLinks);

// 🔒 Admin only routes
socialLinkRouter.post("/", Protected, isAdmin, createSocialLink);
socialLinkRouter.put("/:id", Protected, isAdmin, updateSocialLink);
socialLinkRouter.delete("/:id", Protected, isAdmin, deleteSocialLink);
socialLinkRouter.patch("/:id/toggle", Protected, isAdmin, toggleSocialLink);

export default socialLinkRouter;
