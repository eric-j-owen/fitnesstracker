import { useEffect, useRef, useState } from "react";
import { useWorkouts } from "../../api/workouts/useWorkouts";
import WorkoutForm from "./WorkoutForm";
import { CiEdit } from "react-icons/ci";
import Modal from "../Modal";
import { WorkoutType } from "../../api/api.types";

function WorkoutsTab() {
  const [editingWorkout, setEditingWorkout] = useState<WorkoutType | undefined>(
    undefined
  );
  const [viewingWorkout, setViewingWorkout] = useState<WorkoutType | undefined>(
    undefined
  );

  const { workouts: workouts, deleteWorkout } = useWorkouts();

  const workoutFormModelRef = useRef<HTMLDialogElement>(null);
  const workoutDetailsModalRef = useRef<HTMLDialogElement>(null);

  //rerender -> is viewingWorkout set -> is modal ref available -> show modal
  useEffect(() => {
    if (viewingWorkout && workoutDetailsModalRef.current) {
      workoutDetailsModalRef.current.showModal();
    }
  }, [viewingWorkout]);

  return (
    <div className="h-100 overflow-x-auto">
      <div className="m-4">
        <button
          className="w-full btn cursor-pointer"
          onClick={() => workoutFormModelRef.current?.showModal()}
        >
          + Create Workout
        </button>
      </div>
      <table className="table table-pin-rows table-pin-cols table-fixed ">
        <tbody>
          {/* workouts */}

          {workouts && workouts.length ? (
            workouts.map((workout) => {
              return (
                <tr key={workout.id}>
                  <td
                    className="hover:bg-base-200 cursor-pointer"
                    onClick={() => {
                      setViewingWorkout(workout);
                    }}
                  >
                    {workout.name}
                  </td>

                  {/* action buttons */}

                  <td className="flex gap-2">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        setEditingWorkout(workout);
                        workoutFormModelRef.current?.showModal();
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

      {/* modals */}

      {/* workout form modal */}
      <Modal
        modalId="workout-form-modal"
        modalRef={workoutFormModelRef}
        onClose={() => setEditingWorkout(undefined)}
      >
        <WorkoutForm modalRef={workoutFormModelRef} workout={editingWorkout} />
      </Modal>

      {/* workout details modal */}
      {viewingWorkout && (
        <Modal
          modalId="workout-details-modal"
          modalRef={workoutDetailsModalRef}
          onClose={() => setViewingWorkout(undefined)}
        >
          <div>
            <h2 className="font-bold mb-4 text-center">
              {viewingWorkout.name}
            </h2>
            <p className="py-1">
              <strong>Scheduled for:</strong>{" "}
              {viewingWorkout.days.join(", ") ||
                "Not scheduled for any specific days"}
            </p>
            <h4 className="font-semibold mt-4 mb-2">Exercises:</h4>
            <p className="italic text-sm">Exercise details</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default WorkoutsTab;
