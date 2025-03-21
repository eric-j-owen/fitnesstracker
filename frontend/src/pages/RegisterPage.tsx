import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <p>
        Already have an account? <Link to={"/login"}>Log in</Link>
      </p>
      <RegisterForm />
    </div>
  );
}
