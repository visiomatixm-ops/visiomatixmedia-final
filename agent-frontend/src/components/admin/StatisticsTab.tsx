import React from "react";
import UserChatStatsWidget from "./UserChatStatsWidget";

const StatisticsTab = ({
  reportData,
  selectedPeriod,
  selectedYear,
  selectedMonth,
  selectedQuarter,
  users,
  userChatStats,
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
                    <td colSpan="5" className="text-center text-muted">No agent data available for selected period</td>
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
        onFetchUserStats={onFetchUserStats}
      />
    </div>
  );
};

export default StatisticsTab;