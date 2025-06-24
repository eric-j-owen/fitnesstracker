import { Router } from "express";
import * as Controller from "./foodItems.controller.js";
import { validate } from "../../middleware/validate.js";
import { idParamSchema } from "../api.schemas.js";

// GET /api/fooditem/:fdcid
// GET /api/fooditem/search
// POST /api/fooditem

const router = Router();

router.get("/:id", validate(idParamSchema), Controller.getFoodItem);

export default router;
