interface Session {
  id: number;
  sessionName: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  participants?: any[];
}

interface SessionListProps {
  sessions: Session[];
  onSelect: (session: Session) => void;
}

export default function SessionList({ sessions, onSelect }: SessionListProps) {
  return (
    <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto">
      <h2 className="text-lg mb-3">Active Sessions</h2>
      {sessions.map((s) => (
        <div
          key={s.id}
          onClick={() => onSelect(s)}
          className="p-3 mb-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
        >
          <p>{s.sessionName}</p>
        </div>
      ))}
    </div>
  );
}
