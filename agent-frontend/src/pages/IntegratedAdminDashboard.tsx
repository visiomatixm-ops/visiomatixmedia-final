/**
 * ===========================================================
 * File: IntegratedAdminDashboard.tsx
 * All admin functionality integrated directly into main dashboard
 * No separate Admin Panel tab - everything accessible from main tabs
 * ===========================================================
 */

import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { adminAPI, setAuthToken } from "../api/api";
import Menu from "../components/Menu";
import PasswordChange from "../components/PasswordChange";
import UserChatStatsWidget from "../components/admin/UserChatStatsWidget";

interface Session {
  id: number;
  sessionName: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  participants?: any[];
}

interface Message {
  id: string;
  sender: {
    username: string;
    name?: string;
  } | string;
  content: string;
  sentAt: string;
  messageType: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  roles?: any[];
}

interface Role {
  id: number;
  name: string;
  permissions?: any[];
  privileges?: any[];
}

interface Permission {
  id: number;
  name: string;
  permissionType: string;
  description: string;
  resourcePattern: string;
}

interface Privilege {
  id: number;
  name: string;
}

interface RoleFormData {
  name: string;
  description: string;
  permissions: number[];
  privileges: number[];
}

interface UserFormData {
  username: string;
  email: string;
  name: string;
  password: string;
  roles: number[];
}

const IntegratedAdminDashboard: React.FC<{ token: string; userRole: string; userPrivileges?: string[] }> = ({
  token,
  userRole,
  userPrivileges = []
}) => {
  console.log('🚀 IntegratedAdminDashboard rendered with:', { token, userRole, userPrivileges });

  // Decode JWT token to get username
  const decodeToken = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.username;
    } catch {
      return null;
    }
  };

  const username = decodeToken(token);

  // Basic state
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chats");
  const clientRef = useRef<Client | null>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  // Admin data state
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [userRoles, setUserRoles] = useState<Role[]>([]); // Current user's assigned roles
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [privileges, setPrivileges] = useState<Privilege[]>([]);
  const [sessionsAdmin, setSessionsAdmin] = useState<Session[]>([]);
  const [statistics, setStatistics] = useState<any>({});
  const [message, setMessage] = useState<{text: string, type: string} | null>(null);

  // Form states
  const [showUserForm, setShowUserForm] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [showRoleDetails, setShowRoleDetails] = useState<number | null>(null);

  // Form data
  const [userForm, setUserForm] = useState<UserFormData>({
    username: '',
    email: '',
    name: '',
    password: '',
    roles: []
  });

  const [roleForm, setRoleForm] = useState<RoleFormData>({
    name: '',
    description: '',
    permissions: [],
    privileges: []
  });

  // Chat history state
  const [selectedChatSession, setSelectedChatSession] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<{ [key: number]: Message[] }>({});

  // Statistics state
  const [userChatStats, setUserChatStats] = useState<{ [key: number]: any }>({});
  const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly");

  const API = "http://localhost:8080/api";

  // Set auth token for API calls
  useEffect(() => {
    setAuthToken(token);
    fetchRoles();
    fetchPermissions();
    fetchPrivileges();
  }, [token]);

  // Show temporary message
  const showMessage = (msg: string, type = "success") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // Auto-scroll to latest message
  useEffect(() => {
    const messagesEndRef = document.querySelector('.messages-container');
    if (messagesEndRef) {
      messagesEndRef.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selected]);

  // Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Restore selected session from localStorage
  useEffect(() => {
    const savedSelected = localStorage.getItem("agentSelectedSession");
    if (savedSelected) {
      setSelected(parseInt(savedSelected));
    }
  }, []);

  // Save selected session to localStorage
  useEffect(() => {
    if (selected !== null) {
      localStorage.setItem("agentSelectedSession", selected.toString());
    }
  }, [selected]);

  // Logout function
  const handleLogout = () => {
    window.location.reload();
  };

  // Admin data fetching functions
  const fetchUsers = async () => {
    try {
      const res = await adminAPI.getUsers();
      setUsers(res.data);
    } catch (e) {
      console.error("Failed to fetch users:", e);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await adminAPI.getRoles();
      setRoles(res.data);
    } catch (e) {
      console.error("Failed to fetch roles:", e);
    }
  };

  const fetchPermissions = async () => {
    try {
      const res = await adminAPI.getPermissions();
      setPermissions(res.data);
    } catch (e) {
      console.error("Failed to fetch permissions:", e);
    }
  };

  const fetchPrivileges = async () => {
    try {
      const res = await adminAPI.getPrivileges();
      setPrivileges(res.data);
    } catch (e) {
      console.error("Failed to fetch privileges:", e);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const statsRes = await adminAPI.getSystemStatistics();
      setStatistics(statsRes.data);
    } catch (e) {
      console.error("Failed to fetch dashboard data:", e);
    }
  };

  const fetchAllSessions = async () => {
    try {
      const response = await adminAPI.getAllSessionsForAdmin();
      setSessionsAdmin(response.data);
    } catch (e) {
      console.error("Failed to fetch all sessions:", e);
    }
  };

  // Permission checking functions
  const hasPermission = (permissionName: string) => {
    // Check if user has the permission through their roles
    // We need to check the user's assigned roles, not all roles in the system
    // For now, check if user is admin or has the specific permission
    return userRole === "ADMIN" || userRole === "ROLE_ADMIN" ||
           // Check if any of the user's roles have this permission
           roles.some(role =>
             role.permissions?.some(perm => perm.name === permissionName)
           );
  };

  const hasPrivilege = (privilegeName: string) => {
    // Check if user has the privilege through their roles
    return userRole === "ADMIN" || userRole === "ROLE_ADMIN" ||
           // Check if any of the user's roles have this privilege
           roles.some(role =>
             role.privileges?.some(priv => priv.name === privilegeName)
           );
  };

  const canManageUsers = () => {
    return userRole === "ADMIN" || userRole === "ROLE_ADMIN" ||
           hasPermission("USER_MANAGEMENT") || hasPrivilege("ACCESS_USER_MANAGEMENT");
  };

  const canManageRoles = () => {
    return userRole === "ADMIN" || userRole === "ROLE_ADMIN" ||
           hasPrivilege("ACCESS_ROLE_MANAGEMENT");
  };

  const canAccessStatistics = () => {
    return hasPrivilege("ACCESS_STATISTICS_TAB") || userRole === "ADMIN";
  };

  // Create Role functionality
  const handleCreateRole = async () => {
    try {
      const roleData = {
        name: roleForm.name,
        permissionNames: roleForm.permissions.map(id => {
          const perm = permissions.find(p => p.id === id);
          return perm ? perm.name : '';
        }).filter(name => name !== ''),
        privilegeNames: roleForm.privileges.map(id => {
          const priv = privileges.find(p => p.id === id);
          return priv ? priv.name : '';
        }).filter(name => name !== '')
      };

      await adminAPI.createRole(roleData);
      showMessage("Role created successfully with permissions and privileges");

      // Reset form
      setRoleForm({
        name: '',
        description: '',
        permissions: [],
        privileges: []
      });
      setShowRoleForm(false);
      fetchRoles();
    } catch (e) {
      console.error("Failed to create role:", e);
      showMessage("Failed to create role", "error");
    }
  };

  // Create User functionality
  const handleCreateUser = async () => {
    try {
      // Get selected role names
      const selectedRoleNames = userForm.roles.map(id => {
        const role = roles.find(r => r.id === id);
        return role ? role.name : '';
      }).filter(name => name !== '');

      const userData = {
        username: userForm.username,
        email: userForm.email,
        name: userForm.name,
        password: userForm.password,
        roles: selectedRoleNames.map(name => ({ name })) // Send role objects with names
      };

      await adminAPI.createUser(userData);
      showMessage("User created successfully");

      // Reset form
      setUserForm({
        username: '',
        email: '',
        name: '',
        password: '',
        roles: []
      });
      setShowUserForm(false);
      fetchUsers();
    } catch (e) {
      console.error("Failed to create user:", e);
      showMessage("Failed to create user", "error");
    }
  };

  // Delete role
  const handleDeleteRole = async (roleId: number) => {
    if (!confirm("Are you sure you want to delete this role?")) return;

    try {
      await adminAPI.deleteRole(roleId);
      showMessage("Role deleted successfully");
      fetchRoles();
    } catch (e) {
      console.error("Failed to delete role:", e);
      showMessage("Failed to delete role", "error");
    }
  };

  // Delete user
  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await adminAPI.deleteUser(userId);
      showMessage("User deleted successfully");
      fetchUsers();
    } catch (e) {
      console.error("Failed to delete user:", e);
      showMessage("Failed to delete user", "error");
    }
  };

  // Fetch chat messages for selected session
  const fetchChatMessages = async (sessionId: number) => {
    try {
      const response = await adminAPI.getSessionMessages(sessionId);
      setChatMessages(prev => ({
        ...prev,
        [sessionId]: response.data.map((msg: any) => ({
          id: msg.id,
          sender: msg.sender?.username || "Unknown",
          content: msg.content,
          sentAt: msg.sentAt,
          messageType: msg.messageType,
        }))
      }));
    } catch (e) {
      console.error("Failed to fetch chat messages:", e);
      showMessage("Failed to load chat messages", "error");
    }
  };

  // Fetch user chat statistics
  const fetchUserChatStats = async (userId: number) => {
    try {
      // Get current date for monthly stats
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // JavaScript months are 0-indexed

      const response = await adminAPI.getUserMonthlyChatStats(userId, year, month);
      setUserChatStats(prev => ({
        ...prev,
        [userId]: response.data
      }));
    } catch (e) {
      console.error("Failed to fetch user chat stats:", e);
      showMessage("Failed to load user statistics", "error");
    }
  };

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === "dashboard") fetchDashboardData();
    else if (activeTab === "users") fetchUsers();
    else if (activeTab === "roles") fetchRoles();
    else if (activeTab === "permissions") fetchPermissions();
    else if (activeTab === "privileges") fetchPrivileges();
    else if (activeTab === "admin-history") fetchAllSessions();
    else if (activeTab === "statistics") fetchDashboardData(); // Load system stats for statistics tab
  }, [activeTab]);

  // Chat functionality
  useEffect(() => {
    if (!token || !selected) return;
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/chat/sessions/${selected}/messages/recent`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages((prev) => ({
          ...prev,
          [selected]: res.data.map((msg: any) => ({
            id: msg.id,
            sender: msg.sender?.username || "Unknown",
            content: msg.content,
            sentAt: msg.sentAt,
            messageType: msg.messageType,
          })),
        }));
      } catch (e) {
        console.error("Fetch messages failed:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [selected, token]);

  // Fetch sessions - for admin users, fetch all sessions, for regular users, fetch their own
  useEffect(() => {
    if (!token) return;
    const fetchSessions = async () => {
      try {
        let res;
        if (userRole === "ADMIN" || userRole === "ROLE_ADMIN") {
          // Admin users can see all active sessions
          res = await axios.get(`${API}/admin/sessions/active`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          // Regular users see only their own sessions
          res = await axios.get(`${API}/chat/sessions`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
        setSessions(res.data.slice(0, 4));
      } catch (e) {
        console.error("Fetch sessions failed:", e);
      }
    };
    fetchSessions();
    const timer = setInterval(fetchSessions, 10000);
    return () => clearInterval(timer);
  }, [token, userRole]);

  // Connect WS & subscribe per session
  useEffect(() => {
    if (!token || sessions.length === 0) return;
    if (clientRef.current) clientRef.current.deactivate();

    const sock = new SockJS("http://localhost:8080/ws-chat");
    const c = new Client({
      webSocketFactory: () => sock,
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => {
        sessions.forEach((s) =>
          c.subscribe(`/topic/chat/${s.id}`, (msg) => {
            const data = JSON.parse(msg.body);
            // For admin users, show all messages. For regular users, filter out their own messages
            if (userRole !== "ADMIN" && userRole !== "ROLE_ADMIN" && data.sender?.username === username) return;

            setMessages((p) => ({
              ...p,
              [s.id]: [
                ...(p[s.id] || []),
                {
                  id: data.id,
                  sender: data.sender?.username || "Unknown",
                  content: data.content,
                  sentAt: data.sentAt,
                  messageType: data.messageType,
                }
              ],
            }));
          })
        );
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
      },
      reconnectDelay: 5000,
    });
    c.activate();
    clientRef.current = c;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [sessions, token, userRole, username]);

  // Send message with database persistence and real-time updates
  const sendMsg = async () => {
    console.log("sendMsg called with:", { selected, input, token: !!token });

    // Enhanced validation
    if (!selected) {
      alert("Please select a chat session first.");
      return;
    }

    if (!input.trim()) {
      alert("Please enter a message.");
      return;
    }

    if (!token) {
      alert("Authentication required. Please refresh the page and login again.");
      return;
    }

    // Validate session exists
    const session = sessions.find((s) => s.id === selected);
    if (!session) {
      alert("Selected session not found. Please select a valid session.");
      return;
    }

    // Find target session and receiver
    const receiver = session?.participants?.[0]?.username || "defaultuser";
    console.log("Sending to session:", selected, "receiver:", receiver);

    // Generate unique temporary ID to prevent duplicate display
    // Format: temp-admin-timestamp-random to ensure uniqueness
    const tempMessageId = `temp-admin-${Date.now()}-${Math.random()}`;

    // Store message content before clearing input
    const messageContent = input.trim();

    // Optimistic UI update - show message immediately for instant feedback
    const optimisticMessage = {
      id: tempMessageId, // Unique temp ID prevents conflicts with real messages
      sender: username || "admin",
      content: messageContent,
      sentAt: new Date().toISOString(),
      messageType: "TEXT",
    };

    // Add message to UI immediately (optimistic update)
    setMessages((prev) => ({
      ...prev,
      [selected]: [...(prev[selected] || []), optimisticMessage],
    }));

    // Clear input field immediately
    setInput("");

    try {
      console.log("Sending REST API request to:", `${API}/chat/sessions/${selected}/messages`);

      // Send message via REST API (more reliable than WebSocket for persistence)
      const response = await axios.post(`${API}/chat/sessions/${selected}/messages`, {
        content: messageContent,
        messageType: "TEXT"
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      console.log("Message sent successfully:", response.data);

      // Update the optimistic message with the real message ID
      setMessages((prev) => ({
        ...prev,
        [selected]: (prev[selected] || []).map(msg =>
          msg.id === tempMessageId ? { ...msg, id: response.data.id } : msg
        ),
      }));

      // Show success notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Message Sent", {
          body: "Your message has been sent successfully",
          icon: "/favicon.ico",
          tag: "message-sent"
        });
      }
    } catch (e: any) {
      console.error("Failed to send message:", e);
      console.error("Error details:", e.response?.data, e.response?.status);

      // Remove optimistic message on failure
      setMessages((prev) => ({
        ...prev,
        [selected]: (prev[selected] || []).filter(msg => msg.id !== tempMessageId),
      }));

      // Restore message to input for retry
      setInput(messageContent);

      // More specific error message
      if (e.response?.status === 401) {
        alert("Authentication failed. Please refresh the page and login again.");
      } else if (e.response?.status === 403) {
        alert("You don't have permission to send messages to this session.");
      } else if (e.response?.status === 404) {
        alert("Session not found. Please select a valid session.");
      } else {
        alert(`Failed to send message: ${e.response?.data?.message || e.message || 'Unknown error'}. Please try again.`);
      }
    }
  };

  return (
    <div className="parent-container"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12vh",
      }}
    >
      <style>
        {`
          .tab-content {
            min-height: 500px;
          }
          .form-check-input:checked {
            background-color: #dc3545;
          }
          .role-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
            transition: all 0.3s ease;
          }
          .role-card:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          button {
            background-color: #000080;
            color: white;
          }
        `}
      </style>
      
      <div className="logo-container"><Menu /></div>

      <div className="margin-top container-fluid py-4 px-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0 text-lg sm:text-xl md:text-2xl lg:text-3xl">Agent Dashboard</h4>
          <div>
            <button
              className="btn btn-outline-primary btn-sm me-2 text-xs sm:text-sm"
              onClick={() => setShowPasswordChange(true)}
            >
              Change Password
            </button>
            <button className="btn btn-outline-danger btn-sm text-xs sm:text-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`alert ${message.type === "error" ? "alert-danger" : "alert-success"}`}>
            {message.text}
          </div>
        )}

        {/* Debug Information */}
        <div className="alert alert-info" style={{ fontSize: '12px' }}>
          <strong>🔍 Debug Info:</strong><br />
          <strong>User:</strong> {userRole}<br />
          <strong>Privileges:</strong> {userPrivileges.length > 0 ? userPrivileges.join(', ') : 'None'}
        </div>

        {/* ALL TABS IN MAIN INTERFACE - NO SEPARATE ADMIN PANEL */}
        <ul className="nav nav-pills mb-3 sm:mb-4">
          <li className="nav-item">
            <button
              className={`nav-link text-sm sm:text-base ${activeTab === "chats" ? "active" : ""}`}
              style={activeTab === "chats" ? { backgroundColor: '#003366' } : {}}
              onClick={() => setActiveTab("chats")}
            >
              💬 Chats
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link text-sm sm:text-base ${activeTab === "dashboard" ? "active" : ""}`}
              style={activeTab === "dashboard" ? { backgroundColor: '#003366' } : {}}
              onClick={() => setActiveTab("dashboard")}
            >
              📊 Dashboard
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link text-sm sm:text-base ${activeTab === "users" ? "active" : ""}`}
              style={activeTab === "users" ? { backgroundColor: '#003366' } : {}}
              onClick={() => setActiveTab("users")}
            >
              👥 Users
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link text-sm sm:text-base ${activeTab === "roles" ? "active" : ""}`}
              style={activeTab === "roles" ? { backgroundColor: '#003366' } : {}}
              onClick={() => setActiveTab("roles")}
            >
              🔑 Roles
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link text-sm sm:text-base ${activeTab === "permissions" ? "active" : ""}`}
              style={activeTab === "permissions" ? { backgroundColor: '#003366' } : {}}
              onClick={() => setActiveTab("permissions")}
            >
              🛡️ Permissions
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link text-sm sm:text-base ${activeTab === "privileges" ? "active" : ""}`}
              style={activeTab === "privileges" ? { backgroundColor: '#003366' } : {}}
              onClick={() => setActiveTab("privileges")}
            >
              ⚡ Privileges
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link text-sm sm:text-base ${activeTab === "admin-history" ? "active" : ""}`}
              style={activeTab === "admin-history" ? { backgroundColor: '#003366' } : {}}
              onClick={() => setActiveTab("admin-history")}
            >
              📚 Chat History
            </button>
          </li>

          {canAccessStatistics() && (
            <li className="nav-item">
              <button
                className={`nav-link text-sm sm:text-base ${activeTab === "statistics" ? "active" : ""}`}
                style={activeTab === "statistics" ? { backgroundColor: '#003366' } : {}}
                onClick={() => setActiveTab("statistics")}
              >
                📈 Statistics
              </button>
            </li>
          )}
        </ul>

        {/* Tab Content - ALL INTEGRATED INTO MAIN INTERFACE */}
        <div className="tab-content">
          
          {/* CHATS TAB */}
          {activeTab === "chats" && (
            <div className="row">
              <div className="col-12 col-md-4 border-end">
                <h6 className="text-sm sm:text-base">Active Sessions ({sessions.length})</h6>
                <ul className="list-group">
                  {sessions.map((s) => (
                    <li
                      key={s.id}
                      className={`list-group-item text-sm sm:text-base ${s.id === selected ? "active" : ""}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelected(s.id)}
                    >
                      #{s.id} – {s.sessionName}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-12 col-md-8 d-flex flex-column">
                {selected ? (
                  <>
                    <div className="border rounded p-2 flex-grow-1 overflow-auto bg-light messages-container" style={{ maxHeight: "400px" }}>
                      {loading && <div className="text-center">Loading messages...</div>}
                      {(messages[selected] || []).map((m, i) => (
                        <div
                          key={m.id || i}
                          className={`p-2 my-1 rounded text-sm ${
                            m.sender === username ? "bg-primary text-white text-end" : "bg-white border text-start"
                          }`}
                        >
                          <small>
                            <b>{typeof m.sender === 'string' ? m.sender : m.sender.username}:</b> {m.content}
                            <br />
                            {m.sentAt && (
                              <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                                {new Date(m.sentAt).toLocaleTimeString()}
                              </span>
                            )}
                          </small>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 d-flex">
                      <input
                        className="form-control"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                        placeholder="Type message..."
                        disabled={loading}
                      />
                      <button className="btn btn-dark ms-2" onClick={sendMsg} disabled={loading || !input.trim()}>
                        ➤
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-muted d-flex align-items-center justify-content-center h-100">
                    Select a session to begin chatting
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div>
              <h5>📊 System Dashboard</h5>
              <div className="row">
                <div className="col-md-3">
                  <div className="card bg-primary text-white">
                    <div className="card-body">
                      <h5 className="card-title">{users.length}</h5>
                      <p className="card-text">Total Users</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-success text-white">
                    <div className="card-body">
                      <h5 className="card-title">{roles.length}</h5>
                      <p className="card-text">Total Roles</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-info text-white">
                    <div className="card-body">
                      <h5 className="card-title">{permissions.length}</h5>
                      <p className="card-text">Total Permissions</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-warning text-white">
                    <div className="card-body">
                      <h5 className="card-title">{privileges.length}</h5>
                      <p className="card-text">Total Privileges</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* USERS TAB WITH CREATE FUNCTIONALITY */}
          {activeTab === "users" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>👥 User Management</h5>
                {canManageUsers() && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowUserForm(!showUserForm)}
                  >
                    + Create User
                  </button>
                )}
              </div>

              {/* Create User Form */}
              {showUserForm && canManageUsers() && (
                <div className="card mb-3">
                  <div className="card-header">
                    <h6>Create New User</h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            value={userForm.username}
                            onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={userForm.email}
                            onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={userForm.name}
                            onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            value={userForm.password}
                            onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Assign Roles</label>
                      {canManageRoles() && (
                        <button
                          className="btn btn-outline-secondary btn-sm mb-2"
                          onClick={() => setShowRoleForm(true)}
                        >
                          + Create New Role
                        </button>
                      )}
                      <div className="row">
                        {roles.map(role => (
                          <div key={role.id} className="col-md-4">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={userForm.roles.includes(role.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setUserForm({
                                      ...userForm,
                                      roles: [...userForm.roles, role.id]
                                    });
                                  } else {
                                    setUserForm({
                                      ...userForm,
                                      roles: userForm.roles.filter(id => id !== role.id)
                                    });
                                  }
                                }}
                              />
                              <label className="form-check-label">
                                {role.name}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => setShowUserForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleCreateUser}
                        disabled={!userForm.username || !userForm.email || !userForm.password}
                      >
                        Create User
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Roles</th>
                      {canManageUsers() && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.name}</td>
                        <td>{user.roles?.map(r => r.name).join(', ') || 'None'}</td>
                        {canManageUsers() && (
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ROLES TAB WITH CREATE FUNCTIONALITY */}
          {activeTab === "roles" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>🔑 Role Management</h5>
                {canManageRoles() && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowRoleForm(!showRoleForm)}
                  >
                    + Create Role
                  </button>
                )}
              </div>

              {/* Create Role Form */}
              {showRoleForm && canManageRoles() && (
                <div className="card mb-3">
                  <div className="card-header">
                    <h6>Create New Role</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Role Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={roleForm.name}
                        onChange={(e) => setRoleForm({...roleForm, name: e.target.value})}
                        placeholder="e.g., ROLE_MANAGER"
                      />
                    </div>

                    {/* Permissions Mapping */}
                    <div className="mb-3">
                      <label className="form-label">Assign Permissions</label>
                      <div className="row">
                        {permissions.map(permission => (
                          <div key={permission.id} className="col-md-4">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={roleForm.permissions.includes(permission.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setRoleForm({
                                      ...roleForm,
                                      permissions: [...roleForm.permissions, permission.id]
                                    });
                                  } else {
                                    setRoleForm({
                                      ...roleForm,
                                      permissions: roleForm.permissions.filter(id => id !== permission.id)
                                    });
                                  }
                                }}
                              />
                              <label className="form-check-label">
                                <strong>{permission.name}</strong><br/>
                                <small className="text-muted">{permission.description}</small>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Privileges Mapping */}
                    <div className="mb-3">
                      <label className="form-label">Assign Privileges</label>
                      <div className="row">
                        {privileges.map(privilege => (
                          <div key={privilege.id} className="col-md-4">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={roleForm.privileges.includes(privilege.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setRoleForm({
                                      ...roleForm,
                                      privileges: [...roleForm.privileges, privilege.id]
                                    });
                                  } else {
                                    setRoleForm({
                                      ...roleForm,
                                      privileges: roleForm.privileges.filter(id => id !== privilege.id)
                                    });
                                  }
                                }}
                              />
                              <label className="form-check-label">
                                <strong>{privilege.name}</strong>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => setShowRoleForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleCreateRole}
                        disabled={!roleForm.name}
                      >
                        Create Role
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Roles List with Details */}
              <div className="row">
                {roles.map((role) => (
                  <div key={role.id} className="col-md-6">
                    <div className="role-card">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="mb-0">{role.name}</h6>
                        <div>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => setShowRoleDetails(showRoleDetails === role.id ? null : role.id)}
                          >
                            {showRoleDetails === role.id ? 'Hide' : 'Show'} Details
                          </button>
                          {canManageRoles() && (
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteRole(role.id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>

                      {showRoleDetails === role.id && (
                        <div className="mt-3">
                          <h6>Assigned Permissions:</h6>
                          <div className="row">
                            {role.permissions?.map(permission => (
                              <div key={permission.id} className="col-md-6">
                                <div className="badge bg-info text-dark me-1 mb-1">
                                  {permission.name}
                                </div>
                              </div>
                            )) || <div className="text-muted">No permissions assigned</div>}
                          </div>

                          <h6 className="mt-3">Assigned Privileges:</h6>
                          <div className="row">
                            {role.privileges?.map(privilege => (
                              <div key={privilege.id} className="col-md-6">
                                <div className="badge bg-warning text-dark me-1 mb-1">
                                  {privilege.name}
                                </div>
                              </div>
                            )) || <div className="text-muted">No privileges assigned</div>}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PERMISSIONS TAB */}
          {activeTab === "permissions" && (
            <div>
              <h5>🛡️ Permission Management</h5>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Resource Pattern</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((permission) => (
                      <tr key={permission.id}>
                        <td>{permission.id}</td>
                        <td>{permission.name}</td>
                        <td>{permission.permissionType}</td>
                        <td>{permission.description}</td>
                        <td>{permission.resourcePattern || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PRIVILEGES TAB */}
          {activeTab === "privileges" && (
            <div>
              <h5>⚡ Privilege Management</h5>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Privilege Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {privileges.map((privilege) => (
                      <tr key={privilege.id}>
                        <td>{privilege.id}</td>
                        <td>{privilege.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADMIN HISTORY TAB - CHAT SELECTION AND VIEWING */}
          {activeTab === "admin-history" && (
            <div>
              <h5>📚 Chat History Management</h5>
              <div className="row">
                <div className="col-12 col-md-4 border-end">
                  <h6 className="text-sm sm:text-base">Chat Sessions ({sessionsAdmin.length})</h6>
                  <div className="list-group" style={{ maxHeight: "500px", overflowY: "auto" }}>
                    {sessionsAdmin.map((session) => (
                      <button
                        key={session.id}
                        className={`list-group-item list-group-item-action text-sm sm:text-base ${
                          selectedChatSession === session.id ? "active" : ""
                        }`}
                        onClick={() => {
                          setSelectedChatSession(session.id);
                          fetchChatMessages(session.id);
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>#{session.id}</strong> – {session.sessionName}
                          </div>
                          <span className={`badge ${session.active ? 'bg-success' : 'bg-secondary'}`}>
                            {session.active ? 'Active' : 'Completed'}
                          </span>
                        </div>
                        <small className="text-muted">
                          {new Date(session.createdAt).toLocaleString()}
                        </small>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="col-12 col-md-8 d-flex flex-column">
                  {selectedChatSession ? (
                    <>
                      <div className="border rounded p-2 flex-grow-1 overflow-auto bg-light" style={{ maxHeight: "500px" }}>
                        <h6>Conversation #{selectedChatSession}</h6>
                        {chatMessages[selectedChatSession] ? (
                          chatMessages[selectedChatSession].map((msg, i) => (
                            <div
                              key={msg.id || i}
                              className={`p-2 my-1 rounded text-sm ${
                                msg.sender === username ? "bg-primary text-white text-end" : "bg-white border text-start"
                              }`}
                            >
                              <small>
                                <b>{typeof msg.sender === 'string' ? msg.sender : msg.sender.username}:</b> {msg.content}
                                <br />
                                {msg.sentAt && (
                                  <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                                    {new Date(msg.sentAt).toLocaleTimeString()}
                                  </span>
                                )}
                              </small>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-muted">Loading conversation...</div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-muted d-flex align-items-center justify-content-center h-100">
                      Select a chat session to view the conversation
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STATISTICS TAB */}
          {activeTab === "statistics" && canAccessStatistics() && (
            <div>
              <h5>📈 Chat Statistics</h5>

              {/* Period Selection */}
              <div className="mb-3">
                <label className="form-label">Select Period:</label>
                <select
                  className="form-select"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              {/* User Chat Statistics Widget */}
              <UserChatStatsWidget
                users={users}
                userChatStats={userChatStats}
                selectedPeriod={selectedPeriod}
                onFetchUserStats={fetchUserChatStats}
              />

              {/* System Statistics */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">System Overview</h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="text-center">
                            <h4 className="text-primary">{statistics.totalSessions || 0}</h4>
                            <small className="text-muted">Total Sessions</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="text-center">
                            <h4 className="text-success">{statistics.totalMessages || 0}</h4>
                            <small className="text-muted">Total Messages</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Active Sessions</h6>
                    </div>
                    <div className="card-body">
                      <div className="text-center">
                        <h4 className="text-info">{statistics.activeSessions || 0}</h4>
                        <small className="text-muted">Currently Active</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Password Change Modal */}
        {showPasswordChange && (
          <PasswordChange
            token={token}
            onClose={() => setShowPasswordChange(false)}
          />
        )}
      </div>
    </div>
  );
};

export default IntegratedAdminDashboard;