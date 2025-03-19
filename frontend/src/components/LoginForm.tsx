import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/usersApi";
import { useForm } from "@tanstack/react-form";
import { loginUserSchema } from "../../schemas/users";
export default function LoginForm() {
  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      alert("Login successful!");
      form.reset();
    },
    onError: (error) => {
      alert(error);
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      passwordRaw: "",
    },
    validators: {
      onSubmit: loginUserSchema,
    },
    onSubmit: async ({ value }) => {
      loginUserMutation.mutateAsync(value);
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
      <h1>Log in</h1>
      <form.Field
        name="email"
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
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <div>
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Log in"}
            </button>
          </div>
        )}
      />
    </form>
  );
}
