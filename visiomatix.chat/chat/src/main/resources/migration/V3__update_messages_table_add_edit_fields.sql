-- ===========================================================
-- File: V3__update_messages_table_add_edit_fields.sql
-- Author: Viral Prajapati
-- Date: 15-Oct-2025
-- Description:
--   Adds columns to track edited messages: is_edited and edited_at
--   Description: Allow nullable sender_id for system messages
-- ===========================================================
ALTER TABLE messages MODIFY COLUMN sender_id BIGINT NULL;

ALTER TABLE messages
ADD COLUMN is_edited BOOLEAN DEFAULT FALSE,
ADD COLUMN edited_at TIMESTAMP NULL;

-- Optional: Add index to speed up queries filtering edited messages
CREATE INDEX idx_messages_is_edited ON messages(is_edited);
