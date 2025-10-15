// /**
//  * ===========================================================
//  * File: ChatService.java
//  * Location: com.visiomatix.chat.chat.chat.service
//  * Author: Viral Prajapati
//  * Date: 14-Oct-2025
//  * Description:
//  *  Service interface for chat functionality.
//  *  Defines methods for managing chat sessions, messages,
//  *  and real-time communication features.
//  * ===========================================================
//  */

// package com.visiomatix.chat.chat.chat.service;

// import com.visiomatix.chat.chat.chat.dto.ChatMessagePayload;
// // ===========================================================
// // Import Statements
// // ===========================================================
// import com.visiomatix.chat.chat.chat.model.ChatSession;
// import com.visiomatix.chat.chat.chat.model.Message;
// import com.visiomatix.chat.chat.user.model.User;
// import java.util.List;
// import java.util.Optional;

// public interface ChatService {

//     // ===========================================================
//     // Chat Session Management
//     // ===========================================================
    
//     /**
//      * Create a new chat session between users
//      */
//     ChatSession createChatSession(String sessionName, ChatSession.SessionType sessionType, List<User> participants);

//     /**
//      * Find or create a chat session between two users
//      */
//     ChatSession getOrCreateSessionBetweenUsers(User user1, User user2, ChatSession.SessionType sessionType);

//     /**
//      * Add participant to existing chat session
//      */
//     ChatSession addParticipantToSession(Long sessionId, User participant);

//     /**
//      * Remove participant from chat session
//      */
//     ChatSession removeParticipantFromSession(Long sessionId, User participant);

//     /**
//      * Get all active chat sessions for a user
//      */
//     List<ChatSession> getActiveSessionsForUser(User user);

//     /**
//      * Get chat session by ID
//      */
//     Optional<ChatSession> getChatSessionById(Long sessionId);

//     /**
//      * Deactivate a chat session
//      */
//     void deactivateChatSession(Long sessionId);

//     // ===========================================================
//     // Message Management
//     // ===========================================================
    
//     /**
//      * Send a new message in a chat session
//      */
//     Message sendMessage(Long sessionId, User sender, String content, Message.MessageType messageType);

//     /**
//      * Save a message from WebSocket payload
//      */
//     Message saveMessage(ChatMessagePayload payload);

//     /**
//      * Get messages for a chat session (paginated)
//      */
//     List<Message> getMessagesForSession(Long sessionId, int page, int size);

//     /**
//      * Get recent messages for a chat session
//      */
//     List<Message> getRecentMessagesForSession(Long sessionId, int limit);

//     /**
//      * Mark message as delivered
//      */
//     void markMessageAsDelivered(Long messageId);

//     /**
//      * Mark message as read
//      */
//     void markMessageAsRead(Long messageId);

//     /**
//      * Mark all messages in a session as read for a user
//      */
//     void markAllMessagesAsReadInSession(Long sessionId, User user);

//     /**
//      * Get unread messages count for a user in a session
//      */
//     long getUnreadMessagesCount(Long sessionId, User user);

//     /**
//      * Edit message content
//      */
//     Message editMessage(Long messageId, String newContent, User editor);

//     // ===========================================================
//     // Search and Analytics
//     // ===========================================================
    
//     /**
//      * Search messages in a chat session
//      */
//     List<Message> searchMessagesInSession(Long sessionId, String searchTerm);

//     /**
//      * Get message statistics for admin dashboard
//      */
//     Object getMessageStatistics();

//     /**
//      * Get active sessions count
//      */
//     long getActiveSessionsCount();

//     // ===========================================================
//     // Real-time Communication
//     // ===========================================================
    
//     /**
//      * Broadcast message to all participants in a session
//      */
//     void broadcastMessageToSession(Long sessionId, Message message);

//     /**
//      * Send typing indicator to session participants
//      */
//     void sendTypingIndicator(Long sessionId, User user, boolean isTyping);

//     /**
//      * Send user online/offline status to session participants
//      */
//     void broadcastUserStatus(User user, boolean isOnline);
// }


/**
 * ===========================================================
 * File: ChatService.java
 * Location: com.visiomatix.chat.chat.chat.service
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  Service interface for chat functionality.
 *  Defines methods for managing chat sessions, messages,
 *  and real-time communication features.
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.service;

// ===========================================================
// Import Statements
// ===========================================================
import com.visiomatix.chat.chat.chat.dto.ChatMessagePayload;
import com.visiomatix.chat.chat.chat.model.ChatSession;
import com.visiomatix.chat.chat.chat.model.Message;
import com.visiomatix.chat.chat.user.model.User;
import java.util.List;
import java.util.Optional;

public interface ChatService {

    // ===========================================================
    // Chat Session Management
    // ===========================================================

    /**
     * Create a new chat session between users
     */
    ChatSession createChatSession(String sessionName, ChatSession.SessionType sessionType, List<User> participants);

    /**
     * Find or create a chat session between two users
     */
    ChatSession getOrCreateSessionBetweenUsers(User user1, User user2, ChatSession.SessionType sessionType);

    /**
     * Add participant to existing chat session
     */
    ChatSession addParticipantToSession(Long sessionId, User participant);

    /**
     * Remove participant from chat session
     */
    ChatSession removeParticipantFromSession(Long sessionId, User participant);

    /**
     * Get all active chat sessions for a user
     */
    List<ChatSession> getActiveSessionsForUser(User user);

    /**
     * Get chat session by ID
     */
    Optional<ChatSession> getChatSessionById(Long sessionId);

    /**
     * Deactivate a chat session
     */
    void deactivateChatSession(Long sessionId);

    // ===========================================================
    // Message Management
    // ===========================================================

    /**
     * Send a new message in a chat session
     */
    Message sendMessage(Long sessionId, User sender, String content, Message.MessageType messageType);

    /**
     * Save a message from WebSocket payload
     */
    Message saveMessage(ChatMessagePayload payload);

    /**
     * Get messages for a chat session (paginated)
     */
    List<Message> getMessagesForSession(Long sessionId, int page, int size);

    /**
     * Get recent messages for a chat session
     */
    List<Message> getRecentMessagesForSession(Long sessionId, int limit);

    /**
     * Mark message as delivered
     */
    void markMessageAsDelivered(Long messageId);

    /**
     * Mark message as read
     */
    void markMessageAsRead(Long messageId);

    /**
     * Mark all messages in a session as read for a user
     */
    void markAllMessagesAsReadInSession(Long sessionId, User user);

    /**
     * Get unread messages count for a user in a session
     */
    long getUnreadMessagesCount(Long sessionId, User user);

    /**
     * Edit message content
     */
    Message editMessage(Long messageId, String newContent, User editor);

    // ===========================================================
    // Search and Analytics
    // ===========================================================

    /**
     * Search messages in a chat session
     */
    List<Message> searchMessagesInSession(Long sessionId, String searchTerm);

    /**
     * Get message statistics for admin dashboard
     */
    Object getMessageStatistics();

    /**
     * Get active sessions count
     */
    long getActiveSessionsCount();

    // ===========================================================
    // Real-time Communication
    // ===========================================================

    /**
     * Broadcast message to all participants in a session
     */
    void broadcastMessageToSession(Long sessionId, Message message);

    /**
     * Send typing indicator to session participants
     */
    void sendTypingIndicator(Long sessionId, User user, boolean isTyping);

    /**
     * Send user online/offline status to session participants
     */
    void broadcastUserStatus(User user, boolean isOnline);

    /**
     * Fetch all messages exchanged between two users.
     *
     * @param senderUsername - sender's username
     * @param receiverUsername - receiver's username
     * @return list of Message
     */
    List<Message> getChatHistory(String senderUsername, String receiverUsername);

    /**
     * Broadcast message via WebSocket to target destination.
     *
     * @param message - saved Message entity
     */
    void broadcastMessage(Message message);
}
