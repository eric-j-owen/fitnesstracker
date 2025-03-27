import { useMacros } from "../api/macros/useMacros";
import { macrosSchema } from "../api/schemas";
import { useAppForm } from "./Form/form-context";

interface MacroFormProps {
  modalRef: React.RefObject<HTMLDialogElement>;
}

export default function MacroForm({ modalRef }: MacroFormProps) {
  const { logMacros } = useMacros();

  const form = useAppForm({
    defaultValues: {
      calories: "",
      protein: "",
      carbs: "",
      fats: "",
    },

    validators: {
      onChange: macrosSchema,
    },

    onSubmit: async ({ value }) => {
      await logMacros(value);
      modalRef.current?.close();
    },
  });

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField
        name="calories"
        children={(field) => (
          <field.FormField label="Calories" type="number" showLabel={true} />
        )}
      />

      <form.AppField
        name="protein"
        children={(field) => (
          <field.FormField label="Protein" type="number" showLabel={true} />
        )}
      />
      <form.AppField
        name="carbs"
        children={(field) => (
          <field.FormField label="Carbs" type="number" showLabel={true} />
        )}
      />
      <form.AppField
        name="fats"
        children={(field) => (
          <field.FormField label="Fats" type="number" showLabel={true} />
        )}
      />

      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  );
}
