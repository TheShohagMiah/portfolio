import { Router } from "express";
import {
  userLogin,
  userLogOut,
  userRegister,
  verifyEmail,
} from "../controllers/authControllers.js";
import { Protected } from "../middlewares/protected.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema } from "../validations/authValidation.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), userRegister);
authRouter.post("/login", userLogin);

authRouter.post("/logout", Protected, userLogOut);
authRouter.post("/verify-account", Protected, verifyEmail);

export default authRouter;
