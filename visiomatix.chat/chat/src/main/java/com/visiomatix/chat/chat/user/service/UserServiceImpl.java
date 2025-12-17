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
import com.visiomatix.chat.chat.user.model.Permission;
import com.visiomatix.chat.chat.user.model.Role;
import com.visiomatix.chat.chat.user.model.User;
import com.visiomatix.chat.chat.user.repository.RoleRepository;
import com.visiomatix.chat.chat.user.repository.UserRepository;
import com.visiomatix.chat.chat.user.util.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
            // TEMPORARY FIX: Create admin user for testing
            if ("testadmin".equals(userDTO.getUsername())) {
                roleName = "ROLE_ADMIN";
            } else {
                roleName = "ROLE_USER"; // Default role for new users
            }
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

        // Generate comprehensive authorities list for ABAC
        List<String> allAuthorities = new ArrayList<>();

        // Add role names
        List<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());
        allAuthorities.addAll(roles);

        // Add permissions from standard roles
        List<String> permissions = user.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .map(Permission::getName)
                .distinct()
                .collect(Collectors.toList());
        allAuthorities.addAll(permissions);

        // Add privileges from standard roles
        List<String> rolePrivileges = user.getRoles().stream()
                .flatMap(role -> role.getPrivileges().stream())
                .map(privilege -> privilege.getName())
                .distinct()
                .collect(Collectors.toList());
        allAuthorities.addAll(rolePrivileges);

        // Add privileges from custom roles (CRITICAL FIX)
        if (user.getCustomRoles() != null) {
            List<String> customRolePrivileges = user.getCustomRoles().stream()
                    .flatMap(customRole -> customRole.getPrivileges().stream())
                    .map(privilege -> privilege.getName())
                    .distinct()
                    .collect(Collectors.toList());
            allAuthorities.addAll(customRolePrivileges);
        }

        // Generate JWT token with ALL authorities (ABAC fix)
        String token = jwtUtil.generateTokenWithAuthorities(user.getUsername(), allAuthorities);

        // Retrieve primary role - prioritize ADMIN over AGENT over USER
        String primaryRole = user.getRoles().stream()
                .map(Role::getName)
                .sorted((a, b) -> {
                    // Priority: ADMIN > AGENT > USER
                    if (a.equals("ROLE_ADMIN")) return -1;
                    if (b.equals("ROLE_ADMIN")) return 1;
                    if (a.equals("ROLE_AGENT")) return -1;
                    if (b.equals("ROLE_AGENT")) return 1;
                    return 0;
                })
                .findFirst()
                .orElse("ROLE_USER");

        // Get all roles for the user (for privilege-based access control)
        List<String> allRoles = user.getRoles().stream()
                .map(Role::getName)
                .toList();

        // Get all privileges from user's roles and custom roles (for ABAC)
        List<String> privileges = user.getRoles().stream()
                .flatMap(role -> role.getPrivileges().stream())
                .map(privilege -> privilege.getName())
                .distinct()
                .collect(Collectors.toList());

        // Add privileges from custom roles
        if (user.getCustomRoles() != null) {
            privileges.addAll(user.getCustomRoles().stream()
                    .flatMap(customRole -> customRole.getPrivileges().stream())
                    .map(privilege -> privilege.getName())
                    .distinct()
                    .collect(Collectors.toList()));
        }


        return new JwtResponseDTO(token, username, primaryRole, allRoles, privileges);
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

    // ===========================================================
    // Get user by ID
    // ===========================================================
    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ===========================================================
    // Admin: Get all users
    // ===========================================================
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ===========================================================
    // Admin: Assign role to user
    // ===========================================================
    @Transactional
    @Override
    public User assignRoleToUser(Long userId, Long roleId, String modifiedBy) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.getRoles().add(role);
        user.setModifiedBy(modifiedBy);
        return userRepository.save(user);
    }

    // ===========================================================
    // Admin: Remove role from user
    // ===========================================================
    @Transactional
    @Override
    public User removeRoleFromUser(Long userId, Long roleId, String modifiedBy) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.getRoles().remove(role);
        user.setModifiedBy(modifiedBy);
        return userRepository.save(user);
    }

    // ===========================================================
    // Admin: Create user with audit trail
    // ===========================================================
    @Transactional
    @Override
    public User createUser(UserDTO userDTO, String createdBy) {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent())
            throw new RuntimeException("Username already exists");

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setCreatedBy(createdBy);

        final String roleName;
        if (userDTO.getRoles() != null && !userDTO.getRoles().isEmpty()) {
            roleName = userDTO.getRoles().iterator().next().getName();
        } else {
            roleName = "ROLE_AGENT"; // Default role for admin-created users
        }
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

        user.setRoles(Set.of(role));
        return userRepository.save(user);
    }

    // ===========================================================
    // Security helper: Check if current user matches ID
    // ===========================================================
    @Override
    public boolean isCurrentUser(Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }

        String currentUsername = authentication.getName();
        try {
            User currentUser = getUserByUsername(currentUsername);
            return currentUser.getId().equals(userId);
        } catch (Exception e) {
            return false;
        }
    }
}
