import type { RequestHandler } from "express";
import createHttpError from "http-errors";
import AppDataSource from "../../db/data-source.js";
import { Workout } from "../../db/entities/workout.entity.js";
import { WorkoutExercisesLink } from "../../db/entities/workoutExerciseLink.entity.js";
import type { IdParam } from "../api.types.js";

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
  const { name, days } = req.body;
  try {
    const workout = workoutRepository.create({
      userId,
      name,
      days,
    });

    const { id } = await workoutRepository.save(workout);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const deleteWorkout: RequestHandler<IdParam> = async (
  req,
  res,
  next
) => {
  const userId = req.session.userId;
  const id = parseInt(req.params.id);
  console.log(id);
  try {
    const result = await workoutRepository.delete({ userId, id });
    if (result.affected === 0) {
      throw createHttpError(404, "Workout not found");
    }
    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const editWorkout: RequestHandler<IdParam> = async (req, res, next) => {
  const userId = req.session.userId;
  const id = parseInt(req.params.id);
  const { name, days } = req.body;

  try {
    const exists = await workoutRepository.exists({ where: { id, userId } });
    if (!exists) {
      throw createHttpError(404, "Workout not found");
    }

    const result = await workoutRepository.update(
      { id, userId },
      { name, days }
    );

    if (result.affected === 0) {
      throw createHttpError(500, "Failed to update workout");
    }

    res.status(200).json({ msg: "Workout updated" });
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
