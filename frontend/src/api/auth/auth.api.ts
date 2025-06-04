import {
  AuthenticatedUser,
  LoginUserData,
  RegisterUserData,
} from "../api.types";
import { fetchClient } from "../client";
import { UnauthorizedError } from "../errors";

export const registerUser = async (
  data: RegisterUserData
): Promise<{ id: string }> => {
  return await fetchClient("/api/auth/register", {
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
  return await fetchClient("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const logoutUser = async (): Promise<void> => {
  return await fetchClient("/api/auth/logout", {
    method: "POST",
  });
};

export const getAuthenticatedUser =
  async (): Promise<AuthenticatedUser | null> => {
    try {
      return await fetchClient("/api/auth/me");
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        return null;
      }
      throw err;
    }
  };
