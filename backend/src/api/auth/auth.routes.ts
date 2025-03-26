import { Router } from "express";
import * as Controller from "./auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { LoginSchema, registerUserSchema } from "./auth.schemas.js";
import { requireAuth } from "../../middleware/auth.js";

const router = Router();

router.post("/register", validate(registerUserSchema), Controller.registerUser);

router.post("/login", validate(LoginSchema), Controller.loginUser);

router.post("/logout", Controller.logoutUser);

router.get("/me", requireAuth, Controller.getAuthenticatedUser);

export default router;
