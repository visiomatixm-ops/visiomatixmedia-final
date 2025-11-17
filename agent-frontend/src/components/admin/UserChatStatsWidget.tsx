import React from "react";

interface Permission {
  id: number;
  name: string;
  permissionType: string;
  description: string;
  resourcePattern: string;
}

interface Role {
  id: number;
  name: string;
  permissions?: Permission[];
  privileges?: any[];
}

interface User {
  id: number;
  name: string;
  username: string;
  roles?: { id: number }[];
}

interface UserStats {
  totalSessionsHandled: number;
  totalMessagesSent: number;
}

interface UserChatStatsWidgetProps {
  users: User[];
  userChatStats: Record<number, UserStats>;
  selectedPeriod: string;
  onFetchUserStats: (userId: number) => void;
  roles: Role[]; // Add roles prop to check permissions
}

const UserChatStatsWidget: React.FC<UserChatStatsWidgetProps> = ({
  users,
  userChatStats,
  selectedPeriod,
  onFetchUserStats,
  roles
}) => {
  console.log('UserChatStatsWidget - users:', users);
  console.log('UserChatStatsWidget - userChatStats:', userChatStats);
  console.log('UserChatStatsWidget - roles:', roles);
  console.log('UserChatStatsWidget - users length:', users.length);
  console.log('UserChatStatsWidget - roles length:', roles.length);

  // Filter users into two categories:
  // 1. Agents/Supervisors with chat permissions
  // 2. Regular users (ROLE_USER) who initiate chats

  // Filter agents/supervisors (users with chat permissions)
  const agentUsers = users.filter(user => {
    // Exclude default user
    if (user.username?.toLowerCase() === 'defaultuser' || user.username?.toLowerCase() === 'default_user') {
      return false;
    }

    if (!user.roles || user.roles.length === 0) return false;

    // Check if any of the user's assigned roles have CHAT_ACCESS, CHAT_WITH_USER or CHAT_WITH_DEFAULT permissions
    return user.roles.some(userRole =>
      roles.some(systemRole =>
        systemRole.id === userRole.id &&
        systemRole.permissions?.some(perm =>
          perm.name === 'CHAT_ACCESS' || perm.name === 'CHAT_WITH_USER' || perm.name === 'CHAT_WITH_DEFAULT'
        )
      )
    );
  });

  // Filter regular users (ROLE_USER)
  const regularUsers = users.filter(user => {
    // Exclude default user
    if (user.username?.toLowerCase() === 'defaultuser' || user.username?.toLowerCase() === 'default_user') {
      return false;
    }

    if (!user.roles || user.roles.length === 0) return false;

    // Include users with ROLE_USER (or users without chat permissions)
    return user.roles.some(userRole =>
      roles.some(systemRole =>
        systemRole.id === userRole.id &&
        systemRole.name === 'ROLE_USER'
      )
    );
  });

  console.log('UserChatStatsWidget - agent users (with chat permissions):', agentUsers);
  console.log('UserChatStatsWidget - regular users (ROLE_USER):', regularUsers);

  // Show loading state if data is not yet available
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

  return (
    <div>
      {/* Agent/Supervisor Statistics */}
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
                  agentUsers.map((user) => {
                    const stats = userChatStats[user.id];
                    console.log('UserChatStatsWidget - agent user:', user, 'stats:', stats);
                    return (
                      <tr key={user.id}>
                        <td>{user.name} ({user.username})</td>
                        <td>{stats?.totalSessionsHandled ?? 0}</td>
                        <td>{stats?.totalMessagesSent ?? 0}</td>
                        <td>{selectedPeriod}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => onFetchUserStats(user.id)}
                            disabled={stats !== undefined}
                          >
                            {stats !== undefined ? "Loaded" : "Load Stats"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
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

      {/* Regular User Statistics */}
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
                  regularUsers.map((user) => {
                    const stats = userChatStats[user.id];
                    console.log('UserChatStatsWidget - regular user:', user, 'stats:', stats);
                    return (
                      <tr key={user.id}>
                        <td>{user.name} ({user.username})</td>
                        <td>{stats?.totalSessionsHandled ?? 0}</td>
                        <td>{stats?.totalMessagesSent ?? 0}</td>
                        <td>{selectedPeriod}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => onFetchUserStats(user.id)}
                            disabled={stats !== undefined}
                          >
                            {stats !== undefined ? "Loaded" : "Load Stats"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
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

export default UserChatStatsWidget;