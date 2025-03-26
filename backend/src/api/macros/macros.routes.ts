import { Router } from "express";
import * as Controller from "./macros.controller.js";
import { validate } from "../../middleware/validate.js";
import { requireAuth } from "../../middleware/auth.js";

const router = Router();

// POST /api/nutrition
// GET  /api/nutrition
// GET  /api/nutrition/today

router.get("/nutrition", Controller.getMacros);
router.post("/nutrition", Controller.logMacros);
