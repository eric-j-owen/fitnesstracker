const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchData = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const response = await fetch(BASE_URL + url, options);
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || "Something went wrong");
  }
  return response.json();
};
