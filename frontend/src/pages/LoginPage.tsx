import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <h1>Log in</h1>
      <p>
        Don't have an account? <Link to={"/register"}>Register</Link>
      </p>
      <LoginForm />
    </div>
  );
}
