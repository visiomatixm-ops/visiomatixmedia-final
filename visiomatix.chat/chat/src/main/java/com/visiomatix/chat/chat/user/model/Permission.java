/**
 * File      : Permission.java
 * Location  : src/main/java/com/visiomatix/chat/chat/user/model
 * Author    : Viral Prajapati
 * Date      : 13-Oct-2025
 * Description: Entity representing a permission that can be assigned to roles.
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
}
