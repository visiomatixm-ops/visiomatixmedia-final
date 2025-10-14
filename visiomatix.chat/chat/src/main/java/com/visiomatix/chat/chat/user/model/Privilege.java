/**
 * ===========================================================
 * File: Privilege.java
 * Location: com.visiomatix.chat.chat.user.model
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *  Entity representing granular privileges in the system.
 *  Each role can be assigned multiple privileges.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.model;

// ===========================================================
// Import Statements
// ===========================================================
import jakarta.persistence.*; // For JPA annotations
import java.util.Set; // To define relationship with Role

@Entity
@Table(name = "privileges")
public class Privilege {

    // ===========================================================
    // Field Declarations
    // ===========================================================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    // Many privileges can belong to many roles
    @ManyToMany(mappedBy = "privileges")
    private Set<Role> roles;

    // ===========================================================
    // Constructors
    // ===========================================================
    public Privilege() {}

    public Privilege(String name) {
        this.name = name;
    }

    // ===========================================================
    // Getters and Setters
    // ===========================================================
    public Long getId() { return id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public Set<Role> getRoles() { return roles; }

    public void setRoles(Set<Role> roles) { this.roles = roles; }
}
