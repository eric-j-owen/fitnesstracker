import { Router } from "express";
import * as Controller from "./metrics.controller.js";
import { validate } from "../../middleware/validate.js";
import { z } from "zod";

const router = Router();

// POST /api/metrics
// GET  /api/metrics

const logMetricSchema = z.object({
  body: z.object({
    type: z.enum(["weight"]),
    val: z.number().min(0),
    date: z.string(),
  }),
});

export type LogMetricSchema = z.infer<typeof logMetricSchema.shape.body>;

router.get("/", Controller.getMetrics);
router.post("/", validate(logMetricSchema), Controller.logMetrics);

export default router;
