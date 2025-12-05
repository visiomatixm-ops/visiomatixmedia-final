/**
 * User Chat Statistics Widget Component
 *
 * This component displays comprehensive chat statistics for different user categories:
 * - Agent & Supervisor statistics (users with chat handling permissions)
 * - Customer statistics (regular users who initiate chats)
 *
 * The widget provides filtering logic to categorize users based on their roles and permissions,
 * and displays chat handling metrics like sessions handled and messages sent.
 *
 * Key Features:
 * - Automatic user categorization based on permissions
 * - Lazy loading of statistics data
 * - Period-based filtering (monthly, quarterly, yearly)
 * - Separate tables for agents and customers
 */

import React from "react";

/**
 * Permission interface defining the structure of system permissions
 */
interface Permission {
  id: number;
  name: string;
  permissionType: string;
  description: string;
  resourcePattern: string;
}

/**
 * Role interface defining the structure of user roles with permissions and privileges
 */
interface Role {
  id: number;
  name: string;
  permissions?: Permission[];
  privileges?: any[];
}

/**
 * User interface defining the structure of user accounts
 */
interface User {
  id: number;
  name: string;
  username: string;
  roles?: { id: number }[];
}

/**
 * UserStats interface defining the structure of chat statistics for users
 */
interface UserStats {
  totalSessionsHandled: number;
  totalMessagesSent: number;
}

/**
 * Props interface for the UserChatStatsWidget component
 */
interface UserChatStatsWidgetProps {
  users: User[]; // Array of all users in the system
  userChatStats: Record<number, UserStats>; // Map of user IDs to their statistics
  selectedPeriod: string; // Currently selected time period (monthly/quarterly/yearly)
  onFetchUserStats: (userId: number) => void; // Callback to load statistics for a user
  roles: Role[]; // Array of all roles to check permissions against
}

/**
 * UserChatStatsWidget component implementation
 *
 * This component categorizes users into agents/supervisors and regular customers,
 * then displays their chat statistics in separate tables with lazy loading.
 */
const UserChatStatsWidget: React.FC<UserChatStatsWidgetProps> = ({
  users,
  userChatStats,
  selectedPeriod,
  onFetchUserStats,
  roles
}) => {
  // Debug logging for development and troubleshooting
  console.log('UserChatStatsWidget - users:', users);
  console.log('UserChatStatsWidget - userChatStats:', userChatStats);
  console.log('UserChatStatsWidget - roles:', roles);
  console.log('UserChatStatsWidget - users length:', users.length);
  console.log('UserChatStatsWidget - roles length:', roles.length);

  /**
   * Filter users into two distinct categories for statistics display:
   * 1. Agents/Supervisors: Users with chat handling permissions who respond to chats
   * 2. Regular users: ROLE_USER accounts who typically initiate chats as customers
   */

  /**
   * Filter to identify agents and supervisors who have chat handling permissions
   * These are users who can actively participate in and manage chat sessions
   */
  const agentUsers = users.filter(user => {
    // Exclude the system default user from statistics
    if (user.username?.toLowerCase() === 'defaultuser' || user.username?.toLowerCase() === 'default_user') {
      return false;
    }

    // Skip users with no role assignments
    if (!user.roles || user.roles.length === 0) return false;

    // Check if any of the user's assigned roles have chat-related permissions
    // This identifies users who can handle customer chats
    return user.roles.some(userRole =>
      roles.some(systemRole =>
        systemRole.id === userRole.id &&
        systemRole.permissions?.some(permission =>
          // Include users with any of these chat permissions
          permission.name === 'CHAT_ACCESS' ||
          permission.name === 'CHAT_WITH_USER' ||
          permission.name === 'CHAT_WITH_DEFAULT'
        )
      )
    );
  });

  /**
   * Filter to identify regular users who typically initiate chats as customers
   * These are ROLE_USER accounts that represent end customers
   */
  const regularUsers = users.filter(user => {
    // Exclude the system default user from statistics
    if (user.username?.toLowerCase() === 'defaultuser' || user.username?.toLowerCase() === 'default_user') {
      return false;
    }

    // Skip users with no role assignments
    if (!user.roles || user.roles.length === 0) return false;

    // Include users specifically assigned the ROLE_USER role
    // These represent regular customers who initiate chat sessions
    return user.roles.some(userRole =>
      roles.some(systemRole =>
        systemRole.id === userRole.id &&
        systemRole.name === 'ROLE_USER'
      )
    );
  });

  // Debug logging for filtered user categories
  console.log('UserChatStatsWidget - agent users (with chat permissions):', agentUsers);
  console.log('UserChatStatsWidget - regular users (ROLE_USER):', regularUsers);

  /**
   * Display loading state when required data is not yet available
   * This prevents rendering errors when users or roles arrays are empty
   */
  if (users.length === 0 || roles.length === 0) {
    return (
      <div className="card mt-4">
        <div className="card-header">
          <h6 className="mb-0">User Chat Handling Statistics (Agents & Supervisors Only)</h6>
        </div>
        <div className="card-body">
          <div className="text-center text-muted">
            Loading user data...
          </div>
        </div>
      </div>
    );
  }

  /**
   * Main render function displaying statistics in two separate tables
   * One for agents/supervisors and another for regular customers
   */
  return (
    <div>
      {/* First table: Agent and Supervisor Statistics */}
      {/* Shows users who have chat handling permissions and actively manage conversations */}
      <div className="card mt-4">
        <div className="card-header">
          <h6 className="mb-0">Agent & Supervisor Chat Handling Statistics</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Sessions Handled</th>
                  <th>Messages Sent</th>
                  <th>Period</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {agentUsers && agentUsers.length > 0 ? (
                  // Render each agent/supervisor with their statistics
                  agentUsers.map((user) => {
                    const stats = userChatStats[user.id];
                    console.log('UserChatStatsWidget - agent user:', user, 'stats:', stats);
                    return (
                      <tr key={user.id}>
                        {/* Display user name and username */}
                        <td>{user.name} ({user.username})</td>
                        {/* Show session handling count with fallback to 0 */}
                        <td>{stats?.totalSessionsHandled ?? 0}</td>
                        {/* Show message count with fallback to 0 */}
                        <td>{stats?.totalMessagesSent ?? 0}</td>
                        {/* Display selected time period */}
                        <td>{selectedPeriod}</td>
                        {/* Action button for lazy loading statistics */}
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => onFetchUserStats(user.id)}
                            disabled={stats !== undefined} // Disable if stats already loaded
                          >
                            {stats !== undefined ? "Loaded" : "Load Stats"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  // Display message when no agents/supervisors are found
                  <tr>
                    <td colSpan={5} className="text-center text-muted">
                      No agents/supervisors with chat permissions available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Second table: Regular User (Customer) Statistics */}
      {/* Shows ROLE_USER accounts who typically initiate chats as customers */}
      <div className="card mt-4">
        <div className="card-header">
          <h6 className="mb-0">Customer Chat Activity Statistics</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Chat Sessions Initiated</th>
                  <th>Messages Sent</th>
                  <th>Period</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {regularUsers && regularUsers.length > 0 ? (
                  // Render each regular user with their chat activity statistics
                  regularUsers.map((user) => {
                    const stats = userChatStats[user.id];
                    console.log('UserChatStatsWidget - regular user:', user, 'stats:', stats);
                    return (
                      <tr key={user.id}>
                        {/* Display user name and username */}
                        <td>{user.name} ({user.username})</td>
                        {/* Show sessions initiated (same field as handled for customers) */}
                        <td>{stats?.totalSessionsHandled ?? 0}</td>
                        {/* Show messages sent by the customer */}
                        <td>{stats?.totalMessagesSent ?? 0}</td>
                        {/* Display selected time period */}
                        <td>{selectedPeriod}</td>
                        {/* Action button for lazy loading customer statistics */}
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => onFetchUserStats(user.id)}
                            disabled={stats !== undefined} // Disable if stats already loaded
                          >
                            {stats !== undefined ? "Loaded" : "Load Stats"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  // Display message when no regular customers are found
                  <tr>
                    <td colSpan={5} className="text-center text-muted">
                      No customer users available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Export the UserChatStatsWidget component as the default export
 * This component can be imported and used in other parts of the application
 */
export default UserChatStatsWidget;