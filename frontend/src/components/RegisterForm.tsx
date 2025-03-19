import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/usersApi";
import { registerUserSchema } from "../../schemas/users";

export default function RegisterForm() {
  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Registration successful!");
      form.reset();
    },
    onError: (error) => {
      alert(error);
    },
  });

  const form = useForm({
    defaultValues: {
      firstName: "",
      email: "",
      passwordRaw: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: registerUserSchema,
    },
    onSubmit: async ({ value }) => {
      registerUserMutation.mutateAsync(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <h1>Register</h1>
      <form.Field
        name="firstName"
        validators={{
          onChange: registerUserSchema.shape.firstName,
        }}
        children={(field) => {
          return (
            <>
              <div>
                <label htmlFor="firstName">First Name: </label>
                <input
                  type="text"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
              {field.state.meta.errors.length ? (
                <>
                  {field.state.meta.errors.map((err) => (
                    <div>
                      <em>{err?.message}</em>
                    </div>
                  ))}
                </>
              ) : null}
            </>
          );
        }}
      />

      <form.Field
        name="email"
        validators={{
          onChange: registerUserSchema.shape.email,
        }}
        children={(field) => {
          return (
            <>
              <div>
                <label htmlFor="email">Email: </label>
                <input
                  type="email"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
              {field.state.meta.errors.length ? (
                <>
                  {field.state.meta.errors.map((err) => (
                    <div>
                      <em>{err?.message}</em>
                    </div>
                  ))}
                </>
              ) : null}
            </>
          );
        }}
      />

      <form.Field
        name="passwordRaw"
        validators={{
          onChange: registerUserSchema.shape.passwordRaw,
        }}
        children={(field) => {
          return (
            <>
              <div>
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
              {field.state.meta.errors.length ? (
                <>
                  {field.state.meta.errors.map((err) => (
                    <div>
                      <em>{err?.message}</em>
                    </div>
                  ))}
                </>
              ) : null}
            </>
          );
        }}
      />
      <form.Field
        name="confirmPassword"
        validators={{
          onChange: ({ value, fieldApi }) => {
            const passwordRaw = fieldApi.form.getFieldValue("passwordRaw");
            if (value !== passwordRaw) return "Passwords do not match";
            return undefined;
          },
        }}
        children={(field) => {
          return (
            <>
              <div>
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input
                  type="password"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
              {field.state.meta.errors.length ? (
                <em>{field.state.meta.errors.join()}</em>
              ) : null}
            </>
          );
        }}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <div>
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Register"}
            </button>
          </div>
        )}
      />
    </form>
  );
}
