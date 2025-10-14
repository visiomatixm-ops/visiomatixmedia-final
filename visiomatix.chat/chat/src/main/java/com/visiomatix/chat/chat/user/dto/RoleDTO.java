/**
 * ===========================================================
 * File: RoleDTO.java
 * Location: com.visiomatix.chat.chat.user.dto
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *  DTO for creating or returning Role data.
 * ===========================================================
 */
package com.visiomatix.chat.chat.user.dto;

import com.visiomatix.chat.chat.user.model.Permission;
import java.util.Set;

public class RoleDTO {

    private String name;
    private Set<Permission> permissions;

    public RoleDTO() {}

    public RoleDTO(String name, Set<Permission> permissions) {
        this.name = name;
        this.permissions = permissions;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Set<Permission> getPermissions() { return permissions; }
    public void setPermissions(Set<Permission> permissions) { this.permissions = permissions; }
}
