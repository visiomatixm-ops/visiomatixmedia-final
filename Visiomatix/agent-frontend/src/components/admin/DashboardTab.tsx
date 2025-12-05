/**
 * ===========================================================
 * Admin Dashboard Tab Component
 * ===========================================================
 *
 * This component serves as the main administrative dashboard, providing a comprehensive
 * overview of system performance, agent productivity, and active chat sessions. It displays
 * key metrics and real-time data to help administrators monitor and manage the chat system.
 *
 * Key Features:
 * - System-wide statistics cards (active sessions, users, daily metrics)
 * - Agent performance table with productivity metrics
 * - Active chat sessions overview with participant counts
 * - Real-time data visualization with color-coded status indicators
 * - Responsive layout for different screen sizes
 *
 * Dashboard Metrics:
 * - Total Active Sessions: Current live chat conversations
 * - Total Users: Registered users in the system
 * - Messages Today: Total messages sent in the current day
 * - Sessions Today: Total chat sessions initiated today
 *
 * Agent Performance Tracking:
 * - Individual agent productivity metrics
 * - Active vs total session counts
 * - Message volume per agent
 * - Real-time performance monitoring
 *
 * Session Monitoring:
 * - Live view of active chat sessions
 * - Session creation timestamps
 * - Participant counts per session
 * - Session names and identifiers
 *
 * Use Cases:
 * - Daily system health monitoring
 * - Agent workload distribution analysis
 * - Performance trend identification
 * - Capacity planning and resource allocation
 * - Real-time operational oversight
 *
 * Data Sources:
 * - Real-time statistics from backend APIs
 * - Live session data via WebSocket connections
 * - Agent performance metrics from chat service
 *
 * Security & Access:
 * - Restricted to administrators and supervisors
 * - Displays sensitive operational data
 * - Requires appropriate role-based permissions
 *
 * Performance Considerations:
 * - Efficient data rendering with minimal re-renders
 * - Optimized table layouts for large datasets
 * - Responsive design for mobile and desktop access
 *
 * @author Visiomatix Development Team
 * @version 1.0
 * @since 2025
 * ===========================================================
 */

import React from "react";

/**
 * Interface defining the structure of agent performance data
 * Contains metrics for individual agent productivity and activity
 */
interface AgentPerformance {
  /** Agent's unique username identifier */
  username: string;

  /** Agent's display name */
  name: string;

  /** Number of currently active chat sessions for this agent */
  activeSessions: number;

  /** Total number of sessions handled by this agent */
  totalSessions: number;

  /** Total number of messages sent by this agent */
  messagesSent: number;
}

/**
 * Interface defining the structure of system-wide statistics
 * Contains various metrics about system usage and performance
 */
interface Statistics {
  /** Total number of currently active chat sessions across the system */
  totalActiveSessions?: number;

  /** Total number of registered users in the system */
  totalUsers?: number;

  /** Total number of messages sent today */
  messagesToday?: number;

  /** Total number of chat sessions created today */
  sessionsToday?: number;

  /** Array of performance data for each agent */
  agentPerformance?: AgentPerformance[];
}

/**
 * Interface defining the structure of chat session data
 * Contains basic information about individual chat sessions
 */
interface Session {
  /** Unique identifier for the chat session */
  id: number;

  /** ISO timestamp when the session was created */
  createdAt: string;

  /** Human-readable name or description of the session */
  sessionName: string;

  /** Array of participants in the chat session */
  participants?: any[];
}

/**
 * Props interface for the DashboardTab component
 * Defines the data required to render the dashboard
 */
interface DashboardTabProps {
  /** System-wide statistics data for dashboard cards */
  statistics: Statistics;

  /** Array of active chat sessions for the session list */
  sessions: Session[];
}

const DashboardTab: React.FC<DashboardTabProps> = ({ statistics, sessions }) => {
  return (
    <div>
      <h5>Admin Dashboard</h5>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">{statistics.totalActiveSessions || 0}</h5>
              <p className="card-text">Active Sessions</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">{statistics.totalUsers || 0}</h5>
              <p className="card-text">Total Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">{statistics.messagesToday || 0}</h5>
              <p className="card-text">Messages Today</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5 className="card-title">{statistics.sessionsToday || 0}</h5>
              <p className="card-text">Sessions Today</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h6>Agent Performance</h6>
          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Active Sessions</th>
                  <th>Total Sessions</th>
                  <th>Messages Sent</th>
                </tr>
              </thead>
              <tbody>
                {statistics.agentPerformance?.map((agent) => (
                  <tr key={agent.username}>
                    <td>{agent.name} ({agent.username})</td>
                    <td>{agent.activeSessions || 0}</td>
                    <td>{agent.totalSessions || 0}</td>
                    <td>{agent.messagesSent || 0}</td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={4} className="text-center text-muted">No agent data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <h6>Active Chat Sessions</h6>
          <div className="list-group">
            {sessions && sessions.length > 0 ? (
              sessions.slice(0, 10).map((session) => (
                <div key={session.id} className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Session #{session.id}</h6>
                    <small>{new Date(session.createdAt).toLocaleDateString()}</small>
                  </div>
                  <p className="mb-1">{session.sessionName}</p>
                  <small>Participants: {session.participants?.length || 0}</small>
                </div>
              ))
            ) : (
              <div className="list-group-item text-center text-muted">
                No active sessions
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;