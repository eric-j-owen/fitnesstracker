import type { AnyFieldApi } from "@tanstack/react-form";

export default function FormErrors({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <div>
          {field.state.meta.errors.map((err) => (
            <em>{err?.message}</em>
          ))}
        </div>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
