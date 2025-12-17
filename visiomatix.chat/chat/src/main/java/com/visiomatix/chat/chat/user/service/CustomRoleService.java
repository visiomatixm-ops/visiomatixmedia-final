/**
 * ===========================================================
 * Filename: CustomRoleService.java
 * Location: com.visiomatix.chat.chat.user.service
 * Author: Viral Prajapati
 * Date: 30-Oct-2025
 * Description:
 *   Service responsible for creating, updating and fetching
 *   CustomRole entities. It resolves permission and privilege
 *   names into DB entities and persists relationships.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.visiomatix.chat.chat.user.dto.CustomRoleDTO;
import com.visiomatix.chat.chat.user.model.CustomRole;
import com.visiomatix.chat.chat.user.model.Permission;
import com.visiomatix.chat.chat.user.model.Privilege;
import com.visiomatix.chat.chat.user.model.User;
import com.visiomatix.chat.chat.user.repository.CustomRoleRepository;
import com.visiomatix.chat.chat.user.repository.PermissionRepository;
import com.visiomatix.chat.chat.user.repository.PrivilegeRepository;
import com.visiomatix.chat.chat.user.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class CustomRoleService {

    private final CustomRoleRepository customRoleRepository;
    private final PermissionRepository permissionRepository;
    private final PrivilegeRepository privilegeRepository;
    private final UserRepository userRepository;

    public CustomRoleService(CustomRoleRepository customRoleRepository,
                             PermissionRepository permissionRepository,
                             PrivilegeRepository privilegeRepository,
                             UserRepository userRepository) {
        this.customRoleRepository = customRoleRepository;
        this.permissionRepository = permissionRepository;
        this.privilegeRepository = privilegeRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CustomRole createCustomRole(CustomRoleDTO dto) {
        String name = dto.getName().trim().toUpperCase();

        // If exists and override is false -> throw
        if (customRoleRepository.existsByName(name) && !dto.isOverride()) {
            throw new IllegalArgumentException("Custom role already exists. Use override=true to replace.");
        }

        CustomRole role = customRoleRepository.findByName(name).orElseGet(() -> {
            CustomRole r = new CustomRole();
            r.setName(name);
            r.setCreatedBy(dto.getCreatedBy());
            return r;
        });

        if (dto.getDescription() != null) role.setDescription(dto.getDescription());
        role.setModifiedBy(dto.getCreatedBy());

        // Resolve permissions
        Set<Permission> permissions = new HashSet<>();
        if (dto.getPermissionNames() != null) {
            for (String pName : dto.getPermissionNames()) {
                permissionRepository.findByName(pName.trim())
                        .ifPresent(permissions::add);
            }
        }

        // Resolve privileges - ensure every custom role gets the essential privileges
        Set<Privilege> privileges = new HashSet<>();

        // Add default essential privileges for all custom roles
        String[] defaultPrivileges = {
            "CREATE_USER",
            "DELETE_USER",
            "ACCESS_USER_MANAGEMENT",
            "ACCESS_STATISTICS_TAB",
            "ACCESS_CHAT_HISTORY_TAB",
            "ACCESS_ROLE_MANAGEMENT",
            "ACCESS_AGENT_DASHBOARD",
            "ACCESS_PERMISSION_MANAGEMENT",
            "MANAGE_CHAT",
            "CHAT_WITH_DEFAULT_USER"
        };

        for (String privName : defaultPrivileges) {
            Privilege privilege = privilegeRepository.findByName(privName);
            if (privilege != null) {
                privileges.add(privilege);
            }
        }

        // Add any additional privileges specified in the DTO
        if (dto.getPrivilegeNames() != null) {
            for (String prName : dto.getPrivilegeNames()) {
                Privilege privilege = privilegeRepository.findByName(prName.trim());
                if (privilege != null) {
                    privileges.add(privilege);
                } else {
                    throw new IllegalArgumentException("Privilege not found: " + prName);
                }
            }
        }

        role.setPermissions(permissions);
        role.setPrivileges(privileges);

        // Set ABAC attributes if provided
        if (dto.getAbacAttributes() != null) {
            role.setAbacAttributes(dto.getAbacAttributes());
        }

        return customRoleRepository.save(role);
    }

    @Transactional
    public CustomRole createOrUpdateCustomRole(CustomRoleDTO dto) {
        return createCustomRole(dto);
    }

    public List<CustomRole> getAllCustomRoles() {
        return customRoleRepository.findAll();
    }

    public CustomRole getCustomRoleById(Long id) {
        return customRoleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Custom role not found with id: " + id));
    }

    public CustomRole getCustomRoleByName(String name) {
        return customRoleRepository.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Custom role not found: " + name));
    }

    @Transactional
    public CustomRole updateCustomRole(Long id, CustomRoleDTO dto) {
        CustomRole role = getCustomRoleById(id);
        if (dto.getDescription() != null) role.setDescription(dto.getDescription());
        role.setModifiedBy(dto.getCreatedBy());

        // Resolve permissions
        Set<Permission> permissions = new HashSet<>();
        if (dto.getPermissionNames() != null) {
            for (String pName : dto.getPermissionNames()) {
                permissionRepository.findByName(pName.trim())
                        .ifPresent(permissions::add);
            }
        }

        // Resolve privileges
        Set<Privilege> privileges = new HashSet<>();
        if (dto.getPrivilegeNames() != null) {
            for (String prName : dto.getPrivilegeNames()) {
                Privilege privilege = privilegeRepository.findByName(prName.trim());
                if (privilege != null) {
                    privileges.add(privilege);
                } else {
                    throw new IllegalArgumentException("Privilege not found: " + prName);
                }
            }
        }

        role.setPermissions(permissions);
        role.setPrivileges(privileges);

        // Set ABAC attributes if provided
        if (dto.getAbacAttributes() != null) {
            role.setAbacAttributes(dto.getAbacAttributes());
        }

        return customRoleRepository.save(role);
    }

    @Transactional
    public void deleteCustomRole(Long id) {
        CustomRole role = getCustomRoleById(id);
        customRoleRepository.delete(role);
    }

    @Transactional
    public void assignCustomRoleToUser(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
        CustomRole role = getCustomRoleById(roleId);
        user.getCustomRoles().add(role);
        userRepository.save(user);
    }

    @Transactional
    public void unassignCustomRoleFromUser(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
        CustomRole role = getCustomRoleById(roleId);
        user.getCustomRoles().remove(role);
        userRepository.save(user);
    }

    public CustomRole getByName(String name) {
        return getCustomRoleByName(name);
    }
}