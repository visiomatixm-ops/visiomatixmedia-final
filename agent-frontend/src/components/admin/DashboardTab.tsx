import React from "react";

const DashboardTab = ({ statistics, sessions }) => {
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
                    <td colSpan="4" className="text-center text-muted">No agent data available</td>
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