import { Router } from "express";
import * as Controller from "./foodLogs.controller.js";
import { validate } from "../../middleware/validate.js";
import { createFoodLogSchema } from "../api.schemas.js";

const router = Router();

// POST  /api/Foodlog

router.post(
  "/",

  validate(createFoodLogSchema),
  Controller.createLogEntry
);

export default router;
