import { useState } from "react";
import Login from "./pages/Login";
import AgentDashboard from "./pages/AgentDashboard";

export default function App() {
  const [auth, setAuth] = useState<{token: string; role: string; privileges: string[]} | null>(null);

  const handleLogin = (authData: {token: string; role: string; privileges?: string[]}) => {
    setAuth({
      token: authData.token,
      role: authData.role,
      privileges: authData.privileges || []
    });
  };

  return auth ? (
    <AgentDashboard token={auth.token} userRole={auth.role} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}
