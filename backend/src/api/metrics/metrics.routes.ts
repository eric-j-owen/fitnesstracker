import { Router } from "express";
import * as Controller from "./metrics.controller.js";
import { validate } from "../../middleware/validate.js";
import { logMetricSchema } from "../api.schemas.js";

const router = Router();

// POST /api/metrics
// GET  /api/metrics

router.get("/", Controller.getMetrics);
router.post("/", validate(logMetricSchema), Controller.logMetrics);

export default router;
