import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../api/useAuth";

export function AuthRedirect() {
  const { isAuthenticated, isLoading, isError } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error has occurred</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
