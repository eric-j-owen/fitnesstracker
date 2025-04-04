import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWorkout, getWorkouts } from "./workouts.api";
import toast from "react-hot-toast";

export const useWorkouts = () => {
  const KEY = ["workouts"];
  const queryClient = useQueryClient();

  const workoutsQuery = useQuery({
    queryFn: getWorkouts,
    queryKey: [KEY],
  });

  const createWorkoutMutation = useMutation({
    mutationFn: createWorkout,
    onSuccess: () => {
      toast.success("Workout created successfully");
      queryClient.invalidateQueries({ queryKey: KEY });
    },

    onError: (err) => {
      toast.error("Something went wrong");
      console.error(err);
    },
  });

  return {
    workouts: workoutsQuery.data,
    createWorkout: createWorkoutMutation.mutateAsync,
  };
};
