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
