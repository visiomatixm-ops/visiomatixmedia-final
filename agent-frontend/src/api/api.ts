/**
 * API Configuration and Functions
 *
 * This file contains the centralized API configuration and all API function calls
 * for the Visiomatix Chat application. It provides a clean interface for making
 * HTTP requests to the backend services.
 */

// Import axios for making HTTP requests
import axios from "axios";

// Create axios instance with base configuration
// The base URL is set via environment variable VITE_API_BASE_URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});


/**
 * Sets the authorization token for all API requests
 * @param token - JWT token string, or null to remove authorization
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    // Set Authorization header with Bearer token for authenticated requests
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Remove Authorization header for unauthenticated requests
    delete api.defaults.headers.common["Authorization"];
  }
};

// User API functions - handles user-related operations
export const userAPI = {
  /**
   * Changes the password for the currently authenticated user
   * @param passwordData - Object containing the new password
   * @returns Promise with the API response
   */
  changePassword: (passwordData: any) => api.post("/users/change-password", passwordData),
};

// Role Management API functions - handles automated role creation with predefined access
export const roleAPI = {
  /**
   * Creates a new role with automatic assignment of all available permissions and privileges
   * @param roleName - The name of the role to create
   * @returns Promise with the created role information
   */
  createRoleWithFullAccess: (roleName: string) => api.post("/roles/create-with-full-access", null, { params: { roleName } }),

  /**
   * Creates a predefined Customer Success Manager role with comprehensive access
   * @returns Promise with the created Customer Success Manager role
   */
  createCustomerSuccessManagerRole: () => api.post("/roles/create-customer-success-manager"),

  /**
   * Creates a predefined Agent role with limited access for support operations
   * @returns Promise with the created Agent role
   */
  createAgentRole: () => api.post("/roles/create-agent"),

  /**
   * Gets an existing role or creates a new one with automatic permission assignment
   * @param roleName - The name of the role to get or create
   * @returns Promise with the role information
   */
  getOrCreateRole: (roleName: string) => api.post("/roles/get-or-create", null, { params: { roleName } }),

  /**
   * Updates an existing role to have full permissions and privileges
   * @param roleId - The ID of the role to update
   * @returns Promise with the updated role information
   */
  updateRoleToFullAccess: (roleId: number) => api.post(`/roles/${roleId}/update-to-full-access`),

  /**
   * Retrieves the list of all available permissions and privileges for reference
   * @returns Promise with permissions and privileges arrays
   */
  getAvailableAccess: () => api.get("/roles/available-access"),
};

// Admin API functions - comprehensive administrative operations for system management
export const adminAPI = {
  // User management - CRUD operations for user accounts and role assignments
  /**
   * Retrieves a list of all users in the system
   * @returns Promise with array of user objects
   */
  getUsers: () => api.get("/admin/users"),

  /**
   * Creates a new user account with specified details and roles
   * @param userDTO - User data including username, email, password, and roles
   * @returns Promise with the created user object
   */
  createUser: (userDTO: any) => api.post("/admin/users", userDTO),

  /**
   * Deletes a user account by ID
   * @param userId - The unique identifier of the user to delete
   * @returns Promise with deletion confirmation
   */
  deleteUser: (userId: any) => api.delete(`/admin/users/${userId}`),

  /**
   * Assigns a role to an existing user
   * @param userId - The ID of the user to assign the role to
   * @param roleId - The ID of the role to assign
   * @returns Promise with the updated user object
   */
  assignRoleToUser: (userId: any, roleId: any) => api.post(`/admin/users/${userId}/assign-role/${roleId}`),

  /**
   * Removes a role from an existing user
   * @param userId - The ID of the user to remove the role from
   * @param roleId - The ID of the role to remove
   * @returns Promise with the updated user object
   */
  removeRoleFromUser: (userId: any, roleId: any) => api.post(`/admin/users/${userId}/remove-role/${roleId}`),

  // Role management - CRUD operations for roles and their permissions/privileges
  /**
   * Retrieves a list of all roles in the system
   * @returns Promise with array of role objects
   */
  getRoles: () => api.get("/admin/roles"),

  /**
   * Creates a new role with specified permissions and privileges
   * @param roleDTO - Role data including name, permissions, and privileges
   * @returns Promise with the created role object
   */
  createRole: (roleDTO: any) => api.post("/admin/roles", roleDTO),

  /**
   * Creates or updates a role, overriding existing roles with the same name
   * @param roleDTO - Role data to create or override
   * @returns Promise with the role object
   */
  createOrOverrideRole: (roleDTO: any) => api.post("/roles/create-or-override", roleDTO),

  /**
   * Updates an existing role's information
   * @param roleId - The ID of the role to update
   * @param roleDTO - Updated role data
   * @returns Promise with the updated role object
   */
  updateRole: (roleId: any, roleDTO: any) => api.put(`/admin/roles/${roleId}`, roleDTO),

  /**
   * Assigns a permission to an existing role
   * @param roleId - The ID of the role to assign the permission to
   * @param permissionId - The ID of the permission to assign
   * @returns Promise with the updated role object
   */
  assignPermissionToRole: (roleId: any, permissionId: any) => api.post(`/admin/roles/${roleId}/assign-permission/${permissionId}`),

  /**
   * Removes a permission from an existing role
   * @param roleId - The ID of the role to remove the permission from
   * @param permissionId - The ID of the permission to remove
   * @returns Promise with the updated role object
   */
  removePermissionFromRole: (roleId: any, permissionId: any) => api.post(`/admin/roles/${roleId}/remove-permission/${permissionId}`),

  /**
   * Deletes a role by ID
   * @param roleId - The unique identifier of the role to delete
   * @returns Promise with deletion confirmation
   */
  deleteRole: (roleId: any) => api.delete(`/admin/roles/${roleId}`),

  // Permission management - CRUD operations for system permissions
  /**
   * Retrieves a list of all permissions in the system
   * @returns Promise with array of permission objects
   */
  getPermissions: () => api.get("/admin/permissions"),

  /**
   * Creates a new permission with specified details
   * @param permission - Permission data including name, type, and description
   * @returns Promise with the created permission object
   */
  createPermission: (permission: any) => api.post("/admin/permissions", permission),

  /**
   * Deletes a permission by ID
   * @param permissionId - The unique identifier of the permission to delete
   * @returns Promise with deletion confirmation
   */
  deletePermission: (permissionId: any) => api.delete(`/admin/permissions/${permissionId}`),

  // Chat monitoring - real-time supervision and analytics for chat sessions
  /**
   * Retrieves all currently active chat sessions for monitoring
   * @returns Promise with array of active session objects
   */
  getAllActiveSessions: () => api.get("/admin/sessions/active"),

  /**
   * Retrieves chat sessions for a specific agent
   * @param agentId - The ID of the agent whose sessions to retrieve
   * @returns Promise with array of agent's session objects
   */
  getAgentSessions: (agentId: any) => api.get(`/admin/agents/${agentId}/sessions`),

  /**
   * Retrieves performance metrics for a specific agent
   * @param agentId - The ID of the agent to get performance data for
   * @returns Promise with performance statistics object
   */
  getAgentPerformance: (agentId: any) => api.get(`/admin/agents/${agentId}/performance`),

  /**
   * Retrieves system-wide chat statistics and metrics
   * @returns Promise with system statistics object
   */
  getSystemStatistics: () => api.get("/admin/statistics"),

  /**
   * Retrieves all messages for a specific chat session
   * @param sessionId - The ID of the session to get messages for
   * @returns Promise with array of message objects
   */
  getSessionMessages: (sessionId: any) => api.get(`/admin/sessions/${sessionId}/messages`),

  /**
   * Starts supervision mode for a chat session (read-only monitoring)
   * @param sessionId - The ID of the session to supervise
   * @returns Promise with supervision confirmation
   */
  superviseSession: (sessionId: any) => api.post(`/admin/sessions/${sessionId}/supervise`),

  /**
   * Sends a supervisory message to an agent during session monitoring
   * @param sessionId - The ID of the supervised session
   * @param message - The supervisory message content
   * @returns Promise with message sending confirmation
   */
  sendSupervisoryMessage: (sessionId: any, message: any) => api.post(`/admin/sessions/${sessionId}/supervise/message`, message),

  // Privilege matrix - management of role-privilege relationships
  /**
   * Retrieves all privileges assigned to a specific role
   * @param roleId - The ID of the role to get privileges for
   * @returns Promise with array of privilege objects for the role
   */
  getRolePrivileges: (roleId: any) => api.get(`/admin/roles/${roleId}/privileges`),

  /**
   * Assigns a privilege to an existing role
   * @param roleId - The ID of the role to assign the privilege to
   * @param privilegeId - The ID of the privilege to assign
   * @returns Promise with the updated role object
   */
  assignPrivilegeToRole: (roleId: any, privilegeId: any) => api.post(`/admin/roles/${roleId}/assign-privilege/${privilegeId}`),

  /**
   * Removes a privilege from an existing role
   * @param roleId - The ID of the role to remove the privilege from
   * @param privilegeId - The ID of the privilege to remove
   * @returns Promise with the updated role object
   */
  removePrivilegeFromRole: (roleId: any, privilegeId: any) => api.post(`/admin/roles/${roleId}/remove-privilege/${privilegeId}`),

  // Privilege management - CRUD operations for system privileges
  /**
   * Retrieves a list of all privileges in the system
   * @returns Promise with array of privilege objects
   */
  getPrivileges: () => api.get("/admin/privileges"),

  /**
   * Creates a new privilege with specified details
   * @param privilege - Privilege data including name and description
   * @returns Promise with the created privilege object
   */
  createPrivilege: (privilege: any) => api.post("/admin/privileges", privilege),

  /**
   * Deletes a privilege by ID
   * @param privilegeId - The unique identifier of the privilege to delete
   * @returns Promise with deletion confirmation
   */
  deletePrivilege: (privilegeId: any) => api.delete(`/admin/privileges/${privilegeId}`),

  /**
   * Assigns a privilege to a permission (linking privileges to permissions)
   * @param privilegeId - The ID of the privilege to assign
   * @param permissionId - The ID of the permission to assign the privilege to
   * @returns Promise with the updated privilege object
   */
  assignPrivilegeToPermission: (privilegeId: any, permissionId: any) => api.post(`/admin/privileges/${privilegeId}/assign-permission/${permissionId}`),

  /**
   * Removes a privilege from a permission
   * @param privilegeId - The ID of the privilege to remove
   * @param permissionId - The ID of the permission to remove the privilege from
   * @returns Promise with the updated privilege object
   */
  removePrivilegeFromPermission: (privilegeId: any, permissionId: any) => api.post(`/admin/privileges/${privilegeId}/remove-permission/${permissionId}`),

  // Reports and Statistics - comprehensive reporting functionality
  /**
   * Generates a monthly chat handling report for all agents
   * @param year - The year for the report
   * @param month - The month for the report (1-12)
   * @returns Promise with monthly report data
   */
  getMonthlyReport: (year: any, month: any) => api.get(`/admin/reports/monthly/${year}/${month}`),

  /**
   * Generates a quarterly chat handling report for all agents
   * @param year - The year for the report
   * @param quarter - The quarter for the report (1-4)
   * @returns Promise with quarterly report data
   */
  getQuarterlyReport: (year: any, quarter: any) => api.get(`/admin/reports/quarterly/${year}/${quarter}`),

  /**
   * Generates a yearly chat handling report for all agents
   * @param year - The year for the report
   * @returns Promise with yearly report data
   */
  getYearlyReport: (year: any) => api.get(`/admin/reports/yearly/${year}`),

  /**
   * Generates a monthly report for a specific agent
   * @param agentId - The ID of the agent to generate report for
   * @param year - The year for the report
   * @param month - The month for the report (1-12)
   * @returns Promise with agent monthly report data
   */
  getAgentMonthlyReport: (agentId: any, year: any, month: any) => api.get(`/admin/reports/agent/${agentId}/${year}/${month}`),

  /**
   * Generates a quarterly report for a specific agent
   * @param agentId - The ID of the agent to generate report for
   * @param year - The year for the report
   * @param quarter - The quarter for the report (1-4)
   * @returns Promise with agent quarterly report data
   */
  getAgentQuarterlyReport: (agentId: any, year: any, quarter: any) => api.get(`/admin/reports/agent/${agentId}/quarterly/${year}/${quarter}`),

  /**
   * Generates a yearly report for a specific agent
   * @param agentId - The ID of the agent to generate report for
   * @param year - The year for the report
   * @returns Promise with agent yearly report data
   */
  getAgentYearlyReport: (agentId: any, year: any) => api.get(`/admin/reports/agent/${agentId}/yearly/${year}`),

  /**
   * Retrieves the list of months that have available report data
   * @returns Promise with array of available report months
   */
  getAvailableReportMonths: () => api.get("/admin/reports/available-months"),

  // Chat Statistics - detailed user chat analytics
  /**
   * Retrieves monthly chat handling statistics for a specific user
   * @param userId - The ID of the user to get statistics for
   * @param year - The year for the statistics
   * @param month - The month for the statistics (1-12)
   * @returns Promise with monthly chat statistics
   */
  getUserMonthlyChatStats: (userId: any, year: any, month: any) => api.get(`/admin/users/${userId}/chat-stats/${year}/${month}`),

  /**
   * Retrieves quarterly chat handling statistics for a specific user
   * @param userId - The ID of the user to get statistics for
   * @param year - The year for the statistics
   * @param quarter - The quarter for the statistics (1-4)
   * @returns Promise with quarterly chat statistics
   */
  getUserQuarterlyChatStats: (userId: any, year: any, quarter: any) => api.get(`/admin/users/${userId}/chat-stats/${year}/quarter/${quarter}`),

  /**
   * Retrieves yearly chat handling statistics for a specific user
   * @param userId - The ID of the user to get statistics for
   * @param year - The year for the statistics
   * @returns Promise with yearly chat statistics
   */
  getUserYearlyChatStats: (userId: any, year: any) => api.get(`/admin/users/${userId}/chat-stats/${year}`),

  // Chat History and Session Management - comprehensive session data access
  /**
   * Retrieves all chat sessions (active and completed) for admin review
   * @returns Promise with array of all session objects
   */
  getAllSessionsForAdmin: () => api.get("/admin/sessions/all"),

  /**
   * Retrieves all sessions (past and present) for a specific agent
   * @param agentId - The ID of the agent whose sessions to retrieve
   * @returns Promise with array of agent's session objects
   */
  getAllAgentSessions: (agentId: any) => api.get(`/admin/agents/${agentId}/all-sessions`),

  /**
   * Retrieves sessions within a specified date range
   * @param startDate - Start date in ISO format
   * @param endDate - End date in ISO format
   * @returns Promise with array of sessions in the date range
   */
  getSessionsByDateRange: (startDate: any, endDate: any) => api.get(`/admin/sessions/date-range?startDate=${startDate}&endDate=${endDate}`),

  /**
   * Retrieves all sessions for a specific user
   * @param userId - The ID of the user whose sessions to retrieve
   * @returns Promise with array of user's session objects
   */
  getUserSessions: (userId: any) => api.get(`/admin/users/${userId}/sessions`),

  /**
   * Retrieves detailed information about a specific session including all messages
   * @param sessionId - The ID of the session to get details for
   * @returns Promise with detailed session information and messages
   */
  getSessionDetails: (sessionId: any) => api.get(`/admin/sessions/${sessionId}/details`),

  /**
   * Searches for sessions by participant name or session name
   * @param searchTerm - The search term to match against session data
   * @returns Promise with array of matching session objects
   */
  searchSessions: (searchTerm: any) => api.get(`/admin/sessions/search?searchTerm=${searchTerm}`),
};

export default api;
