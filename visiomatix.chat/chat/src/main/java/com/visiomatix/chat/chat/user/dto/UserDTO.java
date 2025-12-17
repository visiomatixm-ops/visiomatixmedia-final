/**
 * ===========================================================
 * File: UserDTO.java
 * Location: com.visiomatix.chat.chat.user.dto
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *   Data Transfer Object for User registration, login, and response mapping.
 *   Phase 2 Fixes:
 *   - Added auditing info.
 *   - Added Set<Role> to support multiple roles.
 *   - Updated constructors for convenience.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.dto;

// ============================
// Import Statements
// ============================
import jakarta.validation.constraints.Email;   // For validating email format
import jakarta.validation.constraints.NotBlank; // Ensures fields are not empty
import jakarta.validation.constraints.Size;     // Restrict field length
import com.visiomatix.chat.chat.user.model.Role;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * ===========================================================
 * Class: UserDTO
 * Purpose:
 *   Acts as a bridge between frontend requests and backend logic.
 *   Prevents direct exposure of the User entity.
 * ===========================================================
 */
public class UserDTO {

    // ===========================================================
    // Field Declarations
    // ===========================================================
    private Long id; // Useful for update and response mapping

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50)
    private String username;

    @NotBlank(message = "Email is required")
    @Email
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // Accept password input but never return it
    private String password;

    @NotBlank(message = "Name is required")
    private String name;

    private boolean active = true; // Whether user account is active

    private Set<Role> roles; // Roles assigned to user

    // Auditing Fields
    private String createdBy;
    private String modifiedBy;
    private LocalDateTime lastLoginAt;

    // ===========================================================
    // Constructors
    // ===========================================================
    public UserDTO() {}

    public UserDTO(Long id, String username, String email, String name, boolean active, Set<Role> roles,
                   String createdBy, String modifiedBy, LocalDateTime lastLoginAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.active = active;
        this.roles = roles;
        this.createdBy = createdBy;
        this.modifiedBy = modifiedBy;
        this.lastLoginAt = lastLoginAt;
    }

    // ===========================================================
    // Getters and Setters
    // ===========================================================
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public Set<Role> getRoles() { return roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public String getModifiedBy() { return modifiedBy; }
    public void setModifiedBy(String modifiedBy) { this.modifiedBy = modifiedBy; }

    public LocalDateTime getLastLoginAt() { return lastLoginAt; }
    public void setLastLoginAt(LocalDateTime lastLoginAt) { this.lastLoginAt = lastLoginAt; }
}
