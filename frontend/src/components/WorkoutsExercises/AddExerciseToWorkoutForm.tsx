// filepath: frontend/src/components/WorkoutsExercises/AddExerciseToWorkoutForm.tsx
import { useExercises } from "../../api/exercises/useExercises";
import { useWorkouts } from "../../api/workouts/useWorkouts";
import { addExerciseToWorkoutSchema } from "../../api/api.schemas";
import { WorkoutType } from "../../api/api.types";
import { useAppForm } from "../Form/form-context";

interface AddExerciseToWorkoutFormProps {
  workout: WorkoutType;
  onComplete: () => void;
}

function AddExerciseToWorkoutForm({
  workout,
  onComplete,
}: AddExerciseToWorkoutFormProps) {
  const { exercises } = useExercises();
  const { addExerciseToWorkout } = useWorkouts();

  const form = useAppForm({
    defaultValues: {
      exerciseId: 0,
      sets: 0,
      reps: 0,
      weight: 0,
      duration: 0,
      distance: 0,
    },
    // validators: {
    //   onChange: addExerciseToWorkoutSchema,
    // },
    onSubmit: async ({ value }) => {
      const submissionData = {
        ...value,
        exerciseId: Number(value.exerciseId),
      };

      await addExerciseToWorkout({
        workoutId: workout.id,
        body: submissionData,
      });

      onComplete();
      form.reset();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <h3 className="text-lg font-semibold mb-4">
        Add Exercise to {workout.name}
      </h3>

      <form.AppField
        name="exerciseId"
        children={(field) => (
          <div className="form-control">
            <label htmlFor={field.name} className="label">
              <span className="label-text">Exercise</span>
            </label>
            <select
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              className="select select-bordered"
            >
              <option value={0} disabled>
                Select an exercise
              </option>
              {exercises?.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
          </div>
        )}
      />

      <form.AppField
        name="sets"
        children={(field) => (
          <field.FormField label="sets" type="number" showLabel={true} />
        )}
      />

      <form.AppField
        name="reps"
        children={(field) => (
          <field.FormField label="reps" type="number" showLabel={true} />
        )}
      />

      <form.AppField
        name="weight"
        children={(field) => (
          <field.FormField label="weight" type="number" showLabel={true} />
        )}
      />

      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  );
}

export default AddExerciseToWorkoutForm;
