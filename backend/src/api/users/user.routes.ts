import { Router } from "express";
import * as Controller from "./user.controller.js";
import { validate } from "../../middleware/validate.js";
import { idParamSchema, UpdateUserSchema } from "../../schemas/index.js";

const router = Router();

router.patch("/", validate(UpdateUserSchema), Controller.updateUser);
router.delete("/", validate(idParamSchema), Controller.deleteUser);

export default router;
