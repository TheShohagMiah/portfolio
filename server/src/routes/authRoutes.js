import { Router } from "express";
import {
  userLogin,
  userLogOut,
  userRegister,
  verifyEmail,
  isAuthenticated,
  updatePassword,
} from "../controllers/authControllers.js";
import { Protected } from "../middlewares/protected.js";
import { validate } from "../middlewares/validate.js";
import {
  registerSchema,
  updatePasswordSchema,
} from "../validations/authValidation.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), userRegister);
authRouter.post("/login", userLogin);

authRouter.post("/logout", Protected, userLogOut);
authRouter.post("/verify-account", Protected, verifyEmail);
authRouter.get("/check-auth", Protected, isAuthenticated);
authRouter.patch(
  "/change-password",
  Protected,
  isAdmin,
  validate(updatePasswordSchema),
  updatePassword,
);
export default authRouter;
