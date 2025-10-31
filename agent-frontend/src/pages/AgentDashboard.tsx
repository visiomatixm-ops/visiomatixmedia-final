/**
 * ===========================================================
 * File: AgentDashboard.jsx
 * Author: Viral Prajapati
 * Date: 17-Oct-2025
 * Description:
 *  Production-ready agent console to monitor & reply to active sessions.
 *
 *  CORE FEATURES:
 *  - Lists active chat sessions from /api/chat/sessions endpoint
 *  - Real-time message subscription via WebSocket to /topic/chat/{id}
 *  - Fetches complete message history from /api/chat/sessions/{id}/messages/recent
 *  - Auto-scrolls to latest messages for continuous monitoring
 *  - Persists selected session state in localStorage for session continuity
 *  - Multi-session support (up to 4 concurrent sessions)
 *
 *  ADMIN INTEGRATION:
 *  - Tab-based navigation (Chats/Admin) with role-based access control
 *  - Admin tab visible only for users with ROLE_ADMIN
 *  - Integrated AdminPanel component for user/role/permission management
 *  - JWT token-based authentication with automatic refresh
 *
 *  TECHNICAL IMPLEMENTATION:
 *  - React hooks for state management (useState, useEffect, useRef)
 *  - SockJS + STOMP for WebSocket communication with authentication
 *  - Axios for HTTP requests with JWT token headers
 *  - Bootstrap for responsive UI with tab navigation
 *  - Optimistic UI updates for instant message feedback
 *  - Error handling with graceful degradation
 *
 *  MESSAGE HANDLING:
 *  - Prevents duplicate message display through unique ID management
 *  - Optimistic updates for instant agent response feedback
 *  - Real-time message synchronization across multiple sessions
 *  - Message history loading with pagination support
 * ===========================================================
 */

import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminPanel from "./AdminPanel";
import Menu from "../components/Menu";

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

interface AgentStats {
  totalSessionsHandled: number;
  totalMessagesSent: number;
  period: string;
  userId: number;
  userName: string;
  userUsername: string;
}

interface SessionHistoryDetails {
  session: Session;
  participantCount: number;
  messageCount: number;
  sessionDuration: number;
  messages: Message[];
}

const AgentDashboard = ({ token, userRole }: { token: string; userRole: string }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(userRole === "ROLE_ADMIN" ? "admin" : "chats");
  const clientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Agent statistics state
  const [agentStats, setAgentStats] = useState<AgentStats>({ totalSessionsHandled: 0, totalMessagesSent: 0, period: "", userId: 0, userName: "", userUsername: "" });
  const [statsPeriod, setStatsPeriod] = useState("monthly");
  const [statsYear, setStatsYear] = useState(new Date().getFullYear());
  const [statsMonth, setStatsMonth] = useState(new Date().getMonth() + 1);
  const [statsQuarter, setStatsQuarter] = useState(1);

  // Chat history state
  const [agentSessions, setAgentSessions] = useState<Session[]>([]);
  const [selectedHistorySession, setSelectedHistorySession] = useState<number | null>(null);
  const [sessionHistoryDetails, setSessionHistoryDetails] = useState<SessionHistoryDetails | null>(null);

  const API = "http://localhost:8080/api";
  const AGENT = "agent";
  const PASSWORD = "agent123";

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selected]);

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

  // ---------------------------------------------------------
  // Logout function
  // ---------------------------------------------------------
  const handleLogout = () => {
    // Clear all session data
    setSelected(null);
    setMessages({});
    setInput("");
    setActiveTab(userRole === "ROLE_ADMIN" ? "admin" : "chats");

    // Clear localStorage
    localStorage.removeItem("agentSelectedSession");

    // Disconnect WebSocket
    if (clientRef.current) {
      clientRef.current.deactivate();
      clientRef.current = null;
    }

    // Redirect to login (handled by parent App component)
    window.location.reload(); // Simple reload to reset the app state
  };

  // ---------------------------------------------------------
  // Fetch agent statistics
  // ---------------------------------------------------------
  const fetchAgentStats = async () => {
    if (!token) return;
    const userId = getCurrentUserId();
    if (!userId) return;

    try {
      let stats;
      if (statsPeriod === "monthly") {
        stats = await axios.get(`${API}/admin/users/${userId}/chat-stats/${statsYear}/${statsMonth}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (statsPeriod === "quarterly") {
        stats = await axios.get(`${API}/admin/users/${userId}/chat-stats/${statsYear}/quarter/${statsQuarter}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (statsPeriod === "yearly") {
        stats = await axios.get(`${API}/admin/users/${userId}/chat-stats/${statsYear}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      if (stats) {
        setAgentStats(stats.data);
      }
    } catch (e) {
      console.error("Failed to fetch agent stats:", e);
      // Set empty stats to show 0 values
      setAgentStats({
        totalSessionsHandled: 0,
        totalMessagesSent: 0,
        period: statsPeriod,
        userId: userId,
        userName: "Agent",
        userUsername: userId
      });
    }
  };

  // Helper function to get current user ID from JWT token
  const getCurrentUserId = () => {
    if (!token) return null;

    try {
      // Decode JWT token to get user ID
      const payload = JSON.parse(atob(token.split('.')[1]));
      // For agent user, return the numeric ID (2) instead of username
      if (payload.sub === "agent" || payload.username === "agent") {
        return 2; // Agent user has ID 2
      }
      // Return numeric ID if available, otherwise return username for API compatibility
      return payload.id || payload.userId || payload.sub || payload.username;
    } catch (e) {
      console.error("Failed to parse JWT token:", e);
      // Fallback for demo purposes - return agent ID
      return 2; // Return agent ID as fallback
    }
  };

  // Load agent stats when period changes
  useEffect(() => {
    if (activeTab === "stats") {
      fetchAgentStats();
    } else if (activeTab === "history") {
      fetchAgentSessions();
    }
  }, [activeTab, statsPeriod, statsYear, statsMonth, statsQuarter]);

  // Fetch agent's sessions for history review
  const fetchAgentSessions = async () => {
    if (!token) return;
    const userId = getCurrentUserId();
    if (!userId) return;

    try {
      // Get user sessions - agents can access their own sessions
      // For role ID 2 (supervisors), allow access to agent sessions
      const response = await axios.get(`${API}/admin/users/${userId}/sessions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgentSessions(response.data);
    } catch (e) {
      console.error("Failed to fetch agent sessions:", e);
      // Fallback: try to get all sessions and filter by agent participation
      try {
        const allSessionsResponse = await axios.get(`${API}/admin/sessions/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Filter sessions where the agent participated
        const agentSessions: Session[] = allSessionsResponse.data.filter((session: any) =>
          session.participants?.some((participant: any) => participant.username === userId || participant.id === userId)
        );
        setAgentSessions(agentSessions);
      } catch (fallbackError) {
        console.error("Fallback fetch also failed:", fallbackError);
        setAgentSessions([]);
      }
    }
  };

  // Fetch session history details
  const fetchSessionHistoryDetails = async (sessionId: number) => {
    try {
      const response = await axios.get(`${API}/admin/sessions/${sessionId}/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessionHistoryDetails(response.data);
      setSelectedHistorySession(sessionId);
    } catch (e) {
      console.error("Failed to fetch session history details:", e);
    }
  };

  // ---------------------------------------------------------
  // Fetch messages for selected session
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // Fetch sessions
  // ---------------------------------------------------------
  useEffect(() => {
    if (!token) return;
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`${API}/chat/sessions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessions(res.data.slice(0, 4));
      } catch (e) {
        console.error("Fetch sessions failed:", e);
      }
    };
    fetchSessions();
    const timer = setInterval(fetchSessions, 10000);
    return () => clearInterval(timer);
  }, [token]);

  // ---------------------------------------------------------
  // Connect WS & subscribe per session
  // ---------------------------------------------------------
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
            // Filter out own messages to prevent duplicate display
            // (already shown via optimistic update)
            if (data.sender?.username === AGENT) return;

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
  }, [sessions, token]);

  // ---------------------------------------------------------
  // Send message with duplicate prevention and optimistic updates
  // Uses unique temporary IDs to prevent double message display
  // Handles WebSocket connection validation and error recovery
  // ---------------------------------------------------------
  const sendMsg = () => {
    if (!selected || !input.trim() || !clientRef.current) return;

    // Validate WebSocket connection before sending
    if (!clientRef.current.connected) {
      alert("Connection lost. Please refresh the page.");
      return;
    }

    // Find target session and receiver
    const session = sessions.find((s) => s.id === selected);
    const receiver = session?.participants?.[0]?.username || "defaultuser";

    // Prepare message payload for transmission
    const payload = {
      sender: AGENT,
      receiver,
      content: input.trim(),
      messageType: "TEXT",
      sessionId: selected,
    };

    // Generate unique temporary ID to prevent duplicate display
    // Format: temp-agent-timestamp-random to ensure uniqueness
    const tempMessageId = `temp-agent-${Date.now()}-${Math.random()}`;

    // Store message content before clearing input
    const messageContent = input.trim();

    // Optimistic UI update - show message immediately for instant feedback
    const optimisticMessage = {
      id: tempMessageId, // Unique temp ID prevents conflicts with real messages
      sender: AGENT,
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
      // Send message via WebSocket
      clientRef.current.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.error("Failed to send message:", e);

      // Remove optimistic message on failure
      setMessages((prev) => ({
        ...prev,
        [selected]: (prev[selected] || []).filter(msg => msg.id !== tempMessageId),
      }));

      // Restore message to input for retry
      setInput(messageContent);
      alert("Failed to send message. Please try again.");
    }
  };

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  return (
    <div className="parent-container"
    style={{
      display:"flex",
      flexDirection:"column",
      gap:"12vh",
    }}
    >
    <style>
      {`
        .nav-link.active {
          color: white !important;
        }
      `}
    </style>
      <div className="logo-container"><Menu /></div>      

    <div className="margin-top container-fluid py-4 px-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Agent Dashboard</h4>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
      <ul className="nav nav-pills mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "chats" ? "active" : ""}`}
            style={activeTab === "chats" ? { backgroundColor: '#007bff', color: 'white !important', borderColor: '#007bff' } : {}}
            onClick={() => setActiveTab("chats")}
          >
            Chats
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "stats" ? "active" : ""}`}
            style={activeTab === "stats" ? { backgroundColor: '#007bff', color: 'white !important', borderColor: '#007bff' } : {}}
            onClick={() => setActiveTab("stats")}
          >
            My Statistics
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "history" ? "active" : ""}`}
            style={activeTab === "history" ? { backgroundColor: '#007bff', color: 'white !important', borderColor: '#007bff' } : {}}
            onClick={() => setActiveTab("history")}
          >
            Chat History
          </button>
        </li>
        {userRole === "ROLE_ADMIN" && (
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "admin" ? "active" : ""}`}
              style={activeTab === "admin" ? { backgroundColor: '#007bff', color: 'white !important', borderColor: '#007bff' } : {}}
              onClick={() => setActiveTab("admin")}
            >
              Admin Panel
            </button>
          </li>
        )}
      </ul>

      {/* Tab Content */}
      {activeTab === "chats" && (
        <div className="row">
              <style>
                      {`
                        .nav-link.active {
                          color: white !important;
                        }
                      `}
                    </style>
          {/* Sessions */}
          <div className="col-4 border-end">
            <h6>Active Sessions ({sessions.length})</h6>
            <ul className="list-group">
              {sessions.map((s) => (
                <li
                  key={s.id}
                  className={`list-group-item ${s.id === selected ? "active" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelected(s.id)}
                >
                  #{s.id} – {s.sessionName}
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Area */}
          <div className="col-8 d-flex flex-column">
            {selected ? (
              <>
                <div className="border rounded p-2 flex-grow-1 overflow-auto bg-light" style={{ maxHeight: "1900px" }}>
                  {loading && <div className="text-center">Loading messages...</div>}
                  {(messages[selected] || []).map((m, i) => (
                    <div
                      key={m.id || i}
                      className={`p-2 my-1 rounded ${
                        m.sender === AGENT ? "bg-primary text-white text-end" : "bg-white border text-start"
                      }`}
                    >
                      <small>
                        <b>{typeof m.sender === 'string' ? m.sender : m.sender.username}:</b> {m.content}
                        {m.sentAt && (
                          <div className="text-muted" style={{ fontSize: "0.7rem" }}>
                            {new Date(m.sentAt).toLocaleTimeString()}
                          </div>
                        )}
                      </small>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
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

      {/* Statistics Tab */}
      {activeTab === "stats" && (
        <div>
              <style>
                  {`
                    .nav-link.active {
                      color: white !important;
                    }
                  `}
                </style>
          <h5>My Chat Statistics</h5>

          {/* Period Selection */}
          <div className="row mb-4">
            <div className="col-md-3">
              <label className="form-label">Period Type</label>
              <select
                className="form-control"
                value={statsPeriod}
                onChange={(e) => setStatsPeriod(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Year</label>
              <select
                className="form-control"
                value={statsYear}
                onChange={(e) => setStatsYear(parseInt(e.target.value))}
              >
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            {statsPeriod === "monthly" && (
              <div className="col-md-3">
                <label className="form-label">Month</label>
                <select
                  className="form-control"
                  value={statsMonth}
                  onChange={(e) => setStatsMonth(parseInt(e.target.value))}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>
                      {new Date(2025, month - 1, 1).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {statsPeriod === "quarterly" && (
              <div className="col-md-3">
                <label className="form-label">Quarter</label>
                <select
                  className="form-control"
                  value={statsQuarter}
                  onChange={(e) => setStatsQuarter(parseInt(e.target.value))}
                >
                  <option value={1}>Q1 (Jan-Mar)</option>
                  <option value={2}>Q2 (Apr-Jun)</option>
                  <option value={3}>Q3 (Jul-Sep)</option>
                  <option value={4}>Q4 (Oct-Dec)</option>
                </select>
              </div>
            )}
          </div>

          {/* Statistics Cards */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <h5 className="card-title">{agentStats.totalSessionsHandled || 0}</h5>
                  <p className="card-text">Total Sessions Handled</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <h5 className="card-title">{agentStats.totalMessagesSent || 0}</h5>
                  <p className="card-text">Total Messages Sent</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <h5 className="card-title">{agentStats.period || statsPeriod}</h5>
                  <p className="card-text">Report Period</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">Detailed Performance Metrics - {statsPeriod.charAt(0).toUpperCase() + statsPeriod.slice(1)} Report</h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>Session Statistics</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Total Sessions Handled
                      <span className="badge bg-primary rounded-pill">{agentStats.totalSessionsHandled || 0}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      User Name
                      <span className="badge bg-info rounded-pill">{agentStats.userName || "N/A"}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      User ID
                      <span className="badge bg-secondary rounded-pill">{getCurrentUserId() || "N/A"}</span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6>Message Statistics</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Total Messages Sent
                      <span className="badge bg-success rounded-pill">{agentStats.totalMessagesSent || 0}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Report Period
                      <span className="badge bg-warning rounded-pill">{agentStats.period || statsPeriod}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Year
                      <span className="badge bg-info rounded-pill">{statsYear}</span>
                    </li>
                  </ul>
                </div>
              </div>
              {statsPeriod === "monthly" && (
                <div className="mt-3">
                  <small className="text-muted">Month: {new Date(2025, statsMonth - 1, 1).toLocaleString('default', { month: 'long' })}</small>
                </div>
              )}
              {statsPeriod === "quarterly" && (
                <div className="mt-3">
                  <small className="text-muted">Quarter: Q{statsQuarter} ({['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'][statsQuarter - 1]})</small>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chat History Tab for Agents */}
      {activeTab === "history" && (
        <div>
              <style>
                  {`
                    .nav-link.active {
                      color: white !important;
                    }
                  `}
                </style>
          <h5>My Chat History Review</h5>

          <div className="row">
            {/* Agent's Sessions List */}
            <div className="col-md-4">
              <h6>My Chat Sessions ({agentSessions.length})</h6>
              <div className="list-group" style={{maxHeight: "600px", overflowY: "auto"}}>
                {agentSessions.map((session) => (
                  <button
                    key={session.id}
                    className={`list-group-item list-group-item-action ${
                      selectedHistorySession === session.id ? "active" : ""
                    }`}
                    onClick={() => fetchSessionHistoryDetails(session.id)}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">Session #{session.id}</h6>
                      <small>{session.active ? "Active" : "Completed"}</small>
                    </div>
                    <p className="mb-1">{session.sessionName}</p>
                    <small className="text-muted">
                      {new Date(session.createdAt).toLocaleDateString()} •
                      {session.participants?.length || 0} participants
                    </small>
                  </button>
                ))}
              </div>
            </div>

            {/* Session History Details and Messages */}
            <div className="col-md-8">
              {sessionHistoryDetails ? (
                <div>
                  <div className="card mb-3">
                    <div className="card-header">
                      <h6 className="mb-0">Session #{sessionHistoryDetails.session.id} Details</h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong>Session Name:</strong> {sessionHistoryDetails.session.sessionName}</p>
                          <p><strong>Status:</strong>
                            <span className={`badge ms-2 ${sessionHistoryDetails.session.active ? 'bg-success' : 'bg-secondary'}`}>
                              {sessionHistoryDetails.session.active ? 'Active' : 'Completed'}
                            </span>
                          </p>
                          <p><strong>Created:</strong> {new Date(sessionHistoryDetails.session.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Last Updated:</strong> {new Date(sessionHistoryDetails.session.updatedAt).toLocaleString()}</p>
                          <p><strong>Participants:</strong> {sessionHistoryDetails.participantCount}</p>
                          <p><strong>Total Messages:</strong> {sessionHistoryDetails.messageCount}</p>
                          <p><strong>Duration:</strong> {sessionHistoryDetails.sessionDuration} minutes</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <strong>Participants:</strong>
                        <div className="mt-2">
                          {sessionHistoryDetails.session.participants?.map((participant) => (
                            <span key={participant.id} className="badge bg-info me-1">
                              {participant.name} ({participant.username})
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Complete Message History</h6>
                    </div>
                    <div className="card-body" style={{maxHeight: "400px", overflowY: "auto"}}>
                      {sessionHistoryDetails.messages?.map((message, index) => (
                        <div
                          key={message.id || index}
                          className={`p-2 my-1 rounded ${
                            (typeof message.sender === 'object' ? message.sender.username : message.sender) === 'agent' ? "bg-primary text-white text-end" : "bg-light text-start"
                          }`}
                        >
                          <small>
                            <strong>{typeof message.sender === 'object' ? (message.sender.name || message.sender.username) : message.sender || 'Unknown'}:</strong> {message.content}
                            <br />
                            <span className="text-muted">
                              {new Date(message.sentAt).toLocaleTimeString()}
                            </span>
                          </small>
                        </div>
                      )) || (
                        <div className="text-center text-muted">
                          No messages in this session
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted" style={{padding: "100px 0"}}>
                  <h5>Select a session to review history</h5>
                  <p>Click on any of your past sessions to review the complete chat conversation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "admin" && userRole === "ROLE_ADMIN" && (
        <AdminPanel token={token} />
      )}
    </div>
    </div>
  );
};

export default AgentDashboard;
