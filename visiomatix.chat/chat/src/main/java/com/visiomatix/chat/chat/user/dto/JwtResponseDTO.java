/**
 * =====================================================================================
 * File Name   : JwtResponseDTO.java
 * Location    : src/main/java/com/visiomatix/chat/dto/
 * Author      : Viral Prajapati
 * Created On  : 13-Oct-2025
 * Description :
 *   Phase 3 Enhancement
 *   -------------------
 *   This Data Transfer Object (DTO) is used to standardize the login response payload
 *   after successful authentication. It includes the following fields:
 *     - token     : JWT access token generated after authentication.
 *     - username  : The authenticated user’s username.
 *     - role      : The primary role assigned to the authenticated user.
 *
 *   This ensures consistency for frontend integrations (React/Next.js) and allows
 *   returning structured JSON instead of raw token strings.
 *
 *   Example JSON Response:
 *   -----------------------
 *   {
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5...",
 *       "username": "admin",
 *       "role": "ROLE_ADMIN"
 *   }
 *
 * =====================================================================================
 */

package com.visiomatix.chat.chat.user.dto;
 // Package declaration for DTOs

// ============================================================
// Import Statements
// ============================================================
import java.io.Serializable;
import java.util.List;
// Serializable interface is used so that this DTO can be transferred
// over the network or stored in a session if needed.

// ============================================================
// Class Declaration
// ============================================================
/**
 * JwtResponseDTO
 * ----------------
 * A simple DTO class to encapsulate JWT authentication response.
 */
public class JwtResponseDTO implements Serializable {

    // ============================================================
    // Field Declarations
    // ============================================================
    private static final long serialVersionUID = 1L; 
    // Added serialVersionUID to avoid serialization conflicts.

    private String token;      // Holds the JWT access token string
    private String username;   // Holds the authenticated user's username
    private String role;       // Holds the user's primary role name (e.g., ROLE_ADMIN)
    private List<String> roles; // Holds all roles assigned to the user for privilege-based access

    // ============================================================
    // Constructors
    // ============================================================

    /**
     * Default no-args constructor
     * Required for JSON serialization/deserialization
     */
    public JwtResponseDTO() {
    }

    /**
     * Parameterized constructor for easy object creation
     * @param token    JWT token string
     * @param username Authenticated user's username
     * @param role     User's primary role
     */
    public JwtResponseDTO(String token, String username, String role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }

    /**
     * Parameterized constructor with all roles for privilege-based access
     * @param token    JWT token string
     * @param username Authenticated user's username
     * @param role     User's primary role
     * @param roles    All roles assigned to the user
     */
    public JwtResponseDTO(String token, String username, String role, List<String> roles) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.roles = roles;
    }

    // ============================================================
    // Getter and Setter Methods
    // ============================================================

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    // ============================================================
    // toString() Method
    // ============================================================
    @Override
    public String toString() {
        return "JwtResponseDTO{" +
                "token='" + token + '\'' +
                ", username='" + username + '\'' +
                ", role='" + role + '\'' +
                ", roles=" + roles +
                '}';
    }
}
