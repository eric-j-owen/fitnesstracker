import { Router } from "express";
import * as Controller from "./foodLogs.controller.js";
import { validate } from "../../middleware/validate.js";
import { createFoodLogSchema } from "../api.schemas.js";

const router = Router();

// GET /api/foodlog/:id
// GET /api/foodlog
// POST  /api/Foodlog
// PATCH /api/foodlog/:id

router.get("/", Controller.getLoggedDay);
router.post(
  "/",

  validate(createFoodLogSchema),
  Controller.createLogEntry
);
router.patch("/:id", Controller.editLogEntry);
router.delete("/:id", Controller.deleteLogEntry);

export default router;
