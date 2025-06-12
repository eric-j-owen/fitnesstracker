import { fetchClient } from "../client";

interface MacrosResponse {
  id: number;
  user_id: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
}

export const getMacrosLogs = async (): Promise<MacrosResponse[]> => {
  return await fetchClient("/api/macros");
};
