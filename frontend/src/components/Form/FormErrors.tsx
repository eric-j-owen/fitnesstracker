import type { AnyFieldApi } from "@tanstack/react-form";

export default function FormErrors({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <>
          {field.state.meta.errors.map((err, i) => (
            <div key={i}>
              <em className="text-error validator-hint">{err?.message}</em>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
}
