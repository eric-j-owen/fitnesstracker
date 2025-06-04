import { useRef, useState } from "react";
import { useWorkouts } from "../../api/workouts/useWorkouts";
import WorkoutForm from "./WorkoutForm";
import { CiEdit } from "react-icons/ci";
import Modal from "../Modal";
import { WorkoutType } from "../../api/api.types";

function WorkoutsTab() {
  const [editingWorkout, setEditingWorkout] = useState<WorkoutType | undefined>(
    undefined
  );
  const { workouts, deleteWorkout } = useWorkouts();

  const workoutModelRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="h-100 overflow-x-auto">
      <div className="flex justify-end">
        <Modal
          modalId="workout-modal"
          title={editingWorkout ? "Edit Workout" : "+ Create Workout"}
          modalRef={workoutModelRef}
        >
          <WorkoutForm modalRef={workoutModelRef} workout={editingWorkout} />
        </Modal>
      </div>
      <table className="table table-pin-rows table-pin-cols table-fixed ">
        <tbody>
          {workouts && workouts.length ? (
            workouts.map((workout) => {
              return (
                <tr
                  key={workout.id}
                  className="hover:bg-base-200 cursor-pointer"
                >
                  <td>{workout.name}</td>

                  <td className="flex gap-2">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        setEditingWorkout(workout);
                        workoutModelRef.current?.showModal();
                      }}
                    >
                      <CiEdit />
                    </button>

                    <button
                      className="btn btn-ghost btn-sm text-error"
                      onClick={() => deleteWorkout(workout.id)}
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
