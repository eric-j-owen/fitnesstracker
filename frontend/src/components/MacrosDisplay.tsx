import { useMacros } from "../api/macros/useMacros";
import { useRef } from "react";
import MacroForm from "../components/MacrosForm";
import Modal from "../components/Modal";
import BarChart from "./BarChart";

function MacrosDisplay() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { macros, isLoadingQuery, isErrorQuery } = useMacros();

  const latestLog = macros?.[macros.length - 1];

  type MacroProgressFieldsType = {
    id: "calories" | "protein" | "carbs" | "fats";
    label: string;
    target: number;
    unit: string;
    color: string;
  };

  const MacroProgressFields: MacroProgressFieldsType[] = [
    {
      id: "calories",
      label: "Calories",
      target: 2500,
      unit: "",
      color: "white",
    },
    {
      id: "protein",
      label: "Protein",
      target: 200,
      unit: "g",
      color: "rgb(75, 192, 192)",
    },
    {
      id: "carbs",
      label: "Carbs",
      target: 300,
      unit: "g",
      color: "rgb(53, 162, 235)",
    },
    {
      id: "fats",
      label: "Fats",
      target: 70,
      unit: "g",
      color: "rgb(255, 99, 132)",
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4 ">
        <Modal
          modalId="macrosModal"
          title="+"
          modalRef={modalRef}
          className="btn btn-outline btn-sm mb-5"
        >
          <MacroForm modalRef={modalRef} />
        </Modal>
      </div>

      <div className="flex flex-col gap-1 ">
        {MacroProgressFields.map((field) => (
          <div key={field.id} className="flex items-center gap-2">
            <progress
              className="progress"
              value={latestLog?.[field.id] || 0}
              max={field.target}
              aria-labelledby={`${field.id}-label`}
              style={{ color: field.color }}
            ></progress>
            <p className="text-sm">
              {latestLog?.[field.id] || 0}/{field.target}
              {field.id === "calories" ? "" : "g"}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[400px]">
          <BarChart
            isLoadingQuery={isLoadingQuery}
            isErrorQuery={isErrorQuery}
            data={macros || []}
          />
        </div>
      </div>
    </div>
  );
}

export default MacrosDisplay;
