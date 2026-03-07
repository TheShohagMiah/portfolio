import { Router } from "express";
import {
  sentMessage,
  getMessages,
  getMessage,
  replyMessage,
  deleteMessage,
} from "../controllers/contactControllers.js";
import { validate } from "../middlewares/validate.js";
import {
  contactSchema,
  replySchema,
} from "../validations/contactValidation.js";
import { Protected } from "../middlewares/protected.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const contactRouter = Router();

// ── Public ───────────────────────────────────────────────
contactRouter.post("/", validate(contactSchema), sentMessage);

// ── Private (Admin) ──────────────────────────────────────
contactRouter.get("/", Protected, isAdmin, getMessages);
contactRouter.get("/:id", Protected, isAdmin, getMessage);
contactRouter.post(
  "/reply/:id",
  Protected,
  isAdmin,
  validate(replySchema),
  replyMessage,
);
contactRouter.delete("/:id", Protected, isAdmin, deleteMessage);

export default contactRouter;
