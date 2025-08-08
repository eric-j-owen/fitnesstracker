import { useQuery } from "@tanstack/react-query";
import { getMacrosLogs } from "./macros.api";
import { MacrosFormData } from "../api.types";
import { MACROS_KEY } from "../../consts";

export const useMacros = (date: Date) => {
  const dateString = date.toISOString().split("T")[0];

  const getDailyMacros = useQuery<MacrosFormData>({
    queryKey: [MACROS_KEY, dateString],
    queryFn: () => getMacrosLogs(dateString),
  });

  return {
    dailyMacros: getDailyMacros.data as MacrosFormData,
    isLoadingQuery: getDailyMacros.isPending,
    isErrorQuery: getDailyMacros.isError,
  };
};
