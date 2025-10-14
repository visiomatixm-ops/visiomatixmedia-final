/**
 * ===========================================================
 * File: PrivilegeRepository.java
 * Location: com.visiomatix.chat.chat.user.repository
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *  Repository interface for Privilege entity.
 *  Provides built-in CRUD operations and custom finders.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.repository;

// ===========================================================
// Import Statements
// ===========================================================
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.visiomatix.chat.chat.user.model.Privilege;
import com.visiomatix.chat.chat.user.model.Role;
import java.util.Optional;

@Repository
public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {
    Optional<Privilege> findByName(String name);
}
