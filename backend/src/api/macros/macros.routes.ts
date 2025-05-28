import { Router } from "express";
import * as Controller from "./macros.controller.js";
import { validate } from "../../middleware/validate.js";
import { requireAuth } from "../../middleware/auth.js";
import { logMacrosBodySchema } from "../../schemas/index.js";

const router = Router();

// POST /api/macros
// GET  /api/macros

router.get("/", requireAuth, Controller.getMacrosLogs);
router.post(
  "/",
  requireAuth,
  validate(logMacrosBodySchema),
  Controller.logMacros
);

export default router;
