import type { RequestHandler } from "express";
import createHttpError from "http-errors";
import AppDataSource from "../../db/data-source.js";
import { Exercise } from "../../db/entities/exercise.entity.js";
import type { ExerciseBody, IdParam } from "../api.types.js";

const exercisesRepo = AppDataSource.getRepository(Exercise);

export const createExercise: RequestHandler<
  unknown,
  unknown,
  ExerciseBody
> = async (req, res, next) => {
  const userId = req.session.userId;
  const { name, tag } = req.body;

  try {
    const exercise = exercisesRepo.create({
      userId,
      name,
      tag,
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
  IdParam,
  unknown,
  ExerciseBody
> = async (req, res, next) => {
  const userId = req.session.userId;
  const { id } = req.params;
  const { name, tag } = req.body;

  try {
    const result = await exercisesRepo
      .createQueryBuilder()
      .update("exercises")
      .set({
        name,
        tag,
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

export const deleteExercise: RequestHandler<IdParam> = async (
  req,
  res,
  next
) => {
  const userId = req.session.userId;
  const id = parseInt(req.params.id);

  try {
    const result = await exercisesRepo.delete({ id, userId });
    if (result.affected === 0) {
      throw createHttpError(404, "Exercise not found");
    }

    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    next(error);
  }
};
