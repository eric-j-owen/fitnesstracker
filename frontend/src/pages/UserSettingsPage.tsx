import FormLayout from "../components/Form/FormLayout";
import { UserSettingsForm } from "../components/UserSettingsForm";

export const UserSettingsPage = () => {
  return (
    <FormLayout title="Update Profile">
      <UserSettingsForm />
    </FormLayout>
  );
};
