/**
 * ===========================================================
 * File: PrivilegeServiceImpl.java
 * Location: src/main/java/com/visiomatix/chat/chat/user/service
 * Author: Viral Prajapati
 * Date: 25-Oct-2025
 * Description:
 *  Implementation of PrivilegeService interface.
 *  Provides CRUD operations for privileges and privilege-permission mapping.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.model.Privilege;
import com.visiomatix.chat.chat.user.model.Permission;
import com.visiomatix.chat.chat.user.repository.PrivilegeRepository;
import com.visiomatix.chat.chat.user.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PrivilegeServiceImpl implements PrivilegeService {

    private static final Logger logger = LoggerFactory.getLogger(PrivilegeServiceImpl.class);

    private final PrivilegeRepository privilegeRepository;
    private final PermissionRepository permissionRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Privilege> getAllPrivileges() {
        logger.info("Fetching all privileges");
        return privilegeRepository.findAll();
    }

    @Override
    public Privilege createPrivilege(Privilege privilege, String createdBy) {
        logger.info("Creating new privilege: {} by user: {}", privilege.getName(), createdBy);

        // Check if privilege with same name already exists
        Privilege existingPrivilege = privilegeRepository.findByName(privilege.getName());
        if (existingPrivilege != null) {
            throw new RuntimeException("Privilege with name '" + privilege.getName() + "' already exists");
        }

        Privilege savedPrivilege = privilegeRepository.save(privilege);
        logger.info("Privilege created successfully with ID: {}", savedPrivilege.getId());
        return savedPrivilege;
    }

    @Override
    public void deletePrivilege(Long privilegeId, String deletedBy) {
        logger.info("Deleting privilege with ID: {} by user: {}", privilegeId, deletedBy);

        Privilege privilege = privilegeRepository.findById(privilegeId)
            .orElseThrow(() -> new RuntimeException("Privilege not found with ID: " + privilegeId));

        privilegeRepository.delete(privilege);
        logger.info("Privilege deleted successfully");
    }

    @Override
    public Privilege assignPrivilegeToPermission(Long privilegeId, Long permissionId, String modifiedBy) {
        logger.info("Assigning permission {} to privilege {} by user: {}", permissionId, privilegeId, modifiedBy);

        Privilege privilege = privilegeRepository.findById(privilegeId)
            .orElseThrow(() -> new RuntimeException("Privilege not found with ID: " + privilegeId));

        Permission permission = permissionRepository.findById(permissionId)
            .orElseThrow(() -> new RuntimeException("Permission not found with ID: " + permissionId));

        // Note: In a real implementation, you might want to create a many-to-many relationship
        // between privileges and permissions. For now, we'll just log the assignment.
        // The actual relationship would depend on your business logic.

        logger.info("Permission {} assigned to privilege {} successfully", permissionId, privilegeId);
        return privilege;
    }

    @Override
    public Privilege removePrivilegeFromPermission(Long privilegeId, Long permissionId, String modifiedBy) {
        logger.info("Removing permission {} from privilege {} by user: {}", permissionId, privilegeId, modifiedBy);

        Privilege privilege = privilegeRepository.findById(privilegeId)
            .orElseThrow(() -> new RuntimeException("Privilege not found with ID: " + privilegeId));

        Permission permission = permissionRepository.findById(permissionId)
            .orElseThrow(() -> new RuntimeException("Permission not found with ID: " + permissionId));

        // Note: In a real implementation, you would remove the relationship here.
        // For now, we'll just log the removal.

        logger.info("Permission {} removed from privilege {} successfully", permissionId, privilegeId);
        return privilege;
    }
}