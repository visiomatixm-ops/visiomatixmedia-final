-- V5__create_privilege_permissions_table.sql
-- Create join table for many-to-many relationship between privileges and permissions

CREATE TABLE privilege_permissions (
    privilege_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    PRIMARY KEY (privilege_id, permission_id),
    FOREIGN KEY (privilege_id) REFERENCES privileges(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Add indexes for better performance
CREATE INDEX idx_privilege_permissions_privilege_id ON privilege_permissions(privilege_id);
CREATE INDEX idx_privilege_permissions_permission_id ON privilege_permissions(permission_id);

-- Insert privilege-permission mappings based on the database schema
-- Privilege 1 (CREATE_USER) -> Permission 6 (USER_MANAGEMENT)
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (1, 6);

-- Privilege 2 (DELETE_USER) -> Permission 4 (ADMIN_ACCESS)
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (2, 4);

-- Privilege 3 (MANAGE_CHAT) -> Permissions 1,2,3,4,5 (CHAT_ACCESS, CHAT_WITH_DEFAULT, CHAT_WITH_AGENT, ADMIN_ACCESS, CHAT_WITH_USER)
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (3, 1);
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (3, 2);
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (3, 3);
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (3, 4);
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (3, 5);

-- Privilege 4 (ACCESS_CHAT_HISTORY_TAB) -> Permissions 1,7 (CHAT_ACCESS, SYSTEM_MONITORING)
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (4, 1);
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (4, 7);

-- Privilege 8 (ACCESS_PERMISSION_MANAGEMENT) -> Permissions 4,6 (ADMIN_ACCESS, USER_MANAGEMENT)
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (8, 4);
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (8, 6);

-- Privilege 10 (ACCESS_AGENT_DASHBOARD) -> Permissions 1,2,3,5,7 (CHAT_ACCESS, CHAT_WITH_DEFAULT, CHAT_WITH_AGENT, CHAT_WITH_USER, SYSTEM_MONITORING)
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (10, 1);
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (10, 2);
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (10, 3);
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (10, 5);
INSERT INTO privilege_permissions (privilege_id, permission_id) VALUES (10, 7);

-- Insert role-permission mappings
-- ROLE_ADMIN (1) -> All permissions (1-7)
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 1);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 2);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 3);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 4);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 5);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 6);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 7);

-- ROLE_AGENT (2) -> Permissions 5,6,7 (CHAT_WITH_USER, USER_MANAGEMENT, SYSTEM_MONITORING)
INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 5);
INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 6);
INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 7);

-- ROLE_USER (3) -> Permissions 1,2,3 (CHAT_ACCESS, CHAT_WITH_DEFAULT, CHAT_WITH_AGENT)
INSERT INTO role_permissions (role_id, permission_id) VALUES (3, 1);
INSERT INTO role_permissions (role_id, permission_id) VALUES (3, 2);
INSERT INTO role_permissions (role_id, permission_id) VALUES (3, 3);

-- Insert role-privilege mappings
-- ROLE_ADMIN (1) -> Privileges 1,2,3 (CREATE_USER, DELETE_USER, MANAGE_CHAT)
INSERT INTO role_privileges (role_id, privilege_id) VALUES (1, 1);
INSERT INTO role_privileges (role_id, privilege_id) VALUES (1, 2);
INSERT INTO role_privileges (role_id, privilege_id) VALUES (1, 3);

-- ROLE_AGENT (2) -> Privilege 3 (MANAGE_CHAT)
INSERT INTO role_privileges (role_id, privilege_id) VALUES (2, 3);

-- ROLE_USER (3) -> Privilege 3 (MANAGE_CHAT)
INSERT INTO role_privileges (role_id, privilege_id) VALUES (3, 3);

-- CUSTOMER_SUCCESS_MANAGER (4) -> All privileges (1,2,3,4,5,6,7,8,9,10,11)
INSERT INTO role_privileges (role_id, privilege_id) VALUES (4, 1);  -- CREATE_USER
INSERT INTO role_privileges (role_id, privilege_id) VALUES (4, 2);  -- DELETE_USER
INSERT INTO role_privileges (role_id, privilege_id) VALUES (4, 3);  -- MANAGE_CHAT
INSERT INTO role_privileges (role_id, privilege_id) VALUES (4, 4);  -- ACCESS_CHAT_HISTORY_TAB
INSERT INTO role_privileges (role_id, privilege_id) VALUES (4, 5);  -- ACCESS_STATISTICS_TAB
INSERT INTO role_privileges (role_id, privilege_id) VALUES (4, 6);  -- ACCESS_USER_MANAGEMENT
INSERT INTO role_privileges (role_id, privilege_id) VALUES (4, 7);  -- ACCESS_ROLE_MANAGEMENT
INSERT INTO role_privileges (role_id, privilege_id) VALUES (4, 8);  -- ACCESS_PERMISSION_MANAGEMENT
INSERT INTO role_privileges (role_id, privilege_id) VALUES (4, 9);  -- ACCESS_PRIVILEGE_MANAGEMENT
INSERT INTO role_privileges (role_id, privilege_id) VALUES (4, 10); -- ACCESS_AGENT_DASHBOARD
INSERT INTO role_privileges (role_id, privilege_id) VALUES (4, 11); -- CHAT_WITH_DEFAULT_USER