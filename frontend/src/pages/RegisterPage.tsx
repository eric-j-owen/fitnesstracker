import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import FormLayout from "../components/Form/FormLayout";

export default function Register() {
  const subtitle = (
    <>
      Already a member? Log in{" "}
      <Link className="link link-accent" to={"/login"}>
        here
      </Link>
    </>
  );
  return (
    <FormLayout title="Register" subtitle={subtitle}>
      <RegisterForm />
    </FormLayout>
  );
}
