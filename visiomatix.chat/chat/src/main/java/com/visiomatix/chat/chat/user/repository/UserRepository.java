/**
 * ===========================================================
 * File: UserRepository.java
 * Location: com.visiomatix.chat.chat.user.repository
 * Author: Viral Prajapati
 * Date: 13-Oct-2025
 * Description:
 *  Repository interface for User entity.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.repository;

// ===========================================================
// Import Statements
// ===========================================================
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.visiomatix.chat.chat.user.model.User;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
