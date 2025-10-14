/**
 * ===========================================================
 * File: Role.java
 * Location: com.visiomatix.chat.chat.user.model
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *  Entity defining system roles. Each role can have multiple privileges.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.model;

// ===========================================================
// Import Statements
// ===========================================================
import jakarta.persistence.*; // For JPA annotations
import java.util.Set; // For many-to-many relationships

@Entity
@Table(name = "roles")
public class Role {

    // ===========================================================
    // Field Declarations
    // ===========================================================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    // One role can have many privileges
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "role_privileges",
        joinColumns = @JoinColumn(name = "role_id"),
        inverseJoinColumns = @JoinColumn(name = "privilege_id")
    )
    private Set<Privilege> privileges;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "role_permissions",
        joinColumns = @JoinColumn(name = "role_id"),
        inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    private Set<Permission> permissions;

    // ===========================================================
    // Constructors
    // ===========================================================
    public Role() {}

   public Role(String name) {
       this.name = name;
   }

   public Role(String name, Set<Privilege> privileges, Set<Permission> permissions) {
        this.name = name;
        this.privileges = privileges;
        this.permissions = permissions;
    }

    // ===========================================================
    // Getters and Setters
    // ===========================================================
    public Long getId() { return id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public Set<Privilege> getPrivileges() { return privileges; }

    public void setPrivileges(Set<Privilege> privileges) { this.privileges = privileges; }
    public Set<Permission> getPermissions() { return permissions; }

    public void setPermissions(Set<Permission> permissions) { this.permissions = permissions; }
}
/**
 * Chat GPT CCode for corrections in future:
 * 
 * @Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "role_privileges",
        joinColumns = @JoinColumn(name = "role_id"),
        inverseJoinColumns = @JoinColumn(name = "privilege_id")
    )
    private Set<Privilege> privileges;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "role_permissions",
        joinColumns = @JoinColumn(name = "role_id"),
        inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    private Set<Permission> permissions;

    public Role() {}

    public Role(String name) { this.name = name; }

    public Role(String name, Set<Privilege> privileges, Set<Permission> permissions) {
        this.name = name;
        this.privileges = privileges;
        this.permissions = permissions;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Set<Privilege> getPrivileges() { return privileges; }
    public void setPrivileges(Set<Privilege> privileges) { this.privileges = privileges; }

    public Set<Permission> getPermissions() { return permissions; }
    public void setPermissions(Set<Permission> permissions) { this.permissions = permissions; }
}

 */