import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "./user.api";
import toast from "react-hot-toast";

export const useUserApi = () => {
  const queryClient = useQueryClient();
  const update = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    update,
  };
};
