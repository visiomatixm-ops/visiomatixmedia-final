-- V1__create_chat_session_table.sql
-- Create chat_sessions table and participants join table

CREATE TABLE chat_sessions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  session_type VARCHAR(50) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_message_at TIMESTAMP NULL
);

-- participants join table between chat_sessions and users
CREATE TABLE chat_session_participants (
  chat_session_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  PRIMARY KEY (chat_session_id, user_id),
  CONSTRAINT fk_csp_session FOREIGN KEY (chat_session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE,
  CONSTRAINT fk_csp_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_chat_session_last_message_at ON chat_sessions (last_message_at);
