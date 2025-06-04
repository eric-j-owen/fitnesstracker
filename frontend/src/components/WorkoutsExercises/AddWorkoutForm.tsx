import { useWorkouts } from "../../api/workouts/useWorkouts";
import { workoutFormSchema } from "../../api/api.schemas";
import { useAppForm } from "../Form/form-context";

interface AddWorkoutFormProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function AddWorkoutForm({ modalRef }: AddWorkoutFormProps) {
  const { createWorkout } = useWorkouts();

  const form = useAppForm({
    defaultValues: {
      workoutName: "",
      days: [] as string[],
    },

    validators: {
      onChange: workoutFormSchema,
    },

    onSubmit: async ({ value }) => {
      await createWorkout({
        workoutName: value.workoutName,
        days: value.days,
      });
      modalRef.current?.close();
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
        name="workoutName"
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

export default AddWorkoutForm;
