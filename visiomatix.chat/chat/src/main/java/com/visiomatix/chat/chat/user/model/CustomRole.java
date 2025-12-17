/**
*/
// ===========================================================
// Import Statements
// ===========================================================

package com.visiomatix.chat.chat.user.model;


import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.Map;
import java.util.HashMap;


// ===========================================================
// Entity Definition
// ===========================================================

@Entity
@Table(name = "custom_roles")
public class CustomRole {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


@Column(unique = true, nullable = false)
private String name; // e.g., CUSTOMER_SUCCESS_LEAD


@Column(length = 1024)
private String description;


@ManyToMany(fetch = FetchType.EAGER)
@JoinTable(
name = "custom_role_permissions",
joinColumns = @JoinColumn(name = "custom_role_id"),
inverseJoinColumns = @JoinColumn(name = "permission_id")
)
private Set<Permission> permissions = new HashSet<>();


@ManyToMany(fetch = FetchType.EAGER)
@JoinTable(
name = "custom_role_privileges",
joinColumns = @JoinColumn(name = "custom_role_id"),
inverseJoinColumns = @JoinColumn(name = "privilege_id")
)
private Set<Privilege> privileges = new HashSet<>();

// ABAC Attributes for fine-grained access control
@ElementCollection(fetch = FetchType.EAGER)
@CollectionTable(
    name = "custom_role_abac_attributes",
    joinColumns = @JoinColumn(name = "custom_role_id")
)
@MapKeyColumn(name = "attribute_key")
@Column(name = "attribute_value")
private Map<String, String> abacAttributes = new HashMap<>();

// Audit fields (optional)
@Column(name = "created_by")
private String createdBy;


@Column(name = "modified_by")
private String modifiedBy;


// Getters and setters
public Long getId() { return id; }
public void setId(Long id) { this.id = id; }


public String getName() { return name; }
public void setName(String name) { this.name = name; }


public String getDescription() { return description; }
public void setDescription(String description) { this.description = description; }


public Set<Permission> getPermissions() { return permissions; }
public void setPermissions(Set<Permission> permissions) { this.permissions = permissions; }


public Set<Privilege> getPrivileges() { return privileges; }
public void setPrivileges(Set<Privilege> privileges) { this.privileges = privileges; }

public Map<String, String> getAbacAttributes() { return abacAttributes; }
public void setAbacAttributes(Map<String, String> abacAttributes) { this.abacAttributes = abacAttributes; }

public String getCreatedBy() { return createdBy; }
public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }


public String getModifiedBy() { return modifiedBy; }
public void setModifiedBy(String modifiedBy) { this.modifiedBy = modifiedBy; }
}