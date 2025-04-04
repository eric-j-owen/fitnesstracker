import { fetchData } from "../client";

interface WorkoutReqBody {
  user_id: number;
  workout_name: string;
  days: string[];
}

interface WorkoutRes {
  id: number;
}

export const getWorkouts = async () => {
  return await fetchData("/api/workouts");
};

export const createWorkout = async (
  body: WorkoutReqBody
): Promise<WorkoutRes> => {
  return await fetchData("/api/workouts", {
    method: "POST",
    body: JSON.stringify(body),
  });
};
