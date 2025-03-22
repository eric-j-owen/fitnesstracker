import { fetchData } from "../client";
import { AuthenticatedUser } from "../schemas";

export const updateUser = async (
  data: AuthenticatedUser
): Promise<{ id: string }> => {
  const parsedUser = {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
  };
  return await fetchData(`/api/users/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedUser),
    credentials: "include",
  });
};
