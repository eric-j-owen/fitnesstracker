import { useState } from "react";
import { useExercises } from "../../api/exercises/useExercises";
import ExerciseForm from "./ExerciseForm";
import { CiEdit } from "react-icons/ci";
import { ExerciseType } from "../../api/api.types";

function ExercisesTab() {
  const { exercises, deleteExercise } = useExercises();
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [editingExercise, setEditingExercise] = useState<
    ExerciseType | undefined
  >(undefined);
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);

  //filters exercises based on a tag
  const filteredExercises = currentFilter
    ? exercises?.filter((exercise) => exercise.tag === currentFilter)
    : exercises;

  return (
    <div className="h-100 overflow-x-auto">
      <div className="flex gap-1 items-center mb-1">
        <button className={`btn`} onClick={() => setCurrentFilter(null)}>
          Reset
        </button>

        {/* creates buttons for each unique tag */}
        {exercises &&
          exercises

            // finds unique tags
            .reduce((tags: string[], exercise) => {
              if (!tags.includes(exercise.tag)) {
                tags.push(exercise.tag);
              }
              return tags;
            }, [])

            // returns a button for each
            .map((tag) => (
              <button
                key={tag}
                className={`${
                  currentFilter === tag ? "bg-teal-500" : ""
                } btn btn-xs border-teal-500`}
                onClick={() => setCurrentFilter(tag)}
              >
                {tag}
              </button>
            ))}
      </div>

      <table className="table table-pin-rows table-pin-cols table-fixed">
        <thead>
          {/* add exercise table button */}
          <tr>
            {isAddingExercise ? (
              <ExerciseForm onComplete={() => setIsAddingExercise(false)} />
            ) : (
              <th
                colSpan={3}
                className="hover:text-white hover:bg-base-200 text-center cursor-pointer"
                onClick={() => setIsAddingExercise(true)}
              >
                + Add Exercise
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-base-200">
          {filteredExercises && filteredExercises.length ? (
            filteredExercises.map((exercise) => {
              if (editingExercise && editingExercise.id === exercise.id) {
                return (
                  <tr key={exercise.id}>
                    <ExerciseForm
                      exercise={editingExercise}
                      onComplete={() => setEditingExercise(undefined)}
                    />
                  </tr>
                );
              }
              return (
                <tr key={exercise.id} className="hover:bg-base-200">
                  <td>{exercise.name}</td>

                  {/* display exercise tag */}
                  <td>
                    <button
                      className={`btn btn-xs border-teal-500`}
                      onClick={() => setCurrentFilter(exercise.tag)}
                    >
                      {exercise.tag}
                    </button>
                  </td>

                  {/* action buttons */}
                  <td className="flex gap-2">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => setEditingExercise(exercise)}
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="btn btn-ghost btn-sm text-error"
                      onClick={() => deleteExercise(exercise.id)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={3} className="text-center text-gray-400 italic">
                {" "}
                No exercises added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExercisesTab;
