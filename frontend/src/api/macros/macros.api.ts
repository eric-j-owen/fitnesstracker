import { MacrosFormData } from "../api.types";
import { fetchClient } from "../client";

export const getMacrosLogs = (date: string): Promise<MacrosFormData> => {
  return fetchClient(`/api/macros/daily?date=${String(date)}`);
};
