import { logoutUser } from "../api/client";

export default function Navbar() {
  return (
    <div>
      Navbar
      <button onClick={logoutUser}>logout</button>
    </div>
  );
}
