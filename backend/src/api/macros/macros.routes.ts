import { Router } from "express";
import * as Controller from "./macros.controller.js";
import { requireAuth } from "../../middleware/auth.js";

const router = Router();

// GET  /api/macros

router.get("/daily", Controller.getDailyMacros);
router.get("/historical", Controller.getHistoricalMacros);

export default router;
