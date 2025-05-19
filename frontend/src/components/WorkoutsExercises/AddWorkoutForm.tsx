import { useWorkouts } from "../../api/workouts/useWorkouts";
import { Exercise, workoutFormSchema } from "../../api/schemas";
import { useAppForm } from "../Form/form-context";

interface AddWorkoutFormProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
}
function AddWorkoutForm({ modalRef }: AddWorkoutFormProps) {
  const { createWorkout } = useWorkouts();

  const form = useAppForm({
    defaultValues: {
      workoutName: "",
      days: "",
      exercises: [] as Exercise[],
    },

    validators: {
      onChange: workoutFormSchema,
    },
  });
  return <form></form>;
}

export default AddWorkoutForm;

/*

import React, { useState } from 'react';
import { createFormHook } from '@tanstack/react-form';

const { useAppForm } = createFormHook();

const DynamicForm = () => {
  const [fields, setFields] = useState([{ id: Date.now(), value: '' }]);
  const form = useAppForm({
    defaultValues: {
      dynamicFields: fields,
    },
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const addField = () => {
    setFields([...fields, { id: Date.now(), value: '' }]);
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  return (
    <form onSubmit={form.handleSubmit}>
      {fields.map((field) => (
        <div key={field.id}>
          <input
            type="text"
            value={field.value}
            onChange={(e) => {
              const newFields = fields.map(f => 
                f.id === field.id ? { ...f, value: e.target.value } : f
              );
              setFields(newFields);
            }}
          />
          <button type="button" onClick={() => removeField(field.id)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addField}>Add Field</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm; 

*/
