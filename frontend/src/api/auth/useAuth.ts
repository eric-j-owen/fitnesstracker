import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAuthenticatedUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./auth.api";
import toast from "react-hot-toast";

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
      toast.success("Welcome!");
      queryClient.setQueryData(["auth-user"], user);
    },
    onError: () => {
      toast.error("Incorrect password or username");
      queryClient.setQueryData(["auth-user"], null);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      toast.success("Registration Successful");
      queryClient.setQueryData(["auth-user"], user);
    },
    onError: () => {
      queryClient.setQueryData(["auth-user"], null);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("Log out success");
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
