import { fetchData } from "../client";
import { AuthenticatedUser } from "../schemas";

export const updateUser = async (
  data: AuthenticatedUser
): Promise<{ id: string }> => {
  return await fetchData(`/api/users/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
