-- Script to fix Kaal user authentication and admin panel access
-- This script will:
-- 1. Reset Kaal password to 'kaal123' 
-- 2. Ensure CUSTOMER SUCCESS MANAGER role has correct privileges
-- 3. Verify role assignments

USE visiomatix_chat;

-- Step 1: Update Kaal user password (using BCrypt hash for 'kaal123')
-- This hash corresponds to password: 'kaal123'
UPDATE users 
SET password = '$2a$10$lygvpBKDacr01mEaq0jChOQlhPnenDg3KtT8p4byGC8wIq2qiTP4q'
WHERE username = 'kaal';

-- Step 2: Verify Kaal user exists and has correct role
SELECT 
    u.id, 
    u.username, 
    u.name, 
    u.email,
    r.name as role_name,
    r.id as role_id
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id
WHERE u.username = 'kaal';

-- Step 3: Verify CUSTOMER SUCCESS MANAGER role has all required privileges
SELECT 
    p.name as privilege_name,
    p.id as privilege_id
FROM roles r
JOIN role_privileges rp ON r.id = rp.role_id
JOIN privileges p ON rp.privilege_id = p.id
WHERE r.name = 'ROLE_CUSTOMER_SUCCESS_MANAGER'
ORDER BY p.name;

-- Step 4: Ensure all required privileges exist and are assigned to the role
-- If any privileges are missing, this will help identify what needs to be added

-- Check if role exists
SELECT id, name FROM roles WHERE name = 'ROLE_CUSTOMER_SUCCESS_MANAGER';

-- Insert missing privileges if needed (run only if role exists but missing privileges)
-- Uncomment and modify as needed:
/*
INSERT INTO role_privileges (role_id, privilege_id)
SELECT r.id, p.id 
FROM roles r, privileges p
WHERE r.name = 'ROLE_CUSTOMER_SUCCESS_MANAGER' 
AND p.name IN (
    'ACCESS_USER_MANAGEMENT',
    'ACCESS_ROLE_MANAGEMENT', 
    'ACCESS_PERMISSION_MANAGEMENT',
    'ACCESS_STATISTICS_TAB',
    'ACCESS_CHAT_HISTORY_TAB'
)
AND NOT EXISTS (
    SELECT 1 FROM role_privileges rp 
    WHERE rp.role_id = r.id AND rp.privilege_id = p.id
);
*/

-- Step 5: Final verification - what Kaal should see after login
SELECT 
    u.username,
    r.name as role,
    p.name as privileges
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
JOIN role_privileges rp ON r.id = rp.role_id
JOIN privileges p ON rp.privilege_id = p.id
WHERE u.username = 'kaal'
ORDER BY p.name;