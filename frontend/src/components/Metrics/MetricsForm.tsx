import { metricsFormSchema } from "../../api/api.schemas";
import { useAppForm } from "../Form/form-context";
import { useMetrics } from "../../api/metrics/useMetrics";

interface MetricsFormProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

export default function MetricsForm({ modalRef }: MetricsFormProps) {
  const today = new Date().toLocaleDateString("en-CA");
  const { logMetrics } = useMetrics();

  const form = useAppForm({
    defaultValues: {
      date: today,
      type: "weight",
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
          <div className="form-control w-full">
            <label className="label" htmlFor="type-select">
              <span className="label-text">Type</span>
            </label>

            <select
              className="select select-bordered w-full"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              id="type-select"
            >
              <option value="weight">Weight</option>
            </select>
          </div>
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
