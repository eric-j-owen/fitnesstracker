import { useFieldContext } from "./form-context";
import FormErrors from "./FormErrors";
import { CiUser } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { IoBagCheckOutline } from "react-icons/io5";

export function FormField({
  label,
  type,
  showLabel = false,
}: {
  label: string;
  type: string;
  showLabel?: boolean;
}) {
  const field = useFieldContext<string>();

  const icon = {
    passwordRaw: <IoBagOutline />,
    confirmPassword: <IoBagCheckOutline />,
    username: <CiUser />,
    firstName: <GoPencil />,
  }[field.name];

  let validateClass = "";
  if (field.state.meta.isTouched && !field.state.meta.errors.length)
    validateClass = "input-success";
  else if (field.state.meta.isTouched && field.state.meta.errors.length)
    validateClass = "input-error";

  return (
    <div className="form-control w-full mb-4">
      {showLabel && (
        <label
          htmlFor={field.name}
          className="label block text-sm font-medium mb-1"
        >
          <span className="label-text">{label}</span>
        </label>
      )}
      <div className="w-full">
        <label
          className={`input ${validateClass} input-bordered w-full flex items-center gap-2`}
          htmlFor={field.name}
        >
          {!showLabel && icon}
          <input
            aria-label={label}
            placeholder={label}
            id={field.name}
            type={type}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        </label>
      </div>
      <FormErrors field={field} />
    </div>
  );
}
