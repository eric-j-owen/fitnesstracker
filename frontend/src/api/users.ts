import { RegisterUserData } from "../../schemas/users";
import { User } from "../types/User";
import { fetchData } from "./client";

export const registerUser = async (data: RegisterUserData): Promise<User> => {
  return await fetchData("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
