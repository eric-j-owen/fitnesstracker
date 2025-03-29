import { fetchData } from "../client";
import { MetricsFormData } from "../schemas";

interface MetricsResponse {
  id: number;
  user_id: number;
  type: string;
  val: number;
  date: string;
}

export const logMetrics = async (
  data: MetricsFormData
): Promise<MetricsResponse> => {
  return await fetchData("/api/metrics", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getMetricsLogs = async (): Promise<MetricsResponse[]> => {
  return await fetchData("/api/metrics");
};
