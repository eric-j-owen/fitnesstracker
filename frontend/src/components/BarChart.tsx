import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { MacrosData } from "../api/schemas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Macros",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

interface BarChartProps {
  data: MacrosData[];
  isLoadingQuery: boolean;
  isErrorQuery: boolean;
}

function BarChart({ data, isLoadingQuery, isErrorQuery }: BarChartProps) {
  if (isLoadingQuery) {
    return <div>Loading...</div>;
  }

  if (isErrorQuery) {
    return <div>Error</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  const labels = data.map((record) => record.date.split("T")[0]);

  const dataConfig = {
    labels,
    datasets: [
      {
        label: "Protein",
        data: data.map((record) => record.protein),
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Carbs",
        data: data.map((record) => record.carbs),
        backgroundColor: "rgb(53, 162, 235)",
      },

      {
        label: "Fats",
        data: data.map((record) => record.fats),
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={dataConfig} />
    </>
  );
}

export default BarChart;
