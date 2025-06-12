import { fetchClient } from "../client";
import { MacrosFormData } from "../api.schemas";

interface MacrosResponse {
  id: number;
  user_id: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
}

export const logMacros = async (
  data: MacrosFormData
): Promise<MacrosResponse> => {
  return await fetchClient("/api/macros", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getMacrosLogs = async (): Promise<MacrosResponse[]> => {
  return await fetchClient("/api/macros");
};
