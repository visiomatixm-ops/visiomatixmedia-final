/**
 * ===========================================================
 * File: MessageRepository.java
 * Location: com.visiomatix.chat.chat.chat.repository
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Phase: 4.5 — Repository-Level Query Layer for Persistent Chat Messages
 * Description:
 *   Provides advanced query methods for Message entity:
 *   - Fetch chat histories, unread/delivered analytics
 *   - Time-based message retrieval and keyword search
 *   - Supports REST + WebSocket bridge layer for real-time sync
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.repository;

// ===========================================================
// Import Statements
// ===========================================================
import com.visiomatix.chat.chat.chat.model.ChatSession;
import com.visiomatix.chat.chat.chat.model.Message;
import com.visiomatix.chat.chat.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

// ===========================================================
// Repository Declaration
// ===========================================================
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    // ===========================================================
    // Section 1: Core Session Queries
    // ===========================================================

    /**
     * Retrieve all messages in a chat session ordered by sent time ascending.
     */
    List<Message> findByChatSessionOrderBySentAtAsc(ChatSession chatSession);

    /**
     * Retrieve paginated messages within a session (for infinite scroll UI).
     */
    Page<Message> findByChatSession(ChatSession chatSession, Pageable pageable);

    /**
     * Retrieve messages in a session after a specific timestamp.
     */
    @Query("""
        SELECT m FROM Message m 
        WHERE m.chatSession = :chatSession 
          AND m.sentAt > :afterTime 
        ORDER BY m.sentAt ASC
        """)
    List<Message> findMessagesAfterTime(
            @Param("chatSession") ChatSession chatSession,
            @Param("afterTime") LocalDateTime afterTime
    );

    /**
     * Retrieve the most recent message (single) from a session.
     */
    @Query("""
        SELECT m FROM Message m 
        WHERE m.chatSession = :chatSession 
        ORDER BY m.sentAt DESC
        """)
    List<Message> findLastMessageInSessionRaw(@Param("chatSession") ChatSession chatSession);

    /**
     * Wrapper to get the last message as Optional<Message>.
     */
    default Optional<Message> findLastMessageInSession(ChatSession session) {
        List<Message> messages = findLastMessageInSessionRaw(session);
        return messages.isEmpty() ? Optional.empty() : Optional.of(messages.get(0));
    }

    // ===========================================================
    // Section 2: Bidirectional Chat History (User ↔ User)
    // ===========================================================

    /**
     * Retrieve bidirectional chat messages between two users, regardless of who started the session.
     */
    @Query("""
        SELECT m FROM Message m
        WHERE (
            (m.sender = :userA AND m.chatSession IN 
                (SELECT cs FROM ChatSession cs JOIN cs.participants p WHERE p = :userB))
            OR
            (m.sender = :userB AND m.chatSession IN 
                (SELECT cs FROM ChatSession cs JOIN cs.participants p WHERE p = :userA))
        )
        ORDER BY m.sentAt ASC
        """)
    List<Message> findBidirectionalChatHistory(
            @Param("userA") User userA,
            @Param("userB") User userB
    );

    // ===========================================================
    // Section 3: Sender-Based Queries
    // ===========================================================

    /**
     * Find all messages sent by a specific user across sessions.
     */
    List<Message> findBySenderOrderBySentAtDesc(User sender);

    /**
     * Find messages sent by a user in a particular session.
     */
    List<Message> findByChatSessionAndSenderOrderBySentAtAsc(ChatSession chatSession, User sender);

    // ===========================================================
    // Section 4: Delivery + Read Analytics
    // ===========================================================

    /**
     * Retrieve undelivered messages for a specific recipient.
     */
    @Query("""
        SELECT m FROM Message m 
        JOIN m.chatSession cs JOIN cs.participants p 
        WHERE p = :user 
          AND m.sender != :user 
          AND m.deliveredAt IS NULL 
        ORDER BY m.sentAt ASC
        """)
    List<Message> findUndeliveredMessagesForUser(@Param("user") User user);

    /**
     * Retrieve unread messages for a specific recipient.
     */
    @Query("""
        SELECT m FROM Message m 
        JOIN m.chatSession cs JOIN cs.participants p 
        WHERE p = :user 
          AND m.sender != :user 
          AND m.readAt IS NULL 
        ORDER BY m.sentAt ASC
        """)
    List<Message> findUnreadMessagesForUser(@Param("user") User user);

    /**
     * Count unread messages for a user in a specific session.
     */
    @Query("""
        SELECT COUNT(m) FROM Message m 
        WHERE m.chatSession = :chatSession 
          AND m.sender != :user 
          AND m.readAt IS NULL
        """)
    long countUnreadMessagesInSession(@Param("chatSession") ChatSession chatSession, @Param("user") User user);

    // ===========================================================
    // Section 5: Time Range Queries
    // ===========================================================

    /**
     * Retrieve messages in a session between two timestamps.
     */
    @Query("""
        SELECT m FROM Message m 
        WHERE m.chatSession = :chatSession 
          AND m.sentAt BETWEEN :startTime AND :endTime 
        ORDER BY m.sentAt ASC
        """)
    List<Message> findMessagesBySessionAndTimeRange(
            @Param("chatSession") ChatSession chatSession,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );

    /**
     * Retrieve today's messages for a session (using database current date).
     */
    @Query("""
        SELECT m FROM Message m 
        WHERE m.chatSession = :chatSession 
          AND FUNCTION('DATE', m.sentAt) = CURRENT_DATE 
        ORDER BY m.sentAt ASC
        """)
    List<Message> findTodaysMessages(@Param("chatSession") ChatSession chatSession);

    // ===========================================================
    // Section 6: Search and Analytics Queries
    // ===========================================================

    /**
     * Search for messages containing a specific term within a session.
     */
    @Query("""
        SELECT m FROM Message m 
        WHERE m.chatSession = :chatSession 
          AND LOWER(m.content) LIKE LOWER(CONCAT('%', :searchTerm, '%')) 
        ORDER BY m.sentAt DESC
        """)
    List<Message> searchMessagesInSession(
            @Param("chatSession") ChatSession chatSession,
            @Param("searchTerm") String searchTerm
    );

    /**
     * Count total messages in a chat session.
     */
    long countByChatSession(ChatSession chatSession);

    /**
     * Count messages sent by a specific user in a session.
     */
    long countByChatSessionAndSender(ChatSession chatSession, User sender);

    // ===========================================================
    // Section 7: Moderation + Reporting Queries
    // ===========================================================

    /**
     * Retrieve system or flagged messages for moderation dashboard.
     */
    @Query("""
        SELECT m FROM Message m 
        WHERE m.messageType = 'SYSTEM' 
          AND (LOWER(m.content) LIKE '%report%' OR LOWER(m.content) LIKE '%violation%') 
        ORDER BY m.sentAt DESC
        """)
    List<Message> findMessagesForModeration();

    /**
     * Aggregate message counts grouped by type within a date range.
     */
    @Query("""
        SELECT m.messageType, COUNT(m)
        FROM Message m
        WHERE m.sentAt BETWEEN :startDate AND :endDate
        GROUP BY m.messageType
        """)
    List<Object[]> getMessageStatsByTypeAndDateRange(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
    
    
    // existing methods...
    @Query("SELECT m FROM Message m WHERE m.chatSession.id = :sessionId ORDER BY m.sentAt ASC")
    List<Message> findByChatSessionOrderBySentAtAsc(@Param("sessionId") Long sessionId);
    /**
     * Retrieve recent messages for a session, limited by the specified number.
     */
    default List<Message> findRecentMessagesBySession(ChatSession chatSession, int limit) {
        Pageable pageable = PageRequest.of(0, limit, Sort.by("sentAt").descending());
        return findByChatSession(chatSession, pageable).getContent();
    }

    @Query("SELECT m FROM Message m WHERE m.chatSession.id = :sessionId ORDER BY m.sentAt ASC")
    List<Message> getMessagesForSessionOrdered(@Param("sessionId") Long sessionId);
}
