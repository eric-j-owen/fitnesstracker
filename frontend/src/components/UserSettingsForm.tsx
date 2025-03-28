import { useAuth } from "../api/auth/useAuth";
import { UnauthorizedError } from "../api/errors";
import { authenticatedUserSchema } from "../api/schemas";
import { useUserApi } from "../api/user/useUserApi";
import { useAppForm } from "./Form/form-context";

export const UserSettingsForm = () => {
  const { user } = useAuth();
  const { update } = useUserApi();

  if (!user) {
    throw new UnauthorizedError();
  }

  const form = useAppForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName || "",
      username: user.username,
      targetProtein: user.targetProtein || 0,
      targetCarbs: user.targetCarbs || 0,
      targetFats: user.targetFats || 0,
    },

    validators: {
      onChange: authenticatedUserSchema,
    },

    onSubmit: async ({ value }) => {
      const formattedData = {
        ...value,
        targetProtein: Number(value.targetProtein),
        targetCarbs: Number(value.targetCarbs),
        targetFats: Number(value.targetFats),
      };
      await update.mutateAsync(formattedData);
    },
  });

  interface formDataType {
    name:
      | "firstName"
      | "lastName"
      | "username"
      | "targetProtein"
      | "targetCarbs"
      | "targetFats";
    label: string;
    type: string;
    showLabel: boolean;
  }

  const renderFormData: formDataType[] = [
    { name: "firstName", label: "First name", type: "text", showLabel: true },
    { name: "lastName", label: "Last name", type: "text", showLabel: true },
    { name: "username", label: "Username", type: "username", showLabel: true },
    {
      name: "targetProtein",
      label: "Target Protein (g)",
      type: "number",
      showLabel: true,
    },
    {
      name: "targetCarbs",
      label: "Target Carbs (g)",
      type: "number",
      showLabel: true,
    },
    {
      name: "targetFats",
      label: "Target Fats (g)",
      type: "number",
      showLabel: true,
    },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {renderFormData.map((data) => {
        return (
          <form.AppField
            key={data.name}
            name={data.name}
            children={(field) => (
              <field.FormField
                label={data.label}
                type={data.type}
                showLabel={data.showLabel}
              />
            )}
          />
        );
      })}

      <form.AppForm>
        <form.SubscribeButton label="Update" />
      </form.AppForm>
    </form>
  );
};
