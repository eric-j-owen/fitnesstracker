// GET    /workouts            - List workouts
// POST   /workouts            - Create workout

// GET    /workouts/:wid        - Get workout details
// PATCH  /workouts/:wid        - Update workout
// DELETE /workouts/:wid        - Delete workout

// POST   /workouts/:wid/exercises       - Add exercise to workout
// PATCH  /workouts/:wid/exercises/:eid  - Update link params
// DELETE /workouts/:wid/exercises/:eid  - Remove from workout

import { Router } from "express";
import * as controller from "./workouts.controller.js";
import { validate } from "../../middleware/validate.js";
import { idParamSchema } from "../api.schemas.js";

const router = Router();

router.get("/", controller.getWorkouts);
router.post("/", controller.createWorkout);

router.delete("/:id", validate(idParamSchema), controller.deleteWorkout);
router.patch("/:id", controller.editWorkout);
// router.get("/:id", validate(idParamSchema));

// router.post("/:id/exercises");
// router.patch("/:id/exercises/:eid");
// router.delete("/:id/exercises/:eid");

export default router;
