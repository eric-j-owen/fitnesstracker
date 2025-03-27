import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <p>
        Already a member? Log in{" "}
        <Link className="link link-accent" to={"/login"}>
          here
        </Link>
      </p>
      <RegisterForm />
    </div>
  );
}
