/**
 * ===========================================================
 * File: RoleDTO.java
 * Location: com.visiomatix.chat.chat.user.dto
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  DTO for creating or returning Role data.
 *  Added new constructors and field-level comments for clarity.
 *  Phase 2 Fixes:
 *  - Added 'id' for update/response mapping.
 *  - Permissions and Users included in constructor for better mapping.
 * ===========================================================
 */
package com.visiomatix.chat.chat.user.dto;

// ============================
// Import Statements
// ============================
import com.visiomatix.chat.chat.user.model.Permission;
import com.visiomatix.chat.chat.user.model.User;

import java.util.Set;

public class RoleDTO {

    // ===========================================================
    // Field Declarations
    // ===========================================================
    private Long id; // Phase 2 addition

    private String name; // Role name (e.g., ROLE_USER, ROLE_ADMIN)

    private Set<Permission> permissions; // Permissions associated with this role

    private Set<User> users; // Users assigned to this role

    // ===========================================================
    // Constructors
    // ===========================================================
    public RoleDTO() {}

    public RoleDTO(String name, Set<Permission> permissions) {
        this.name = name;
        this.permissions = permissions;
    }

    public RoleDTO(Long id, String name, Set<Permission> permissions, Set<User> users) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
        this.users = users;
    }

    // ===========================================================
    // Getters and Setters
    // ===========================================================
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Set<Permission> getPermissions() { return permissions; }
    public void setPermissions(Set<Permission> permissions) { this.permissions = permissions; }

    public Set<User> getUsers() { return users; }
    public void setUsers(Set<User> users) { this.users = users; }
}
