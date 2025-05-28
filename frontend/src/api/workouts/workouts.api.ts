import { fetchData } from "../client";

interface WorkoutReqBody {
  userId: number;
  workoutName: string;
  days: string[];
}

interface AddExerciseToWorkout {
  exerciseId: number;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
}

interface WorkoutResponse extends AddExerciseToWorkout {
  workoutId: number;
  workoutName: string;
}

export const getWorkouts = async (): Promise<WorkoutResponse[]> => {
  return await fetchData("/api/workouts");
};

export const createWorkout = async (body: WorkoutReqBody) => {
  return await fetchData("/api/workouts", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const addExerciseToWorkout = async (
  workoutId: number,
  body: AddExerciseToWorkout
) => {
  return await fetchData(`/api/workouts/${workoutId}/exercises`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};
