import type { RequestHandler } from "express";
import { z } from "zod";
import createHttpError from "http-errors";
import AppDataSource from "../../db/data-source.js";
import { Exercise } from "../../db/entities/exercise.entity.js";

const exerciseParamsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[1-9]\d*$/, "Invalid exercise id"),
  }),
});

export const exerciseBodySchema = z.object({
  body: z.object({
    exerciseName: z.string(),
    exerciseType: z.string(),
  }),
});

type ExerciseParams = z.infer<typeof exerciseParamsSchema.shape.params>;
type ExerciseBody = z.infer<typeof exerciseBodySchema.shape.body>;

const exercisesRepo = AppDataSource.getRepository(Exercise);
export const createExercise: RequestHandler<
  unknown,
  unknown,
  ExerciseBody
> = async (req, res, next) => {
  const userId = req.session.userId;
  const { exerciseName, exerciseType } = req.body;

  try {
    const exercise = exercisesRepo.create({
      userId,
      exerciseName,
      exerciseTag: exerciseType,
    });

    const { id } = await exercisesRepo.save(exercise);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const getExercises: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;

  try {
    const result = await exercisesRepo.find({ where: { userId } });
    res.status(200).json(result);
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
  const { id } = req.params;
  const { exerciseName, exerciseType } = req.body;

  try {
    const result = await exercisesRepo
      .createQueryBuilder()
      .update("exercises")
      .set({
        exerciseName,
        exerciseTag: exerciseType,
      })
      .where("id = :id AND userId = :userId", { id, userId })
      .execute();

    if (result.affected === 0) {
      res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json(result);
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
  const id = parseInt(req.params.id);

  try {
    const result = await exercisesRepo.delete({ id, userId });
    console.log(result);
    if (result.affected === 0) {
      throw createHttpError(404, "Exercise not found");
    }

    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    next(error);
  }
};
