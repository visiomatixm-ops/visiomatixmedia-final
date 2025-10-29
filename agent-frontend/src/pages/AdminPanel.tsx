/**
 * ===========================================================
 * File: AdminPanel.jsx
 * Author: Viral Prajapati
 * Date: 20-Oct-2025
 * Description:
 *  Admin panel component for managing users, roles, permissions.
 *  Integrated into AgentDashboard with tab navigation.
 * ===========================================================
 */

import React, { useEffect, useState } from "react";
import { adminAPI, setAuthToken } from "../api/api";
import DashboardTab from "../components/admin/DashboardTab";
import UsersTab from "../components/admin/UsersTab";
import RolesTab from "../components/admin/RolesTab";
import PermissionsTab from "../components/admin/PermissionsTab";
import PrivilegesTab from "../components/admin/PrivilegesTab";
import StatisticsTab from "../components/admin/StatisticsTab";
import ChatHistoryTab from "../components/admin/ChatHistoryTab";
import Menu from "../components/Menu";

const AdminPanel = ({ token }) => {
  const [activeSubTab, setActiveSubTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [privileges, setPrivileges] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, type: string} | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    role: "ROLE_AGENT"
  });

  // Statistics state
  const [reportData, setReportData] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [userChatStats, setUserChatStats] = useState({});

  // Chat History state
  const [allSessions, setAllSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionDetails, setSessionDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: ""
  });

  // Set auth token for API calls
  useEffect(() => {
    setAuthToken(token);
    // Load initial data when component mounts
    fetchRoles();
    fetchPermissions();
    fetchPrivileges();
  }, [token]);

  // Show temporary message
  const showMessage = (msg, type = "success") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      console.log('Fetching users...'); // Debug log
      const res = await adminAPI.getUsers();
      console.log('Users fetched:', res.data); // Debug log
      setUsers(res.data);
    } catch (e) {
      console.error("Failed to fetch users:", e);
      showMessage("Failed to load users", "error");
    }
  };

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const res = await adminAPI.getRoles();
      setRoles(res.data);
    } catch (e) {
      console.error("Failed to fetch roles:", e);
      showMessage("Failed to load roles", "error");
    }
  };

  // Fetch permissions
  const fetchPermissions = async () => {
    try {
      const res = await adminAPI.getPermissions();
      setPermissions(res.data);
    } catch (e) {
      console.error("Failed to fetch permissions:", e);
      showMessage("Failed to load permissions", "error");
    }
  };

  // Fetch privileges
  const fetchPrivileges = async () => {
    try {
      const res = await adminAPI.getPrivileges();
      setPrivileges(res.data);
    } catch (e) {
      console.error("Failed to fetch privileges:", e);
      showMessage("Failed to load privileges", "error");
    }
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const statsRes = await adminAPI.getSystemStatistics();
      setStatistics(statsRes.data);
      setSessions(statsRes.data.activeSessions || []);
    } catch (e) {
      console.error("Failed to fetch dashboard data:", e);
      showMessage("Failed to load dashboard data", "error");
    }
  };

  // Load data based on active sub-tab
  useEffect(() => {
    if (activeSubTab === "dashboard") fetchDashboardData();
    else if (activeSubTab === "users") {
      fetchUsers();
      fetchRoles(); // Load roles immediately for user creation
    }
    else if (activeSubTab === "roles") {
      fetchRoles();
      fetchPrivileges(); // Also fetch privileges for role management
    }
    else if (activeSubTab === "permissions") {
      fetchPermissions();
      fetchPrivileges(); // Load privileges for permission management
    }
    else if (activeSubTab === "privileges") fetchPrivileges();
    else if (activeSubTab === "statistics") {
      fetchReportData();
      console.log('Statistics tab loaded, users:', users); // Debug log
      // Ensure users are loaded before trying to load stats
      if (users.length === 0) {
        console.log('No users loaded, fetching users first...'); // Debug log
        fetchUsers();
      } else {
        // Auto-load user chat stats when statistics tab is selected
        users.forEach(user => fetchUserChatStats(user.id));
      }
    }
    else if (activeSubTab === "history") fetchAllSessions();
  }, [activeSubTab, selectedPeriod, selectedYear, selectedMonth, selectedQuarter]);

  // Separate effect to load user chat stats when users data is available
  useEffect(() => {
    if (activeSubTab === "statistics" && users.length > 0) {
      console.log('Loading user chat stats for users:', users); // Debug log
      users.forEach(user => {
        if (!userChatStats[user.id]) {
          fetchUserChatStats(user.id);
        }
      });
    }
  }, [users, activeSubTab]);

  // Fetch report data
  const fetchReportData = async () => {
    try {
      let report;
      if (selectedPeriod === "monthly") {
        report = await adminAPI.getMonthlyReport(selectedYear, selectedMonth);
      } else if (selectedPeriod === "quarterly") {
        report = await adminAPI.getQuarterlyReport(selectedYear, selectedQuarter);
      } else if (selectedPeriod === "yearly") {
        report = await adminAPI.getYearlyReport(selectedYear);
      }
      setReportData(report.data);
    } catch (e) {
      console.error("Failed to fetch report data:", e);
      showMessage("Failed to load report data", "error");
    }
  };

  // Fetch user chat statistics
  const fetchUserChatStats = async (userId) => {
    try {
      console.log('Fetching user chat stats for userId:', userId, 'period:', selectedPeriod); // Debug log
      let stats;
      if (selectedPeriod === "monthly") {
        stats = await adminAPI.getUserMonthlyChatStats(userId, selectedYear, selectedMonth);
      } else if (selectedPeriod === "quarterly") {
        stats = await adminAPI.getUserQuarterlyChatStats(userId, selectedYear, selectedQuarter);
      } else if (selectedPeriod === "yearly") {
        stats = await adminAPI.getUserYearlyChatStats(userId, selectedYear);
      }
      console.log('Received stats for userId:', userId, 'stats:', stats.data); // Debug log
      setUserChatStats(prev => ({ ...prev, [userId]: stats.data }));
    } catch (e) {
      console.error("Failed to fetch user chat stats:", e);
      // Set empty stats on error to show 0 values
      setUserChatStats(prev => ({ ...prev, [userId]: { totalSessionsHandled: 0, totalMessagesSent: 0, period: selectedPeriod } }));
    }
  };

  // Fetch all sessions for history review
  const fetchAllSessions = async () => {
    try {
      const response = await adminAPI.getAllSessionsForAdmin();
      setAllSessions(response.data);
    } catch (e) {
      console.error("Failed to fetch all sessions:", e);
      showMessage("Failed to load chat history", "error");
    }
  };

  // Fetch session details with messages
  const fetchSessionDetails = async (sessionId) => {
    try {
      const response = await adminAPI.getSessionDetails(sessionId);
      setSessionDetails(response.data);
      setSelectedSession(sessionId);
    } catch (e) {
      console.error("Failed to fetch session details:", e);
      showMessage("Failed to load session details", "error");
    }
  };

  // Search sessions
  const searchSessions = async () => {
    if (!searchTerm.trim()) {
      fetchAllSessions();
      return;
    }
    try {
      const response = await adminAPI.searchSessions(searchTerm);
      setAllSessions(response.data);
    } catch (e) {
      console.error("Failed to search sessions:", e);
      showMessage("Failed to search sessions", "error");
    }
  };

  // Filter sessions by date range
  const filterSessionsByDate = async () => {
    if (!dateFilter.startDate || !dateFilter.endDate) {
      fetchAllSessions();
      return;
    }
    try {
      const response = await adminAPI.getSessionsByDateRange(dateFilter.startDate, dateFilter.endDate);
      setAllSessions(response.data);
    } catch (e) {
      console.error("Failed to filter sessions by date:", e);
      showMessage("Failed to filter sessions", "error");
    }
  };

  // Assign role to user
  const assignRoleToUser = async (userId, roleId) => {
    setLoading(true);
    try {
      await adminAPI.assignRoleToUser(userId, roleId);
      showMessage("Role assigned successfully");
      fetchUsers();
    } catch (e) {
      console.error("Failed to assign role:", e);
      showMessage("Failed to assign role", "error");
    } finally {
      setLoading(false);
    }
  };

  // Remove role from user
  const removeRoleFromUser = async (userId, roleId) => {
    setLoading(true);
    try {
      await adminAPI.removeRoleFromUser(userId, roleId);
      showMessage("Role removed successfully");
      fetchUsers();
    } catch (e) {
      console.error("Failed to remove role:", e);
      showMessage("Failed to remove role", "error");
    } finally {
      setLoading(false);
    }
  };

  // Create new user
  const handleCreateUser = async (userData) => {
    setLoading(true);
    try {
      const userDTO = {
        username: userData.username,
        email: userData.email,
        name: userData.name,
        password: userData.password,
        roles: userData.roles // Now accepts array of role objects
      };
      await adminAPI.createUser(userDTO);
      showMessage("User created successfully with automatic role-based permissions and privileges");
      fetchUsers();
    } catch (e) {
      console.error("Failed to create user:", e);
      showMessage("Failed to create user", "error");
    } finally {
      setLoading(false);
    }
  };

  // Assign permission to role
  const assignPermissionToRole = async (roleId, permissionId) => {
    setLoading(true);
    try {
      await adminAPI.assignPermissionToRole(roleId, permissionId);
      showMessage("Permission assigned successfully");
      fetchRoles();
    } catch (e) {
      console.error("Failed to assign permission:", e);
      showMessage("Failed to assign permission", "error");
    } finally {
      setLoading(false);
    }
  };

  // Remove permission from role
  const removePermissionFromRole = async (roleId, permissionId) => {
    setLoading(true);
    try {
      await adminAPI.removePermissionFromRole(roleId, permissionId);
      showMessage("Permission removed successfully");
      fetchRoles();
    } catch (e) {
      console.error("Failed to remove permission:", e);
      showMessage("Failed to remove permission", "error");
    } finally {
      setLoading(false);
    }
  };

  // Create new role
  const handleCreateRole = async (roleData) => {
    setLoading(true);
    try {
      await adminAPI.createRole(roleData);
      showMessage("Role created successfully with automatic permission and privilege assignment");
      fetchRoles();
      fetchPrivileges(); // Refresh privileges data as well
    } catch (e) {
      console.error("Failed to create role:", e);
      showMessage("Failed to create role", "error");
    } finally {
      setLoading(false);
    }
  };

  // Create or override role
  const handleCreateOrOverrideRole = async (roleData) => {
    setLoading(true);
    try {
      await adminAPI.createOrOverrideRole(roleData);
      showMessage("Role created/overridden successfully");
      fetchRoles();
      fetchPrivileges(); // Refresh privileges data as well
    } catch (e) {
      console.error("Failed to create/override role:", e);
      showMessage("Failed to create/override role", "error");
    } finally {
      setLoading(false);
    }
  };

  // Update existing role
  const handleUpdateRole = async (roleId, roleData) => {
    setLoading(true);
    try {
      await adminAPI.updateRole(roleId, roleData);
      showMessage("Role updated successfully");
      fetchRoles();
    } catch (e) {
      console.error("Failed to update role:", e);
      showMessage("Failed to update role", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete role
  const handleDeleteRole = async (roleId) => {
    setLoading(true);
    try {
      await adminAPI.deleteRole(roleId);
      showMessage("Role deleted successfully");
      fetchRoles();
    } catch (e) {
      console.error("Failed to delete role:", e);
      showMessage("Failed to delete role", "error");
    } finally {
      setLoading(false);
    }
  };

  // Create permission
  const handleCreatePermission = async (permissionData) => {
    setLoading(true);
    try {
      await adminAPI.createPermission(permissionData);
      showMessage("Permission created successfully");
      fetchPermissions();
    } catch (e) {
      console.error("Failed to create permission:", e);
      showMessage("Failed to create permission", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete permission
  const handleDeletePermission = async (permissionId) => {
    setLoading(true);
    try {
      await adminAPI.deletePermission(permissionId);
      showMessage("Permission deleted successfully");
      fetchPermissions();
    } catch (e) {
      console.error("Failed to delete permission:", e);
      showMessage("Failed to delete permission", "error");
    } finally {
      setLoading(false);
    }
  };

  // Create privilege
  const handleCreatePrivilege = async (privilegeData) => {
    setLoading(true);
    try {
      await adminAPI.createPrivilege(privilegeData);
      showMessage("Privilege created successfully");
      fetchPrivileges();
    } catch (e) {
      console.error("Failed to create privilege:", e);
      showMessage("Failed to create privilege", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete privilege
  const handleDeletePrivilege = async (privilegeId) => {
    setLoading(true);
    try {
      await adminAPI.deletePrivilege(privilegeId);
      showMessage("Privilege deleted successfully");
      fetchPrivileges();
    } catch (e) {
      console.error("Failed to delete privilege:", e);
      showMessage("Failed to delete privilege", "error");
    } finally {
      setLoading(false);
    }
  };

  // Assign privilege to permission
  const handleAssignPrivilegeToPermission = async (privilegeId, permissionId) => {
    setLoading(true);
    try {
      await adminAPI.assignPrivilegeToPermission(privilegeId, permissionId);
      showMessage("Privilege assigned to permission successfully");
      fetchPrivileges();
      fetchPermissions();
    } catch (e) {
      console.error("Failed to assign privilege to permission:", e);
      showMessage("Failed to assign privilege to permission", "error");
    } finally {
      setLoading(false);
    }
  };

  // Remove privilege from permission
  const handleRemovePrivilegeFromPermission = async (privilegeId, permissionId) => {
    setLoading(true);
    try {
      await adminAPI.removePrivilegeFromPermission(privilegeId, permissionId);
      showMessage("Privilege removed from permission successfully");
      fetchPrivileges();
      fetchPermissions();
    } catch (e) {
      console.error("Failed to remove privilege from permission:", e);
      showMessage("Failed to remove privilege from permission", "error");
    } finally {
      setLoading(false);
    }
  };

  // Assign privilege to role
  const assignPrivilegeToRole = async (roleId, privilegeId) => {
    setLoading(true);
    try {
      await adminAPI.assignPrivilegeToRole(roleId, privilegeId);
      showMessage("Privilege assigned to role successfully");
      fetchRoles();
    } catch (e) {
      console.error("Failed to assign privilege:", e);
      showMessage("Failed to assign privilege", "error");
    } finally {
      setLoading(false);
    }
  };

  // Remove privilege from role
  const removePrivilegeFromRole = async (roleId, privilegeId) => {
    setLoading(true);
    try {
      await adminAPI.removePrivilegeFromRole(roleId, privilegeId);
      showMessage("Privilege removed from role successfully");
      fetchRoles();
    } catch (e) {
      console.error("Failed to remove privilege:", e);
      showMessage("Failed to remove privilege", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      await adminAPI.deleteUser(userId);
      showMessage("User deleted successfully");
      fetchUsers();
    } catch (e) {
      console.error("Failed to delete user:", e);
      showMessage("Failed to delete user", "error");
    } finally {
      setLoading(false);
    }
  };

  // Privilege-based tab access control
  const hasPrivilege = (privilegeName: string) => {
    // Check if current user has the required privilege through their roles
    // This would need to be implemented by checking the user's roles and their associated privileges
    // For now, return true for all to maintain existing functionality until proper implementation
    // TODO: Implement proper privilege checking by fetching user's roles and their privileges
    return true;
  };

  return (
    <>
    <style>
      {`
        .nav-link.active {
          color: white !important;
        }
      `}
    </style>
    <div>
      {/* Message Display */}
      {message && (
        <div className={`alert ${message.type === "error" ? "alert-danger" : "alert-success"}`}>
          {message.text}
        </div>
      )}

      {/* Sub-tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeSubTab === "dashboard" ? "active" : ""}`}
            style={activeSubTab === "dashboard" ? { backgroundColor: '#007bff', color: 'white !important', borderColor: '#007bff' } : {}}
            onClick={() => setActiveSubTab("dashboard")}
          >
            Dashboard
          </button>
        </li>
        {hasPrivilege("ACCESS_USER_MANAGEMENT") && (
          <li className="nav-item">
            <button
              className={`nav-link ${activeSubTab === "users" ? "active" : ""}`}
              style={activeSubTab === "users" ? { backgroundColor: '#007bff', color: 'white !important', borderColor: '#007bff' } : {}}
              onClick={() => setActiveSubTab("users")}
            >
              Users
            </button>
          </li>
        )}
        {hasPrivilege("ACCESS_ROLE_MANAGEMENT") && (
          <li className="nav-item">
            <button
              className={`nav-link ${activeSubTab === "roles" ? "active" : ""}`}
              style={activeSubTab === "roles" ? { backgroundColor: '#007bff', color: 'white !important', borderColor: '#007bff' } : {}}
              onClick={() => setActiveSubTab("roles")}
            >
              Roles
            </button>
          </li>
        )}
        {hasPrivilege("ACCESS_PERMISSION_MANAGEMENT") && (
          <li className="nav-item">
            <button
              className={`nav-link ${activeSubTab === "permissions" ? "active" : ""}`}
              style={activeSubTab === "permissions" ? { backgroundColor: '#007bff', color: 'white !important', borderColor: '#007bff' } : {}}
              onClick={() => setActiveSubTab("permissions")}
            >
              Permissions
            </button>
          </li>
        )}
        {hasPrivilege("ACCESS_PRIVILEGE_MANAGEMENT") && (
          <li className="nav-item">
            <button
              className={`nav-link ${activeSubTab === "privileges" ? "active" : ""}`}
              style={activeSubTab === "privileges" ? { backgroundColor: '#007bff', color: 'white !important', borderColor: '#007bff' } : {}}
              onClick={() => setActiveSubTab("privileges")}
            >
              Privileges
            </button>
          </li>
        )}
        {hasPrivilege("ACCESS_STATISTICS_TAB") && (
          <li className="nav-item">
            <button
              className={`nav-link ${activeSubTab === "statistics" ? "active" : ""}`}
              style={activeSubTab === "statistics" ? { backgroundColor: '#007bff', color: 'white !important', borderColor: '#007bff' } : {}}
              onClick={() => setActiveSubTab("statistics")}
            >
              Statistics
            </button>
          </li>
        )}
        {hasPrivilege("ACCESS_CHAT_HISTORY_TAB") && (
          <li className="nav-item">
            <button
              className={`nav-link ${activeSubTab === "history" ? "active" : ""}`}
              style={activeSubTab === "history" ? { backgroundColor: '#007bff', color: 'white !important', borderColor: '#007bff' } : {}}
              onClick={() => setActiveSubTab("history")}
            >
              Chat History
            </button>
          </li>
        )}
      </ul>

      {/* Dashboard Tab */}
      {activeSubTab === "dashboard" && (
        <DashboardTab statistics={statistics} sessions={sessions} />
      )}

      {/* Users Tab */}
      {activeSubTab === "users" && (
        <UsersTab
          users={users}
          roles={roles}
          loading={loading}
          onAssignRole={assignRoleToUser}
          onRemoveRole={removeRoleFromUser}
          onCreateUser={handleCreateUser}
          onRefreshUsers={fetchUsers}
          onDeleteUser={handleDeleteUser}
        />
      )}

      {/* Roles Tab */}
      {activeSubTab === "roles" && (
        <RolesTab
          roles={roles}
          permissions={permissions}
          privileges={privileges}
          loading={loading}
          onAssignPermission={assignPermissionToRole}
          onRemovePermission={removePermissionFromRole}
          onAssignPrivilege={assignPrivilegeToRole}
          onRemovePrivilege={removePrivilegeFromRole}
          onCreateRole={handleCreateRole}
          onCreateOrOverrideRole={handleCreateOrOverrideRole}
          onUpdateRole={handleUpdateRole}
          onDeleteRole={handleDeleteRole}
        />
      )}

      {/* Permissions Tab */}
      {activeSubTab === "permissions" && (
        <PermissionsTab
          permissions={permissions}
          loading={loading}
          onCreatePermission={handleCreatePermission}
          onDeletePermission={handleDeletePermission}
        />
      )}

      {/* Privileges Tab */}
      {activeSubTab === "privileges" && (
        <PrivilegesTab
          privileges={privileges}
          permissions={permissions}
          loading={loading}
          onCreatePrivilege={handleCreatePrivilege}
          onDeletePrivilege={handleDeletePrivilege}
          onAssignPrivilegeToPermission={handleAssignPrivilegeToPermission}
          onRemovePrivilegeFromPermission={handleRemovePrivilegeFromPermission}
        />
      )}

      {/* Statistics Tab */}
      {activeSubTab === "statistics" && (
        <StatisticsTab
          reportData={reportData}
          selectedPeriod={selectedPeriod}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedQuarter={selectedQuarter}
          users={users}
          userChatStats={userChatStats}
          onPeriodChange={setSelectedPeriod}
          onYearChange={setSelectedYear}
          onMonthChange={setSelectedMonth}
          onQuarterChange={setSelectedQuarter}
          onFetchUserStats={fetchUserChatStats}
        />
      )}

      {/* Chat History Tab */}
      {activeSubTab === "history" && (
        <ChatHistoryTab
          allSessions={allSessions}
          selectedSession={selectedSession}
          sessionDetails={sessionDetails}
          searchTerm={searchTerm}
          dateFilter={dateFilter}
          onSessionSelect={fetchSessionDetails}
          onSearchChange={setSearchTerm}
          onDateFilterChange={setDateFilter}
          onSearch={searchSessions}
          onFilterByDate={filterSessionsByDate}
        />
      )}
    </div>
    </>
  );
};

export default AdminPanel;