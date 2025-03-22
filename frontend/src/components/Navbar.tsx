import { Link } from "react-router-dom";
import { useAuth } from "../api/auth/useAuth";
import Logout from "./Logout";

export default function Navbar() {
  const { isAuthenticated, isError } = useAuth();

  return (
    <nav>
      Navbar
      <Link to={"/"}>Home</Link>
      {!isAuthenticated || isError ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
          <Logout />
        </>
      )}
    </nav>
  );
}
