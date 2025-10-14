/**
 * ===========================================================
 * File: User.java
 * Location: com.visiomatix.chat.chat.user.model
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *  Entity representing application users.
 *  Each user can have multiple roles.
 *  Includes basic auditing fields.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.model;

// ===========================================================
// Import Statements
// ===========================================================
import jakarta.persistence.*; // For entity annotations
import java.time.LocalDateTime; // For timestamps
import java.util.Set; // For role relationships

@Entity
@Table(name = "users")
public class User {

    // ===========================================================
    // Field Declarations
    // ===========================================================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String username;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "is_active")
    private boolean active = true;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    // Auditing Fields
    private String createdBy;
    private String modifiedBy;
    private LocalDateTime lastLoginAt;

    // ===========================================================
    // Constructors
    // ===========================================================
    public User() {}

    // ===========================================================
    // Getters and Setters
    // ===========================================================
    public Long getId() { return id; }

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
