import { Router } from "express";
import * as controller from "./exercises.controller.js";
import { validate } from "../../middleware/validate.js";

// GET    /exercises
// POST   /exercises
// PATCH  /exercises/:id
// DELETE /exercises/:id

const router = Router();

router.get("/", controller.getExercises);
router.post(
  "/",
  validate(controller.exerciseBodySchema),
  controller.createExercise
);
router.patch("/:id", controller.updateExercise);
router.delete("/:id", controller.deleteExercise);

export default router;
