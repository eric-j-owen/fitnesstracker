import { useState } from "react";
import { useExercises } from "../../api/exercises/useExercises";
import AddExerciseForm from "./AddExerciseForm";
import { CiEdit } from "react-icons/ci";

function ExercisesTab() {
  const { exercises, deleteExercise } = useExercises();
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);

  const exerciseTags = [
    {
      tag: "strength",
      color: "bg-sky-400 ",
    },
    {
      tag: "cardio",
      color: "bg-green-600 ",
    },
  ];

  const getTagColor = (type: string) => {
    const tag = exerciseTags.find((obj) => obj.tag === type);
    return tag?.color;
  };

  const filteredExercises = currentFilter
    ? exercises?.filter((exercise) => exercise.exerciseType === currentFilter)
    : exercises;

  return (
    <div className="h-100 overflow-x-auto">
      <div className="flex gap-1 items-center mb-1">
        <button
          className={`${currentFilter === null ? "btn-active" : ""} btn btn-sm`}
          onClick={() => setCurrentFilter(null)}
        >
          Reset
        </button>
        {exerciseTags.map((tag) => (
          <button
            key={tag.tag}
            className={`${currentFilter === tag.tag ? "btn-active" : ""} ${
              tag.color
            } btn btn-xs`}
            onClick={() => setCurrentFilter(tag.tag)}
          >
            {tag.tag}
          </button>
        ))}
      </div>
      <table className="table table-pin-rows table-pin-cols table-fixed">
        <thead>
          <tr>
            {isAddingExercise ? (
              <AddExerciseForm onComplete={() => setIsAddingExercise(false)} />
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
              return (
                <tr key={exercise.id} className="hover:bg-base-200">
                  <td>{exercise.exerciseName}</td>
                  <td>
                    <button
                      className={`px-2 py-1 rounded-full w-fit text-xs ${getTagColor(
                        exercise.exerciseType
                      )}`}
                    >
                      {exercise.exerciseType}
                    </button>
                  </td>
                  <td className="flex gap-2">
                    <button className="btn btn-ghost btn-sm">
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
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ExercisesTab;
