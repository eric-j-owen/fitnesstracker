import { fetchClient } from "../client";
import { AuthenticatedUser } from "../api.types";

export const updateUser = async (
  data: AuthenticatedUser
): Promise<{ id: string }> => {
  return await fetchClient(`/api/users/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
