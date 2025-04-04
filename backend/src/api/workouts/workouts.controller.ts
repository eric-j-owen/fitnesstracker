import type { RequestHandler } from "express";
import { query } from "../../db/index.js";
import { ro } from "@faker-js/faker";

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
