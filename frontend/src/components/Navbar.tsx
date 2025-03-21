import { Link } from "react-router-dom";
import { useAuth } from "../api/auth/useAuth";
import Logout from "./Logout";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  return (
    <nav>
      Navbar
      <Link to={"/"}>Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Logout />
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
