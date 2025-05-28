import { fetchData } from "../client";

export interface ExerciseCreateBody {
  exerciseName: string;
  exerciseType: string;
}

interface ExerciseUpdateBody extends ExerciseCreateBody {
  id: number;
}

interface ExerciseResponse extends ExerciseCreateBody {
  id: number;
  userId: number;
}

export const getExercises = async (): Promise<ExerciseResponse[]> => {
  return await fetchData("/api/exercises");
};

export const deleteExercise = async (id: number): Promise<void> => {
  return await fetchData(`/api/exercises/${id}`, {
    method: "DELETE",
  });
};

export const createExercise = async (
  body: ExerciseCreateBody
): Promise<ExerciseResponse> => {
  return await fetchData("/api/exercises", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const updateExercise = async (
  body: ExerciseUpdateBody
): Promise<ExerciseResponse> => {
  return await fetchData(`/api/exercises/${body.id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};
