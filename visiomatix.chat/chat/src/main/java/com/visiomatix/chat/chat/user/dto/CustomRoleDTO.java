/**
 * ===========================================================
 * Filename: CustomRoleDTO.java
 * Location: com.visiomatix.chat.chat.user.dto
 * Author: Viral Prajapati
 * Date: 30-Oct-2025
 * Description:
 *   DTO used by admin UI to create or update a CustomRole.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.dto;

import java.util.Set;
import java.util.Map;

public class CustomRoleDTO {
    private String name;
    private String description;
    private Set<String> permissionNames;
    private Set<String> privilegeNames;
    private Map<String, String> abacAttributes; // ABAC attributes for fine-grained access control
    private boolean override = false; // if true, replace existing mapping
    private String createdBy;

    // Getters & setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Set<String> getPermissionNames() { return permissionNames; }
    public void setPermissionNames(Set<String> permissionNames) { this.permissionNames = permissionNames; }

    public Set<String> getPrivilegeNames() { return privilegeNames; }
    public void setPrivilegeNames(Set<String> privilegeNames) { this.privilegeNames = privilegeNames; }

    public Map<String, String> getAbacAttributes() { return abacAttributes; }
    public void setAbacAttributes(Map<String, String> abacAttributes) { this.abacAttributes = abacAttributes; }

    public boolean isOverride() { return override; }
    public void setOverride(boolean override) { this.override = override; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
}