-- V2__create_message_table.sql
-- Messages table with delivered/read timestamps and relation to chat_session and sender

CREATE TABLE messages (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  content TEXT,
  message_type VARCHAR(50) DEFAULT 'TEXT',
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  delivered_at TIMESTAMP NULL,
  read_at TIMESTAMP NULL,
  sender_id BIGINT,
  chat_session_id BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_message_sender FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_message_session FOREIGN KEY (chat_session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
);

CREATE INDEX idx_messages_chat_session_sent_at ON messages (chat_session_id, sent_at);
CREATE INDEX idx_messages_sender_sent_at ON messages (sender_id, sent_at);
CREATE INDEX idx_messages_unread ON messages (chat_session_id, read_at);
