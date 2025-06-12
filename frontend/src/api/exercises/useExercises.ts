import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./exercises.api";
import toast from "react-hot-toast";
import { EXERCISE_KEY } from "../../consts";

export const useExercises = () => {
  const queryClient = useQueryClient();

  const exerciseQuery = useQuery({
    queryKey: [EXERCISE_KEY],
    queryFn: api.getExercises,
  });

  const createExerciseMutation = useMutation({
    mutationFn: api.createExercise,
    onSuccess: () => {
      toast.success("Exercise created");
      queryClient.invalidateQueries({ queryKey: [EXERCISE_KEY] });
    },
    onError: (err) => {
      toast.error("Failed to create exercise");
      console.error(err);
    },
  });

  const deleteExerciseMutation = useMutation({
    mutationFn: api.deleteExercise,
    onSuccess: () => {
      toast.success("Exercise deleted");
      queryClient.invalidateQueries({ queryKey: [EXERCISE_KEY] });
    },
    onError: (err) => {
      toast.error("Failed to delete exercise");
      console.error(err);
    },
  });

  const updateExerciseMutation = useMutation({
    mutationFn: api.updateExercise,
    onSuccess: () => {
      toast.success("Exercise updated");
      queryClient.invalidateQueries({ queryKey: [EXERCISE_KEY] });
    },
    onError: (err) => {
      toast.error("Failed to update exercise");
      console.error(err);
    },
  });

  return {
    exercises: exerciseQuery.data,
    isQueryLoading: exerciseQuery.isLoading,
    isQueryError: exerciseQuery.isError,
    createExercise: createExerciseMutation.mutateAsync,
    deleteExercise: deleteExerciseMutation.mutateAsync,
    updateExercise: updateExerciseMutation.mutateAsync,
  };
};
