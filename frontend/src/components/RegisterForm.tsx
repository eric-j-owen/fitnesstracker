import { registerUserSchema } from "../api/auth/auth.schemas";
import { useAuth } from "../api/auth/useAuth";
import { useAppForm } from "./Form/form-context";

export default function RegisterForm() {
  const { register } = useAuth();

  const form = useAppForm({
    defaultValues: {
      firstName: "",
      email: "",
      passwordRaw: "",
      confirmPassword: "",
    },

    validators: {
      onSubmit: registerUserSchema,
      onChange: registerUserSchema,
    },

    onSubmit: async ({ value }) => {
      await register(value);
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
      <h1>Register</h1>

      <form.AppField
        name="firstName"
        children={(field) => <field.FormField label="First Name" type="text" />}
      />

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

      <form.AppField
        name="confirmPassword"
        children={(field) => (
          <field.FormField label="Confirm Password" type="password" />
        )}
      />

      <form.AppForm>
        <form.SubscribeButton label="Log in" />
      </form.AppForm>
    </form>
  );
}
