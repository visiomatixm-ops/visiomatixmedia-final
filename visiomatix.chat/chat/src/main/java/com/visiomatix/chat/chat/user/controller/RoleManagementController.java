/**
 * ===========================================================
 * File: RoleManagementController.java
 * Location: com.visiomatix.chat.chat.user.controller
 * Author: Viral Prajapati
 * Date: 17-Nov-2025
 * Description:
 *   REST controller for automated role management with predefined permissions and privileges.
 *   Provides endpoints for creating roles with automatic access control assignment.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.controller;

import com.visiomatix.chat.chat.user.model.Role;
import com.visiomatix.chat.chat.user.service.AutoRoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/roles")
public class RoleManagementController {

    private static final Logger logger = LoggerFactory.getLogger(RoleManagementController.class);

    private final AutoRoleService autoRoleService;

    public RoleManagementController(AutoRoleService autoRoleService) {
        this.autoRoleService = autoRoleService;
    }

    // ===========================================================
    // Create Role with Automatic Permission/Privilege Assignment
    // ===========================================================
    /**
     * Create a new role with all predefined permissions and privileges automatically assigned.
     *
     * @param roleName Name of the role to create
     * @param authentication Current user authentication
     * @return Created role with full access
     */
    @PostMapping("/create-with-full-access")
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT') or hasRole('ADMIN')")
    public ResponseEntity<?> createRoleWithFullAccess(
            @RequestParam String roleName,
            Authentication authentication) {

        try {
            logger.info("Creating role '{}' with full access by user: {}", roleName, authentication.getName());

            Role role = autoRoleService.createRoleWithAutoAssignment(roleName, authentication.getName());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Role created successfully with full permissions and privileges");
            response.put("role", Map.of(
                "id", role.getId(),
                "name", role.getName(),
                "permissionsCount", role.getPermissions().size(),
                "privilegesCount", role.getPrivileges().size()
            ));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Failed to create role: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // ===========================================================
    // Create Customer Success Manager Role
    // ===========================================================
    /**
     * Create a Customer Success Manager role with predefined permissions and privileges.
     *
     * @param authentication Current user authentication
     * @return Created Customer Success Manager role
     */
    @PostMapping("/create-customer-success-manager")
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT') or hasRole('ADMIN')")
    public ResponseEntity<?> createCustomerSuccessManagerRole(Authentication authentication) {

        try {
            logger.info("Creating Customer Success Manager role by user: {}", authentication.getName());

            Role role = autoRoleService.createCustomerSuccessManagerRole(authentication.getName());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Customer Success Manager role created successfully");
            response.put("role", Map.of(
                "id", role.getId(),
                "name", role.getName(),
                "permissions", role.getPermissions().stream().map(p -> p.getName()).toList(),
                "privileges", role.getPrivileges().stream().map(p -> p.getName()).toList()
            ));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Failed to create Customer Success Manager role: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // ===========================================================
    // Create Agent Role
    // ===========================================================
    /**
     * Create an Agent role with limited permissions and privileges.
     *
     * @param authentication Current user authentication
     * @return Created Agent role
     */
    @PostMapping("/create-agent")
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT') or hasRole('ADMIN')")
    public ResponseEntity<?> createAgentRole(Authentication authentication) {

        try {
            logger.info("Creating Agent role by user: {}", authentication.getName());

            Role role = autoRoleService.createAgentRole(authentication.getName());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Agent role created successfully");
            response.put("role", Map.of(
                "id", role.getId(),
                "name", role.getName(),
                "permissions", role.getPermissions().stream().map(p -> p.getName()).toList(),
                "privileges", role.getPrivileges().stream().map(p -> p.getName()).toList()
            ));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Failed to create Agent role: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // ===========================================================
    // Get or Create Role with Auto-Assignment
    // ===========================================================
    /**
     * Get existing role or create new one with automatic permission/privilege assignment.
     *
     * @param roleName Name of the role
     * @param authentication Current user authentication
     * @return Role (existing or newly created)
     */
    @PostMapping("/get-or-create")
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT') or hasRole('ADMIN')")
    public ResponseEntity<?> getOrCreateRole(
            @RequestParam String roleName,
            Authentication authentication) {

        try {
            logger.info("Getting or creating role '{}' by user: {}", roleName, authentication.getName());

            Role role = autoRoleService.getOrCreateRoleWithAutoAssignment(roleName, authentication.getName());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", role.getPermissions().size() > 0 ? "Existing role retrieved" : "New role created with full access");
            response.put("role", Map.of(
                "id", role.getId(),
                "name", role.getName(),
                "permissionsCount", role.getPermissions().size(),
                "privilegesCount", role.getPrivileges().size()
            ));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Failed to get or create role: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // ===========================================================
    // Update Role to Full Access
    // ===========================================================
    /**
     * Update an existing role to have full permissions and privileges.
     *
     * @param roleId ID of the role to update
     * @param authentication Current user authentication
     * @return Updated role
     */
    @PostMapping("/{roleId}/update-to-full-access")
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT') or hasRole('ADMIN')")
    public ResponseEntity<?> updateRoleToFullAccess(
            @PathVariable Long roleId,
            Authentication authentication) {

        try {
            logger.info("Updating role {} to full access by user: {}", roleId, authentication.getName());

            Role role = autoRoleService.updateRoleToFullAccess(roleId, authentication.getName());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Role updated to full access successfully");
            response.put("role", Map.of(
                "id", role.getId(),
                "name", role.getName(),
                "permissionsCount", role.getPermissions().size(),
                "privilegesCount", role.getPrivileges().size()
            ));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Failed to update role to full access: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // ===========================================================
    // Get Available Permissions and Privileges
    // ===========================================================
    /**
     * Get list of all available permissions and privileges for reference.
     *
     * @return Map containing permissions and privileges lists
     */
    @GetMapping("/available-access")
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getAvailableAccess() {

        Map<String, Object> response = new HashMap<>();
        response.put("permissions", java.util.Arrays.asList(
            "SYSTEM_MONITORING",
            "CHAT_ACCESS",
            "CHAT_WITH_USER",
            "CHAT_WITH_DEFAULT",
            "USER_MANAGEMENT",
            "CHAT_WITH_AGENT",
            "ADMIN_ACCESS"
        ));

        response.put("privileges", java.util.Arrays.asList(
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
        ));

        return ResponseEntity.ok(response);
    }
}