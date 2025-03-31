import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./exercises.api";
import toast from "react-hot-toast";

export const useExercises = () => {
  const queryClient = useQueryClient();

  const exerciseQuery = useQuery({
    queryKey: ["exercises"],
    queryFn: api.getExercises,
  });

  const createExerciseMutation = useMutation({
    mutationFn: api.createExercise,
    onSuccess: () => {
      toast.success("Exercise created");
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
    onError: (err) => {
      toast.error("Failed to create exercise");
      console.error(err);
    },
  });

  return {
    exercises: exerciseQuery.data,
    isExercisesLoading: exerciseQuery.isLoading,
    isExercisesError: exerciseQuery.isError,
    createExercise: createExerciseMutation.mutateAsync,
  };
};
