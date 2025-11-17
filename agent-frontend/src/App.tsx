import { useState } from "react";
import Login from "./pages/Login";
import IntegratedAdminDashboard from "./pages/IntegratedAdminDashboard";

export default function App() {
  const [auth, setAuth] = useState<{token: string; role: string; privileges: string[]} | null>(null);

  const handleLogin = (authData: {token: string; role: string; privileges?: string[]}) => {
    setAuth({
      token: authData.token,
      role: authData.role,
      privileges: Array.isArray(authData.privileges) ? authData.privileges : []
    });
  };

  return auth ? (
    <IntegratedAdminDashboard
      token={auth.token}
      userRole={auth.role}
      userPrivileges={auth.privileges}
    />
  ) : (
    <Login onLogin={handleLogin} />
  );
}
