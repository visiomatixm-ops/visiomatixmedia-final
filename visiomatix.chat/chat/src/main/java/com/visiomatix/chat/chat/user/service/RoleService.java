/**
 * ===========================================================
 * Role Service - Comprehensive Role and Permission Management
 * ===========================================================
 *
 * This service provides complete role-based access control (RBAC) functionality
 * for the Visiomatix Chat application. It manages roles, permissions, and privileges
 * with automatic assignment based on role naming patterns.
 *
 * Key Features:
 * - Automatic permission and privilege assignment based on role names
 * - Support for dynamic role patterns (ADMIN, CUSTOMER_SUCCESS, AGENT, USER)
 * - CRUD operations for roles, permissions, and privileges
 * - Transactional operations for data consistency
 * - Extensible design for adding new role patterns
 *
 * Role Assignment Logic:
 * - ADMIN roles: Get all permissions and privileges
 * - CUSTOMER_SUCCESS roles: Comprehensive access for customer management
 * - AGENT roles: Chat handling and user management permissions
 * - USER roles: Basic chat access permissions
 * - Dynamic patterns: Custom assignments for specific role names
 *
 * Usage:
 * - Create roles with automatic permission assignment
 * - Manage role-permission and role-privilege relationships
 * - Support for audit trails and transactional operations
 *
 * @author Visiomatix Development Team
 * @version 2.0
 * @since 2025
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.service;

// ============================
// Import Statements
// ============================
import com.visiomatix.chat.chat.user.dto.RoleDTO;
import com.visiomatix.chat.chat.user.model.Permission;
import com.visiomatix.chat.chat.user.model.Privilege;
import com.visiomatix.chat.chat.user.model.Role;
import com.visiomatix.chat.chat.user.repository.PermissionRepository;
import com.visiomatix.chat.chat.user.repository.PrivilegeRepository;
import com.visiomatix.chat.chat.user.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.time.LocalDateTime;

/**
 * Role Service Implementation
 *
 * Spring service component that handles all role-related business logic
 * including automatic permission assignment, CRUD operations, and
 * role-permission privilege management.
 */
@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final PrivilegeRepository privilegeRepository;

    // ===========================================================
    // Create a new Role with automatic permission/privilege assignment
    // ===========================================================
    @Transactional
    public Role createRole(RoleDTO roleDTO) {
        // Check if role already exists
        if(roleRepository.findByName(roleDTO.getName()).isPresent())
            throw new RuntimeException("Role already exists");

        Role role = new Role();
        role.setName(roleDTO.getName());
        role.setPermissions(roleDTO.getPermissions());

        // Auto-assign permissions and privileges based on role name patterns
        assignDefaultPermissionsAndPrivileges(role);

        return roleRepository.save(role);
    }

    // ===========================================================
    // Auto-assign permissions and privileges based on role naming patterns
    // ===========================================================
    private void assignDefaultPermissionsAndPrivileges(Role role) {
        String roleName = role.getName().toUpperCase();

        // Initialize collections if null
        if (role.getPermissions() == null) {
            role.setPermissions(new java.util.HashSet<>());
        }
        if (role.getPrivileges() == null) {
            role.setPrivileges(new java.util.HashSet<>());
        }

        // Auto-assign based on role name patterns
        if (roleName.contains("ADMIN")) {
            // Full admin access
            assignAllPermissionsAndPrivileges(role);
        } else if (roleName.contains("CUSTOMER_SUCCESS") || roleName.contains("CSM") || roleName.contains("CUSTOMER_MANAGER")) {
            // Customer Success Manager - comprehensive access
            assignCustomerSuccessPermissionsAndPrivileges(role);
        } else if (roleName.contains("AGENT") || roleName.contains("SUPPORT")) {
            // Agent/Support role
            assignAgentPermissionsAndPrivileges(role);
        } else if (roleName.contains("USER") || roleName.contains("CLIENT")) {
            // Basic user access
            assignUserPermissionsAndPrivileges(role);
        } else {
            // Default minimal access for unknown roles
            assignBasicPermissionsAndPrivileges(role);
        }

        // Additional dynamic assignment based on role name patterns
        assignDynamicPermissionsAndPrivileges(role);
    }

    // ===========================================================
    // Dynamic permission and privilege assignment based on custom patterns
    // ===========================================================
    private void assignDynamicPermissionsAndPrivileges(Role role) {
        String roleName = role.getName().toUpperCase();

        // Dynamic assignment for specific role patterns
        if (roleName.equals("CUSTOMER_SUCCESS_LEAD")) {
            // Specific permissions for Customer Success Lead
            addPermissionByName(role, "SYSTEM_MONITORING");
            addPermissionByName(role, "CHAT_WITH_AGENT");
            addPermissionByName(role, "CHAT_ACCESS");
            addPermissionByName(role, "CHAT_WITH_DEFAULT");
            addPermissionByName(role, "CHAT_WITH_USER");
            addPermissionByName(role, "USER_MANAGEMENT");

            // Specific privileges for Customer Success Lead
            addPrivilegeByName(role, "CREATE_USER");
            addPrivilegeByName(role, "MANAGE_CHAT");
            addPrivilegeByName(role, "ACCESS_PERMISSION_MANAGEMENT");
            addPrivilegeByName(role, "ACCESS_CHAT_HISTORY_TAB");
            addPrivilegeByName(role, "ACCESS_AGENT_DASHBOARD");
            addPrivilegeByName(role, "CHAT_WITH_DEFAULT_USER");
            addPrivilegeByName(role, "ACCESS_USER_MANAGEMENT");
            addPrivilegeByName(role, "DELETE_USER");
            addPrivilegeByName(role, "ACCESS_ROLE_MANAGEMENT");
            addPrivilegeByName(role, "ACCESS_STATISTICS_TAB");
        }

        // Add more dynamic patterns as needed
        // Example: if (roleName.contains("MANAGER")) { ... }
        // Example: if (roleName.contains("SUPERVISOR")) { ... }

        // You can easily add new role patterns here without changing migration scripts
        // Just add new if-else conditions for specific role names or patterns
    }

    // ===========================================================
    // Assign all permissions and privileges (Admin)
    // ===========================================================
    private void assignAllPermissionsAndPrivileges(Role role) {
        // Get all permissions and privileges
        java.util.List<Permission> allPermissions = permissionRepository.findAll();
        java.util.List<Privilege> allPrivileges = privilegeRepository.findAll();

        role.getPermissions().addAll(allPermissions);
        role.getPrivileges().addAll(allPrivileges);
    }

    // ===========================================================
    // Assign Customer Success Manager permissions and privileges
    // ===========================================================
    private void assignCustomerSuccessPermissionsAndPrivileges(Role role) {
        // Direct permissions
        addPermissionByName(role, "CHAT_ACCESS");
        addPermissionByName(role, "CHAT_WITH_DEFAULT");
        addPermissionByName(role, "SYSTEM_MONITORING");
        addPermissionByName(role, "CHAT_WITH_AGENT");
        addPermissionByName(role, "USER_MANAGEMENT");
        addPermissionByName(role, "CHAT_WITH_USER");

        // Privileges
        addPrivilegeByName(role, "DELETE_USER");
        addPrivilegeByName(role, "CHAT_WITH_DEFAULT_USER");
        addPrivilegeByName(role, "ACCESS_ROLE_MANAGEMENT");
        addPrivilegeByName(role, "CREATE_USER");
        addPrivilegeByName(role, "ACCESS_STATISTICS_TAB");
        addPrivilegeByName(role, "ACCESS_PERMISSION_MANAGEMENT");
        addPrivilegeByName(role, "ACCESS_CHAT_HISTORY_TAB");
        addPrivilegeByName(role, "MANAGE_CHAT");
        addPrivilegeByName(role, "ACCESS_USER_MANAGEMENT");
        addPrivilegeByName(role, "ACCESS_AGENT_DASHBOARD");
    }

    // ===========================================================
    // Assign Agent permissions and privileges
    // ===========================================================
    private void assignAgentPermissionsAndPrivileges(Role role) {
        // Direct permissions
        addPermissionByName(role, "CHAT_WITH_USER");
        addPermissionByName(role, "USER_MANAGEMENT");
        addPermissionByName(role, "SYSTEM_MONITORING");

        // Privileges
        addPrivilegeByName(role, "MANAGE_CHAT");
    }

    // ===========================================================
    // Assign User permissions and privileges
    // ===========================================================
    private void assignUserPermissionsAndPrivileges(Role role) {
        // Direct permissions
        addPermissionByName(role, "CHAT_ACCESS");
        addPermissionByName(role, "CHAT_WITH_DEFAULT");
        addPermissionByName(role, "CHAT_WITH_AGENT");

        // Privileges
        addPrivilegeByName(role, "MANAGE_CHAT");
    }

    // ===========================================================
    // Assign Basic permissions and privileges
    // ===========================================================
    private void assignBasicPermissionsAndPrivileges(Role role) {
        // Basic chat access
        addPermissionByName(role, "CHAT_ACCESS");
        addPermissionByName(role, "CHAT_WITH_DEFAULT");
    }

    // ===========================================================
    // Helper method to add permission by name
    // ===========================================================
    private void addPermissionByName(Role role, String permissionName) {
        Optional<Permission> permissionOpt = permissionRepository.findByName(permissionName);
        permissionOpt.ifPresent(permission -> role.getPermissions().add(permission));
    }

    // ===========================================================
    // Helper method to add privilege by name
    // ===========================================================
    private void addPrivilegeByName(Role role, String privilegeName) {
        Privilege privilege = privilegeRepository.findByName(privilegeName);
        if (privilege != null) {
            role.getPrivileges().add(privilege);
        }
    }

    // ===========================================================
    // Create a new Role with audit trail and auto-assignment
    // ===========================================================
    @Transactional
    public Role createRole(RoleDTO roleDTO, String createdBy) {
        // Check if role already exists
        if(roleRepository.findByName(roleDTO.getName()).isPresent())
            throw new RuntimeException("Role already exists");

        Role role = new Role();
        role.setName(roleDTO.getName());
        role.setPermissions(roleDTO.getPermissions());

        // Auto-assign permissions and privileges based on role name patterns
        assignDefaultPermissionsAndPrivileges(role);

        // Note: Role entity doesn't have audit fields, so we skip setting createdBy
        return roleRepository.save(role);
    }

    // ===========================================================
    // Get all roles
    // ===========================================================
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // ===========================================================
    // Get role by name
    // ===========================================================
    public Optional<Role> getRoleByName(String name) {
        return roleRepository.findByName(name);
    }

    // ===========================================================
    // Get role by ID
    // ===========================================================
    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }

    // ===========================================================
    // Delete a role by ID
    // ===========================================================
    @Transactional
    public void deleteRole(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        roleRepository.delete(role);
    }

    // ===========================================================
    // Update a role by ID
    // ===========================================================
    @Transactional
    public Role updateRole(Long id, RoleDTO roleDTO, String modifiedBy) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Check if another role with the same name exists
        Optional<Role> existingRole = roleRepository.findByName(roleDTO.getName());
        if (existingRole.isPresent() && !existingRole.get().getId().equals(id)) {
            throw new RuntimeException("Role with name '" + roleDTO.getName() + "' already exists");
        }

        role.setName(roleDTO.getName());
        // Note: We don't update permissions here as that's handled separately
        return roleRepository.save(role);
    }

    // ===========================================================
    // Delete a role by ID with audit trail
    // ===========================================================
    @Transactional
    public void deleteRole(Long id, String deletedBy) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        roleRepository.delete(role);
    }

    // ===========================================================
    // Assign permission to role
    // ===========================================================
    @Transactional
    public Role assignPermissionToRole(Long roleId, Long permissionId, String modifiedBy) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new RuntimeException("Permission not found"));

        role.getPermissions().add(permission);
        return roleRepository.save(role);
    }

    // ===========================================================
    // Remove permission from role
    // ===========================================================
    @Transactional
    public Role removePermissionFromRole(Long roleId, Long permissionId, String modifiedBy) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new RuntimeException("Permission not found"));

        role.getPermissions().remove(permission);
        return roleRepository.save(role);
    }

    // ===========================================================
    // Get role privileges
    // ===========================================================
    public Set<Privilege> getRolePrivileges(Long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        return role.getPrivileges();
    }

    // ===========================================================
    // Assign privilege to role
    // ===========================================================
    @Transactional
    public Role assignPrivilegeToRole(Long roleId, Long privilegeId, String modifiedBy) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        Privilege privilege = privilegeRepository.findById(privilegeId)
                .orElseThrow(() -> new RuntimeException("Privilege not found"));

        role.getPrivileges().add(privilege);
        return roleRepository.save(role);
    }

    // ===========================================================
    // Remove privilege from role
    // ===========================================================
    @Transactional
    public Role removePrivilegeFromRole(Long roleId, Long privilegeId, String modifiedBy) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        Privilege privilege = privilegeRepository.findById(privilegeId)
                .orElseThrow(() -> new RuntimeException("Privilege not found"));

        role.getPrivileges().remove(privilege);
        return roleRepository.save(role);
    }
}
