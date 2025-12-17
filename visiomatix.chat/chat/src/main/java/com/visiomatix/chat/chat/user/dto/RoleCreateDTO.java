// File: user/dto/RoleCreateDTO.java
package com.visiomatix.chat.chat.user.dto;

import java.util.Set;

public class RoleCreateDTO {
    private String name;
    private Set<String> permissionNames;
    private Set<String> privilegeNames;
    private boolean override;
    private String createdBy;

    // getters & setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Set<String> getPermissionNames() { return permissionNames; }
    public void setPermissionNames(Set<String> permissionNames) { this.permissionNames = permissionNames; }

    public Set<String> getPrivilegeNames() { return privilegeNames; }
    public void setPrivilegeNames(Set<String> privilegeNames) { this.privilegeNames = privilegeNames; }

    public boolean isOverride() { return override; }
    public void setOverride(boolean override) { this.override = override; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
}
