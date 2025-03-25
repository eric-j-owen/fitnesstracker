import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthRedirect } from "./components/AuthRedirect";
import { UserSettingsPage } from "./pages/UserSettingsPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<UserSettingsPage />} />
        </Route>
        <Route element={<AuthRedirect />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
