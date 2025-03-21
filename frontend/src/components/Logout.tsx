import { useNavigate } from "react-router-dom";
import { useAuth } from "../api/useAuth";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return <button onClick={handleLogout}>logout</button>;
}
