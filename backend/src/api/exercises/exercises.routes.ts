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
  validate(controller.exerciseBodychema),
  controller.createExercise
);
router.patch("/:id", controller.updateExercise);
router.delete("/:exerciseId", controller.deleteExercise);

export default router;
