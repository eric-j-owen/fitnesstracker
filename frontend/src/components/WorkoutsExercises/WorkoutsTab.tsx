import { useRef } from "react";
import { useWorkouts } from "../../api/workouts/useWorkouts";
import AddWorkoutForm from "./AddWorkoutForm";
import { CiEdit } from "react-icons/ci";
import Modal from "../Modal";

function WorkoutsTab() {
  const { workouts } = useWorkouts();
  const workoutModelRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="h-100 overflow-x-auto">
      <div className="flex justify-end">
        <Modal
          modalId="add-workout-modal"
          title="+ Create Workout"
          modalRef={workoutModelRef}
        >
          <AddWorkoutForm modalRef={workoutModelRef} />
        </Modal>
      </div>
      <table className="table table-pin-rows table-pin-cols table-fixed ">
        {workouts && (
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
        )}

        <tbody>
          {workouts && workouts.length ? (
            workouts.map((workout) => {
              return (
                <tr
                  key={workout.workoutId}
                  className="hover:bg-base-200 cursor-pointer"
                >
                  <td>{workout.workoutName}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => console.log("edit workout")}
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="btn btn-ghost btn-sm text-error"
                      onClick={() => console.log("delete workout")}
                    >
                      x
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="text-center">
              <td colSpan={2}>No workouts created yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WorkoutsTab;
