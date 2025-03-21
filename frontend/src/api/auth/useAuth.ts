import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAuthenticatedUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./auth.api";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: getAuthenticatedUser,
    throwOnError: false,
    // retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["auth-user"], user);
    },
    onError: () => {
      queryClient.setQueryData(["auth-user"], null);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["auth-user"], user);
    },
    onError: () => {
      queryClient.setQueryData(["auth-user"], null);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["auth-user"], null);
      queryClient.clear();
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    isAuthenticated: !!userQuery.data,
    isError: userQuery.isError,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    error: loginMutation.error || registerMutation.error || userQuery.error,
  };
};
