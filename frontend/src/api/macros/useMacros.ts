import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMacrosLogs, logMacros } from "./macros.api";
import toast from "react-hot-toast";
import { MacrosFormData } from "../schemas";

export const useMacros = () => {
  const queryClient = useQueryClient();

  const macrosQuery = useQuery<MacrosFormData[]>({
    queryKey: ["macros"],
    queryFn: getMacrosLogs,
    select: (data) => {
      return data.sort((a, b) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
    },
  });

  const logMacrosMutation = useMutation({
    mutationFn: logMacros,
    onSuccess: () => {
      toast.success("Macros logged successfully");
      queryClient.invalidateQueries({ queryKey: ["macros"] });
    },
    onError: (err) => {
      toast.error("Failed to log macros");
      console.error(err);
    },
  });

  return {
    macros: macrosQuery.data,
    logMacros: logMacrosMutation.mutateAsync,
    isLoadingQuery: macrosQuery.isLoading,
    isPendingMutation: logMacrosMutation.isPending,
    isErrorQuery: macrosQuery.isError,
    isErrorMutation: logMacrosMutation.isError,
  };
};
