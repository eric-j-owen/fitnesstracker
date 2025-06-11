import { fetchClient } from "../client";
import type {
  addExerciseToWorkoutType,
  WorkoutFormValues,
  WorkoutType,
} from "../api.types";

export const getWorkouts = async (): Promise<WorkoutType[]> => {
  return await fetchClient("/api/workouts");
};

export const createWorkout = async (body: WorkoutFormValues) => {
  return await fetchClient("/api/workouts", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const deleteWorkout = async (id: number) => {
  return await fetchClient(`/api/workouts/${id}`, {
    method: "DELETE",
  });
};

export const updateWorkout = async ({
  id,
  body,
}: {
  id: number;
  body: WorkoutFormValues;
}) => {
  return await fetchClient(`/api/workouts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};

export const addExerciseToWorkout = async ({
  workoutId,
  body,
}: {
  workoutId: number;
  body: addExerciseToWorkoutType;
}) => {
  return await fetchClient(`/api/workouts/${workoutId}/exercises`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};
