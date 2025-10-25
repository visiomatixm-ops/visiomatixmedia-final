import { useState } from "react";
import Login from "./pages/Login";
import AgentDashboard from "./pages/AgentDashboard";

export default function App() {
  const [auth, setAuth] = useState(null);

  const handleLogin = (authData) => {
    setAuth(authData);
  };

  return auth ? (
    <AgentDashboard token={auth.token} userRole={auth.role} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}
