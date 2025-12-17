/**
 * ===========================================================
 * File: AutoRoleService.java
 * Location: com.visiomatix.chat.chat.user.service
 * Author: Viral Prajapati
 * Date: 17-Nov-2025
 * Description:
 *   Service for automatic role creation with predefined permissions and privileges.
 *   Handles dynamic role assignment based on business requirements.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.model.Permission;
import com.visiomatix.chat.chat.user.model.Privilege;
import com.visiomatix.chat.chat.user.model.Role;
import com.visiomatix.chat.chat.user.repository.PermissionRepository;
import com.visiomatix.chat.chat.user.repository.PrivilegeRepository;
import com.visiomatix.chat.chat.user.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AutoRoleService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final PrivilegeRepository privilegeRepository;

    // ===========================================================
    // Predefined Permissions for Auto-Assignment
    // ===========================================================
    private static final String[] DEFAULT_PERMISSIONS = {
        "SYSTEM_MONITORING",
        "CHAT_ACCESS",
        "CHAT_WITH_USER",
        "CHAT_WITH_DEFAULT",
        "USER_MANAGEMENT",
        "CHAT_WITH_AGENT",
        "ADMIN_ACCESS"
    };

    // ===========================================================
    // Predefined Privileges for Auto-Assignment
    // ===========================================================
    private static final String[] DEFAULT_PRIVILEGES = {
        "ACCESS_USER_MANAGEMENT",
        "CREATE_USER",
        "ACCESS_STATISTICS_TAB",
        "ACCESS_AGENT_DASHBOARD",
        "DELETE_USER",
        "ACCESS_ROLE_MANAGEMENT",
        "ACCESS_PERMISSION_MANAGEMENT",
        "CHAT_WITH_DEFAULT_USER",
        "MANAGE_CHAT",
        "ACCESS_CHAT_HISTORY_TAB"
    };

    // ===========================================================
    // Create Role with Automatic Permission/Privilege Assignment
    // ===========================================================
    @Transactional
    public Role createRoleWithAutoAssignment(String roleName, String createdBy) {
        // Check if role already exists
        if (roleRepository.findByName(roleName).isPresent()) {
            throw new RuntimeException("Role '" + roleName + "' already exists");
        }

        Role role = new Role();
        role.setName(roleName);

        // Auto-assign permissions and privileges
        Set<Permission> permissions = new HashSet<>();
        Set<Privilege> privileges = new HashSet<>();

        // Add all default permissions
        for (String permName : DEFAULT_PERMISSIONS) {
            permissionRepository.findByName(permName).ifPresent(permissions::add);
        }

        // Add all default privileges
        for (String privName : DEFAULT_PRIVILEGES) {
            Privilege privilege = privilegeRepository.findByName(privName);
            if (privilege != null) {
                privileges.add(privilege);
            }
        }

        role.setPermissions(permissions);
        role.setPrivileges(privileges);

        return roleRepository.save(role);
    }

    // ===========================================================
    // Create Customer Success Manager Role
    // ===========================================================
    @Transactional
    public Role createCustomerSuccessManagerRole(String createdBy) {
        return createRoleWithAutoAssignment("CUSTOMER_SUCCESS_MANAGER", createdBy);
    }

    // ===========================================================
    // Create Agent Role with Limited Permissions
    // ===========================================================
    @Transactional
    public Role createAgentRole(String createdBy) {
        Role role = new Role();
        role.setName("AGENT");

        Set<Permission> permissions = new HashSet<>();
        Set<Privilege> privileges = new HashSet<>();

        // Limited permissions for agents
        String[] agentPermissions = {"CHAT_ACCESS", "CHAT_WITH_USER", "CHAT_WITH_DEFAULT"};
        String[] agentPrivileges = {"MANAGE_CHAT", "CHAT_WITH_DEFAULT_USER"};

        for (String permName : agentPermissions) {
            permissionRepository.findByName(permName).ifPresent(permissions::add);
        }

        for (String privName : agentPrivileges) {
            Privilege privilege = privilegeRepository.findByName(privName);
            if (privilege != null) {
                privileges.add(privilege);
            }
        }

        role.setPermissions(permissions);
        role.setPrivileges(privileges);

        return roleRepository.save(role);
    }

    // ===========================================================
    // Get or Create Role with Auto-Assignment
    // ===========================================================
    @Transactional
    public Role getOrCreateRoleWithAutoAssignment(String roleName, String createdBy) {
        return roleRepository.findByName(roleName)
                .orElseGet(() -> createRoleWithAutoAssignment(roleName, createdBy));
    }

    // ===========================================================
    // Update Existing Role with Full Permissions
    // ===========================================================
    @Transactional
    public Role updateRoleToFullAccess(Long roleId, String modifiedBy) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Add all default permissions and privileges
        Set<Permission> permissions = new HashSet<>();
        Set<Privilege> privileges = new HashSet<>();

        for (String permName : DEFAULT_PERMISSIONS) {
            permissionRepository.findByName(permName).ifPresent(permissions::add);
        }

        for (String privName : DEFAULT_PRIVILEGES) {
            Privilege privilege = privilegeRepository.findByName(privName);
            if (privilege != null) {
                privileges.add(privilege);
            }
        }

        role.setPermissions(permissions);
        role.setPrivileges(privileges);

        return roleRepository.save(role);
    }
}