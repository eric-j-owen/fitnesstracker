import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <h1 className="">Log in</h1>
      <p>
        Don't have an account? Register{" "}
        <Link className="link link-accent" to={"/register"}>
          here
        </Link>
      </p>
      <LoginForm />
    </div>
  );
}
