import { useWorkouts } from "../../api/workouts/useWorkouts";
import { workoutFormSchema } from "../../api/api.schemas";
import { useAppForm } from "../Form/form-context";
import { WorkoutType } from "../../api/api.types";
import { DAYS } from "../../consts";
import AddExerciseToWorkoutForm from "./AddExerciseToWorkoutForm";

interface WorkoutFormProps {
  modalRef?: React.RefObject<HTMLDialogElement | null>;
  workout?: WorkoutType;
}

function WorkoutForm({ modalRef, workout }: WorkoutFormProps) {
  const { createWorkout, updateWorkout } = useWorkouts();

  const form = useAppForm({
    defaultValues: {
      name: workout?.name || "",
      days: workout?.days || [],
    },

    validators: {
      onChange: workoutFormSchema,
    },

    onSubmit: async ({ value }) => {
      if (workout) {
        await updateWorkout({ id: workout.id, body: value });
      } else {
        await createWorkout(value);
      }

      modalRef.current?.close();
      form.reset();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField
        name="name"
        children={(field) => (
          <field.FormField label="Workout Name" type="text" />
        )}
      />

      <form.AppField
        name="days"
        children={(field) => (
          <div>
            <label>Days</label>
            <div>
              {DAYS.map((day) => (
                <label key={day} className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={field.state.value.includes(day)}
                    onChange={(e) => {
                      const currentDays = field.state.value;
                      if (e.target.checked) {
                        field.handleChange([...currentDays, day]);
                      } else {
                        field.handleChange(
                          currentDays.filter((d) => d !== day)
                        );
                      }
                    }}
                  />
                  <span className="text-sm">{day}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      />

      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  );
}

export default WorkoutForm;
