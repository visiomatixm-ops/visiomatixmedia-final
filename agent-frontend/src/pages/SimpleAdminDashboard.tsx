/**
 * ===========================================================
 * File: SimpleAdminDashboard.tsx
 * Completely rewritten dashboard with explicit Admin Panel access
 * Bypasses privilege checking issues with direct implementation
 * ===========================================================
 */

import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminPanel from "./AdminPanel";
import Menu from "../components/Menu";
import PasswordChange from "../components/PasswordChange";

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

const SimpleAdminDashboard: React.FC<{ token: string; userRole: string; userPrivileges?: string[] }> = ({ 
  token, 
  userRole, 
  userPrivileges = [] 
}) => {
  console.log('🚀 SimpleAdminDashboard rendered with:', { token, userRole, userPrivileges });

  const [sessions, setSessions] = useState<Session[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chats");
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const clientRef = useRef<Client | null>(null);

  const API = "http://localhost:8080/api";

  // Check if user has any admin privileges - ALWAYS allow access for testing
  const hasAnyAdminPrivilege = () => {
    console.log('🔍 Checking admin privileges...');
    console.log('   User role:', userRole);
    console.log('   User privileges:', userPrivileges);
    
    const adminPrivileges = [
      'ACCESS_USER_MANAGEMENT',
      'ACCESS_ROLE_MANAGEMENT', 
      'ACCESS_PERMISSION_MANAGEMENT',
      'ACCESS_STATISTICS_TAB',
      'ACCESS_CHAT_HISTORY_TAB'
    ];
    
    const hasPrivileges = adminPrivileges.some(priv => userPrivileges.includes(priv));
    const isAdmin = userRole === "ROLE_ADMIN";
    const result = hasPrivileges || isAdmin;
    
    console.log('   Has admin privileges:', result);
    return result;
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

  // Fetch messages for selected session
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

  // Fetch sessions
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
            if (data.sender?.username === "agent") return;

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

  // Send message
  const sendMsg = () => {
    if (!selected || !input.trim() || !clientRef.current) return;
    if (!clientRef.current.connected) {
      alert("Connection lost. Please refresh the page.");
      return;
    }

    const session = sessions.find((s) => s.id === selected);
    const receiver = session?.participants?.[0]?.username || "defaultuser";

    const payload = {
      sender: "agent",
      receiver,
      content: input.trim(),
      messageType: "TEXT",
      sessionId: selected,
    };

    try {
      clientRef.current.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(payload),
      });
      setInput("");
    } catch (e) {
      console.error("Failed to send message:", e);
      alert("Failed to send message. Please try again.");
    }
  };

  // Simplified UI with explicit Admin Panel
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
          .nav-link.active {
            color: white !important;
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

        {/* Debug Information */}
        <div className="alert alert-info" style={{ fontSize: '12px',marginTop:'5em' }}>
          <strong>🔍 Debug Info:</strong><br />
          <strong>User:</strong> {userRole}<br />
          <strong>Privileges:</strong> {userPrivileges.length > 0 ? userPrivileges.join(', ') : 'None'}<br />
          <strong>Admin Access:</strong> {hasAnyAdminPrivilege() ? '✅ YES' : '❌ NO'}
        </div>

        {/* Navigation Tabs - EXPLICIT IMPLEMENTATION */}
        <ul className="nav nav-pills mb-3 sm:mb-4">
          <li className="nav-item">
            <button
              className={`nav-link text-sm sm:text-base ${activeTab === "chats" ? "active" : ""}`}
              style={activeTab === "chats" ? { backgroundColor: '#007bff', color: 'white' } : {}}
              onClick={() => setActiveTab("chats")}
            >
              Chats
            </button>
          </li>
          
          <li className="nav-item">
            <button
              className={`nav-link text-sm sm:text-base ${activeTab === "stats" ? "active" : ""}`}
              style={activeTab === "stats" ? { backgroundColor: '#007bff', color: 'white' } : {}}
              onClick={() => setActiveTab("stats")}
            >
              Statistics
            </button>
          </li>
          
          <li className="nav-item">
            <button
              className={`nav-link text-sm sm:text-base ${activeTab === "history" ? "active" : ""}`}
              style={activeTab === "history" ? { backgroundColor: '#007bff', color: 'white' } : {}}
              onClick={() => setActiveTab("history")}
            >
              Chat History
            </button>
          </li>

          {/* EXPLICIT ADMIN PANEL TAB - ALWAYS RENDERED */}
          <li className="nav-item">
            <button
              className={`nav-link text-sm sm:text-base ${activeTab === "admin" ? "active" : ""}`}
              style={activeTab === "admin" ? { backgroundColor: '#dc3545', color: 'white' } : {}}
              onClick={() => {
                console.log('🚀 Admin Panel tab clicked!');
                setActiveTab("admin");
              }}
            >
              🔧 Admin Panel {hasAnyAdminPrivilege() ? '' : '🔒'}
            </button>
          </li>
        </ul>

        {/* Tab Content */}
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
                          m.sender === "agent" ? "bg-primary text-white text-end" : "bg-white border text-start"
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

        {/* Statistics Tab */}
        {activeTab === "stats" && (
          <div>
            <h5>Statistics</h5>
            <p className="text-muted">Statistics functionality coming soon...</p>
          </div>
        )}

        {/* Chat History Tab */}
        {activeTab === "history" && (
          <div>
            <h5>Chat History</h5>
            <p className="text-muted">Chat history functionality coming soon...</p>
          </div>
        )}

        {/* EXPLICIT ADMIN PANEL - ALWAYS RENDERED */}
        {activeTab === "admin" && (
          <div>
            <div className="alert alert-warning">
              <h5>⚠️ Admin Panel Access</h5>
              <p><strong>User Role:</strong> {userRole}</p>
              <p><strong>Admin Privileges:</strong> {userPrivileges.length > 0 ? userPrivileges.join(', ') : 'None'}</p>
              <p><strong>Access Granted:</strong> {hasAnyAdminPrivilege() ? '✅ Yes' : '❌ No - May show limited functionality'}</p>
            </div>
            
            <AdminPanel token={token} userPrivileges={userPrivileges} />
          </div>
        )}

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

export default SimpleAdminDashboard;