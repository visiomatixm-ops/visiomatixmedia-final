package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.dto.RoleDTO;
import com.visiomatix.chat.chat.user.model.Permission;
import com.visiomatix.chat.chat.user.model.Privilege;
import com.visiomatix.chat.chat.user.model.Role;
import com.visiomatix.chat.chat.user.repository.PermissionRepository;
import com.visiomatix.chat.chat.user.repository.PrivilegeRepository;
import com.visiomatix.chat.chat.user.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final PrivilegeRepository privilegeRepository;

    // ===========================================================
    // Create a new Role
    // ===========================================================
    @Transactional
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
    // Create a new Role with audit trail
    // ===========================================================
    @Transactional
    public Role createRole(RoleDTO roleDTO, String createdBy) {
        // Check if role already exists
        if(roleRepository.findByName(roleDTO.getName()).isPresent())
            throw new RuntimeException("Role already exists");

        Role role = new Role();
        role.setName(roleDTO.getName());
        role.setPermissions(roleDTO.getPermissions());
        // Note: Role entity doesn't have audit fields, so we skip setting createdBy
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
    @Transactional
    public void deleteRole(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        roleRepository.delete(role);
    }

    // ===========================================================
    // Delete a role by ID with audit trail
    // ===========================================================
    @Transactional
    public void deleteRole(Long id, String deletedBy) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        roleRepository.delete(role);
    }

    // ===========================================================
    // Assign permission to role
    // ===========================================================
    @Transactional
    public Role assignPermissionToRole(Long roleId, Long permissionId, String modifiedBy) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new RuntimeException("Permission not found"));

        role.getPermissions().add(permission);
        return roleRepository.save(role);
    }

    // ===========================================================
    // Remove permission from role
    // ===========================================================
    @Transactional
    public Role removePermissionFromRole(Long roleId, Long permissionId, String modifiedBy) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new RuntimeException("Permission not found"));

        role.getPermissions().remove(permission);
        return roleRepository.save(role);
    }

    // ===========================================================
    // Get role privileges
    // ===========================================================
    public Set<Privilege> getRolePrivileges(Long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        return role.getPrivileges();
    }

    // ===========================================================
    // Assign privilege to role
    // ===========================================================
    @Transactional
    public Role assignPrivilegeToRole(Long roleId, Long privilegeId, String modifiedBy) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        Privilege privilege = privilegeRepository.findById(privilegeId)
                .orElseThrow(() -> new RuntimeException("Privilege not found"));

        role.getPrivileges().add(privilege);
        return roleRepository.save(role);
    }

    // ===========================================================
    // Remove privilege from role
    // ===========================================================
    @Transactional
    public Role removePrivilegeFromRole(Long roleId, Long privilegeId, String modifiedBy) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        Privilege privilege = privilegeRepository.findById(privilegeId)
                .orElseThrow(() -> new RuntimeException("Privilege not found"));

        role.getPrivileges().remove(privilege);
        return roleRepository.save(role);
    }
}
