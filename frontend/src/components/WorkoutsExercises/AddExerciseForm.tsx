import { useForm } from "@tanstack/react-form";
import { useExercises } from "../../api/exercises/useExercises";
import { exerciseFormSchema } from "../../api/schemas";

interface AddExerciseFormProps {
  onComplete: () => void;
}
function AddExerciseForm({ onComplete }: AddExerciseFormProps) {
  const { createExercise } = useExercises();

  const form = useForm({
    defaultValues: {
      exerciseName: "",
      exerciseType: "strength",
    },

    validators: {
      onChange: exerciseFormSchema,
    },

    onSubmit: async ({ value }) => {
      await createExercise(value);
      onComplete();
    },
  });
  return (
    <>
      <th>
        <form.Field
          name="exerciseName"
          children={(field) => (
            <input
              type="text"
              className="input input-sm input-bordered w-full"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Exercise name"
              autoFocus
            />
          )}
        />
      </th>

      <th>
        <form.Field
          name="exerciseType"
          children={(field) => (
            <>
              <select
                className="select select-sm  w-full text-sm"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
              </select>
            </>
          )}
        />
      </th>

      <th>
        <button
          type="button"
          className="btn btn-ghost btn-sm text-success"
          onClick={() => form.handleSubmit()}
        >
          +
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm text-error"
          onClick={onComplete}
        >
          x
        </button>
      </th>
    </>
  );
}

export default AddExerciseForm;
