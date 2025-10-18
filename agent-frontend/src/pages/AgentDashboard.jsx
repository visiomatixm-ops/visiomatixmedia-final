/**
 * ===========================================================
 * File: AgentDashboard.jsx
 * Author: Viral Prajapati
 * Date: 17-Oct-2025
 * Description:
 *  Production-ready agent console to monitor & reply to active sessions.
 *  - Lists sessions from /api/chat/sessions
 *  - Subscribes via WebSocket to /topic/chat/{id}
 *  - Fetches message history from /api/chat/sessions/{id}/messages/recent
 *  - Auto-scrolls to latest messages
 *  - Persists session state in localStorage
 * ===========================================================
 */

import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AgentDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const clientRef = useRef(null);
  const messagesEndRef = useRef(null);

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
  // Login agent
  // ---------------------------------------------------------
  useEffect(() => {
    const login = async () => {
      try {
        const res = await axios.post(`${API}/users/login`, {
          username: AGENT,
          password: PASSWORD,
        });
        setToken(res.data.token);
      } catch (e) {
        console.error("Agent login failed:", e);
      }
    };
    login();
  }, []);

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
          [selected]: res.data.map((msg) => ({
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
  // Send message
  // ---------------------------------------------------------
  const sendMsg = () => {
    if (!selected || !input.trim() || !clientRef.current) return;
    const session = sessions.find((s) => s.id === selected);
    const receiver = session?.participants?.[0]?.username || "defaultuser";
    const payload = {
      sender: AGENT,
      receiver,
      content: input.trim(),
      messageType: "TEXT",
      sessionId: selected,
    };
    clientRef.current.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify(payload),
    });
    setMessages((p) => ({
      ...p,
      [selected]: [
        ...(p[selected] || []),
        {
          id: Date.now(), // Temporary ID for optimistic update
          sender: AGENT,
          content: input.trim(),
          sentAt: new Date().toISOString(),
          messageType: "TEXT",
        }
      ],
    }));
    setInput("");
  };

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  return (
    <div className="container py-4">
      <h4 className="mb-3">Agent Dashboard</h4>
      <div className="row">
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
    </div>
  );
};

export default AgentDashboard;
