import { Router } from "express";
import * as Controller from "./foodItems.controller.js";
import { validate } from "../../middleware/validate.js";
import { idParamSchema } from "../api.schemas.js";

// GET /api/fooditem/:fdcid
// GET /api/fooditem/search

const router = Router();

router.get("/search", Controller.searchFoodItems);
router.get("/:id", validate(idParamSchema), Controller.getFoodItemById);

export default router;
