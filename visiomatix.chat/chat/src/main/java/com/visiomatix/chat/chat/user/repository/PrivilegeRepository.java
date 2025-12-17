/**
 * ===========================================================
 * File: PrivilegeRepository.java
 * Location: src/main/java/com/visiomatix/chat/chat/user/repository
 * Author: Viral Prajapati
 * Date: 25-Oct-2025
 * Description:
 *  Repository interface for Privilege entity operations.
 *  Extends JpaRepository for basic CRUD operations.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.repository;

import com.visiomatix.chat.chat.user.model.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {

    /**
     * Find privilege by name
     * @param name Privilege name
     * @return Privilege if found
     */
    Privilege findByName(String name);
}
