import { useState } from "react";
import api, { setAuthToken } from "../api/api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("agent");
  const [password, setPassword] = useState("agent123");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/users/login", { username, password });
      const token = res.data.token;
      setAuthToken(token);
      onLogin(token);
    } catch (e) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl mb-4 text-center">Agent Login</h2>
        <input
          className="w-full p-2 mb-3 rounded text-black"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 mb-3 rounded text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
}
