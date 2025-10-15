/**
 * =====================================================
 * File: WebSocketService.ts
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  WebSocket service for real-time chat communication.
 *  Handles STOMP connection, authentication, and
 *  message broadcasting with JWT token support.
 * =====================================================
 */

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface Message {
  id?: number;
  content: string;
  messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM' | 'NOTIFICATION';
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  edited?: boolean;
  editedAt?: string;
  sender?: {
    id: number;
    username: string;
    name: string;
  };
  chatSession?: {
    id: number;
    sessionName?: string;
  };
}

export interface ChatSession {
  id: number;
  sessionName?: string;
  sessionType: 'AGENT_CLIENT' | 'GROUP' | 'SUPPORT';
  active: boolean;
  createdAt: string;
  updatedAt?: string;
  lastMessageAt?: string;
  participants: Array<{
    id: number;
    username: string;
    name: string;
  }>;
}

export interface TypingIndicator {
  userId: number;
  username: string;
  isTyping: boolean;
}

export interface UserStatus {
  userId: number;
  username: string;
  isOnline: boolean;
  timestamp: string;
}

type MessageHandler = (message: Message) => void;
type TypingHandler = (typing: TypingIndicator) => void;
type UserStatusHandler = (status: UserStatus) => void;
type ConnectionStatusHandler = (connected: boolean) => void;

class WebSocketService {
  private client: Client | null = null;
  private connected: boolean = false;
  private messageHandlers: MessageHandler[] = [];
  private typingHandlers: TypingHandler[] = [];
  private userStatusHandlers: UserStatusHandler[] = [];
  private connectionStatusHandlers: ConnectionStatusHandler[] = [];

  private readonly baseUrl = 'http://localhost:8080';
  private currentToken: string | null = null;

  constructor() {
    this.currentToken = localStorage.getItem('jwt_token');
  }

  /**
   * Connect to WebSocket with JWT authentication
   */
  connect(token?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (token) {
        this.currentToken = token;
        localStorage.setItem('jwt_token', token);
      }

      if (!this.currentToken) {
        reject(new Error('No authentication token available'));
        return;
      }

      // Create STOMP client with SockJS
      this.client = new Client({
        brokerURL: `${this.baseUrl}/ws`,
        connectHeaders: {
          'Authorization': `Bearer ${this.currentToken}`
        },
        debug: (str) => {
          console.log('STOMP Debug:', str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // Use SockJS for fallback support
      this.client.webSocketFactory = () => {
        return new SockJS(`${this.baseUrl}/ws`);
      };

      // Connection handlers
      this.client.onConnect = (frame) => {
        console.log('WebSocket connected:', frame);
        this.connected = true;
        this.notifyConnectionStatus(true);
        
        // Send connect message to server
        this.client?.publish({
          destination: '/app/user/connect',
          body: JSON.stringify({})
        });

        resolve();
      };

      this.client.onStompError = (frame) => {
        console.error('WebSocket STOMP error:', frame);
        this.connected = false;
        this.notifyConnectionStatus(false);
        reject(new Error('STOMP connection failed'));
      };

      this.client.onWebSocketError = (error) => {
        console.error('WebSocket error:', error);
        this.connected = false;
        this.notifyConnectionStatus(false);
        reject(error);
      };

      this.client.onDisconnect = () => {
        console.log('WebSocket disconnected');
        this.connected = false;
        this.notifyConnectionStatus(false);
      };

      // Activate the client
      this.client.activate();
    });
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect(): void {
    if (this.client && this.connected) {
      // Send disconnect message
      this.client.publish({
        destination: '/app/user/disconnect',
        body: JSON.stringify({})
      });

      this.client.deactivate();
      this.connected = false;
      this.notifyConnectionStatus(false);
    }
  }

  /**
   * Subscribe to chat messages for a session
   */
  subscribeToChat(sessionId: number): void {
    if (!this.client || !this.connected) {
      console.error('WebSocket not connected');
      return;
    }

    this.client.subscribe(`/topic/chat/${sessionId}`, (message) => {
      try {
        const parsedMessage: Message = JSON.parse(message.body);
        this.notifyMessageHandlers(parsedMessage);
      } catch (error) {
        console.error('Error parsing chat message:', error);
      }
    });
  }

  /**
   * Subscribe to typing indicators for a session
   */
  subscribeToTyping(sessionId: number): void {
    if (!this.client || !this.connected) {
      console.error('WebSocket not connected');
      return;
    }

    this.client.subscribe(`/topic/typing/${sessionId}`, (message) => {
      try {
        const typing: TypingIndicator = JSON.parse(message.body);
        this.notifyTypingHandlers(typing);
      } catch (error) {
        console.error('Error parsing typing indicator:', error);
      }
    });
  }

  /**
   * Subscribe to user status updates
   */
  subscribeToUserStatus(): void {
    if (!this.client || !this.connected) {
      console.error('WebSocket not connected');
      return;
    }

    this.client.subscribe('/topic/user/status', (message) => {
      try {
        const status: UserStatus = JSON.parse(message.body);
        this.notifyUserStatusHandlers(status);
      } catch (error) {
        console.error('Error parsing user status:', error);
      }
    });
  }

  /**
   * Send a chat message
   */
  sendMessage(sessionId: number, content: string, messageType: Message['messageType'] = 'TEXT'): void {
    if (!this.client || !this.connected) {
      console.error('WebSocket not connected');
      return;
    }

    this.client.publish({
      destination: `/app/chat/${sessionId}/send`,
      body: JSON.stringify({
        content,
        messageType
      })
    });
  }

  /**
   * Send typing indicator
   */
  sendTypingIndicator(sessionId: number, isTyping: boolean): void {
    if (!this.client || !this.connected) {
      console.error('WebSocket not connected');
      return;
    }

    this.client.publish({
      destination: `/app/chat/${sessionId}/typing`,
      body: JSON.stringify({
        isTyping
      })
    });
  }

  /**
   * Mark message as read
   */
  markMessageAsRead(messageId: number): void {
    if (!this.client || !this.connected) {
      console.error('WebSocket not connected');
      return;
    }

    this.client.publish({
      destination: `/app/chat/message/${messageId}/read`,
      body: JSON.stringify({})
    });
  }

  // Event handler management
  onMessage(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  onTyping(handler: TypingHandler): void {
    this.typingHandlers.push(handler);
  }

  onUserStatus(handler: UserStatusHandler): void {
    this.userStatusHandlers.push(handler);
  }

  onConnectionStatus(handler: ConnectionStatusHandler): void {
    this.connectionStatusHandlers.push(handler);
  }

  // Remove event handlers
  removeMessageHandler(handler: MessageHandler): void {
    this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
  }

  removeTypingHandler(handler: TypingHandler): void {
    this.typingHandlers = this.typingHandlers.filter(h => h !== handler);
  }

  removeUserStatusHandler(handler: UserStatusHandler): void {
    this.userStatusHandlers = this.userStatusHandlers.filter(h => h !== handler);
  }

  removeConnectionStatusHandler(handler: ConnectionStatusHandler): void {
    this.connectionStatusHandlers = this.connectionStatusHandlers.filter(h => h !== handler);
  }

  // Private notification methods
  private notifyMessageHandlers(message: Message): void {
    this.messageHandlers.forEach(handler => handler(message));
  }

  private notifyTypingHandlers(typing: TypingIndicator): void {
    this.typingHandlers.forEach(handler => handler(typing));
  }

  private notifyUserStatusHandlers(status: UserStatus): void {
    this.userStatusHandlers.forEach(handler => handler(status));
  }

  private notifyConnectionStatus(connected: boolean): void {
    this.connectionStatusHandlers.forEach(handler => handler(connected));
  }

  // Getters
  isConnected(): boolean {
    return this.connected;
  }
}

// Export singleton instance
export const webSocketService = new WebSocketService();
export default webSocketService;