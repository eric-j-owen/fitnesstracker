import { fetchData } from "../client";

interface ExerciseCreateBody {
  exerciseName: string;
  exerciseType: string;
}

interface ExerciseUpdateBody extends ExerciseCreateBody {
  exerciseId: number;
}

interface ExerciseResponse extends ExerciseCreateBody {
  userId: number;
  exerciseId: number;
}

export const getExercises = async (): Promise<ExerciseResponse[]> => {
  return await fetchData("/api/exercises");
};

export const deleteExercise = async (exerciseId: number): Promise<void> => {
  return await fetchData(`/api/exercises/${exerciseId}`, {
    method: "DELETE",
  });
};

export const createExercise = async (
  body: ExerciseCreateBody
): Promise<ExerciseResponse> => {
  return await fetchData("/api/exercises", {
    method: "POST",
    body: JSON.stringify({ body }),
  });
};

export const updateExercise = async (
  body: ExerciseUpdateBody
): Promise<ExerciseResponse> => {
  return await fetchData(`/api/exercises/${body.exerciseId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};
