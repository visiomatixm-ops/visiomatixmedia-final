import React from "react";

interface ChatHistoryTabProps {
  allSessions: any[];
  selectedSession: number | null;
  sessionDetails: any;
  searchTerm: string;
  dateFilter: { startDate: string; endDate: string };
  onSessionSelect: (id: number) => void;
  onSearchChange: (term: string) => void;
  onDateFilterChange: (filter: { startDate: string; endDate: string }) => void;
  onSearch: () => void;
  onFilterByDate: () => void;
}

const ChatHistoryTab = ({
  allSessions,
  selectedSession,
  sessionDetails,
  searchTerm,
  dateFilter,
  onSessionSelect,
  onSearchChange,
  onDateFilterChange,
  onSearch,
  onFilterByDate
}: ChatHistoryTabProps) => {
  return (
    <div>
      <h5>Chat History Review</h5>

      {/* Search and Filter Controls */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by session name or participant..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button className="btn btn-outline-primary" onClick={onSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            placeholder="Start Date"
            value={dateFilter.startDate}
            onChange={(e) => onDateFilterChange({...dateFilter, startDate: e.target.value})}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            placeholder="End Date"
            value={dateFilter.endDate}
            onChange={(e) => onDateFilterChange({...dateFilter, endDate: e.target.value})}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-outline-secondary w-100" onClick={onFilterByDate}>
            Filter
          </button>
        </div>
      </div>

      <div className="row">
        {/* Sessions List */}
        <div className="col-md-4">
          <h6>All Chat Sessions ({allSessions.length})</h6>
          <div className="list-group" style={{maxHeight: "600px", overflowY: "auto"}}>
            {allSessions.map((session) => (
              <button
                key={session.id}
                className={`list-group-item list-group-item-action ${
                  selectedSession === session.id ? "active" : ""
                }`}
                onClick={() => onSessionSelect(session.id)}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">Session #{session.id}</h6>
                  <small>{session.active ? "Active" : "Completed"}</small>
                </div>
                <p className="mb-1">{session.sessionName}</p>
                <small className="text-muted">
                  {new Date(session.createdAt).toLocaleDateString()} •
                  {session.participants?.length || 0} participants
                </small>
              </button>
            ))}
          </div>
        </div>

        {/* Session Details and Messages */}
        <div className="col-md-8">
          {sessionDetails ? (
            <div>
              <div className="card mb-3">
                <div className="card-header">
                  <h6 className="mb-0">Session #{sessionDetails.session.id} Details</h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Session Name:</strong> {sessionDetails.session.sessionName}</p>
                      <p><strong>Status:</strong>
                        <span className={`badge ms-2 ${sessionDetails.session.active ? 'bg-success' : 'bg-secondary'}`}>
                          {sessionDetails.session.active ? 'Active' : 'Completed'}
                        </span>
                      </p>
                      <p><strong>Created:</strong> {new Date(sessionDetails.session.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Last Updated:</strong> {new Date(sessionDetails.session.updatedAt).toLocaleString()}</p>
                      <p><strong>Participants:</strong> {sessionDetails.participantCount}</p>
                      <p><strong>Total Messages:</strong> {sessionDetails.messageCount}</p>
                      <p><strong>Duration:</strong> {sessionDetails.sessionDuration} minutes</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <strong>Participants:</strong>
                    <div className="mt-2">
                      {sessionDetails.session.participants?.map((participant: any) => (
                        <span key={participant.id} className="badge bg-info me-1">
                          {participant.name} ({participant.username})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h6 className="mb-0">Message History</h6>
                </div>
                <div className="card-body" style={{maxHeight: "400px", overflowY: "auto"}}>
                  {sessionDetails.messages?.map((message: any, index: number) => (
                    <div
                      key={message.id || index}
                      className={`p-2 my-1 rounded ${
                        message.sender?.username === 'agent' ? "bg-primary text-white text-end" : "bg-light text-start"
                      }`}
                    >
                      <small>
                        <strong>{message.sender?.name || message.sender?.username || 'Unknown'}:</strong> {message.content}
                        <br />
                        <span className="text-muted">
                          {new Date(message.sentAt).toLocaleTimeString()}
                        </span>
                      </small>
                    </div>
                  )) || (
                    <div className="text-center text-muted">
                      No messages in this session
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted" style={{padding: "100px 0"}}>
              <h5>Select a session to view details</h5>
              <p>Click on any session from the list to review its complete chat history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryTab;