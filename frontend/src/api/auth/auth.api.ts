import {
  AuthenticatedUser,
  LoginUserData,
  RegisterUserData,
} from "./auth.schemas";
import { fetchData } from "../client";
import { UnauthorizedError } from "../errors";

export const registerUser = async (
  data: RegisterUserData
): Promise<{ id: string }> => {
  return await fetchData("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const loginUser = async (
  data: LoginUserData
): Promise<{ id: string }> => {
  return await fetchData("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const logoutUser = async (): Promise<void> => {
  return await fetchData("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};

export const getAuthenticatedUser =
  async (): Promise<AuthenticatedUser | null> => {
    try {
      return await fetchData("/api/auth/me", {
        credentials: "include",
      });
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        return null;
      }
      throw err;
    }
  };
