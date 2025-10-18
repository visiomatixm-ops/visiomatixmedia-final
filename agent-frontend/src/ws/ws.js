import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export function connectWebSocket(token, onConnected, onMessage) {
  stompClient = new Client({
    webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URL),
    connectHeaders: { Authorization: `Bearer ${token}` },
    onConnect: onConnected,
    onStompError: (f) => console.error("WS Error:", f.headers["message"]),
    debug: () => {},
    reconnectDelay: 5000,
  });

  stompClient.onWebSocketError = (err) => console.error("Socket error:", err);
  stompClient.onUnhandledMessage = (msg) =>
    onMessage && onMessage(JSON.parse(msg.body));

  stompClient.activate();
  return stompClient;
}

export function subscribeToSession(sessionId, callback) {
  if (!stompClient || !stompClient.connected) return;
  stompClient.subscribe(`/topic/chat/${sessionId}`, (msg) =>
    callback(JSON.parse(msg.body))
  );
}

export function sendMessage(sessionId, message) {
  stompClient.publish({
    destination: `/app/chat/${sessionId}`,
    body: JSON.stringify(message),
  });
}
