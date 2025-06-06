import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAuthenticatedUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./auth.api";
import toast from "react-hot-toast";
import { AUTH_KEY } from "../../consts";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: [AUTH_KEY],
    queryFn: getAuthenticatedUser,
    retry: 1,
    retryOnMount: false,
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      toast.success("Welcome!");
      queryClient.setQueryData([AUTH_KEY], user);
      queryClient.invalidateQueries({ queryKey: [AUTH_KEY] });
    },
    onError: () => {
      toast.error("Incorrect password or username");
      queryClient.setQueryData([AUTH_KEY], null);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      toast.success("Registration Successful");
      queryClient.setQueryData([AUTH_KEY], user);
      queryClient.invalidateQueries({ queryKey: [AUTH_KEY] });
    },
    onError: () => {
      queryClient.setQueryData([AUTH_KEY], null);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("Log out success");
      queryClient.setQueryData([AUTH_KEY], null);
      queryClient.clear();
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading && !userQuery.isError,
    isAuthenticated: !!userQuery.data,
    isError: userQuery.isError,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    error: loginMutation.error || registerMutation.error || userQuery.error,
  };
};
