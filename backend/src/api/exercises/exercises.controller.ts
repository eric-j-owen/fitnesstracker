import type { RequestHandler } from "express";
import { query } from "../../db/index.js";
import { z } from "zod";
import createHttpError from "http-errors";

const exerciseParamsSchema = z.object({
  params: z.object({
    exerciseId: z.string().regex(/^[1-9]\d*$/, "Invalid exercise id"),
  }),
});

export const exerciseBodychema = z.object({
  body: z.object({
    exerciseName: z.string(),
    exerciseType: z.string(),
  }),
});

type ExerciseParams = z.infer<typeof exerciseParamsSchema.shape.params>;
type ExerciseBody = z.infer<typeof exerciseBodychema.shape.body>;

export const createExercise: RequestHandler<
  unknown,
  unknown,
  ExerciseBody
> = async (req, res, next) => {
  const userId = req.session.userId;
  const { exerciseName, exerciseType } = req.body;

  try {
    const { rows } = await query(
      `
        insert into exercises (user_id, exercise_name, exercise_type)
        values ($1, $2, $3)
        returning *;
        `,
      [userId, exerciseName, exerciseType.toLowerCase()]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getExercises: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;

  try {
    const { rows } = await query(
      `
            select * from exercises
            where user_id = $1;
        `,
      [userId]
    );
    const convertRows = rows.map((row) => {
      return {
        exerciseId: row.id,
        exerciseType: row.exercise_type,
        exerciseName: row.exercise_name,
      };
    });

    res.status(200).json(convertRows);
  } catch (error) {
    next(error);
  }
};

export const updateExercise: RequestHandler<
  ExerciseParams,
  unknown,
  ExerciseBody
> = async (req, res, next) => {
  const userId = req.session.userId;
  const { exerciseId } = req.params;
  const { exerciseName, exerciseType } = req.body;

  try {
    const { rows } = await query(
      `
            update exercises
            set exercise_name = $1, exercise_type = $2
            where id = $3 and user_id = $4
            returning *;
        `,
      [exerciseName, exerciseType, exerciseId, userId]
    );

    if (!rows.length) {
      res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteExercise: RequestHandler<ExerciseParams> = async (
  req,
  res,
  next
) => {
  const userId = req.session.userId;
  const { exerciseId } = req.params;
  console.log("Deleting exercise with ID:", exerciseId, "for user ID:", userId);

  try {
    const { rows } = await query(
      `
                delete from exercises
                where id = $1 and user_id = $2
                returning *;
            `,
      [exerciseId, userId]
    );

    if (!rows.length) {
      throw createHttpError(404, "Exercise not found");
    }

    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    next(error);
  }
};
