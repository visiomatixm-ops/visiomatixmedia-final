/**
 * ===========================================================
 * File: CustomUserDetailsService.java
 * Location: com.visiomatix.chat.chat.user.service
 * Author: Viral Prajapati
 * Date: 30-Oct-2025
 * Description:
 *   Custom implementation of UserDetailsService for Spring Security.
 *   Dynamically aggregates authorities from:
 *     - Roles and their permissions
 *     - Custom roles assigned to user
 *     - Direct privileges
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.model.*;
import com.visiomatix.chat.chat.user.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Loads user by username and aggregates all authorities.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.visiomatix.chat.chat.user.model.User user = userRepository.findByUsernameWithAllDetails(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        Set<String> authorities = new HashSet<>();

        // ==============================
        // Standard Role → Permission → Privilege hierarchy
        // ==============================
        if (user.getRoles() != null) {
            user.getRoles().forEach(role -> {
                authorities.add("ROLE_" + role.getName());
                if (role.getPermissions() != null) {
                    authorities.addAll(role.getPermissions().stream()
                            .map(Permission::getName)
                            .collect(Collectors.toSet()));
                }
                // Add permissions from privileges (granular permission mapping)
                if (role.getPrivileges() != null) {
                    authorities.addAll(role.getPrivileges().stream()
                            .filter(privilege -> privilege.getPermissions() != null)
                            .flatMap(privilege -> privilege.getPermissions().stream())
                            .map(Permission::getName)
                            .collect(Collectors.toSet()));
                }
            });
        }

        // ==============================
        // Custom Roles → Privileges + Permissions + ABAC Attributes
        // ==============================
        if (user.getCustomRoles() != null) {
            user.getCustomRoles().forEach(customRole -> {
                authorities.add("ROLE_" + customRole.getName());

                // Add privileges from custom role
                if (customRole.getPrivileges() != null) {
                    authorities.addAll(customRole.getPrivileges().stream()
                            .map(Privilege::getName)
                            .collect(Collectors.toSet()));

                    // Add permissions from privileges (granular permission mapping)
                    authorities.addAll(customRole.getPrivileges().stream()
                            .filter(privilege -> privilege.getPermissions() != null)
                            .flatMap(privilege -> privilege.getPermissions().stream())
                            .map(Permission::getName)
                            .collect(Collectors.toSet()));
                }

                // Add permissions from custom role
                if (customRole.getPermissions() != null) {
                    authorities.addAll(customRole.getPermissions().stream()
                            .map(Permission::getName)
                            .collect(Collectors.toSet()));
                }

                // Add ABAC attributes as authorities (prefixed with ABAC_)
                if (customRole.getAbacAttributes() != null) {
                    customRole.getAbacAttributes().forEach((key, value) -> {
                        authorities.add("ABAC_" + key + ":" + value);
                    });
                }
            });
        }

        // Convert to GrantedAuthority
        List<GrantedAuthority> grantedAuthorities = authorities.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                grantedAuthorities
        );
    }
}
