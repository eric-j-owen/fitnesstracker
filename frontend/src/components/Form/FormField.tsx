import { useFieldContext } from "./form-context";
import FormErrors from "./FormErrors";

export function FormField({ label, type }: { label: string; type: string }) {
  const field = useFieldContext<string>();
  return (
    <>
      <div>
        <label htmlFor={field.name}>{label}: </label>
        <input
          type={type}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
        />
        <FormErrors field={field} />
      </div>
    </>
  );
}
