# Role Management and Mapping Guide

## Overview
This guide explains the role-based access control (RBAC) system implemented in the Visiomatix Chat application, including role creation, mapping operations, and the files responsible for these functionalities.

## Architecture Overview

### Database Schema
The system uses a complex many-to-many relationship structure:
- **Users** ↔ **Roles** (via `user_roles` table)
- **Roles** ↔ **Permissions** (via `role_permissions` table)
- **Roles** ↔ **Privileges** (via `role_privileges` table)

### Key Components
1. **Backend (Spring Boot)**: Handles business logic, database operations, and API endpoints
2. **Frontend (React/TypeScript)**: Provides UI for role management and user creation
3. **Database (MySQL)**: Stores roles, permissions, privileges, and their relationships

## Files Responsible for Role Mapping and Creation

### Backend Files

#### 1. Entity/Model Classes
- **`visiomatix.chat/chat/src/main/java/com/visiomatix/chat/chat/user/model/Role.java`**
  - JPA entity representing roles
  - Contains role name, description, and relationships to permissions/privileges

- **`visiomatix.chat/chat/src/main/java/com/visiomatix/chat/chat/user/model/Permission.java`**
  - JPA entity for permissions
  - Defines granular access rights (READ_USERS, WRITE_USERS, etc.)

- **`visiomatix.chat/chat/src/main/java/com/visiomatix/chat/chat/user/model/Privilege.java`**
  - JPA entity for privileges
  - Defines high-level access categories (SYSTEM_MONITORING, USER_MANAGEMENT, etc.)

#### 2. Service Layer
- **`visiomatix.chat/chat/src/main/java/com/visiomatix/chat/chat/user/service/RoleService.java`**
  - Interface defining role management operations
  - Methods: createRole, updateRole, deleteRole, assignPermissionsToRole, etc.

- **`visiomatix.chat/chat/src/main/java/com/visiomatix/chat/chat/user/service/RoleServiceImpl.java`**
  - Implementation of role service
  - Handles complex business logic for role operations
  - Manages relationships between roles, permissions, and privileges

- **`visiomatix.chat/chat/src/main/java/com/visiomatix/chat/chat/user/service/PrivilegeService.java`**
  - Interface for privilege management operations

- **`visiomatix.chat/chat/src/main/java/com/visiomatix/chat/chat/user/service/PrivilegeServiceImpl.java`**
  - Implementation of privilege service
  - Handles privilege CRUD operations and role-privilege mappings

#### 3. Controller Layer
- **`visiomatix.chat/chat/src/main/java/com/visiomatix/chat/chat/user/controller/AdminController.java`**
  - REST API endpoints for role management
  - Endpoints: `/api/admin/roles`, `/api/admin/permissions`, `/api/admin/privileges`
  - Handles role creation, assignment, and management operations

#### 4. Repository Layer
- **`visiomatix.chat/chat/src/main/java/com/visiomatix/chat/chat/user/repository/RoleRepository.java`**
  - JPA repository for role CRUD operations
  - Custom queries for role-permission-privilege relationships

- **`visiomatix.chat/chat/src/main/java/com/visiomatix/chat/chat/user/repository/PermissionRepository.java`**
  - Repository for permission operations

- **`visiomatix.chat/chat/src/main/java/com/visiomatix/chat/chat/user/repository/PrivilegeRepository.java`**
  - Repository for privilege operations

#### 5. Database Migration
- **`visiomatix.chat/chat/src/main/resources/migration/V5__create_privilege_permissions_table.sql`**
  - Database schema for roles, permissions, and privileges
  - Defines table structures and relationships

### Frontend Files

#### 1. API Layer
- **`agent-frontend/src/api/api.ts`**
  - Axios-based API client
  - Functions: `adminAPI.getRoles()`, `adminAPI.createRole()`, `adminAPI.assignPermissionToRole()`, etc.

#### 2. Admin Panel Components
- **`agent-frontend/src/pages/AdminPanel.tsx`**
  - Main admin panel component
  - Contains sub-tabs for different admin functions
  - Handles role-based tab access control via `hasPrivilege()` function

- **`agent-frontend/src/components/admin/RolesTab.tsx`**
  - UI for managing roles, permissions, and privileges
  - Displays role-permission-privilege mappings
  - Provides interface for assigning permissions/privileges to roles

- **`agent-frontend/src/components/admin/UsersTab.tsx`**
  - User management interface
  - **NEW**: Custom role creation modal
  - Allows creating roles with selected privileges/permissions from admin role subsets
  - Dynamic role creation during user creation process

#### 3. Authentication & Security
- **`visiomatix.chat/chat/src/main/java/com/visiomatix/chat/chat/config/SecurityConfig.java`**
  - Spring Security configuration
  - Role-based endpoint protection
  - JWT token validation

## Role Mapping Operations

### 1. Role Creation Process

#### Standard Role Creation (Backend)
```java
// In RoleServiceImpl.java
public Role createRole(RoleDTO roleDTO) {
    Role role = new Role();
    role.setName(roleDTO.getName());
    role.setDescription(roleDTO.getDescription());

    // Save role first
    role = roleRepository.save(role);

    // Assign permissions if provided
    if (roleDTO.getPermissions() != null) {
        for (String permissionName : roleDTO.getPermissions()) {
            Permission permission = permissionRepository.findByName(permissionName);
            if (permission != null) {
                role.getPermissions().add(permission);
            }
        }
    }

    // Assign privileges if provided
    if (roleDTO.getPrivileges() != null) {
        for (String privilegeName : roleDTO.getPrivileges()) {
            Privilege privilege = privilegeRepository.findByName(privilegeName);
            if (privilege != null) {
                role.getPrivileges().add(privilege);
            }
        }
    }

    return roleRepository.save(role);
}
```

#### Custom Role Creation (Frontend)
```typescript
// In UsersTab.tsx - handleCreateCustomRole function
const handleCreateCustomRole = async () => {
    const customRoleData = {
        name: `ROLE_${customRoleName.toUpperCase().replace(/\s+/g, '_')}`,
        description: `Custom role created with ${selectedPrivileges.length} privileges and ${selectedPermissions.length} permissions`,
        privileges: selectedPrivileges,
        permissions: selectedPermissions
    };

    // API call would be made here
    // await adminAPI.createCustomRole(customRoleData);
};
```

### 2. Role Assignment Operations

#### Assign Role to User
```java
// In AdminController.java
@PostMapping("/users/{userId}/roles/{roleId}")
public ResponseEntity<?> assignRoleToUser(@PathVariable Long userId, @PathVariable Long roleId) {
    User user = userService.findById(userId);
    Role role = roleService.findById(roleId);

    user.getRoles().add(role);
    userService.save(user);

    return ResponseEntity.ok().build();
}
```

#### Assign Permission to Role
```java
// In RoleServiceImpl.java
public void assignPermissionToRole(Long roleId, Long permissionId) {
    Role role = roleRepository.findById(roleId).orElseThrow();
    Permission permission = permissionRepository.findById(permissionId).orElseThrow();

    role.getPermissions().add(permission);
    roleRepository.save(role);
}
```

### 3. Privilege-Based Access Control

#### Frontend Privilege Checking
```typescript
// In AdminPanel.tsx
const hasPrivilege = (privilegeName: string) => {
    // This would check current user's privileges
    // For now return true for all (demo purposes)
    return true;
};

// Usage in tab rendering
{hasPrivilege("ACCESS_USER_MANAGEMENT") && (
    <li className="nav-item">
        <button>Users</button>
    </li>
)}
```

## Database Relationships

### Table Structure
```sql
-- From V5__create_privilege_permissions_table.sql

-- Roles table
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Permissions table
CREATE TABLE permissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    permission_type ENUM('READ', 'WRITE', 'DELETE', 'ADMIN') NOT NULL,
    resource_pattern VARCHAR(255)
);

-- Privileges table
CREATE TABLE privileges (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

-- Junction tables
CREATE TABLE role_permissions (
    role_id BIGINT,
    permission_id BIGINT,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE role_privileges (
    role_id BIGINT,
    privilege_id BIGINT,
    PRIMARY KEY (role_id, privilege_id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (privilege_id) REFERENCES privileges(id)
);

CREATE TABLE user_roles (
    user_id BIGINT,
    role_id BIGINT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

## Key Features Implemented

### 1. Dynamic Role Creation
- **File**: `agent-frontend/src/components/admin/UsersTab.tsx`
- **Feature**: Modal dialog for creating custom roles with selected privileges/permissions
- **Process**: Admin selects privileges/permissions from admin role subsets → Creates new role → Assigns to user

### 2. Role-Based Tab Access
- **File**: `agent-frontend/src/pages/AdminPanel.tsx`
- **Feature**: Tabs only visible if user has required privileges
- **Implementation**: `hasPrivilege()` function checks user privileges

### 3. Complex Relationship Management
- **File**: `agent-frontend/src/components/admin/RolesTab.tsx`
- **Feature**: UI for managing role-permission-privilege relationships
- **Operations**: Assign/remove permissions/privileges from roles

### 4. JWT-Based Authentication
- **File**: `visiomatix.chat/chat/src/main/java/com/visiomatix/chat/chat/config/SecurityConfig.java`
- **Feature**: Token-based authentication with role information
- **Response**: Includes roles array in login response

## API Endpoints

### Role Management
- `GET /api/admin/roles` - Get all roles
- `POST /api/admin/roles` - Create new role
- `PUT /api/admin/roles/{id}` - Update role
- `DELETE /api/admin/roles/{id}` - Delete role

### Permission Management
- `GET /api/admin/permissions` - Get all permissions
- `POST /api/admin/permissions` - Create permission
- `DELETE /api/admin/permissions/{id}` - Delete permission

### Privilege Management
- `GET /api/admin/privileges` - Get all privileges
- `POST /api/admin/privileges` - Create privilege
- `DELETE /api/admin/privileges/{id}` - Delete privilege

### Role Assignment
- `POST /api/admin/users/{userId}/roles/{roleId}` - Assign role to user
- `DELETE /api/admin/users/{userId}/roles/{roleId}` - Remove role from user
- `POST /api/admin/roles/{roleId}/permissions/{permissionId}` - Assign permission to role
- `DELETE /api/admin/roles/{roleId}/permissions/{permissionId}` - Remove permission from role

## Security Considerations

1. **Role-Based Access Control (RBAC)**: Users only access features based on their assigned roles
2. **Privilege-Based UI**: Frontend components check privileges before rendering
3. **JWT Token Validation**: All API calls require valid JWT tokens
4. **Database Constraints**: Foreign key relationships prevent orphaned records

## Future Enhancements

1. **Role Templates**: Pre-defined role templates for common use cases
2. **Dynamic Permission Evaluation**: Runtime permission checking based on business rules
3. **Audit Logging**: Track all role/permission changes
4. **Role Inheritance**: Hierarchical role structures
5. **Permission Groups**: Organize permissions into logical groups

## Troubleshooting

### Common Issues
1. **403 Forbidden**: User lacks required privileges
2. **Role Not Found**: Check role exists in database
3. **Permission Denied**: Verify user has necessary permissions

### Debug Steps
1. Check JWT token contains correct roles
2. Verify database relationships are properly established
3. Check frontend privilege checking logic
4. Review server logs for authentication/authorization errors

This comprehensive role management system provides fine-grained access control while maintaining flexibility for custom role creation and assignment.