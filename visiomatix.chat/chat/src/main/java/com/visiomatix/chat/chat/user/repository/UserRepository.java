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
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.visiomatix.chat.chat.user.model.User;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    // Custom query to eagerly load all related entities for WebSocket authentication
    @Query("SELECT u FROM User u " +
           "LEFT JOIN FETCH u.roles r " +
           "LEFT JOIN FETCH r.permissions " +
           "LEFT JOIN FETCH r.privileges p " +
           "LEFT JOIN FETCH p.permissions " +
           "LEFT JOIN FETCH u.customRoles cr " +
           "LEFT JOIN FETCH cr.permissions " +
           "LEFT JOIN FETCH cr.privileges cp " +
           "LEFT JOIN FETCH cp.permissions " +
           "LEFT JOIN FETCH cr.abacAttributes " +
           "WHERE u.username = :username")
    Optional<User> findByUsernameWithAllDetails(String username);
}
