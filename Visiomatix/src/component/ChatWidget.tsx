/**
 * ===========================================================
 * File: ChatWidget.tsx
 * Author: Viral Prajapati
 * Date: 17-Oct-2025
 * Description:
 *  Production-ready floating chat widget (bottom-right) for website visitors.
 *
 *  CORE FEATURES:
 *  - Register/login with username, email, password
 *  - Auto-create chat session (stores in DB) with agent
 *  - Shows chat reference ID to user for support tracking
 *  - Real-time communication via REST API + WebSocket
 *  - Fetches message history from /api/chat/sessions/{id}/messages/recent
 *  - Subscribes to /topic/chat/{id} for live message updates
 *  - Auto-scrolls to latest messages for better UX
 *  - Persists user data in localStorage for session continuity
 *  - Allows starting new session after ending current chat
 *
 *  AUTHENTICATION & SECURITY:
 *  - JWT token-based authentication with automatic refresh
 *  - Token expiry handling with seamless re-login for default user
 *  - Manual re-login option for regular users when token expires
 *  - Secure WebSocket connections with authentication headers
 *
 *  USER EXPERIENCE:
 *  - Floating widget design that doesn't interfere with main content
 *  - Responsive Bootstrap UI with modern styling
 *  - Optimistic UI updates for instant message feedback
 *  - Error handling with user-friendly messages
 *  - Session state persistence across page refreshes
 *
 *  TECHNICAL IMPLEMENTATION:
 *  - React hooks for state management (useState, useEffect, useRef)
 *  - SockJS + STOMP for WebSocket communication
 *  - Axios for HTTP requests with interceptors
 *  - TypeScript for type safety
 *  - Bootstrap for responsive UI components
 * ===========================================================
 */

import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface Message {
  id?: number | string; // Allow string IDs for temporary messages
  sender: string;
  content: string;
  sentAt?: string;
  messageType?: string;
}

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const clientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API = "http://localhost:8080/api";
  const AGENT = "agent";

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play().catch(e => console.error('Audio play failed:', e));
  };

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Restore user data from localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem("chatUsername");
    const savedEmail = localStorage.getItem("chatEmail");
    const savedName = localStorage.getItem("chatName");
    const savedToken = localStorage.getItem("chatToken");
    const savedSessionId = localStorage.getItem("chatSessionId");
    const savedTokenExpiry = localStorage.getItem("chatTokenExpiry");

    if (savedUsername) setUsername(savedUsername);
    if (savedEmail) setEmail(savedEmail);
    if (savedName) setName(savedName);
    if (savedToken) setToken(savedToken);
    if (savedSessionId) setSessionId(parseInt(savedSessionId));

    // Check if token is still valid
    if (savedToken && savedTokenExpiry) {
      const expiryTime = parseInt(savedTokenExpiry);
      const currentTime = Date.now();

      if (currentTime < expiryTime) {
        // Token is still valid, try to reconnect
        if (savedSessionId) {
          loadExistingMessages(parseInt(savedSessionId), savedToken);
          connectWS(parseInt(savedSessionId), savedToken);
        }
      } else {
        // Token expired, clear it and show login
        localStorage.removeItem("chatToken");
        localStorage.removeItem("chatTokenExpiry");
        setToken(null);
        alert("Your session has expired. Please login again.");
      }
    }
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    if (username) localStorage.setItem("chatUsername", username);
    if (email) localStorage.setItem("chatEmail", email);
    if (name) localStorage.setItem("chatName", name);
    if (token) localStorage.setItem("chatToken", token);
    if (sessionId) localStorage.setItem("chatSessionId", sessionId.toString());
  }, [username, email, name, token, sessionId]);

  // Token refresh mechanism for default user
  useEffect(() => {
    if (token && username === "defaultuser") {
      // Set up automatic token refresh 5 minutes before expiry
      const refreshInterval = setInterval(async () => {
        try {
          const res = await axios.post(`${API}/users/login`, {
            username: "defaultuser",
            password: "default123"
          });
          const newToken = res.data?.token;
          if (newToken) {
            setToken(newToken);
            localStorage.setItem("chatToken", newToken);
            // Set expiry time (assuming 1 hour from now)
            const expiryTime = Date.now() + (1 * 60 * 60 * 1000); // 1 hour
            localStorage.setItem("chatTokenExpiry", expiryTime.toString());
            console.log("Token refreshed automatically for default user");
          }
        } catch (e) {
          console.error("Token refresh failed:", e);
          // If refresh fails, clear token and show login
          setToken(null);
          localStorage.removeItem("chatToken");
          localStorage.removeItem("chatTokenExpiry");
          alert("Session expired. Please login again.");
        }
      }, 55 * 60 * 1000); // Refresh every 55 minutes (5 minutes before 1 hour expiry)

      return () => clearInterval(refreshInterval);
    }
  }, [token, username]);

  // Check for token expiry every minute and handle expired tokens
  useEffect(() => {
    const checkTokenExpiry = () => {
      const savedTokenExpiry = localStorage.getItem("chatTokenExpiry");
      if (savedTokenExpiry && token) {
        const expiryTime = parseInt(savedTokenExpiry);
        const currentTime = Date.now();

        if (currentTime >= expiryTime) {
          // Token has expired
          console.log("Token expired, clearing session");
          setToken(null);
          setSessionId(null);
          setMessages([]);
          setConnected(false);
          clientRef.current?.deactivate();
          localStorage.removeItem("chatToken");
          localStorage.removeItem("chatTokenExpiry");
          localStorage.removeItem("chatSessionId");
          alert("Your session has expired. Please login again to continue chatting.");
        }
      }
    };

    // Check immediately and then every minute
    checkTokenExpiry();
    const expiryCheckInterval = setInterval(checkTokenExpiry, 60 * 1000); // Check every minute

    return () => clearInterval(expiryCheckInterval);
  }, [token]);

  // ---------------------------------------------------------
  // Register new user then login
  // ---------------------------------------------------------
  const handleRegister = async () => {
    // Client-side validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (!username.trim()) {
      alert("Username is required.");
      return;
    }
    if (!email.trim()) {
      alert("Email is required.");
      return;
    }
    if (!name.trim()) {
      alert("Name is required.");
      return;
    }

    try {
      // Register user - this will assign ROLE_USER by default
      await axios.post(`${API}/users/register`, { username, email, password, name });
      alert("Registered successfully! You can now start chatting.");
      await handleLogin();
    } catch (e) {
      console.error("Register failed:", e);
      alert("Registration failed. Try again.");
    }
  };

  // ---------------------------------------------------------
  // Login existing user
  // ---------------------------------------------------------
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/users/login`, { username, password });
      const jwt = res.data?.token;
      const userRole = res.data?.role;

      if (!jwt) throw new Error("Token missing");

      // Allow only ROLE_USER to login from ChatWidget
      // ROLE_AGENT and ROLE_ADMIN must use Agent Dashboard
      if (userRole === "ROLE_AGENT" || userRole === "ROLE_ADMIN") {
        alert("Agents and administrators must login through the Agent Dashboard, not the chat widget.");
        return;
      }

      setToken(jwt);

      // Set token expiry time (assuming 1 hour from now)
      const expiryTime = Date.now() + (1 * 60 * 60 * 1000); // 1 hour
      localStorage.setItem("chatTokenExpiry", expiryTime.toString());

      await startSession(jwt);
    } catch (e) {
      console.error("Login failed:", e);
      alert("Invalid credentials. Try again.");
    }
  };

  // ---------------------------------------------------------
  // Create chat session with agent
  // ---------------------------------------------------------
  const startSession = async (jwt: string) => {
    try {
      const res = await axios.post(
        `${API}/chat/start`,
        { participantA: username, participantB: AGENT, sessionType: "AGENT_CLIENT" },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      const sid = res.data?.id;
      setSessionId(sid);
      alert(`✅ Chat started!\nReference ID: ${sid}\nPlease save it for future support.`);
      await loadExistingMessages(sid, jwt);
      connectWS(sid, jwt);
    } catch (e: any) {
      console.error("Start session failed:", e);
      // Handle token expiry - try to refresh or prompt re-login
      if (e.response?.status === 401 || e.response?.data?.message?.includes("Unauthorized")) {
        if (username === "defaultuser") {
          // Try to refresh token for default user
          try {
            const refreshRes = await axios.post(`${API}/users/login`, {
              username: "defaultuser",
              password: "default123"
            });
            const newToken = refreshRes.data?.token;
            if (newToken) {
              setToken(newToken);
              localStorage.setItem("chatToken", newToken);
              const expiryTime = Date.now() + (1 * 60 * 60 * 1000);
              localStorage.setItem("chatTokenExpiry", expiryTime.toString());
              // Retry with new token
              await startSession(newToken);
              return;
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
          }
        }
        // For all users, prompt re-login
        alert("Your session has expired. Please login again.");
        setToken(null);
        localStorage.removeItem("chatToken");
        localStorage.removeItem("chatTokenExpiry");
      } else {
        alert("Unable to start chat. Please try again.");
      }
    }
  };

  // ---------------------------------------------------------
  // Load existing messages for the session
  // ---------------------------------------------------------
  const loadExistingMessages = async (sid: number, jwt: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/chat/sessions/${sid}/messages/recent`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const existingMessages = res.data.map((msg: any) => ({
        id: msg.id,
        sender: msg.sender?.username || "Unknown",
        content: msg.content,
        sentAt: msg.sentAt,
        messageType: msg.messageType,
      }));
      setMessages(existingMessages);
    } catch (e: any) {
      console.error("Load existing messages failed:", e);
      // Handle token expiry during message loading
      if (e.response?.status === 401 || e.response?.data?.message?.includes("Unauthorized")) {
        if (username === "defaultuser") {
          // Try to refresh token for default user
          try {
            const refreshRes = await axios.post(`${API}/users/login`, {
              username: "defaultuser",
              password: "default123"
            });
            const newToken = refreshRes.data?.token;
            if (newToken) {
              setToken(newToken);
              localStorage.setItem("chatToken", newToken);
              const expiryTime = Date.now() + (1 * 60 * 60 * 1000);
              localStorage.setItem("chatTokenExpiry", expiryTime.toString());
              // Retry with new token
              await loadExistingMessages(sid, newToken);
              return;
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
          }
        }
        // For all users, prompt re-login
        alert("Your session has expired. Please login again.");
        setToken(null);
        localStorage.removeItem("chatToken");
        localStorage.removeItem("chatTokenExpiry");
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // Connect WebSocket for this session
  // ---------------------------------------------------------
  const connectWS = (sid: number, jwt: string) => {
    if (clientRef.current) clientRef.current.deactivate();

    const sock = new SockJS("http://localhost:8080/ws-chat");
    const client = new Client({
      webSocketFactory: () => sock,
      connectHeaders: { Authorization: `Bearer ${jwt}` },
      onConnect: () => {
        setConnected(true);
        client.subscribe(`/topic/chat/${sid}`, (msg) => {
          try {
            const data = JSON.parse(msg.body);
            // Filter out own messages to prevent duplicate display
            // (already shown via optimistic update)
            if (data.sender?.username === username) return;

            setMessages((p) => [...p, {
              id: data.id,
              sender: data.sender?.username || "Unknown",
              content: data.content,
              sentAt: data.sentAt,
              messageType: data.messageType,
            }]);

            // Play notification sound for new messages
            playNotificationSound();

            // Show browser notification for new messages
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("New Chat Message", {
                body: `New message from ${data.sender?.username || "Unknown"}`,
                icon: "/favicon.ico",
                tag: "new-message"
              });
            }
          } catch (e) {
            console.error("Invalid message:", e);
          }
        });
      },
      onDisconnect: () => {
        setConnected(false);
        // If WebSocket disconnects due to token expiry, show login
        if (token) {
          const savedTokenExpiry = localStorage.getItem("chatTokenExpiry");
          if (savedTokenExpiry) {
            const expiryTime = parseInt(savedTokenExpiry);
            const currentTime = Date.now();
            if (currentTime >= expiryTime) {
              alert("Your session has expired. Please login again.");
              setToken(null);
              localStorage.removeItem("chatToken");
              localStorage.removeItem("chatTokenExpiry");
            }
          }
        }
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
        // Handle authentication errors
        if (frame.headers["message"]?.includes("401") || frame.headers["message"]?.includes("Unauthorized")) {
          alert("Authentication failed. Please login again.");
          setToken(null);
          setConnected(false);
          localStorage.removeItem("chatToken");
          localStorage.removeItem("chatTokenExpiry");
        }
      },
      reconnectDelay: 5000,
    });
    client.activate();
    clientRef.current = client;
  };

  // ---------------------------------------------------------
  // Send message with optimistic UI update and error handling
  // Prevents duplicate message display by using temporary IDs
  // Handles token expiry and WebSocket connection issues
  // ---------------------------------------------------------
  const sendMsg = async () => {
    if (!input.trim() || !sessionId || !token) return;

    // Pre-flight token validation to prevent failed sends
    const savedTokenExpiry = localStorage.getItem("chatTokenExpiry");
    if (savedTokenExpiry) {
      const expiryTime = parseInt(savedTokenExpiry);
      const currentTime = Date.now();
      if (currentTime >= expiryTime) {
        alert("Your session has expired. Please login again.");
        setToken(null);
        localStorage.removeItem("chatToken");
        localStorage.removeItem("chatTokenExpiry");
        return;
      }
    }

    // Generate unique temporary ID to prevent duplicate display
    // Format: temp-timestamp-random to ensure uniqueness
    const tempMessageId = `temp-${Date.now()}-${Math.random()}`;

    // Store message content before clearing input
    const messageContent = input.trim();

    // Optimistic UI update - show message immediately for better UX
    // This provides instant feedback to user while message is being sent
    const optimisticMessage: Message = {
      id: tempMessageId, // Unique temp ID to avoid conflicts with real messages
      sender: username,
      content: messageContent,
      sentAt: new Date().toISOString(),
      messageType: "TEXT",
    };

    // Add message to UI immediately (optimistic update)
    setMessages((prevMessages) => [...prevMessages, optimisticMessage]);

    // Clear input field immediately for better UX
    setInput("");

    try {
      // Send message via REST API for reliable persistence
      const response = await axios.post(`${API}/chat/sessions/${sessionId}/messages`, {
        content: messageContent,
        messageType: "TEXT"
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the optimistic message with the real message ID
      setMessages((prevMessages) =>
        prevMessages.map(msg =>
          msg.id === tempMessageId ? { ...msg, id: response.data.id } : msg
        )
      );
    } catch (e) {
      console.error("Failed to send message:", e);

      // Remove optimistic message on failure
      setMessages((prevMessages) =>
        prevMessages.filter(msg => msg.id !== tempMessageId)
      );

      // Handle authentication errors with token refresh/re-login
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        alert("Authentication failed. Please login again.");
        setToken(null);
        localStorage.removeItem("chatToken");
        localStorage.removeItem("chatTokenExpiry");
      } else {
        // Re-add message to input for user to retry
        setInput(messageContent);
        alert("Failed to send message. Please try again.");
      }
    }
  };

  // ---------------------------------------------------------
  // End chat and allow new session
  // ---------------------------------------------------------
  const endChat = async () => {
    if (!sessionId || !token) return;
    try {
      await axios.delete(`${API}/chat/sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      clientRef.current?.deactivate();
      setConnected(false);
      setSessionId(null);
      setMessages([]);
      localStorage.removeItem("chatSessionId");
      alert("Chat ended. You can start a new session anytime.");
    } catch (e) {
      console.error("End chat failed:", e);
    }
  };

  // ---------------------------------------------------------
  // Start new session
  // ---------------------------------------------------------
  const startNewSession = async () => {
    if (!token) {
      alert("Please login first.");
      return;
    }
    await startSession(token);
  };

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  return (
    <>
      <button
        className="btn btn-primary rounded-circle shadow-lg"
        style={{ position: "fixed", bottom: 25, right: 25, width: 60, height: 60, fontSize: 24 }}
        onClick={() => setOpen((p) => !p)}
      >
        💬
      </button>

      {open && (
        <div
          className="card shadow-lg"
          style={{
            position: "fixed",
            bottom: 100,
            right: 25,
            width: 340,
            height: 500,
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            zIndex:"10",
          }}
        >
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
             <span>Visiomatix Support {sessionId && `(Session: ${sessionId})`}</span>
            <div>
              {connected && (
                <button className="btn btn-sm btn-outline-light me-1" onClick={endChat}>
                  End Chat
                </button>
              )}
              {token && !connected && (
                <button className="btn btn-sm btn-outline-light me-1" onClick={startNewSession}>
                  New Chat
                </button>
              )}
              {token && (
                <button className="btn btn-sm btn-outline-danger me-1" onClick={() => {
                  // Logout functionality
                  setToken(null);
                  setSessionId(null);
                  setMessages([]);
                  setConnected(false);
                  clientRef.current?.deactivate();
                  localStorage.removeItem("chatToken");
                  localStorage.removeItem("chatTokenExpiry");
                  localStorage.removeItem("chatSessionId");
                  localStorage.removeItem("chatUsername");
                  localStorage.removeItem("chatEmail");
                  localStorage.removeItem("chatName");
                  alert("Logged out successfully.");
                }}>
                  Logout
                </button>
              )}
              {!token && (
                <button
                  className="btn btn-sm btn-warning me-1"
                  onClick={() => {
                    if (username === "defaultuser") {
                      handleLogin();
                    } else {
                      alert("Please refresh the page and login again.");
                    }
                  }}
                >
                  Re-login
                </button>
              )}
            </div>
          </div>

          <div className="card-body bg-light flex-grow-1 overflow-auto" style={{ fontSize: "0.9rem" }}>
            {!token ? (
              <div>
                <h6>Register or Login</h6>
                <input
                  className="form-control mb-2"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-success w-100 mb-2" onClick={handleRegister}>
                  Register & Start
                </button>
                <button className="btn btn-dark w-100" onClick={handleLogin}>
                  Login & Start
                </button>
              </div>
            ) : (
              <>
                {loading && <div className="text-center">Loading messages...</div>}
                {messages.map((m, i) => (
                  <div
                    key={m.id || i}
                    className={`p-2 my-1 rounded ${
                      m.sender === username ? "bg-primary text-white text-end" : "bg-white border text-start"
                    }`}
                  >
                    <small>
                      <b>{m.sender}:</b> {m.content}
                      {m.sentAt && (
                        <div className="text-muted" style={{ fontSize: "0.7rem" }}>
                          {new Date(m.sentAt).toLocaleTimeString()}
                        </div>
                      )}
                    </small>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {token && (
            <div className="card-footer d-flex">
              <input
                className="form-control"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                disabled={loading}
              />
              <button className="btn btn-dark ms-2" onClick={sendMsg} disabled={loading || !input.trim()}>
                ➤
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
