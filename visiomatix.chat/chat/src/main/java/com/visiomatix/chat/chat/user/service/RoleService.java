package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.dto.RoleDTO;
import com.visiomatix.chat.chat.user.model.Permission;
import com.visiomatix.chat.chat.user.model.Role;
import com.visiomatix.chat.chat.user.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    // ===========================================================
    // Create a new Role
    // ===========================================================
    public Role createRole(RoleDTO roleDTO) {
        // Check if role already exists
        if(roleRepository.findByName(roleDTO.getName()).isPresent())
            throw new RuntimeException("Role already exists");

        Role role = new Role();
        role.setName(roleDTO.getName());
        role.setPermissions(roleDTO.getPermissions());
        return roleRepository.save(role);
    }

    // ===========================================================
    // Get all roles
    // ===========================================================
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // ===========================================================
    // Get role by name
    // ===========================================================
    public Optional<Role> getRoleByName(String name) {
        return roleRepository.findByName(name);
    }

    // ===========================================================
    // Get role by ID
    // ===========================================================
    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }

    // ===========================================================
    // Delete a role by ID
    // ===========================================================
    public void deleteRole(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        roleRepository.delete(role);
    }
}
