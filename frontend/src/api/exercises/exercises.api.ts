import { ExerciseFormValues, ExerciseType } from "../api.types";
import { fetchClient } from "../client";

export const getExercises = async (): Promise<ExerciseType[]> => {
  return await fetchClient("/api/exercises");
};

export const deleteExercise = async (id: number): Promise<void> => {
  return await fetchClient(`/api/exercises/${id}`, {
    method: "DELETE",
  });
};

export const createExercise = async (
  body: ExerciseFormValues
): Promise<void> => {
  return await fetchClient("/api/exercises", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const updateExercise = async ({
  id,
  body,
}: {
  id: number;
  body: ExerciseFormValues;
}): Promise<void> => {
  return await fetchClient(`/api/exercises/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};
