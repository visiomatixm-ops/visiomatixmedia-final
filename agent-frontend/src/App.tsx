/**
 * Main Application Component
 *
 * This is the root component of the Visiomatix Chat Agent Dashboard application.
 * It manages the overall application state and routing between authentication
 * and the main dashboard based on user login status.
 *
 * The application follows a simple authentication flow:
 * 1. Show login form when user is not authenticated
 * 2. Show integrated admin dashboard when user is authenticated
 * 3. Handle authentication state management and token storage
 */

import { useState } from "react";
import Login from "./pages/Login";
import IntegratedAdminDashboard from "./pages/IntegratedAdminDashboard";

/**
 * Main application component that handles authentication state and routing
 * @returns JSX element representing the entire application
 */
export default function App() {
  // State to store authentication information
  // Contains JWT token, user role, and privileges array when authenticated
  // Null when user is not logged in
  const [auth, setAuth] = useState<{token: string; role: string; privileges: string[]} | null>(null);

  /**
   * Handles successful user login by storing authentication data
   * @param authData - Authentication data returned from login process
   * @param authData.token - JWT token for API authentication
   * @param authData.role - User's role (e.g., "ADMIN", "CUSTOMER_SUCCESS_MANAGER")
   * @param authData.privileges - Array of user privileges for access control
   */
  const handleLogin = (authData: {token: string; role: string; privileges?: string[]}) => {
    setAuth({
      token: authData.token,
      role: authData.role,
      // Ensure privileges is always an array, defaulting to empty array if not provided
      privileges: Array.isArray(authData.privileges) ? authData.privileges : []
    });
  };

  // Conditional rendering based on authentication state
  return auth ? (
    // User is authenticated - show the main dashboard
    <IntegratedAdminDashboard
      token={auth.token}
      userRole={auth.role}
      userPrivileges={auth.privileges}
    />
  ) : (
    // User is not authenticated - show login form
    <Login onLogin={handleLogin} />
  );
}
