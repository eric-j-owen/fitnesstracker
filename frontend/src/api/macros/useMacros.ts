import { useQuery } from "@tanstack/react-query";
import { getMacrosLogs } from "./macros.api";
import { MacrosFormData } from "../api.types";
import { MACROS_KEY } from "../../consts";

export const useMacros = () => {
  const macrosQuery = useQuery<MacrosFormData[]>({
    queryKey: [MACROS_KEY],
    queryFn: getMacrosLogs,
  });

  return {
    macros: macrosQuery.data,
    isLoadingQuery: macrosQuery.isLoading,
    isErrorQuery: macrosQuery.isError,
  };
};
