import { LoginUserData, RegisterUserData } from "../schemas/users";
import { UnauthorizedError } from "./errors";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchData = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(BASE_URL + url, options);
  if (!response.ok) {
    const msg = await response.text();
    if (response.status === 401) throw new UnauthorizedError(msg);
    throw new Error(response.status + ": " + msg);
  }
  return response.json();
};

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

export interface User {
  id: string;
  firstName: string;
  email: string;
}

export const getAuthenticatedUser = async (): Promise<User | null> => {
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
