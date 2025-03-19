import { logoutUser } from "./api/usersApi";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <main>
      <RegisterPage />
      <LoginPage />
      <button onClick={logoutUser}>logout</button>
    </main>
  );
}

export default App;
