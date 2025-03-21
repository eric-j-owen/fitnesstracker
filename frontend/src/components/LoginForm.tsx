import { useAuth } from "../api/auth/useAuth";
import { loginUserSchema } from "../api/auth/auth.schemas";
import { useAppForm } from "./Form/form-context";

export default function LoginForm() {
  const { login } = useAuth();

  const form = useAppForm({
    defaultValues: {
      email: "",
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
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppField
        name="email"
        children={(field) => <field.FormField label="Email" type="email" />}
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
