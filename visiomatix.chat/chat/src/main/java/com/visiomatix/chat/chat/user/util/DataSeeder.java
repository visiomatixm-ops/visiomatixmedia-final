/**
 * ===========================================================
 * File: DataSeeder.java
 * Location: com.visiomatix.chat.chat.user.util
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *  Seeds default privileges, roles, and an admin user into DB.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.util;

// ===========================================================
// Import Statements
// ===========================================================
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.Set;
import com.visiomatix.chat.chat.user.model.*;
import com.visiomatix.chat.chat.user.repository.*;

@Component
public class DataSeeder implements CommandLineRunner {

    private final PrivilegeRepository privilegeRepository;
    private final PermissionRepository permissionRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DataSeeder(
            PrivilegeRepository privilegeRepository,
            PermissionRepository permissionRepository,
            RoleRepository roleRepository,
            UserRepository userRepository) {
        this.privilegeRepository = privilegeRepository;
        this.permissionRepository = permissionRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public void run(String... args) {

        // -------------------------------------------------------
        // 1. Create Base Privileges
        // -------------------------------------------------------
        Privilege createUser = privilegeRepository.findByName("CREATE_USER")
                .orElseGet(() -> privilegeRepository.save(new Privilege("CREATE_USER")));
        Privilege deleteUser = privilegeRepository.findByName("DELETE_USER")
                .orElseGet(() -> privilegeRepository.save(new Privilege("DELETE_USER")));
        Privilege manageChat = privilegeRepository.findByName("MANAGE_CHAT")
                .orElseGet(() -> privilegeRepository.save(new Privilege("MANAGE_CHAT")));

        // -------------------------------------------------------
        // 2. Create Permissions with enhanced chat access control
        // -------------------------------------------------------
        Permission chatAccess = permissionRepository.findByName("CHAT_ACCESS")
                .orElseGet(() -> {
                    Permission p = new Permission();
                    p.setName("CHAT_ACCESS");
                    p.setDescription("Permission to access chat features");
                    p.setPermissionType(Permission.PermissionType.CHAT_ACCESS);
                    return permissionRepository.save(p);
                });

        Permission chatWithDefault = permissionRepository.findByName("CHAT_WITH_DEFAULT")
                .orElseGet(() -> {
                    Permission p = new Permission();
                    p.setName("CHAT_WITH_DEFAULT");
                    p.setDescription("Permission to chat with the default system user");
                    p.setPermissionType(Permission.PermissionType.CHAT_WITH_DEFAULT);
                    return permissionRepository.save(p);
                });

        Permission chatWithAgent = permissionRepository.findByName("CHAT_WITH_AGENT")
                .orElseGet(() -> {
                    Permission p = new Permission();
                    p.setName("CHAT_WITH_AGENT");
                    p.setDescription("Permission to chat with agents");
                    p.setPermissionType(Permission.PermissionType.CHAT_WITH_AGENT);
                    return permissionRepository.save(p);
                });

        // -------------------------------------------------------
        // 2. Create Roles and attach privileges
        // -------------------------------------------------------
        Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElseGet(() -> {
            Role role = new Role("ROLE_ADMIN");
            role.setPrivileges(Set.of(createUser, deleteUser, manageChat));
            return roleRepository.save(role);
        });

        Role agentRole = roleRepository.findByName("ROLE_AGENT").orElseGet(() -> {
            Role role = new Role("ROLE_AGENT");
            role.setPrivileges(Set.of(manageChat));
            return roleRepository.save(role);
        });

        Role userRole = roleRepository.findByName("ROLE_USER").orElseGet(() -> {
            Role role = new Role("ROLE_USER");
            role.setPrivileges(Set.of(manageChat));
            role.setPermissions(Set.of(chatAccess, chatWithDefault, chatWithAgent));
            return roleRepository.save(role);
        });

        // -------------------------------------------------------
        // 3. Create Default Users (if not exists)
        // -------------------------------------------------------

        // Create admin user
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@visiomatix.com");
            admin.setName("System Administrator");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setRoles(Set.of(adminRole));
            admin.setCreatedBy("System Seeder");
            userRepository.save(admin);
        }

        // Create agent user for agent dashboard (ROLE_AGENT)
        if (userRepository.findByUsername("agent").isEmpty()) {
            User agentUser = new User();
            agentUser.setUsername("agent");
            agentUser.setEmail("agent@example.com");
            agentUser.setName("Agent User");
            agentUser.setPassword(passwordEncoder.encode("agent123"));
            agentUser.setRoles(Set.of(agentRole));
            agentUser.setCreatedBy("System Seeder");
            userRepository.save(agentUser);
        }

        // Create default user for chat widget (ROLE_USER only)
        if (userRepository.findByUsername("defaultuser").isEmpty()) {
            User defaultUser = new User();
            defaultUser.setUsername("defaultuser");
            defaultUser.setEmail("default@example.com");
            defaultUser.setName("Default User");
            defaultUser.setPassword(passwordEncoder.encode("default123"));
            defaultUser.setRoles(Set.of(userRole));
            defaultUser.setCreatedBy("System Seeder");
            userRepository.save(defaultUser);
        }

        System.out.println("✅ Default roles, privileges, and users initialized.");
    }
}
