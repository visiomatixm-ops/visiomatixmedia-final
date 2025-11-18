/**
 * WebSocket Communication Module
 *
 * This module handles real-time communication with the server using WebSocket connections.
 * It provides functionality for connecting to the WebSocket server, subscribing to chat sessions,
 * and sending messages through the STOMP protocol over SockJS.
 *
 * The module uses:
 * - SockJS for WebSocket connection fallback support
 * - STOMP.js for STOMP protocol implementation
 * - JWT authentication for secure connections
 */

// Import SockJS for WebSocket connection with fallback support
import SockJS from "sockjs-client";

// Import STOMP client for protocol handling
import { Client } from "@stomp/stompjs";

// Global STOMP client instance - maintains connection state across the application
let stompClient: Client | null = null;

/**
 * Establishes a WebSocket connection to the server using STOMP over SockJS
 * @param token - JWT authentication token for secure connection
 * @param onConnected - Callback function executed when connection is established
 * @param onMessage - Callback function executed when unhandled messages are received
 * @returns The STOMP client instance for further operations
 */
export function connectWebSocket(token: string, onConnected: () => void, onMessage: (msg: any) => void) {
  // Create new STOMP client with configuration
  stompClient = new Client({
    // Use SockJS for WebSocket connection with fallback to HTTP polling
    webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URL),

    // Include JWT token in connection headers for authentication
    connectHeaders: { Authorization: `Bearer ${token}` },

    // Callback when STOMP connection is successfully established
    onConnect: onConnected,

    // Error handling for STOMP protocol errors
    onStompError: (frame) => console.error("WebSocket STOMP Error:", frame.headers["message"]),

    // Disable debug logging for production
    debug: () => {},

    // Reconnection delay in milliseconds
    reconnectDelay: 5000,
  });

  // Handle WebSocket-level errors
  stompClient.onWebSocketError = (error) => console.error("WebSocket connection error:", error);

  // Handle messages that don't match any subscriptions
  stompClient.onUnhandledMessage = (message) =>
    onMessage && onMessage(JSON.parse(message.body));

  // Activate the connection
  stompClient.activate();
  return stompClient;
}

/**
 * Subscribes to real-time messages for a specific chat session
 * @param sessionId - The unique identifier of the chat session to subscribe to
 * @param callback - Function called when new messages arrive for this session
 */
export function subscribeToSession(sessionId: string, callback: (msg: any) => void) {
  // Ensure client exists and is connected before subscribing
  if (!stompClient || !stompClient.connected) {
    console.warn("Cannot subscribe to session: WebSocket not connected");
    return;
  }

  // Subscribe to the topic for this specific chat session
  // Topic pattern: /topic/chat/{sessionId}
  stompClient.subscribe(`/topic/chat/${sessionId}`, (message) =>
    // Parse JSON message body and call the callback
    callback(JSON.parse(message.body))
  );
}

/**
 * Sends a message to a specific chat session via WebSocket
 * @param sessionId - The unique identifier of the target chat session
 * @param message - The message object to send (will be JSON serialized)
 */
export function sendMessage(sessionId: string, message: any) {
  // Ensure client exists before attempting to send
  if (!stompClient) {
    console.error("Cannot send message: WebSocket client not initialized");
    return;
  }

  // Publish message to the application destination
  // Destination pattern: /app/chat/{sessionId}
  stompClient.publish({
    destination: `/app/chat/${sessionId}`,
    body: JSON.stringify(message),
  });
}
