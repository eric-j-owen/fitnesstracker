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

router.get("/:wid", validate(idParamSchema));
router.patch("/:wid");
router.delete("/:wid", validate(idParamSchema));

router.post("/:wid/exercises");
router.patch("/:wid/exercises/:eid");
router.delete("/:wid/exercises/:eid");

export default router;
