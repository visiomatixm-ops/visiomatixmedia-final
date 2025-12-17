/**
 * ===========================================================
 * File: RoleController.java
 * Location: com.visiomatix.chat.chat.user.controller
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *  REST controller for Role management.
 *  - Create role with permissions
 *  - List all roles
 *  - Delete role by ID
 * ===========================================================
 */
package com.visiomatix.chat.chat.user.controller;

import com.visiomatix.chat.chat.user.dto.RoleDTO;
import com.visiomatix.chat.chat.user.model.Role;
import com.visiomatix.chat.chat.user.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.*;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;
    private static final Logger logger = LoggerFactory.getLogger(RoleController.class);

    // ===========================================================
    // Create a new Role
    // ===========================================================
    @PostMapping("/create")
    public ResponseEntity<Role> createRole(@RequestBody RoleDTO roleDTO) {
        Role createdRole = roleService.createRole(roleDTO);
        return ResponseEntity.ok(createdRole);
    }

    // ===========================================================
    // Get list of all Roles
    // ===========================================================
    @GetMapping("/list")
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = roleService.getAllRoles();
        return ResponseEntity.ok(roles);
    }

    // ===========================================================
    // Delete a Role by ID
    // ===========================================================
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return ResponseEntity.ok("Role deleted successfully");
    }
}
