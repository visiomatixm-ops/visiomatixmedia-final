/**
 * ===========================================================
 * File: ChatSessionRepository.java
 * Location: com.visiomatix.chat.chat.chat.repository
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  Repository interface for ChatSession entity.
 *  Provides data access methods for chat session management
 *  including finding active sessions, user sessions, etc.
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.repository;

// ===========================================================
// Import Statements
// ===========================================================
import com.visiomatix.chat.chat.chat.model.ChatSession;
import com.visiomatix.chat.chat.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {

    // ===========================================================
    // Query Methods by Session Properties
    // ===========================================================
    
    /**
     * Find all active chat sessions
     */
    List<ChatSession> findByActiveTrue();

    /**
     * Find chat sessions by session type
     */
    List<ChatSession> findBySessionTypeAndActiveTrue(ChatSession.SessionType sessionType);


    @Query("SELECT cs FROM ChatSession cs WHERE cs.active = true AND cs.sessionExpiry IS NOT NULL AND cs.sessionExpiry < :now")
    List<ChatSession> findExpiredSessions(@Param("now") LocalDateTime now);
    
    // ===========================================================
    // Query Methods by Participants
    // ===========================================================
    

    /**
     * Find all chat sessions where the user is a participant
     */
    @Query("SELECT cs FROM ChatSession cs JOIN cs.participants p WHERE p = :user AND cs.active = true")
    List<ChatSession> findActiveSessionsByUser(@Param("user") User user);

    /**
     * Find all chat sessions for a specific user (including inactive)
     */
    @Query("SELECT cs FROM ChatSession cs JOIN cs.participants p WHERE p = :user ORDER BY cs.updatedAt DESC")
    List<ChatSession> findAllSessionsByUser(@Param("user") User user);

    /**
     * Find a specific session between two users
     */
    @Query("SELECT cs FROM ChatSession cs JOIN cs.participants p1 JOIN cs.participants p2 " +
           "WHERE p1 = :user1 AND p2 = :user2 AND cs.sessionType = :sessionType AND cs.active = true")
    Optional<ChatSession> findActiveSessionBetweenUsers(
        @Param("user1") User user1, 
        @Param("user2") User user2, 
        @Param("sessionType") ChatSession.SessionType sessionType
    );

    /**
     * Find sessions with specific participant count
     */
    @Query("SELECT cs FROM ChatSession cs WHERE SIZE(cs.participants) = :participantCount AND cs.active = true")
    List<ChatSession> findByParticipantCount(@Param("participantCount") int participantCount);

    // ===========================================================
    // Query Methods by Activity and Timestamps
    // ===========================================================
    
    /**
     * Find recently active sessions (ordered by last message time)
     */
    @Query("SELECT cs FROM ChatSession cs WHERE cs.active = true AND cs.lastMessageAt IS NOT NULL " +
           "ORDER BY cs.lastMessageAt DESC")
    List<ChatSession> findRecentlyActiveSessionsOrderByLastMessage();

    /**
     * Find sessions with no recent activity (for cleanup/archival)
     */
    @Query("SELECT cs FROM ChatSession cs WHERE cs.active = true AND " +
           "(cs.lastMessageAt IS NULL OR cs.lastMessageAt < :cutoffTime)")
    List<ChatSession> findInactiveSessionsOlderThan(@Param("cutoffTime") java.time.LocalDateTime cutoffTime);

    // ===========================================================
    // Query Methods for Admin Dashboard
    // ===========================================================
    
    /**
     * Count total active sessions
     */
    long countByActiveTrue();

    /**
     * Count sessions by type
     */
    long countBySessionTypeAndActiveTrue(ChatSession.SessionType sessionType);

    /**
     * Find sessions for admin overview (with participant details)
     */
    @Query("SELECT DISTINCT cs FROM ChatSession cs LEFT JOIN FETCH cs.participants " +
           "WHERE cs.active = true ORDER BY cs.updatedAt DESC")
    List<ChatSession> findAllActiveSessionsWithParticipants();
}