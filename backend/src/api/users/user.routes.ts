import { Router } from "express";
import * as Controller from "./user.controller.js";
import { validate } from "../../middleware/validate.js";
import { UpdateUserSchema, UserRequestParamsSchema } from "./user.schemas.js";
import { requireAuth } from "../../middleware/auth.js";

const router = Router();

router.patch(
  "/",
  validate(UpdateUserSchema),
  requireAuth,
  Controller.updateUser
);
router.delete(
  "/",
  validate(UserRequestParamsSchema),
  requireAuth,
  Controller.deleteUser
);

export default router;
