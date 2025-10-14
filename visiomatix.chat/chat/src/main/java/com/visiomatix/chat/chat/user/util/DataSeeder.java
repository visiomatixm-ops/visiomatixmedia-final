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
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DataSeeder(
            PrivilegeRepository privilegeRepository,
            RoleRepository roleRepository,
            UserRepository userRepository) {
        this.privilegeRepository = privilegeRepository;
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
            return roleRepository.save(role);
        });

        // -------------------------------------------------------
        // 3. Create Default Admin User (if not exists)
        // -------------------------------------------------------
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

        System.out.println("✅ Default roles, privileges, and admin user initialized.");
    }
}
