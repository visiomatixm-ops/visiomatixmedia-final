package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.model.Permission;
import com.visiomatix.chat.chat.user.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PermissionService {

    private final PermissionRepository permissionRepository;

    @Transactional
    public Permission createPermission(Permission permission) {
        return permissionRepository.save(permission);
    }

    @Transactional
    public Permission createPermission(Permission permission, String createdBy) {
        // Note: Permission entity doesn't have audit fields, so we skip setting createdBy
        return permissionRepository.save(permission);
    }

    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }

    @Transactional
    public void deletePermission(Long id) {
        permissionRepository.deleteById(id);
    }

    @Transactional
    public void deletePermission(Long id, String deletedBy) {
        permissionRepository.deleteById(id);
    }
}
