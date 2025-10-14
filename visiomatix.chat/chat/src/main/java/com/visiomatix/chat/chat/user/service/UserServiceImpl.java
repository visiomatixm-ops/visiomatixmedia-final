/**
 * ===========================================================
 * File: UserServiceImpl.java
 * Location: com.visiomatix.chat.chat.user.service
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *   Service layer for User operations.
 *   Supports registration with role assignment, login with JWT,
 *   get user, and delete user functionality.
 * ===========================================================
 */
package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.dto.UserDTO;
import com.visiomatix.chat.chat.user.model.Role;
import com.visiomatix.chat.chat.user.model.User;
import com.visiomatix.chat.chat.user.repository.RoleRepository;
import com.visiomatix.chat.chat.user.repository.UserRepository;
import com.visiomatix.chat.chat.user.util.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // ===========================================================
    // Register a new user with optional role
    // ===========================================================
    @Override
    public User registerUser(UserDTO userDTO) {
        // Check if username already exists
        if(userRepository.findByUsername(userDTO.getUsername()).isPresent())
            throw new RuntimeException("Username already exists");

        // Create User entity
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        // Assign role: default ROLE_USER
        String roleName = (userDTO.getRole() != null) ? userDTO.getRole() : "ROLE_USER";
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
        user.setRoles(Set.of(role));

        // Save user in database
        return userRepository.save(user);
    }

    // ===========================================================
    // Login user and generate JWT
    // ===========================================================
    @Override
    public String login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(password, user.getPassword()))
            throw new RuntimeException("Invalid credentials");

        return jwtUtil.generateToken(username);
    }

    // ===========================================================
    // Delete user by ID
    // ===========================================================
    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }

    // ===========================================================
    // Get user by username
    // ===========================================================
    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
