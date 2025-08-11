import { useRef, useState } from "react";
import type { FoodLogResponse } from "../../api/api.types";
import Modal from "../Modal";
import LogFoodForm from "./LogFoodForm";
import { useDeleteLogs } from "../../api/foodLog/useFoodLog";

interface FoodLogEntryProps {
  entry: FoodLogResponse;
}

export default function FoodLogEntry({ entry }: FoodLogEntryProps) {
  const editModalRef = useRef<HTMLDialogElement>(null);
  const { deleteLog } = useDeleteLogs();

  //new key each onClick, forces form to reset to defautl values
  const [formKey, setFormKey] = useState(0);

  return (
    <li className="list-row ">
      <Modal modalRef={editModalRef} modalId="editFoodEntry">
        <LogFoodForm
          key={formKey}
          modalRef={editModalRef}
          foodItem={entry.foodItem}
          loggedFood={entry}
          title="Edit entry"
        />
        <button className="btn" onClick={() => deleteLog(entry.id)}>
          &#x1F5D1; Delete
        </button>
      </Modal>

      <div
        className="hover:bg-base-300 cursor-pointer p-5"
        onClick={() => {
          setFormKey((prev) => prev + 1);
          editModalRef.current?.showModal();
        }}
      >
        <div className="flex justify-between flex-col">
          <div>
            <div className="flex gap-2">
              {/* <span>{entry.foodItem.foodCategory}</span> */}
              <span>{entry.foodItem.brandName}</span>
              <span>{entry.foodItem.description} </span>
            </div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {entry.amount} {entry.unit}
            </div>
          </div>
          <div className="flex justify-start gap-5 text-xs uppercase font-semibold opacity-60">
            <span>CAL: {entry.calculatedCalories}</span>
            <span>P: {entry.calculatedProtein}</span>
            <span>C: {entry.calculatedCarbs}</span>
            <span>F: {entry.calculatedFat}</span>
          </div>
        </div>
      </div>
    </li>
  );
}
