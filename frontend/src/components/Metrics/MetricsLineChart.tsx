import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MetricsFormData } from "../../api/schemas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Metrics",
    },
  },
};

interface MetricsLineChartProps {
  data: MetricsFormData[];
  isLoadingQuery: boolean;
  isErrorQuery: boolean;
}

export function MetricsLineChart({
  data,
  isLoadingQuery,
  isErrorQuery,
}: MetricsLineChartProps) {
  if (isLoadingQuery) {
    return <div className="skeleton h-60 w-60 mx-auto"></div>;
  }

  if (isErrorQuery) {
    return <div>Error loading metrics data</div>;
  }

  const labels = data.map((log) => log.date.split("T")[0]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Weight",
        data: data.map((log) => log.val),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={chartData} />;
}
