import { useState } from "react";
import Login from "./pages/Login";
import AgentDashboard from "./pages/AgentDashboard";

export default function App() {
  const [token, setToken] = useState(null);
  return token ? (
    <AgentDashboard token={token} />
  ) : (
    <Login onLogin={setToken} />
  );
}
