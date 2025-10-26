/**
 * ===========================================================
 * File: PrivilegeService.java
 * Location: src/main/java/com/visiomatix/chat/chat/user/service
 * Author: Viral Prajapati
 * Date: 25-Oct-2025
 * Description:
 *  Service interface for privilege management operations.
 *  Provides CRUD operations for privileges and privilege-permission mapping.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.model.Privilege;
import java.util.List;

public interface PrivilegeService {

    /**
     * Get all privileges in the system
     * @return List of all privileges
     */
    List<Privilege> getAllPrivileges();

    /**
     * Create a new privilege
     * @param privilege Privilege to create
     * @param createdBy User who created the privilege
     * @return Created privilege
     */
    Privilege createPrivilege(Privilege privilege, String createdBy);

    /**
     * Delete a privilege by ID
     * @param privilegeId Privilege ID to delete
     * @param deletedBy User who deleted the privilege
     */
    void deletePrivilege(Long privilegeId, String deletedBy);

    /**
     * Assign a privilege to a permission
     * @param privilegeId Privilege ID
     * @param permissionId Permission ID
     * @param modifiedBy User who made the change
     * @return Updated privilege
     */
    Privilege assignPrivilegeToPermission(Long privilegeId, Long permissionId, String modifiedBy);

    /**
     * Remove a privilege from a permission
     * @param privilegeId Privilege ID
     * @param permissionId Permission ID
     * @param modifiedBy User who made the change
     * @return Updated privilege
     */
    Privilege removePrivilegeFromPermission(Long privilegeId, Long permissionId, String modifiedBy);
}