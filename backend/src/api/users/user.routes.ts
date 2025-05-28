import { Router } from "express";
import * as Controller from "./user.controller.js";
import { validate } from "../../middleware/validate.js";
import { UpdateUserSchema, UserRequestParamsSchema } from "./user.schemas.js";

const router = Router();

router.patch("/", validate(UpdateUserSchema), Controller.updateUser);
router.delete("/", validate(UserRequestParamsSchema), Controller.deleteUser);

export default router;
