/**
 * ===========================================================
 * File: UserController.java
 * Location: com.visiomatix.chat.chat.user.controller
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *   Handles REST API endpoints for user operations.
 *   Supports registration, login, get user, delete user.
 *
 * -------------------------------
 * Phase 2 Additions:
 * - Added @CrossOrigin for frontend integration.
 * - Added role-based access with @PreAuthorize.
 * - Added /update endpoint.
 * - Enhanced login response (JWT + username + role).
 *
 * -------------------------------
 * Phase 3 Additions:
 * - Login endpoint now returns JwtResponseDTO instead of raw token string.
 * - Ensures structured response with {token, username, role} for frontend.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.controller;

// ============================
// Import Statements
// ============================
import com.visiomatix.chat.chat.user.dto.UserDTO;
import com.visiomatix.chat.chat.user.dto.JwtResponseDTO;
import com.visiomatix.chat.chat.user.model.User;
import com.visiomatix.chat.chat.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; // For role-based access
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.slf4j.*;
/**
 * ===========================================================
 * Class: UserController
 * Purpose:
 *   Provides REST endpoints for user registration, login,
 *   profile retrieval, update, and deletion.
 *   Note: CORS is handled globally via WebConfig
 * ===========================================================
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    // ===========================================================
    // Field Declarations
    // ===========================================================
    private final UserService userService;

    // ===========================================================
    // Constructor Injection
    // ===========================================================
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ===========================================================
    // Register New User (Phase 1)
    // ===========================================================
    @PostMapping("/register")
    public ResponseEntity<User> register(@Validated @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.registerUser(userDTO));
    }

    // ===========================================================
    // Login Endpoint (Phase 3)
    // -----------------------------------------------------------
    // Returns structured JWT response (JwtResponseDTO) including:
    // - token: JWT token string
    // - username: logged-in user's username
    // - role: user's primary role
    // ===========================================================
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO> login(@RequestBody UserDTO userDTO) {
        JwtResponseDTO jwtResponse = userService.login(userDTO.getUsername(), userDTO.getPassword());
        return ResponseEntity.ok(jwtResponse);
    }

    // ===========================================================
    // Get User by Username (Phase 1)
    // -----------------------------------------------------------
    // Accessible by ADMIN or the user themselves
    // ===========================================================
    @GetMapping("/{username}")
    @PreAuthorize("hasRole('ADMIN') or #username == authentication.name")
    public ResponseEntity<User> getUser(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }

    // ===========================================================
    // Update User (Phase 2)
    // -----------------------------------------------------------
    // Admin-only access for editing user profile and role
    // ===========================================================
    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody UserDTO dto) {
        return ResponseEntity.ok(userService.updateUser(userId, dto));
    }

    // ===========================================================
    // Delete User by ID (Phase 1)
    // -----------------------------------------------------------
    // Admin-only access
    // ===========================================================
    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }
}
