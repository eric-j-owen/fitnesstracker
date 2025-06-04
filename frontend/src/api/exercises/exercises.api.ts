import { Exercise, ExerciseCreate } from "../api.types";
import { fetchClient } from "../client";

export const getExercises = async (): Promise<Exercise[]> => {
  return await fetchClient("/api/exercises");
};

export const deleteExercise = async (id: number): Promise<void> => {
  return await fetchClient(`/api/exercises/${id}`, {
    method: "DELETE",
  });
};

export const createExercise = async (body: ExerciseCreate): Promise<void> => {
  return await fetchClient("/api/exercises", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const updateExercise = async (body: Exercise): Promise<void> => {
  return await fetchClient(`/api/exercises/${body.id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};
