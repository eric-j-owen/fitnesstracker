import { Router } from "express";
import * as Controller from "./macros.controller.js";
import { validate } from "../../middleware/validate.js";
import { requireAuth } from "../../middleware/auth.js";
import { date, z } from "zod";

const router = Router();

// POST /api/macros
// GET  /api/macros

const logMacrosBodySchema = z.object({
  body: z.object({
    calories: z.coerce.number().positive().max(20000),
    protein: z.coerce.number().positive().max(20000),
    carbs: z.coerce.number().positive().max(20000),
    fats: z.coerce.number().positive().max(20000),
    date: z.string().optional(),
  }),
});

export type LogMacrosBodyType = z.infer<typeof logMacrosBodySchema.shape.body>;

router.get("/", requireAuth, Controller.getMacrosLogs);
router.post(
  "/",
  requireAuth,
  validate(logMacrosBodySchema),
  Controller.logMacros
);

export default router;
