import { Router } from "express";
import * as Controller from "./user.controller.js";
import { validate } from "../../middleware/validate.js";
import {
  LoginSchema,
  registerUserSchema,
  UpdateUserSchema,
  UserRequestParamsSchema,
} from "./user.schemas.js";

const router = Router();

router.get("/", Controller.getUsers);

router.get("/:id", validate(UserRequestParamsSchema), Controller.getUser);
router.patch("/:id", validate(UpdateUserSchema), Controller.updateUser);
router.delete("/:id", validate(UserRequestParamsSchema), Controller.deleteUser);

router.post("/register", validate(registerUserSchema), Controller.registerUser);

router.post("/login", validate(LoginSchema), Controller.loginUser);

// router.post("/logout", Controller.logout);

export default router;
