import { Router } from "express";
import * as controller from "./exercises.controller.js";
import { validate } from "../../middleware/validate.js";
import { exerciseBodySchema, idParamSchema } from "../api.schemas.js";

// GET    /exercises
// POST   /exercises
// PATCH  /exercises/:id
// DELETE /exercises/:id

const router = Router();

router.get("/", controller.getExercises);
router.post("/", validate(exerciseBodySchema), controller.createExercise);

router.patch("/:id", validate(idParamSchema), controller.updateExercise);
router.delete("/:id", validate(idParamSchema), controller.deleteExercise);

export default router;
