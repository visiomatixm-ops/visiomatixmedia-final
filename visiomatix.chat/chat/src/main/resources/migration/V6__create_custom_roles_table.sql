-- ===========================================================
-- File: V6__create_custom_roles_table.sql
-- Location: src/main/resources/migration
-- Author: Viral Prajapati
-- Date: 29-Oct-2025
-- Description:
--   Creates custom_roles table and related junction tables
--   for dynamic custom role management.
-- ===========================================================

-- Create custom_roles table
CREATE TABLE custom_roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    modified_by VARCHAR(255)
);

-- Create custom_role_permissions junction table
CREATE TABLE custom_role_permissions (
    custom_role_id BIGINT,
    permission_id BIGINT,
    FOREIGN KEY (custom_role_id) REFERENCES custom_roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (custom_role_id, permission_id)
);

-- Create custom_role_privileges junction table
CREATE TABLE custom_role_privileges (
    custom_role_id BIGINT,
    privilege_id BIGINT,
    FOREIGN KEY (custom_role_id) REFERENCES custom_roles(id) ON DELETE CASCADE,
    FOREIGN KEY (privilege_id) REFERENCES privileges(id) ON DELETE CASCADE,
    PRIMARY KEY (custom_role_id, privilege_id)
);

-- Create user_custom_roles junction table for many-to-many relationship
CREATE TABLE user_custom_roles (
    user_id BIGINT,
    custom_role_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (custom_role_id) REFERENCES custom_roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, custom_role_id)
);