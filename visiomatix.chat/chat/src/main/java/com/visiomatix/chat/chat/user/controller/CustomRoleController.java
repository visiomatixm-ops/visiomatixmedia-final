/**
 * ===========================================================
 * Filename: CustomRoleController.java
 * Location: com.visiomatix.chat.chat.user.controller
 * Author: Viral Prajapati
 * Date: 30-Oct-2025
 * Description:
 *   REST controller for managing dynamic CustomRoles in the system.
 *   Supports creation, update, deletion, and retrieval of roles
 *   along with their associated permissions and privileges.
 *
 *   Security:
 *   ----------
 *   Each endpoint is secured using @PreAuthorize annotations
 *   based on authorities defined in SecurityConfig such as:
 *     - ACCESS_ROLE_MANAGEMENT
 *     - ACCESS_PERMISSION_MANAGEMENT
 *
 *   Functional Summary:
 *   -------------------
 *   - Create a new CustomRole dynamically with chosen permissions/privileges.
 *   - Fetch all available CustomRoles.
 *   - Get a specific CustomRole by ID or name.
 *   - Update role configuration (permissions, privileges).
 *   - Delete a CustomRole.
 *
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.controller;

// ===========================================================
// Import Statements
// ===========================================================

import com.visiomatix.chat.chat.user.dto.CustomRoleDTO; // DTO for transferring CustomRole data between client and server
import com.visiomatix.chat.chat.user.model.CustomRole; // Entity model representing a dynamically defined role
import com.visiomatix.chat.chat.user.service.CustomRoleService; // Service layer handling CustomRole logic
import org.springframework.http.ResponseEntity; // Represents HTTP response body + status
import org.springframework.security.access.prepost.PreAuthorize; // Used for role/authority-based endpoint protection
import org.springframework.web.bind.annotation.*; // For RESTful API annotations

import java.util.List;
import java.util.Set;

/**
 * ===========================================================
 * Class: CustomRoleController
 * -----------------------------------------------------------
 * Purpose:
 *   Handles incoming REST API requests for custom role
 *   management operations.
 * ===========================================================
 */
@RestController
@RequestMapping("/api/custom-roles")
public class CustomRoleController {

    // ===========================================================
    // Dependency Injection
    // ===========================================================
    private final CustomRoleService customRoleService;

    /**
     * Constructor for injecting CustomRoleService dependency.
     *
     * @param customRoleService Service layer instance for CustomRole operations
     */
    public CustomRoleController(CustomRoleService customRoleService) {
        this.customRoleService = customRoleService;
    }

    // ===========================================================
    // Endpoint: Create Custom Role
    // ===========================================================
    /**
     * Create a new custom role dynamically.
     *
     * @param dto Data transfer object containing role name, permissions, and privileges.
     * @return ResponseEntity containing the saved CustomRole object.
     */
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT')")
    @PostMapping("/create")
    public ResponseEntity<CustomRole> createCustomRole(@RequestBody CustomRoleDTO dto) {
        CustomRole savedRole = customRoleService.createCustomRole(dto);
        return ResponseEntity.ok(savedRole);
    }

    // ===========================================================
    // Endpoint: Get All Custom Roles
    // ===========================================================
    /**
     * Fetch all dynamically defined custom roles.
     *
     * @return ResponseEntity containing list of all CustomRoles.
     */
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT')")
    @GetMapping("/all")
    public ResponseEntity<List<CustomRole>> getAllCustomRoles() {
        List<CustomRole> roles = customRoleService.getAllCustomRoles();
        return ResponseEntity.ok(roles);
    }

    // ===========================================================
    // Endpoint: Get Custom Role by ID
    // ===========================================================
    /**
     * Retrieve a custom role using its unique ID.
     *
     * @param id Role ID.
     * @return ResponseEntity containing the matching CustomRole.
     */
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT')")
    @GetMapping("/{id}")
    public ResponseEntity<CustomRole> getCustomRoleById(@PathVariable Long id) {
        CustomRole role = customRoleService.getCustomRoleById(id);
        return ResponseEntity.ok(role);
    }

    // ===========================================================
    // Endpoint: Get Custom Role by Name
    // ===========================================================
    /**
     * Retrieve a custom role using its name (e.g., CUSTOMER_SUCCESS_LEAD).
     *
     * @param name Custom role name.
     * @return ResponseEntity containing the matching CustomRole.
     */
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT')")
    @GetMapping("/name/{name}")
    public ResponseEntity<CustomRole> getCustomRoleByName(@PathVariable String name) {
        CustomRole role = customRoleService.getCustomRoleByName(name);
        return ResponseEntity.ok(role);
    }

    // ===========================================================
    // Endpoint: Update Custom Role
    // ===========================================================
    /**
     * Update an existing custom role (permissions, privileges, etc.).
     *
     * @param id  ID of the role to update.
     * @param dto Updated role data.
     * @return ResponseEntity containing the updated CustomRole.
     */
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT')")
    @PutMapping("/update/{id}")
    public ResponseEntity<CustomRole> updateCustomRole(
            @PathVariable Long id,
            @RequestBody CustomRoleDTO dto
    ) {
        CustomRole updatedRole = customRoleService.updateCustomRole(id, dto);
        return ResponseEntity.ok(updatedRole);
    }

    // ===========================================================
    // Endpoint: Delete Custom Role
    // ===========================================================
    /**
     * Delete a custom role by its ID.
     *
     * @param id Role ID.
     * @return ResponseEntity with confirmation message.
     */
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCustomRole(@PathVariable Long id) {
        customRoleService.deleteCustomRole(id);
        return ResponseEntity.ok("Custom role deleted successfully.");
    }

    // ===========================================================
    // Endpoint: Assign Custom Role to User
    // ===========================================================
    /**
     * Assign a dynamic custom role to a specific user.
     *
     * @param userId  Target user ID.
     * @param roleId  Custom role ID to assign.
     * @return ResponseEntity with confirmation message.
     */
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT')")
    @PostMapping("/assign/{userId}/{roleId}")
    public ResponseEntity<String> assignCustomRoleToUser(
            @PathVariable Long userId,
            @PathVariable Long roleId
    ) {
        customRoleService.assignCustomRoleToUser(userId, roleId);
        return ResponseEntity.ok("Custom role assigned successfully.");
    }

    // ===========================================================
    // Endpoint: Unassign Custom Role from User
    // ===========================================================
    /**
     * Remove a custom role assignment from a user.
     *
     * @param userId Target user ID.
     * @param roleId Custom role ID to remove.
     * @return ResponseEntity with confirmation message.
     */
    @PreAuthorize("hasAuthority('ACCESS_ROLE_MANAGEMENT')")
    @PostMapping("/unassign/{userId}/{roleId}")
    public ResponseEntity<String> unassignCustomRoleFromUser(
            @PathVariable Long userId,
            @PathVariable Long roleId
    ) {
        customRoleService.unassignCustomRoleFromUser(userId, roleId);
        return ResponseEntity.ok("Custom role unassigned successfully.");
    }
}
