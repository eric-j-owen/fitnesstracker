import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "./user.api";
import toast from "react-hot-toast";
import { AUTH_KEY } from "../../consts";

export const useUserApi = () => {
  const queryClient = useQueryClient();
  const update = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: [AUTH_KEY] });
    },
    onError: (err) => {
      toast.error("Failed to update profile");
      console.error(err);
    },
  });

  return {
    update,
  };
};
