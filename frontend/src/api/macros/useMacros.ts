import { useQuery } from "@tanstack/react-query";
import { getMacrosLogs } from "./macros.api";
import { MacrosFormData } from "../api.types";
import { MACROS_KEY } from "../../consts";

export const useMacros = (date: Date) => {
  const getDailyMacros = useQuery<MacrosFormData>({
    queryKey: [MACROS_KEY],
    queryFn: () => getMacrosLogs(String(date.toISOString().split("T")[0])),
  });

  return {
    dailyMacros: getDailyMacros.data as MacrosFormData,
    isLoadingQuery: getDailyMacros.isPending,
    isErrorQuery: getDailyMacros.isError,
  };
};
