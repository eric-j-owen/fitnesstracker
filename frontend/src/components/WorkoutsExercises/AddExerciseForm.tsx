import { useForm } from "@tanstack/react-form";
import { useExercises } from "../../api/exercises/useExercises";
import { exerciseCreateSchema } from "../../api/api.schemas";

interface AddExerciseFormProps {
  onComplete: () => void;
}

function AddExerciseForm({ onComplete }: AddExerciseFormProps) {
  const { createExercise } = useExercises();

  const form = useForm({
    defaultValues: {
      name: "",
      tag: "",
    },

    validators: {
      onChange: exerciseCreateSchema,
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
          name="name"
          children={(field) => (
            <input
              type="text"
              className="input"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Name"
              autoFocus
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
