import { useState, useEffect } from "react";
import api from "../api/api";

interface Session {
  id: number;
  sessionName: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  id: string;
  sender?: {
    username: string;
    name?: string;
  };
  content: string;
  sentAt: string;
  messageType: string;
}

interface ChatWindowProps {
  session: Session | null;
  messages: Message[];
  onSendMessage?: (text: string) => void;
}

export default function ChatWindow({ session, messages, onSendMessage }: ChatWindowProps) {
  const [text, setText] = useState("");

  if (!session)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a chat session
      </div>
    );

  const sendMsg = async () => {
    if (!text.trim()) return;
    await api.post(`/chat/sessions/${session.id}/messages`, { content: text });
    setText("");
    if (onSendMessage) onSendMessage(text);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
        {messages.map((m) => (
          <div key={m.id} className="mb-2">
            <b>{m.sender?.username ?? "Unknown"}:</b> {m.content}
          </div>
        ))}
      </div>
      <div className="p-3 bg-gray-800 flex">
        <input
          className="flex-1 p-2 rounded text-black"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMsg}
          className="bg-blue-600 ml-2 px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
