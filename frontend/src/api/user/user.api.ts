import { fetchClient } from "../client";
import { AuthenticatedUser } from "../api.schemas";

export const updateUser = async (
  data: AuthenticatedUser
): Promise<{ id: string }> => {
  return await fetchClient(`/api/users/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
