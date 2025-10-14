/**
 * ===========================================================
 * File: UserDTO.java
 * Location: com.visiomatix.chat.chat.user.dto
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *   Data Transfer Object for User registration and login.
 *   Added 'role' field to support assigning roles (e.g., ROLE_AGENT, ROLE_USER).
 * ===========================================================
 */
package com.visiomatix.chat.chat.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserDTO {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50)
    private String username;

    @NotBlank(message = "Email is required")
    @Email
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6)
    private String password;

    @NotBlank(message = "Name is required")
    private String name;

    // Optional role for registration: "ROLE_AGENT", "ROLE_USER", "ROLE_ADMIN"
    private String role;

    // ===========================
    // Getters and Setters
    // ===========================
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
