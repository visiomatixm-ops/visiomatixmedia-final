// /**
//  * ===========================================================
//  * File: ChatServiceImpl.java
//  * Location: com.visiomatix.chat.chat.chat.service
//  * Author: Viral Prajapati
//  * Date: 14-Oct-2025
//  * Description:
//  *  Implementation of ChatService interface.
//  *  Handles chat session management, message processing,
//  *  and real-time communication via WebSocket messaging.
//  * ===========================================================
//  */

// package com.visiomatix.chat.chat.chat.service;

// // ===========================================================
// // Import Statements
// // ===========================================================
// import com.visiomatix.chat.chat.chat.model.ChatSession;
// import com.visiomatix.chat.chat.chat.model.Message;
// import com.visiomatix.chat.chat.chat.repository.ChatSessionRepository;
// import com.visiomatix.chat.chat.chat.repository.MessageRepository;
// import com.visiomatix.chat.chat.chat.dto.ChatMessagePayload;
// import com.visiomatix.chat.chat.user.model.User;
// import com.visiomatix.chat.chat.user.service.UserService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.messaging.simp.SimpMessagingTemplate;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.data.domain.Sort;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;
// import java.time.LocalDateTime;
// import java.util.*;

// @Service
// @Transactional
// public class ChatServiceImpl implements ChatService {

//     private final ChatSessionRepository chatSessionRepository;
//     private final MessageRepository messageRepository;
//     private final SimpMessagingTemplate messagingTemplate;
//     private final UserService userService;

//     public ChatServiceImpl(ChatSessionRepository chatSessionRepository,
//                            MessageRepository messageRepository,
//                            SimpMessagingTemplate messagingTemplate,
//                            UserService userService) {
//         this.chatSessionRepository = chatSessionRepository;
//         this.messageRepository = messageRepository;
//         this.messagingTemplate = messagingTemplate;
//         this.userService = userService;
//     }

//     // ===========================================================
//     // Chat Session Management Implementation
//     // ===========================================================

//     @Override
//     public ChatSession createChatSession(String sessionName, ChatSession.SessionType sessionType, List<User> participants) {
//         ChatSession chatSession = new ChatSession(sessionName, sessionType);
        
//         // Add participants to session
//         for (User participant : participants) {
//             chatSession.addParticipant(participant);
//         }
        
//         ChatSession savedSession = chatSessionRepository.save(chatSession);
        
//         // Send system message about session creation
//         sendSystemMessage(savedSession, "Chat session created");
        
//         return savedSession;
//     }

//     @Override
//     public ChatSession getOrCreateSessionBetweenUsers(User user1, User user2, ChatSession.SessionType sessionType) {
//         // Try to find existing session between users
//         Optional<ChatSession> existingSession = chatSessionRepository.findActiveSessionBetweenUsers(user1, user2, sessionType);
        
//         if (existingSession.isPresent()) {
//             return existingSession.get();
//         }
        
//         // Create new session if none exists
//         String sessionName = "Chat: " + user1.getUsername() + " & " + user2.getUsername();
//         return createChatSession(sessionName, sessionType, Arrays.asList(user1, user2));
//     }

//     @Override
//     public ChatSession addParticipantToSession(Long sessionId, User participant) {
//         ChatSession chatSession = chatSessionRepository.findById(sessionId)
//             .orElseThrow(() -> new RuntimeException("Chat session not found"));
        
//         chatSession.addParticipant(participant);
//         ChatSession savedSession = chatSessionRepository.save(chatSession);
        
//         // Send system message about user joining
//         sendSystemMessage(savedSession, participant.getUsername() + " joined the chat");
        
//         return savedSession;
//     }

//     @Override
//     public ChatSession removeParticipantFromSession(Long sessionId, User participant) {
//         ChatSession chatSession = chatSessionRepository.findById(sessionId)
//             .orElseThrow(() -> new RuntimeException("Chat session not found"));
        
//         chatSession.removeParticipant(participant);
//         ChatSession savedSession = chatSessionRepository.save(chatSession);
        
//         // Send system message about user leaving
//         sendSystemMessage(savedSession, participant.getUsername() + " left the chat");
        
//         return savedSession;
//     }

//     @Override
//     @Transactional(readOnly = true)
//     public List<ChatSession> getActiveSessionsForUser(User user) {
//         return chatSessionRepository.findActiveSessionsByUser(user);
//     }

//     @Override
//     @Transactional(readOnly = true)
//     public Optional<ChatSession> getChatSessionById(Long sessionId) {
//         return chatSessionRepository.findById(sessionId);
//     }

//     @Override
//     public void deactivateChatSession(Long sessionId) {
//         ChatSession chatSession = chatSessionRepository.findById(sessionId)
//             .orElseThrow(() -> new RuntimeException("Chat session not found"));
        
//         chatSession.setActive(false);
//         chatSessionRepository.save(chatSession);
        
//         // Notify participants about session end
//         broadcastToSession(sessionId, "/topic/session/closed", "Session has been closed");
//     }

//     // ===========================================================
//     // Message Management Implementation
//     // ===========================================================

//     @Override
//     public Message sendMessage(Long sessionId, User sender, String content, Message.MessageType messageType) {
//         ChatSession chatSession = chatSessionRepository.findById(sessionId)
//             .orElseThrow(() -> new RuntimeException("Chat session not found"));

//         // Create and save message
//         Message message = new Message(content, messageType, sender, chatSession);
//         Message savedMessage = messageRepository.save(message);

//         // Update session timestamp
//         chatSession.updateLastMessageTime();
//         chatSessionRepository.save(chatSession);

//         // Broadcast message to session participants
//         broadcastMessageToSession(sessionId, savedMessage);

//         return savedMessage;
//     }

//     @Override
//     public Message saveMessage(ChatMessagePayload payload) {
//         // Get sender and receiver users
//         User sender = userService.getUserByUsername(payload.getSender());
//         User receiver = userService.getUserByUsername(payload.getReceiver());

//         // Get or create session between users
//         ChatSession session = getOrCreateSessionBetweenUsers(sender, receiver, ChatSession.SessionType.AGENT_CLIENT);

//         // Send message using existing method
//         return sendMessage(session.getId(), sender, payload.getContent(), Message.MessageType.TEXT);
//     }

//     @Override
//     @Transactional(readOnly = true)
//     public List<Message> getMessagesForSession(Long sessionId, int page, int size) {
//         ChatSession chatSession = chatSessionRepository.findById(sessionId)
//             .orElseThrow(() -> new RuntimeException("Chat session not found"));
        
//         PageRequest pageRequest = PageRequest.of(page, size, Sort.by("sentAt").ascending());
//         return messageRepository.findByChatSession(chatSession, pageRequest).getContent();
//     }

//     @Override
//     @Transactional(readOnly = true)
//     public List<Message> getRecentMessagesForSession(Long sessionId, int limit) {
//         ChatSession chatSession = chatSessionRepository.findById(sessionId)
//             .orElseThrow(() -> new RuntimeException("Chat session not found"));
        
//         return messageRepository.findRecentMessagesBySession(chatSession, limit);
//     }

//     @Override
//     public void markMessageAsDelivered(Long messageId) {
//         Message message = messageRepository.findById(messageId)
//             .orElseThrow(() -> new RuntimeException("Message not found"));
        
//         message.markAsDelivered();
//         messageRepository.save(message);
//     }

//     @Override
//     public void markMessageAsRead(Long messageId) {
//         Message message = messageRepository.findById(messageId)
//             .orElseThrow(() -> new RuntimeException("Message not found"));
        
//         message.markAsRead();
//         messageRepository.save(message);
//     }

//     @Override
//     public void markAllMessagesAsReadInSession(Long sessionId, User user) {
//         ChatSession chatSession = chatSessionRepository.findById(sessionId)
//             .orElseThrow(() -> new RuntimeException("Chat session not found"));
        
//         List<Message> unreadMessages = messageRepository.findUnreadMessagesForUser(user);
//         for (Message message : unreadMessages) {
//             if (message.getChatSession().getId().equals(sessionId)) {
//                 message.markAsRead();
//             }
//         }
//         messageRepository.saveAll(unreadMessages);
//     }

//     @Override
//     @Transactional(readOnly = true)
//     public long getUnreadMessagesCount(Long sessionId, User user) {
//         ChatSession chatSession = chatSessionRepository.findById(sessionId)
//             .orElseThrow(() -> new RuntimeException("Chat session not found"));
        
//         return messageRepository.countUnreadMessagesInSession(chatSession, user);
//     }

//     @Override
//     public Message editMessage(Long messageId, String newContent, User editor) {
//         Message message = messageRepository.findById(messageId)
//             .orElseThrow(() -> new RuntimeException("Message not found"));
        
//         // Check if user has permission to edit (only sender can edit)
//         if (!message.getSender().getId().equals(editor.getId())) {
//             throw new RuntimeException("User not authorized to edit this message");
//         }
        
//         message.editContent(newContent);
//         Message savedMessage = messageRepository.save(message);
        
//         // Broadcast message edit to session participants
//         broadcastToSession(message.getChatSession().getId(), "/topic/message/edited", savedMessage);
        
//         return savedMessage;
//     }

//     // ===========================================================
//     // Search and Analytics Implementation
//     // ===========================================================

//     @Override
//     @Transactional(readOnly = true)
//     public List<Message> searchMessagesInSession(Long sessionId, String searchTerm) {
//         ChatSession chatSession = chatSessionRepository.findById(sessionId)
//             .orElseThrow(() -> new RuntimeException("Chat session not found"));
        
//         return messageRepository.searchMessagesInSession(chatSession, searchTerm);
//     }

//     @Override
//     @Transactional(readOnly = true)
//     public Object getMessageStatistics() {
//         Map<String, Object> stats = new HashMap<>();
//         stats.put("totalActiveSessions", chatSessionRepository.countByActiveTrue());
//         stats.put("totalMessages", messageRepository.count());
        
//         // Add more statistics as needed
//         LocalDateTime today = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
//         LocalDateTime tomorrow = today.plusDays(1);
        
//         List<Object[]> messageStats = messageRepository.getMessageStatsByTypeAndDateRange(today, tomorrow);
//         stats.put("todayMessagesByType", messageStats);
        
//         return stats;
//     }

//     @Override
//     @Transactional(readOnly = true)
//     public long getActiveSessionsCount() {
//         return chatSessionRepository.countByActiveTrue();
//     }

//     // ===========================================================
//     // Real-time Communication Implementation
//     // ===========================================================

//     @Override
//     public void broadcastMessageToSession(Long sessionId, Message message) {
//         String destination = "/topic/chat/" + sessionId;
//         messagingTemplate.convertAndSend(destination, message);
//     }

//     @Override
//     public void sendTypingIndicator(Long sessionId, User user, boolean isTyping) {
//         String destination = "/topic/typing/" + sessionId;
//         Map<String, Object> typingData = Map.of(
//             "userId", user.getId(),
//             "username", user.getUsername(),
//             "isTyping", isTyping
//         );
//         messagingTemplate.convertAndSend(destination, typingData);
//     }

//     @Override
//     public void broadcastUserStatus(User user, boolean isOnline) {
//         String destination = "/topic/user/status";
//         Map<String, Object> statusData = Map.of(
//             "userId", user.getId(),
//             "username", user.getUsername(),
//             "isOnline", isOnline,
//             "timestamp", LocalDateTime.now()
//         );
//         messagingTemplate.convertAndSend(destination, statusData);
//     }

//     // ===========================================================
//     // Private Helper Methods
//     // ===========================================================

//     private void sendSystemMessage(ChatSession chatSession, String content) {
//         Message systemMessage = new Message(content, Message.MessageType.SYSTEM, null, chatSession);
//         messageRepository.save(systemMessage);
//         broadcastMessageToSession(chatSession.getId(), systemMessage);
//     }

//     private void broadcastToSession(Long sessionId, String topic, Object data) {
//         String destination = topic + "/" + sessionId;
//         messagingTemplate.convertAndSend(destination, data);
//     }
// }



/**
 * ===========================================================
 * File: ChatServiceImpl.java
 * Location: com.visiomatix.chat.chat.chat.service
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  Implementation of ChatService interface.
 *  Handles chat session management, message processing,
 *  and real-time communication via WebSocket messaging.
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.service;

// ===========================================================
// Import Statements
// ===========================================================
import com.visiomatix.chat.chat.chat.model.ChatSession;
import com.visiomatix.chat.chat.chat.model.Message;
import com.visiomatix.chat.chat.chat.repository.ChatSessionRepository;
import com.visiomatix.chat.chat.chat.repository.MessageRepository;
import com.visiomatix.chat.chat.chat.dto.ChatMessagePayload;
import com.visiomatix.chat.chat.user.model.User;
import com.visiomatix.chat.chat.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
public class ChatServiceImpl implements ChatService {

    private final ChatSessionRepository chatSessionRepository;
    private final MessageRepository messageRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;

    public ChatServiceImpl(ChatSessionRepository chatSessionRepository,
                           MessageRepository messageRepository,
                           SimpMessagingTemplate messagingTemplate,
                           UserService userService) {
        this.chatSessionRepository = chatSessionRepository;
        this.messageRepository = messageRepository;
        this.messagingTemplate = messagingTemplate;
        this.userService = userService;
    }

    // ===========================================================
    // Chat Session Management Implementation
    // ===========================================================

    @Override
    public ChatSession createChatSession(String sessionName, ChatSession.SessionType sessionType, List<User> participants) {
        ChatSession chatSession = new ChatSession(sessionName, sessionType);

        // Add participants to session
        for (User participant : participants) {
            chatSession.addParticipant(participant);
        }

        ChatSession savedSession = chatSessionRepository.save(chatSession);

        // Send system message about session creation
        sendSystemMessage(savedSession, "Chat session created");

        return savedSession;
    }

    @Override
    public ChatSession getOrCreateSessionBetweenUsers(User user1, User user2, ChatSession.SessionType sessionType) {
        // Try to find existing session between users
        Optional<ChatSession> existingSession = chatSessionRepository.findActiveSessionBetweenUsers(user1, user2, sessionType);

        if (existingSession.isPresent()) {
            return existingSession.get();
        }

        // Create new session if none exists
        String sessionName = "Chat: " + user1.getUsername() + " & " + user2.getUsername();
        return createChatSession(sessionName, sessionType, Arrays.asList(user1, user2));
    }

    @Override
    public ChatSession addParticipantToSession(Long sessionId, User participant) {
        ChatSession chatSession = chatSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Chat session not found"));

        chatSession.addParticipant(participant);
        ChatSession savedSession = chatSessionRepository.save(chatSession);

        // Send system message about user joining
        sendSystemMessage(savedSession, participant.getUsername() + " joined the chat");

        return savedSession;
    }

    @Override
    public ChatSession removeParticipantFromSession(Long sessionId, User participant) {
        ChatSession chatSession = chatSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Chat session not found"));

        chatSession.removeParticipant(participant);
        ChatSession savedSession = chatSessionRepository.save(chatSession);

        // Send system message about user leaving
        sendSystemMessage(savedSession, participant.getUsername() + " left the chat");

        return savedSession;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatSession> getActiveSessionsForUser(User user) {
        return chatSessionRepository.findActiveSessionsByUser(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ChatSession> getChatSessionById(Long sessionId) {
        return chatSessionRepository.findById(sessionId);
    }

    @Override
    public void deactivateChatSession(Long sessionId) {
        ChatSession chatSession = chatSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Chat session not found"));

        chatSession.setActive(false);
        chatSessionRepository.save(chatSession);

        // Notify participants about session end
        broadcastToSession(sessionId, "/topic/session/closed", "Session has been closed");
    }

    // ===========================================================
    // Message Management Implementation
    // ===========================================================

    @Override
    public Message sendMessage(Long sessionId, User sender, String content, Message.MessageType messageType) {
        ChatSession chatSession = chatSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Chat session not found"));

        // Create and save message
        Message message = new Message(content, messageType, sender, chatSession);
        Message savedMessage = messageRepository.save(message);

        // Update session timestamp
        chatSession.updateLastMessageTime();
        chatSessionRepository.save(chatSession);

        // Broadcast message to session participants
        broadcastMessageToSession(sessionId, savedMessage);

        return savedMessage;
    }

    @Override
    public Message saveMessage(ChatMessagePayload payload) {
        // Get sender and receiver users
        User sender = userService.getUserByUsername(payload.getSender());
        User receiver = userService.getUserByUsername(payload.getReceiver());

        // Get or create session between users
        ChatSession session = getOrCreateSessionBetweenUsers(sender, receiver, ChatSession.SessionType.AGENT_CLIENT);

        // Send message using existing method
        return sendMessage(session.getId(), sender, payload.getContent(), Message.MessageType.TEXT);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Message> getMessagesForSession(Long sessionId, int page, int size) {
        ChatSession chatSession = chatSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Chat session not found"));

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("sentAt").ascending());
        return messageRepository.findByChatSession(chatSession, pageRequest).getContent();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Message> getRecentMessagesForSession(Long sessionId, int limit) {
        ChatSession chatSession = chatSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Chat session not found"));

        return messageRepository.findRecentMessagesBySession(chatSession, limit);
    }

    @Override
    public void markMessageAsDelivered(Long messageId) {
        Message message = messageRepository.findById(messageId)
            .orElseThrow(() -> new RuntimeException("Message not found"));

        message.markAsDelivered();
        messageRepository.save(message);
    }

    @Override
    public void markMessageAsRead(Long messageId) {
        Message message = messageRepository.findById(messageId)
            .orElseThrow(() -> new RuntimeException("Message not found"));

        message.markAsRead();
        messageRepository.save(message);
    }

    @Override
    public void markAllMessagesAsReadInSession(Long sessionId, User user) {
        ChatSession chatSession = chatSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Chat session not found"));

        List<Message> unreadMessages = messageRepository.findUnreadMessagesForUser(user);
        for (Message message : unreadMessages) {
            if (message.getChatSession().getId().equals(sessionId)) {
                message.markAsRead();
            }
        }
        messageRepository.saveAll(unreadMessages);
    }

    @Override
    @Transactional(readOnly = true)
    public long getUnreadMessagesCount(Long sessionId, User user) {
        ChatSession chatSession = chatSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Chat session not found"));

        return messageRepository.countUnreadMessagesInSession(chatSession, user);
    }

    @Override
    public Message editMessage(Long messageId, String newContent, User editor) {
        Message message = messageRepository.findById(messageId)
            .orElseThrow(() -> new RuntimeException("Message not found"));

        // Check if user has permission to edit (only sender can edit)
        if (!message.getSender().getId().equals(editor.getId())) {
            throw new RuntimeException("User not authorized to edit this message");
        }

        message.editContent(newContent);
        Message savedMessage = messageRepository.save(message);

        // Broadcast message edit to session participants
        broadcastToSession(message.getChatSession().getId(), "/topic/message/edited", savedMessage);

        return savedMessage;
    }

    // ===========================================================
    // Search and Analytics Implementation
    // ===========================================================

    @Override
    @Transactional(readOnly = true)
    public List<Message> searchMessagesInSession(Long sessionId, String searchTerm) {
        ChatSession chatSession = chatSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Chat session not found"));

        return messageRepository.searchMessagesInSession(chatSession, searchTerm);
    }

    @Override
    @Transactional(readOnly = true)
    public Object getMessageStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalActiveSessions", chatSessionRepository.countByActiveTrue());
        stats.put("totalMessages", messageRepository.count());

        // Add more statistics as needed
        LocalDateTime today = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime tomorrow = today.plusDays(1);

        List<Object[]> messageStats = messageRepository.getMessageStatsByTypeAndDateRange(today, tomorrow);
        stats.put("todayMessagesByType", messageStats);

        return stats;
    }

    @Override
    @Transactional(readOnly = true)
    public long getActiveSessionsCount() {
        return chatSessionRepository.countByActiveTrue();
    }

    // ===========================================================
    // Real-time Communication Implementation
    // ===========================================================

    @Override
    public void broadcastMessageToSession(Long sessionId, Message message) {
        String destination = "/topic/chat/" + sessionId;
        messagingTemplate.convertAndSend(destination, message);
    }

    @Override
    public void sendTypingIndicator(Long sessionId, User user, boolean isTyping) {
        String destination = "/topic/typing/" + sessionId;
        Map<String, Object> typingData = Map.of(
            "userId", user.getId(),
            "username", user.getUsername(),
            "isTyping", isTyping
        );
        messagingTemplate.convertAndSend(destination, typingData);
    }

    @Override
    public void broadcastUserStatus(User user, boolean isOnline) {
        String destination = "/topic/user/status";
        Map<String, Object> statusData = Map.of(
            "userId", user.getId(),
            "username", user.getUsername(),
            "isOnline", isOnline,
            "timestamp", LocalDateTime.now()
        );
        messagingTemplate.convertAndSend(destination, statusData);
    }

    // ===========================================================
    // Legacy Methods
    // ===========================================================

    @Override
    public List<Message> getChatHistory(String senderUsername, String receiverUsername) {
        // Get users
        User sender = userService.getUserByUsername(senderUsername);
        User receiver = userService.getUserByUsername(receiverUsername);

        // Find the chat session between these users
        Optional<ChatSession> session = chatSessionRepository.findActiveSessionBetweenUsers(sender, receiver, ChatSession.SessionType.AGENT_CLIENT);

        if (session.isPresent()) {
            return messageRepository.findByChatSessionOrderBySentAtAsc(session.get());
        } else {
            return List.of(); // Return empty list if no session exists
        }
    }

    @Override
    public void broadcastMessage(Message message) {
        // Broadcast to all participants in the chat session
        String destination = "/topic/chat/" + message.getChatSession().getId();
        messagingTemplate.convertAndSend(destination, message);
    }

    // ===========================================================
    // Private Helper Methods
    // ===========================================================

    private void sendSystemMessage(ChatSession chatSession, String content) {
        Message systemMessage = new Message(content, Message.MessageType.SYSTEM, null, chatSession);
        messageRepository.save(systemMessage);
        broadcastMessageToSession(chatSession.getId(), systemMessage);
    }

    private void broadcastToSession(Long sessionId, String topic, Object data) {
        String destination = topic + "/" + sessionId;
        messagingTemplate.convertAndSend(destination, data);
    }
}
