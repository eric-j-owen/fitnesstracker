import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMetricsLogs, logMetrics } from "./metrics.api";
import toast from "react-hot-toast";
import { MetricsFormData } from "../schemas";

export const useMetrics = () => {
  const queryClient = useQueryClient();

  const metricsQuery = useQuery<MetricsFormData[]>({
    queryKey: ["metrics"],
    queryFn: getMetricsLogs,
  });

  const logMetricsMutation = useMutation({
    mutationFn: logMetrics,
    onSuccess: () => {
      toast.success("Metric logged successfully");
      queryClient.invalidateQueries({ queryKey: ["metrics"] });
    },
    onError: (err) => {
      toast.error("Failed to log metric");
      console.error(err);
    },
  });

  return {
    metrics: metricsQuery.data,
    logMetrics: logMetricsMutation.mutateAsync,
    isLoadingQuery: metricsQuery.isLoading,
    isPendingMutation: logMetricsMutation.isPending,
    isErrorQuery: metricsQuery.isError,
    isErrorMutation: logMetricsMutation.isError,
  };
};
