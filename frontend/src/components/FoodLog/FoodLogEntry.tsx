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
    <li className="hover:bg-base-200">
      <div>
        <div>
          <h3>{entry.foodItem.description}</h3>
          <div>
            <span>
              {entry.amount} {entry.unit}
            </span>
          </div>
          <div>
            <span>CAL: {entry.calculatedCalories}</span>
            <span>P: {entry.calculatedProtein}</span>
            <span>C: {entry.calculatedCarbs}</span>
            <span>F: {entry.calculatedFat}</span>
          </div>
        </div>
        <div>
          <button
            className="btn"
            onClick={() => {
              setFormKey((prev) => prev + 1);
              editModalRef.current?.showModal();
            }}
          >
            edit
          </button>
          <button className="btn" onClick={() => deleteLog(entry.id)}>
            delete
          </button>
        </div>
      </div>

      <Modal modalRef={editModalRef} modalId="editFoodEntry">
        <LogFoodForm
          key={formKey}
          modalRef={editModalRef}
          foodItem={entry.foodItem}
          loggedFood={entry}
          title="Edit entry"
        />
      </Modal>
    </li>
  );
}
