package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.model.Permission;
import com.visiomatix.chat.chat.user.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PermissionService {

    private final PermissionRepository permissionRepository;

    public Permission createPermission(Permission permission) {
        return permissionRepository.save(permission);
    }

    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }

    public void deletePermission(Long id) {
        permissionRepository.deleteById(id);
    }
}
