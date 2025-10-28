import { useState } from "react";
import Login from "./pages/Login";
import AgentDashboard from "./pages/AgentDashboard";

export default function App() {
  const [auth, setAuth] = useState<{token: string; role: string} | null>(null);

  const handleLogin = (authData: {token: string; role: string}) => {
    setAuth(authData);
  };

  return auth ? (
    <AgentDashboard token={auth.token} userRole={auth.role} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}
