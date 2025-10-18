-- V4__add_session_expiry.sql
ALTER TABLE chat_sessions
  ADD COLUMN session_expiry DATETIME NULL AFTER updated_at;

ALTER TABLE chat_sessions ADD COLUMN session_expiry DATETIME NULL;
UPDATE chat_sessions SET session_expiry = DATE_ADD(COALESCE(updated_at, NOW()), INTERVAL 4 HOUR) WHERE is_active = 1;

-- Optional: initialize session_expiry for existing active sessions to created_at + default duration
-- UPDATE chat_sessions SET session_expiry = DATE_ADD(COALESCE(created_at, NOW()), INTERVAL 4 HOUR) WHERE is_active = 1;
