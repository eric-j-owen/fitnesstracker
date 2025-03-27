import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import FormLayout from "../components/Form/FormLayout";

export default function LoginPage() {
  const subtitle = (
    <>
      Don't have an account? Register{" "}
      <Link className="link link-accent" to={"/register"}>
        here
      </Link>
    </>
  );

  return (
    <FormLayout title="Log in" subtitle={subtitle}>
      <LoginForm />
    </FormLayout>
  );
}
