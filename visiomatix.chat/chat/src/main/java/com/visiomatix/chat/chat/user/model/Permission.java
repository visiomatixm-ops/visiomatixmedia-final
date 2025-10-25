/**
 * File      : Permission.java
 * Location  : src/main/java/com/visiomatix/chat/chat/user/model
 * Author    : Viral Prajapati
 * Date      : 13-Oct-2025
 * Description: Entity representing a permission that can be assigned to roles.
 * Enhanced with chat permission types for controlling user access to chat features.
 */

package com.visiomatix.chat.chat.user.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "permissions")
@Getter
@Setter
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column
    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "permission_type")
    private PermissionType permissionType;

    @Column(name = "resource_pattern")
    private String resourcePattern; // For pattern-based permissions like "chat:*" or "user:read"

    public PermissionType getPermissionType() {
        return permissionType;
    }

    public void setPermissionType(PermissionType permissionType) {
        this.permissionType = permissionType;
    }

    public enum PermissionType {
        CHAT_ACCESS,      // Permission to access chat features
        CHAT_WITH_AGENT,  // Permission to chat with agents
        CHAT_WITH_USER,   // Permission to chat with other users
        CHAT_WITH_DEFAULT,// Permission to chat with default system user
        ADMIN_ACCESS,     // Administrative permissions
        USER_MANAGEMENT,  // User CRUD operations
        ROLE_MANAGEMENT,  // Role and permission management
        SYSTEM_MONITORING // System monitoring and analytics
    }
}
