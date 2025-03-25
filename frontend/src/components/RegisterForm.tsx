import { registerUserSchema } from "../api/schemas";
import { useAuth } from "../api/auth/useAuth";
import { useAppForm } from "./Form/form-context";

export default function RegisterForm() {
  const { register } = useAuth();

  const form = useAppForm({
    defaultValues: {
      firstName: "",
      username: "",
      passwordRaw: "",
      confirmPassword: "",
    },

    validators: {
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
        form.handleSubmit();
      }}
    >
      <form.AppField
        name="firstName"
        children={(field) => <field.FormField label="First Name" type="text" />}
      />

      <form.AppField
        name="username"
        children={(field) => (
          <field.FormField label="Username" type="username" />
        )}
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
        <form.SubscribeButton label="Register" />
      </form.AppForm>
    </form>
  );
}
