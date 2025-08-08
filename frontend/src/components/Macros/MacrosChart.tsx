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
import { MacrosFormData } from "../../api/api.types";

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
      text: "Last 5 Days of Logs",
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

interface MacrosChartProps {
  data: MacrosFormData[];
  isLoadingQuery: boolean;
  isErrorQuery: boolean;
}

function MacrosChart({ data, isLoadingQuery, isErrorQuery }: MacrosChartProps) {
  if (isLoadingQuery) {
    return <div>Loading...</div>;
  }

  if (isErrorQuery) {
    return <div>Error</div>;
  }

  const labels = data.map((record) => record.date.split("T")[0]);

  const dataConfig = {
    labels,
    datasets: [
      {
        label: "Fats",
        data: data.map((record) => record.fat),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Carbs",
        data: data.map((record) => record.carbs),
        backgroundColor: "rgb(53, 162, 235)",
      },

      {
        label: "Protein",
        data: data.map((record) => record.protein),
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={dataConfig} />
    </>
  );
}

export default MacrosChart;
