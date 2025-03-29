import { metricsFormSchema } from "../../api/schemas";
import { useAppForm } from "../Form/form-context";
import { useMetrics } from "../../api/metrics/useMetrics";

interface MetricsFormProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

export default function MetricsForm({ modalRef }: MetricsFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const { logMetrics } = useMetrics();

  const form = useAppForm({
    defaultValues: {
      date: today,
      type: "Weight",
      val: 0,
    },

    validators: {
      onChange: metricsFormSchema,
    },

    onSubmit: async ({ value }) => {
      const formattedValue = {
        ...value,
        val: Number(value.val),
      };
      await logMetrics(formattedValue);
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
        name="date"
        children={(field) => (
          <field.FormField label="Date" type="date" showLabel={true} />
        )}
      />

      <form.AppField
        name="type"
        children={(field) => (
          <field.FormField label="Type" type="text" showLabel={true} />
        )}
      />

      <form.AppField
        name="val"
        children={(field) => (
          <field.FormField label="Value" type="number" showLabel={true} />
        )}
      />

      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  );
}
