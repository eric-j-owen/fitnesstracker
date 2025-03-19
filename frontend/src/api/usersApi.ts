import { LoginUserData, RegisterUserData } from "../schemas/users";
import { fetchData } from "./client";

export const registerUser = async (
  data: RegisterUserData
): Promise<{ id: string }> => {
  return await fetchData("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const loginUser = async (
  data: LoginUserData
): Promise<{ id: string }> => {
  return await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const logoutUser = async () => {
  return await fetchData("/api/users/logout", {
    method: "POST",
    credentials: "include",
  });
};
