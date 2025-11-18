/**
 * Login Component
 *
 * Provides authentication interface for agents and administrators.
 * Handles user login, token management, and role-based access control.
 * Only allows ROLE_AGENT and ROLE_ADMIN users to access the dashboard.
 */

import { useState } from "react";
import api, { setAuthToken } from "../api/api";

/**
 * Props interface for the Login component
 */
interface LoginProps {
  /**
   * Callback function called when login is successful
   * @param data - Object containing authentication token, user role, and privileges
   */
  onLogin: (data: { token: string; role: string; privileges?: string[] }) => void;
}

/**
 * Login component for agent and admin authentication
 * @param onLogin - Callback function to handle successful login
 * @returns JSX element for the login form
 */
export default function Login({ onLogin }: LoginProps) {
  // State for form inputs and error handling
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /**
   * Handles the login process by authenticating with the backend
   * Validates user role and sets up authentication for the application
   */
  const handleLogin = async () => {
    try {
      // Make authentication request to the backend
      const res = await api.post("/users/login", { username, password });

      // Extract authentication data from response
      const token = res.data.token;
      const role = res.data.role;
      const privileges = Array.isArray(res.data.privileges) ? res.data.privileges : [];

      // Validate user role - only agents and admins can access this dashboard
      if (role === "ROLE_USER") {
        setError("Access denied. Only agents and administrators can login here.");
        return;
      }

      // Set authentication token for all subsequent API requests
      setAuthToken(token);

      // Notify parent component of successful login with auth data
      onLogin({ token, role, privileges });
    } catch (e: any) {
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
