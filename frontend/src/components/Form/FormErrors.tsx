import type { AnyFieldApi } from "@tanstack/react-form";

export default function FormErrors({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <div>
          {field.state.meta.errors.map((err, i) => (
            <>
              <em key={i}>{err?.message}</em>
              <br />
            </>
          ))}
        </div>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
