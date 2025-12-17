/**
 * ===========================================================
 * File: RoleRepository.java
 * Location: com.visiomatix.chat.chat.user.repository
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *  Repository interface for Role entity.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.repository;

// ===========================================================
// Import Statements
// ===========================================================
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.visiomatix.chat.chat.user.model.Role;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
