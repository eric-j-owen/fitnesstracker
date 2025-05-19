import type { RequestHandler } from "express";
import { query } from "../../db/index.js";
import createHttpError from "http-errors";

export const getWorkouts: RequestHandler = async (req, res, next) => {
  const id = req.session.userId;
  try {
    const { rows } = await query(`select * from workouts where user_id = $1`, [
      id,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

export const createWorkout: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  const { workoutName, days } = req.body;
  try {
    const { rows } = await query(
      `
        insert into workouts (user_id, workout_name, days)
        values ($1, $2, $3)
        returning id;
        `,
      [userId, workoutName, days]
    );
    res.send(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const addExerciseToWorkout: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) throw createHttpError(401, "Unauthorized");

  const { wid } = req.params;
  const { eid, sets, reps, weight, duration, distance } = req.body;
  try {
    const checkWorkoutExists = await query(
      `
        select id from workouts where id = $1 and user_id = $2`,
      [wid, userId]
    );

    if (!checkWorkoutExists.rows.length) {
      throw createHttpError(404, "workout not found");
    }

    await query(
      ` 
        insert into 
        workout_exercise_link (
            workout_id, exercise_id, sets, reps, weight, duration, distance
        ) values ($1, $2, $3, $4, $5, $6, $7);
    `,
      [wid, eid, sets, reps, weight, duration, distance]
    );

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
