import { useAuth } from "../api/auth/useAuth";
import { UnauthorizedError } from "../api/errors";
import { authenticatedUserSchema } from "../api/schemas";
import { useUserApi } from "../api/user/useUserApi";
import { useAppForm } from "./Form/form-context";

export const UserSettingsForm = () => {
  const { user } = useAuth();
  const { update } = useUserApi();

  if (!user) {
    console.log("hello");
    throw new UnauthorizedError();
  }
  const form = useAppForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName || "",
      username: user.username,
    },

    validators: {
      onChange: authenticatedUserSchema,
    },

    onSubmit: async ({ value }) => {
      const updateData = { id: user.id, ...value };
      await update.mutateAsync(updateData);
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
        children={(field) => (
          <field.FormField label="First name" type="text" showLabel={true} />
        )}
      />

      <form.AppField
        name="lastName"
        children={(field) => (
          <field.FormField label="Last name" type="text" showLabel={true} />
        )}
      />

      <form.AppField
        name="username"
        children={(field) => (
          <field.FormField label="username" type="username" showLabel={true} />
        )}
      />

      <form.AppForm>
        <form.SubscribeButton label="Update" />
      </form.AppForm>
    </form>
  );
};
