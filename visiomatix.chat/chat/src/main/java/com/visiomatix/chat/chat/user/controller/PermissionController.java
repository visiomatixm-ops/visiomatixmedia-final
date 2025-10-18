package com.visiomatix.chat.chat.user.controller;

import com.visiomatix.chat.chat.user.model.Permission;
import com.visiomatix.chat.chat.user.service.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.slf4j.*;

@RestController
@RequestMapping("/api/permissions")
@RequiredArgsConstructor
public class PermissionController {

private static final Logger logger = LoggerFactory.getLogger(PermissionController.class);   
 private final PermissionService permissionService;

    @PostMapping
    public ResponseEntity<Permission> create(@RequestBody Permission permission) {
        return ResponseEntity.ok(permissionService.createPermission(permission));
    }

    @GetMapping
    public ResponseEntity<List<Permission>> listAll() {
        return ResponseEntity.ok(permissionService.getAllPermissions());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        permissionService.deletePermission(id);
        return ResponseEntity.noContent().build();
    }
}
