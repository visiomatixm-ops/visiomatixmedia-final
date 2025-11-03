import { useState } from "react";
import api, { setAuthToken } from "../api/api";

interface LoginProps {
  onLogin: (data: { token: string; role: string }) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    console.log("handleLogin called with username:", username);
    try {
      console.log("Making API call to /users/login");
      const res = await api.post("/users/login", { username, password });
      console.log("API response received:", res.data);
      const token = res.data.token;
      const role = res.data.role;

      // Check if user has ROLE_AGENT or ROLE_ADMIN (not ROLE_USER)
      if (role === "ROLE_USER") {
        console.log("Access denied for role:", role);
        setError("Access denied. Only agents and administrators can login here.");
        return;
      }

      console.log("Setting auth token and calling onLogin with token and role");
      setAuthToken(token);
      onLogin({ token, role });
    } catch (e) {
      console.error("Login error:", e);
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 text-center">Agent Login</h2>
        <input
          className="w-full p-2 mb-3 rounded text-black text-sm sm:text-base"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 mb-3 rounded text-black text-sm sm:text-base"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded text-sm sm:text-base"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-3 text-xs sm:text-sm">{error}</p>}
      </div>
    </div>
  );
}
