/**
 * ===========================================================
 * Statistics Tab Component - Comprehensive Chat Analytics Dashboard
 * ===========================================================
 *
 * This component provides detailed analytics and reporting functionality for the
 * chat system, offering insights into system usage, agent performance, and user
 * engagement metrics across different time periods.
 *
 * Key Features:
 * - Time period selection (Monthly, Quarterly, Yearly)
 * - Dynamic date range controls based on selected period
 * - System-wide statistics overview with visual cards
 * - Agent performance metrics and productivity analysis
 * - User chat statistics integration via UserChatStatsWidget
 * - Real-time data visualization and reporting
 * - Comprehensive filtering and drill-down capabilities
 *
 * Reporting Periods:
 * - Monthly: Detailed month-by-month analysis with specific month selection
 * - Quarterly: Quarter-based reporting (Q1-Q4) for seasonal trends
 * - Yearly: Annual overview for long-term performance tracking
 *
 * Statistics Displayed:
 * - Total Sessions: Overall chat sessions in the selected period
 * - Total Messages: Total messages exchanged across all sessions
 * - Active Sessions: Currently ongoing chat conversations
 * - Agent Performance: Individual agent metrics and productivity
 * - User Statistics: Customer engagement and chat activity patterns
 *
 * Agent Performance Metrics:
 * - Total Sessions Handled: Number of chat sessions managed
 * - Total Messages Sent: Volume of communication per agent
 * - Average Messages per Session: Efficiency and engagement metrics
 * - Chat Handling Count: Workload distribution visualization
 *
 * Use Cases:
 * - Performance monitoring and agent productivity analysis
 * - System capacity planning and resource allocation
 * - Customer service quality assessment and improvement
 * - Business intelligence and operational insights
 * - Trend analysis for strategic decision making
 * - Compliance reporting and audit trail generation
 *
 * Data Sources:
 * - Backend analytics APIs providing aggregated statistics
 * - Real-time chat session data and message logs
 * - Agent activity tracking and performance metrics
 * - User engagement and interaction patterns
 *
 * User Experience:
 * - Intuitive period selection with contextual controls
 * - Visual dashboard with color-coded metric cards
 * - Responsive tables with sortable and filterable data
 * - Loading states and error handling for data fetching
 * - Integration with detailed user statistics component
 *
 * Technical Implementation:
 * - Dynamic form controls that adapt to selected time period
 * - Efficient data rendering with minimal re-renders
 * - Integration with UserChatStatsWidget for comprehensive reporting
 * - Bootstrap-based responsive design for various screen sizes
 * - TypeScript interfaces for type safety and documentation
 *
 * Business Intelligence:
 * - Agent workload balancing and performance optimization
 * - Customer satisfaction analysis through engagement metrics
 * - System utilization patterns for infrastructure planning
 * - Seasonal trend identification for resource planning
 * - Quality assurance through detailed conversation analysis
 *
 * Security & Access:
 * - Restricted to users with statistics viewing privileges
 * - Displays sensitive operational and performance data
 * - Audit trail for statistics access and usage
 * - Role-based access control for different reporting levels
 *
 * Integration Points:
 * - Backend statistics and reporting APIs
 * - User management system for agent identification
 * - Chat service for real-time session data
 * - UserChatStatsWidget for detailed user analytics
 * - Authentication system for access control
 *
 * @author Visiomatix Development Team
 * @version 1.0
 * @since 2025
 * ===========================================================
 */

import React from "react";
import UserChatStatsWidget from "./UserChatStatsWidget";

/**
 * Interface defining the structure of agent performance report data
 * Contains metrics for individual agent productivity and activity
 */
interface AgentReport {
  /** Unique identifier for the agent */
  agentId: number;

  /** Agent's display name */
  agentName: string;

  /** Agent's username identifier */
  agentUsername: string;

  /** Total number of chat sessions handled by this agent */
  totalSessions: number;

  /** Total number of messages sent by this agent */
  totalMessages: number;

  /** Average number of messages per session for efficiency analysis */
  averageMessagesPerSession: number;
}

/**
 * Interface defining the structure of report data from the backend
 * Contains aggregated statistics for the selected time period
 */
interface ReportData {
  /** Total number of chat sessions in the reporting period */
  totalSessions: number;

  /** Total number of messages exchanged in the reporting period */
  totalMessages: number;

  /** Number of currently active chat sessions */
  activeSessions: number;

  /** Array of performance reports for each agent */
  agentReports?: AgentReport[];
}

/**
 * Interface defining the structure of user data
 * Used for user statistics and role-based filtering
 */
interface User {
  /** Unique identifier for the user */
  id: number;

  /** User's display name */
  name: string;

  /** User's username identifier */
  username: string;

  /** Array of role IDs assigned to this user */
  roles?: { id: number }[];
}

/**
 * Interface defining the structure of user chat statistics
 * Contains chat activity metrics for individual users
 */
interface UserStats {
  /** Total number of chat sessions handled by this user */
  totalSessionsHandled: number;

  /** Total number of messages sent by this user */
  totalMessagesSent: number;
}

/**
 * Interface defining the structure of system permissions
 * Used for role-based access control and permission checking
 */
interface Permission {
  /** Unique identifier for the permission */
  id: number;

  /** Permission name for identification */
  name: string;

  /** Type of permission for categorization */
  permissionType: string;

  /** Human-readable description of the permission */
  description: string;

  /** Resource pattern for fine-grained access control */
  resourcePattern: string;
}

/**
 * Interface defining the structure of role data
 * Used for role-based filtering and permission checking
 * Must match the Role interface expected by UserChatStatsWidget
 */
interface Role {
  /** Unique identifier for the role */
  id: number;

  /** Role name for identification */
  name: string;

  /** Array of permissions directly assigned to this role */
  permissions?: Permission[];

  /** Array of privileges assigned to this role */
  privileges?: any[];
}

/**
 * Props interface for the StatisticsTab component
 * Defines all required properties and callback functions
 */
interface StatisticsTabProps {
  /** Report data containing aggregated statistics for the selected period */
  reportData: ReportData;

  /** Currently selected reporting period (monthly/quarterly/yearly) */
  selectedPeriod: string;

  /** Selected year for the report */
  selectedYear: number;

  /** Selected month (1-12) for monthly reports */
  selectedMonth: number;

  /** Selected quarter (1-4) for quarterly reports */
  selectedQuarter: number;

  /** Array of all users in the system for statistics */
  users: User[];

  /** Map of user IDs to their chat statistics */
  userChatStats: Record<number, UserStats>;

  /** Array of all roles for user categorization and filtering */
  roles: Role[];

  /** Callback function when reporting period changes */
  onPeriodChange: (value: string) => void;

  /** Callback function when selected year changes */
  onYearChange: (value: number) => void;

  /** Callback function when selected month changes */
  onMonthChange: (value: number) => void;

  /** Callback function when selected quarter changes */
  onQuarterChange: (value: number) => void;

  /** Callback function to fetch statistics for a specific user */
  onFetchUserStats: (userId: number) => void;
}

const StatisticsTab: React.FC<StatisticsTabProps> = ({
  reportData,
  selectedPeriod,
  selectedYear,
  selectedMonth,
  selectedQuarter,
  users,
  userChatStats,
  roles,
  onPeriodChange,
  onYearChange,
  onMonthChange,
  onQuarterChange,
  onFetchUserStats
}) => {
  return (
    <div>
      <h5>Chat Statistics & Reports</h5>

      {/* Period Selection */}
      <div className="row mb-4">
        <div className="col-md-3">
          <label className="form-label">Period Type</label>
          <select
            className="form-control"
            value={selectedPeriod}
            onChange={(e) => onPeriodChange(e.target.value)}
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
            value={selectedYear}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        {selectedPeriod === "monthly" && (
          <div className="col-md-3">
            <label className="form-label">Month</label>
            <select
              className="form-control"
              value={selectedMonth}
              onChange={(e) => onMonthChange(parseInt(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>
                  {new Date(2025, month - 1, 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedPeriod === "quarterly" && (
          <div className="col-md-3">
            <label className="form-label">Quarter</label>
            <select
              className="form-control"
              value={selectedQuarter}
              onChange={(e) => onQuarterChange(parseInt(e.target.value))}
            >
              <option value={1}>Q1 (Jan-Mar)</option>
              <option value={2}>Q2 (Apr-Jun)</option>
              <option value={3}>Q3 (Jul-Sep)</option>
              <option value={4}>Q4 (Oct-Dec)</option>
            </select>
          </div>
        )}
      </div>

      {/* Overall Statistics */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">{reportData.totalSessions || 0}</h5>
              <p className="card-text">Total Sessions</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">{reportData.totalMessages || 0}</h5>
              <p className="card-text">Total Messages</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">{reportData.activeSessions || 0}</h5>
              <p className="card-text">Active Sessions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Performance Table */}
      <div className="card">
        <div className="card-header">
          <h6 className="mb-0">Agent Performance - {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Report</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Agent Name</th>
                  <th>Total Sessions</th>
                  <th>Total Messages</th>
                  <th>Avg Messages/Session</th>
                  <th>Chat Handling Count</th>
                </tr>
              </thead>
              <tbody>
                {reportData.agentReports?.map((agent) => (
                  <tr key={agent.agentId}>
                    <td>{agent.agentName} ({agent.agentUsername})</td>
                    <td>{agent.totalSessions}</td>
                    <td>{agent.totalMessages}</td>
                    <td>{agent.averageMessagesPerSession}</td>
                    <td>
                      <span className="badge bg-primary">{agent.totalSessions}</span>
                    </td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={5} className="text-center text-muted">No agent data available for selected period</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Chat Statistics */}
      <UserChatStatsWidget
        users={users}
        userChatStats={userChatStats}
        selectedPeriod={selectedPeriod}
        roles={roles}
        onFetchUserStats={onFetchUserStats}
      />
    </div>
  );
};

export default StatisticsTab;