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
import { z } from "zod";

const paramsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[1-9]\d*$/, "Invalid exercise id"),
  }),
});

const workoutBodySchema = z.object({
  body: z.object({}),
});

export type WorkoutParams = z.infer<typeof paramsSchema.shape.params>;

const router = Router();

router.get("/", controller.getWorkouts);
router.post("/", controller.createWorkout);

router.get("/:wid");
router.patch("/:wid");
router.delete("/:wid");

router.post("/:wid/exercises");
router.patch("/wid/exercises/:eid");
router.delete("/wid/exercises/:eid");

export default router;
