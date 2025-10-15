/**
 * =====================================================
 * File: ApiService.ts
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  HTTP API service for communication with Spring Boot backend.
 *  Handles authentication, chat sessions, user management,
 *  and message history with JWT token support.
 * =====================================================
 */

import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { ChatSession, Message } from './WebSocketService';

// API Response Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  username: string;
  email: string;
  name: string;
  roles: string[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  active: boolean;
  roles: Array<{
    id: number;
    name: string;
  }>;
}

export interface ApiError {
  message: string;
  status: number;
  timestamp?: string;
}

class ApiService {
  private api: AxiosInstance;
  private readonly baseURL = 'http://localhost:8080/api';

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Request interceptor to add JWT token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle common errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid - redirect to login
          localStorage.removeItem('jwt_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // =====================================================
  // Authentication Methods
  // =====================================================

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await this.api.post(
        '/users/login',
        credentials
      );
      
      // Store JWT token in localStorage
      if (response.data.token) {
        localStorage.setItem('jwt_token', response.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async register(userData: RegisterRequest): Promise<User> {
    try {
      const response: AxiosResponse<User> = await this.api.post(
        '/users/register',
        userData
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    // Additional cleanup can be done here
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  // =====================================================
  // Chat Session Methods
  // =====================================================

  async getChatSessions(): Promise<ChatSession[]> {
    try {
      const response: AxiosResponse<ChatSession[]> = await this.api.get('/chat/sessions');
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async createChatSession(sessionData: {
    sessionName: string;
    sessionType?: 'AGENT_CLIENT' | 'GROUP' | 'SUPPORT';
  }): Promise<ChatSession> {
    try {
      const response: AxiosResponse<ChatSession> = await this.api.post(
        '/chat/sessions',
        sessionData
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getChatSession(sessionId: number): Promise<ChatSession> {
    try {
      const response: AxiosResponse<ChatSession> = await this.api.get(
        `/chat/sessions/${sessionId}`
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async startChatWithUser(userId: number): Promise<ChatSession> {
    try {
      const response: AxiosResponse<ChatSession> = await this.api.post(
        `/chat/sessions/with/${userId}`
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async closeChatSession(sessionId: number): Promise<void> {
    try {
      await this.api.delete(`/chat/sessions/${sessionId}`);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // =====================================================
  // Message Methods
  // =====================================================

  async getMessages(
    sessionId: number,
    page: number = 0,
    size: number = 20
  ): Promise<Message[]> {
    try {
      const response: AxiosResponse<Message[]> = await this.api.get(
        `/chat/sessions/${sessionId}/messages`,
        { params: { page, size } }
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getRecentMessages(sessionId: number, limit: number = 10): Promise<Message[]> {
    try {
      const response: AxiosResponse<Message[]> = await this.api.get(
        `/chat/sessions/${sessionId}/messages/recent`,
        { params: { limit } }
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async markAllAsRead(sessionId: number): Promise<void> {
    try {
      await this.api.post(`/chat/sessions/${sessionId}/messages/mark-read`);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getUnreadCount(sessionId: number): Promise<{ unreadCount: number }> {
    try {
      const response: AxiosResponse<{ unreadCount: number }> = await this.api.get(
        `/chat/sessions/${sessionId}/unread-count`
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async searchMessages(sessionId: number, query: string): Promise<Message[]> {
    try {
      const response: AxiosResponse<Message[]> = await this.api.get(
        `/chat/sessions/${sessionId}/messages/search`,
        { params: { query } }
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // =====================================================
  // Admin/Dashboard Methods
  // =====================================================

  async getChatStatistics(): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.api.get('/chat/admin/statistics');
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getActiveSessionsCount(): Promise<{ activeSessionsCount: number }> {
    try {
      const response: AxiosResponse<{ activeSessionsCount: number }> = await this.api.get(
        '/chat/admin/active-sessions-count'
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // =====================================================
  // User Management Methods (for Admin)
  // =====================================================

  async getAllUsers(): Promise<User[]> {
    try {
      const response: AxiosResponse<User[]> = await this.api.get('/users');
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async updateUser(userId: number, userData: Partial<User>): Promise<User> {
    try {
      const response: AxiosResponse<User> = await this.api.put(
        `/users/${userId}`,
        userData
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await this.api.delete(`/users/${userId}`);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // =====================================================
  // Utility Methods
  // =====================================================

  private handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data.message || 'Server error occurred',
        status: error.response.status,
        timestamp: error.response.data.timestamp
      };
    } else if (error.request) {
      // Network error
      return {
        message: 'Network error - please check your connection',
        status: 0
      };
    } else {
      // Other error
      return {
        message: error.message || 'An unexpected error occurred',
        status: -1
      };
    }
  }

  // Get current user info from JWT token (basic implementation)
  getCurrentUser(): any {
    const token = localStorage.getItem('jwt_token');
    if (!token) return null;

    try {
      // Basic JWT payload decoding (in production, use a proper JWT library)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;