import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const setAuthToken = (token) => {
  if (token)
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

// User API functions
export const userAPI = {
  changePassword: (passwordData) => api.post("/users/change-password", passwordData),
};

// Admin API functions
export const adminAPI = {
  // User management
  getUsers: () => api.get("/admin/users"),
  createUser: (userDTO) => api.post("/admin/users", userDTO),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  assignRoleToUser: (userId, roleId) => api.post(`/admin/users/${userId}/assign-role/${roleId}`),
  removeRoleFromUser: (userId, roleId) => api.post(`/admin/users/${userId}/remove-role/${roleId}`),

  // Role management
  getRoles: () => api.get("/admin/roles"),
  createRole: (roleDTO) => api.post("/admin/roles", roleDTO),
  createOrOverrideRole: (roleDTO) => api.post("/api/roles/create-or-override", roleDTO),
  updateRole: (roleId, roleDTO) => api.put(`/admin/roles/${roleId}`, roleDTO),
  assignPermissionToRole: (roleId, permissionId) => api.post(`/admin/roles/${roleId}/assign-permission/${permissionId}`),
  removePermissionFromRole: (roleId, permissionId) => api.post(`/admin/roles/${roleId}/remove-permission/${permissionId}`),
  deleteRole: (roleId) => api.delete(`/admin/roles/${roleId}`),

  // Permission management
  getPermissions: () => api.get("/admin/permissions"),
  createPermission: (permission) => api.post("/admin/permissions", permission),
  deletePermission: (permissionId) => api.delete(`/admin/permissions/${permissionId}`),

  // Chat monitoring
  getAllActiveSessions: () => api.get("/admin/sessions/active"),
  getAgentSessions: (agentId) => api.get(`/admin/agents/${agentId}/sessions`),
  getAgentPerformance: (agentId) => api.get(`/admin/agents/${agentId}/performance`),
  getSystemStatistics: () => api.get("/admin/statistics"),
  getSessionMessages: (sessionId) => api.get(`/admin/sessions/${sessionId}/messages`),
  superviseSession: (sessionId) => api.post(`/admin/sessions/${sessionId}/supervise`),
  sendSupervisoryMessage: (sessionId, message) => api.post(`/admin/sessions/${sessionId}/supervise/message`, message),

  // Privilege matrix
  getRolePrivileges: (roleId) => api.get(`/admin/roles/${roleId}/privileges`),
  assignPrivilegeToRole: (roleId, privilegeId) => api.post(`/admin/roles/${roleId}/assign-privilege/${privilegeId}`),
  removePrivilegeFromRole: (roleId, privilegeId) => api.post(`/admin/roles/${roleId}/remove-privilege/${privilegeId}`),

  // Privilege management
  getPrivileges: () => api.get("/admin/privileges"),
  createPrivilege: (privilege) => api.post("/admin/privileges", privilege),
  deletePrivilege: (privilegeId) => api.delete(`/admin/privileges/${privilegeId}`),
  assignPrivilegeToPermission: (privilegeId, permissionId) => api.post(`/admin/privileges/${privilegeId}/assign-permission/${permissionId}`),
  removePrivilegeFromPermission: (privilegeId, permissionId) => api.post(`/admin/privileges/${privilegeId}/remove-permission/${permissionId}`),

  // Reports and Statistics
  getMonthlyReport: (year, month) => api.get(`/admin/reports/monthly/${year}/${month}`),
  getQuarterlyReport: (year, quarter) => api.get(`/admin/reports/quarterly/${year}/${quarter}`),
  getYearlyReport: (year) => api.get(`/admin/reports/yearly/${year}`),
  getAgentMonthlyReport: (agentId, year, month) => api.get(`/admin/reports/agent/${agentId}/${year}/${month}`),
  getAgentQuarterlyReport: (agentId, year, quarter) => api.get(`/admin/reports/agent/${agentId}/quarterly/${year}/${quarter}`),
  getAgentYearlyReport: (agentId, year) => api.get(`/admin/reports/agent/${agentId}/yearly/${year}`),
  getAvailableReportMonths: () => api.get("/admin/reports/available-months"),

  // Chat Statistics
  getUserMonthlyChatStats: (userId, year, month) => api.get(`/admin/users/${userId}/chat-stats/${year}/${month}`),
  getUserQuarterlyChatStats: (userId, year, quarter) => api.get(`/admin/users/${userId}/chat-stats/${year}/quarter/${quarter}`),
  getUserYearlyChatStats: (userId, year) => api.get(`/admin/users/${userId}/chat-stats/${year}`),

  // Chat History and Session Management
  getAllSessionsForAdmin: () => api.get("/admin/sessions/all"),
  getAllAgentSessions: (agentId) => api.get(`/admin/agents/${agentId}/all-sessions`),
  getSessionsByDateRange: (startDate, endDate) => api.get(`/admin/sessions/date-range?startDate=${startDate}&endDate=${endDate}`),
  getUserSessions: (userId) => api.get(`/admin/users/${userId}/sessions`),
  getSessionDetails: (sessionId) => api.get(`/admin/sessions/${sessionId}/details`),
  searchSessions: (searchTerm) => api.get(`/admin/sessions/search?searchTerm=${searchTerm}`),
};

export default api;
