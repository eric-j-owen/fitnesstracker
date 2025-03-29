import { Router } from "express";
import * as Controller from "./metrics.controller.js";
import { validate } from "../../middleware/validate.js";
import { requireAuth } from "../../middleware/auth.js";
import { z } from "zod";

const router = Router();

// POST /api/metrics
// GET  /api/metrics

const logMetricSchema = z.object({
  body: z.object({
    type: z.enum(["Weight"]),
    val: z.number().min(0),
    date: z.string(),
  }),
});

export type LogMetricSchema = z.infer<typeof logMetricSchema.shape.body>;

router.get("/", requireAuth, Controller.getMetrics);
router.post("/", requireAuth, validate(logMetricSchema), Controller.logMetrics);

export default router;
