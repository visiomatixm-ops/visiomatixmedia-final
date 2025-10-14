/**
 * ===========================================================
 * File: UserController.java
 * Location: com.visiomatix.chat.chat.user.controller
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *   Handles REST API endpoints for user operations.
 *   Supports registration, login, get user, delete user.
 * ===========================================================
 */
package com.visiomatix.chat.chat.user.controller;

import com.visiomatix.chat.chat.user.dto.UserDTO;
import com.visiomatix.chat.chat.user.model.User;
import com.visiomatix.chat.chat.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) { this.userService = userService; }

    @PostMapping("/register")
    public ResponseEntity<User> register(@Validated @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.registerUser(userDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) {
        String token = userService.login(userDTO.getUsername(), userDTO.getPassword());
        return ResponseEntity.ok(token);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }
}
