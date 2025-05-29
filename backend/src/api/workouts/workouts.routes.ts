// GET    /workouts            - List workouts
// POST   /workouts            - Create workout

// GET    /workouts/:id        - Get workout details
// PATCH  /workouts/:id        - Update workout
// DELETE /workouts/:id        - Delete workout

// POST   /workouts/:id/exercises       - Add exercise to workout
// PATCH  /workouts/:id/exercises/:eid  - Update link params
// DELETE /workouts/:id/exercises/:eid  - Remove from workout

import { Router } from "express";
import * as controller from "./workouts.controller.js";
import { validate } from "../../middleware/validate.js";
import { idParamSchema } from "../../schemas/api.schemas.js";

const router = Router();

router.get("/", controller.getWorkouts);
router.post("/", controller.createWorkout);

router.get("/:wid", validate(idParamSchema));
router.patch("/:wid");
router.delete("/:wid");

router.post("/:wid/exercises");
router.patch("/wid/exercises/:eid");
router.delete("/wid/exercises/:eid");

export default router;
