import { useAuth } from "../api/auth/useAuth";
import { loginUserSchema } from "../api/schemas";
import { useAppForm } from "./Form/form-context";

export default function LoginForm() {
  const { login } = useAuth();

  const form = useAppForm({
    defaultValues: {
      username: "",
      passwordRaw: "",
    },

    validators: {
      onChange: loginUserSchema,
    },

    onSubmit: async ({ value }) => {
      await login(value);
      form.reset();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField
        name="username"
        children={(field) => (
          <field.FormField label="username" type="username" />
        )}
      />

      <form.AppField
        name="passwordRaw"
        children={(field) => (
          <field.FormField label="Password" type="password" />
        )}
      />

      <form.AppForm>
        <form.SubscribeButton label="Log in" />
      </form.AppForm>
    </form>
  );
}
