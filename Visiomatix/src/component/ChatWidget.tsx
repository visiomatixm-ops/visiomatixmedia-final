/**
 * ===========================================================
 * File: ChatWidget.tsx
 * Author: Viral Prajapati
 * Date: 17-Oct-2025
 * Description:
 *  Production-ready floating chat widget (bottom-right) for website visitors.
 *  - Register/login with username, email, password
 *  - Auto-create chat session (stores in DB)
 *  - Shows chat reference ID to user
 *  - Communicates via REST + WebSocket
 *  - Fetches message history from /api/chat/sessions/{id}/messages/recent
 *  - Subscribes to /topic/chat/{id} for real-time updates
 *  - Auto-scrolls to latest messages
 *  - Persists user data in localStorage
 *  - Allows starting new session after ending chat
 * ===========================================================
 */

import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface Message {
  id?: number;
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

    if (savedUsername) setUsername(savedUsername);
    if (savedEmail) setEmail(savedEmail);
    if (savedName) setName(savedName);
    if (savedToken) setToken(savedToken);
    if (savedSessionId) setSessionId(parseInt(savedSessionId));

    // If we have a saved session, try to reconnect
    if (savedToken && savedSessionId) {
      loadExistingMessages(parseInt(savedSessionId), savedToken);
      connectWS(parseInt(savedSessionId), savedToken);
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
      if (!jwt) throw new Error("Token missing");
      setToken(jwt);
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
    } catch (e) {
      console.error("Start session failed:", e);
      alert("Unable to start chat.");
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
    } catch (e) {
      console.error("Load existing messages failed:", e);
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
            setMessages((p) => [...p, {
              id: data.id,
              sender: data.sender?.username || "Unknown",
              content: data.content,
              sentAt: data.sentAt,
              messageType: data.messageType,
            }]);
          } catch (e) {
            console.error("Invalid message:", e);
          }
        });
      },
      onDisconnect: () => setConnected(false),
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
      },
      reconnectDelay: 5000,
    });
    client.activate();
    clientRef.current = client;
  };

  // ---------------------------------------------------------
  // Send message
  // ---------------------------------------------------------
  const sendMsg = () => {
    if (!input.trim() || !sessionId || !clientRef.current) return;
    const payload = {
      sender: username,
      receiver: AGENT,
      content: input.trim(),
      messageType: "TEXT",
      sessionId,
    };
    clientRef.current.publish({ destination: "/app/chat.sendMessage", body: JSON.stringify(payload) });
    setMessages((p) => [...p, {
      id: Date.now(), // Temporary ID for optimistic update
      sender: username,
      content: input.trim(),
      sentAt: new Date().toISOString(),
      messageType: "TEXT",
    }]);
    setInput("");
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
          }}
        >
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <span>Visiomatix Support</span>
            <div>
              {connected && (
                <button className="btn btn-sm btn-outline-light me-1" onClick={endChat}>
                  End
                </button>
              )}
              {token && !connected && (
                <button className="btn btn-sm btn-outline-light" onClick={startNewSession}>
                  New Chat
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
