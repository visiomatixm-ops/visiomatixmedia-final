import React from "react";

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
}

const UserChatStatsWidget: React.FC<UserChatStatsWidgetProps> = ({
  users,
  userChatStats,
  selectedPeriod,
  onFetchUserStats
}) => {
  console.log('UserChatStatsWidget - users:', users);
  console.log('UserChatStatsWidget - userChatStats:', userChatStats);

  // Filter users to only include those with role IDs 1 and 2, exclude role ID 3
  const filteredUsers = users.filter(user => {
    // Assuming user.roles is an array of role objects with id property
    const userRoleIds = user.roles?.map(role => role.id) || [];
    return userRoleIds.includes(1) || userRoleIds.includes(2);
  });

  console.log('UserChatStatsWidget - filtered users (role 1 & 2 only):', filteredUsers);

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h6 className="mb-0">User Chat Handling Statistics (Agents & Supervisors Only)</h6>
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
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const stats = userChatStats[user.id];
                  console.log('UserChatStatsWidget - user:', user, 'stats:', stats);
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
                    No users with role IDs 1 or 2 available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserChatStatsWidget;