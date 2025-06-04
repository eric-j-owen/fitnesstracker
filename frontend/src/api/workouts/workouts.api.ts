import { fetchClient } from "../client";
import type { WorkoutFormValues } from "../api.types";

interface AddExerciseToWorkout {
  exerciseId: number;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
}

interface WorkoutResponse extends AddExerciseToWorkout {
  id: number;
  name: string;
}

export const getWorkouts = async (): Promise<WorkoutResponse[]> => {
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

export const addExerciseToWorkout = async (
  id: number,
  body: AddExerciseToWorkout
) => {
  return await fetchClient(`/api/workouts/${id}/exercises`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};
