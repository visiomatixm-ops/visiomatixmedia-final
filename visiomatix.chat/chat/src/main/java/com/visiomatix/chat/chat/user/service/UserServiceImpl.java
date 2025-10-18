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
 *
 * -------------------------------
 * Phase 2 Additions:
 * - Added @Transactional for registration safety.
 * - Introduced structured JWT response via JwtResponseDTO.
 * - Added updateUser() method for profile/role edits.
 * - Replaced direct RuntimeExceptions with custom messages.
 * - Added inline comments for clarity.
 * ===========================================================
 */
/**
 * ===========================================================
 * File: UserServiceImpl.java
 * Location: com.visiomatix.chat.chat.user.service
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *   Phase 1+2+3 Implementation
 *   --------------------------
 *   Service layer for user operations.
 *   Phase 2: updateUser(), @Transactional, role assignment.
 *   Phase 3: login() returns structured JwtResponseDTO.
 * ===========================================================
 */
package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.dto.UserDTO;
import com.visiomatix.chat.chat.user.dto.JwtResponseDTO;
import com.visiomatix.chat.chat.user.model.Role;
import com.visiomatix.chat.chat.user.model.User;
import com.visiomatix.chat.chat.user.repository.RoleRepository;
import com.visiomatix.chat.chat.user.repository.UserRepository;
import com.visiomatix.chat.chat.user.util.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

/**
 * UserServiceImpl
 * ----------------
 * Implements UserService interface
 */
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
    // Register new user with role
    // ===========================================================
    @Transactional
    @Override
    public User registerUser(UserDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent())
            throw new RuntimeException("Username already exists");

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        final String roleName;
        if (userDTO.getRoles() != null && !userDTO.getRoles().isEmpty()) {
            roleName = userDTO.getRoles().iterator().next().getName();
        } else {
            roleName = "ROLE_USER"; // Default role for new users
        }
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

        user.setRoles(Set.of(role));
        return userRepository.save(user);
    }

    // ===========================================================
    // Login user and return structured JWT response
    // ===========================================================
    @Override
    public JwtResponseDTO login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new RuntimeException("Invalid credentials");

        // Generate JWT token
        String token = jwtUtil.generateToken(username);

        // Retrieve primary role
        String primaryRole = user.getRoles().stream()
                .findFirst()
                .map(Role::getName)
                .orElse("ROLE_USER");

        return new JwtResponseDTO(token, username, primaryRole);
    }

    // ===========================================================
    // Update user profile / role
    // ===========================================================
    @Transactional
    @Override
    public User updateUser(Long userId, UserDTO dto) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (dto.getName() != null) existingUser.setName(dto.getName());
        if (dto.getEmail() != null) existingUser.setEmail(dto.getEmail());
        if (dto.getPassword() != null)
            existingUser.setPassword(passwordEncoder.encode(dto.getPassword()));

        if (dto.getRoles() != null && !dto.getRoles().isEmpty()) {
            existingUser.setRoles(dto.getRoles());
        }

        return userRepository.save(existingUser);
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

    // ===========================================================
    // Get or create system user
    // ===========================================================
    @Transactional
    @Override
    public User getOrCreateSystemUser() {
        String systemUsername = "system";
        Optional<User> existingSystemUser = userRepository.findByUsername(systemUsername);
        if (existingSystemUser.isPresent()) {
            return existingSystemUser.get();
        }

        // Create system user if not exists
        User systemUser = new User();
        systemUser.setUsername(systemUsername);
        systemUser.setEmail("system@visiomatix.com");
        systemUser.setName("System");
        systemUser.setPassword(passwordEncoder.encode("system")); // Dummy password, not used for login

        // Assign a default role, e.g., ROLE_SYSTEM or ROLE_USER
        Role role = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Default role not found"));
        systemUser.setRoles(Set.of(role));

        return userRepository.save(systemUser);
    }
}
