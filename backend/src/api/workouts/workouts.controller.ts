import type { RequestHandler } from "express";
import createHttpError from "http-errors";
import AppDataSource from "../../db/data-source.js";
import { Workout } from "../../db/entities/workout.entity.js";
import { WorkoutExercisesLink } from "../../db/entities/workoutExerciseLink.entity.js";
import type { IdParam } from "../../types/index.js";

const workoutRepository = AppDataSource.getRepository(Workout);
const workoutExerciseLinkRepository =
  AppDataSource.getRepository(WorkoutExercisesLink);

export const getWorkouts: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  try {
    const result = await workoutRepository.find({ where: { userId } });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createWorkout: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  const { workoutName, days } = req.body;
  try {
    const workout = workoutRepository.create({
      userId,
      workoutName,
      days,
    });

    const { id } = await workoutRepository.save(workout);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const addExerciseToWorkout: RequestHandler<IdParam> = async (
  req,
  res,
  next
) => {
  const userId = req.session.userId;

  const workoutId = parseInt(req.params.id);
  const { exerciseId, sets, reps, weight, duration, distance } = req.body;

  try {
    const checkWorkoutExists = await workoutRepository.exists({
      where: { id: workoutId, userId },
    });

    if (!checkWorkoutExists) {
      throw createHttpError(404, "workout not found");
    }

    const workoutExerciseLink = workoutExerciseLinkRepository.create({
      workoutId,
      exerciseId,
      sets,
      reps,
      weight,
      duration,
      distance,
    });

    await workoutExerciseLinkRepository.save(workoutExerciseLink);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
