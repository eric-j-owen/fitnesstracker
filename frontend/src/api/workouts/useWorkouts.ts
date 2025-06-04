import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "./workouts.api";
import toast from "react-hot-toast";

export const useWorkouts = () => {
  const KEY = ["workouts"];
  const queryClient = useQueryClient();

  const workoutsQuery = useQuery({
    queryFn: api.getWorkouts,
    queryKey: [KEY],
  });

  const createWorkoutMutation = useMutation({
    mutationFn: api.createWorkout,
    onSuccess: () => {
      toast.success("Workout created successfully");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },

    onError: (err) => {
      toast.error("Something went wrong");
      console.error(err);
    },
  });

  const deleteWorkoutMutation = useMutation({
    mutationFn: api.deleteWorkout,
    onSuccess: () => {
      toast.success("Workout deleted");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (err) => {
      toast.error("Failed to delete workout");
      console.error(err);
    },
  });

  const updateWorkoutMutation = useMutation({
    mutationFn: api.updateWorkout,
    onSuccess: () => {
      toast.success("Workout updated");
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },

    onError: (err) => {
      toast.error("Failed to update workout");
      console.error(err);
    },
  });

  return {
    workouts: workoutsQuery.data,
    createWorkout: createWorkoutMutation.mutateAsync,
    deleteWorkout: deleteWorkoutMutation.mutateAsync,
    updateWorkout: updateWorkoutMutation.mutateAsync,
  };
};
