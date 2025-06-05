import { useForm } from "@tanstack/react-form";
import { useExercises } from "../../api/exercises/useExercises";
import { exerciseFormSchema } from "../../api/api.schemas";
import { ExerciseType } from "../../api/api.types";

interface AddExerciseFormProps {
  onComplete: () => void;
  exercise?: ExerciseType;
}

function ExerciseForm({ onComplete, exercise }: AddExerciseFormProps) {
  const { createExercise, updateExercise } = useExercises();

  const form = useForm({
    defaultValues: {
      name: exercise?.name || "",
      tag: exercise?.tag || "",
    },

    validators: {
      onChange: exerciseFormSchema,
    },

    onSubmit: async ({ value }) => {
      if (exercise) {
        await updateExercise({ id: exercise.id, body: value });
      } else {
        await createExercise(value);
      }
      onComplete();
    },
  });
  return (
    <>
      <th>
        <form.Field
          name="name"
          children={(field) => (
            // input for exercise name
            <input
              type="text"
              className="input"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Name"
              autoFocus
              // ensures enter key will submit form
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  form.handleSubmit();
                }
              }}
            />
          )}
        />
      </th>

      <th>
        <form.Field
          name="tag"
          children={(field) => (
            <>
              <input
                type="text"
                className="input"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Tag"
                // ensures enter key will submit form
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    form.handleSubmit();
                  }
                }}
              />
            </>
          )}
        />
      </th>

      <th>
        {/* action buttons */}
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

export default ExerciseForm;
