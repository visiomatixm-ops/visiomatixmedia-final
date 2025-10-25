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
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;

@Service
@Transactional
public class ChatServiceImpl implements ChatService {

    @Value("${chat.session.timeout.duration:14400000}")
    private long sessionTimeoutMillis;

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

        List<Message> unreadMessagesInSession = messageRepository.findUnreadMessagesForUser(user)
            .stream()
            .filter(message -> message.getChatSession().getId().equals(sessionId))
            .collect(Collectors.toList());

        unreadMessagesInSession.forEach(Message::markAsRead);
        messageRepository.saveAll(unreadMessagesInSession);
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
    @Transactional
    private void sendSystemMessage(ChatSession chatSession, String content) {
        User systemUser = userService.getOrCreateSystemUser();
        Message systemMessage = new Message(content, Message.MessageType.SYSTEM, systemUser, chatSession);
        messageRepository.save(systemMessage);
        broadcastMessageToSession(chatSession.getId(), systemMessage);
    }

    private void broadcastToSession(Long sessionId, String topic, Object data) {
        String destination = topic + "/" + sessionId;
        messagingTemplate.convertAndSend(destination, data);
    }

    // ===========================================================
    // Admin Analytics and Monitoring Implementation
    // ===========================================================

    @Override
    @Transactional(readOnly = true)
    public List<ChatSession> getAllActiveSessions() {
        return chatSessionRepository.findAll().stream()
            .filter(ChatSession::isActive)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatSession> getSessionsForAgent(Long agentId) {
        User agent = userService.getUserById(agentId);
        if (agent == null) {
            throw new RuntimeException("Agent not found");
        }
        return chatSessionRepository.findActiveSessionsByUser(agent);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getAgentPerformanceMetrics(Long agentId) {
        User agent = userService.getUserById(agentId);
        if (agent == null) {
            throw new RuntimeException("Agent not found");
        }

        Map<String, Object> metrics = new HashMap<>();

        // Get agent's sessions
        List<ChatSession> agentSessions = getSessionsForAgent(agentId);

        // Calculate metrics
        metrics.put("totalSessions", agentSessions.size());
        metrics.put("activeSessions", agentSessions.stream().filter(ChatSession::isActive).count());

        // Messages sent by agent - using optimized repository query
        long messagesSent = messageRepository.countMessagesBySenderAndSessions(agent, agentSessions);
        metrics.put("messagesSent", messagesSent);

        // Average response time (simplified - would need more complex logic)
        metrics.put("averageResponseTime", "N/A"); // Placeholder

        // Session duration stats
        LocalDateTime weekAgo = LocalDateTime.now().minusDays(7);
        long sessionsThisWeek = agentSessions.stream()
            .filter(session -> session.getCreatedAt().isAfter(weekAgo))
            .count();
        metrics.put("sessionsThisWeek", sessionsThisWeek);

        return metrics;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getSystemStatistics() {
        Map<String, Object> stats = new HashMap<>();

        // Basic counts
        stats.put("totalActiveSessions", chatSessionRepository.countByActiveTrue());
        stats.put("totalMessages", messageRepository.count());
        stats.put("totalUsers", userService.getAllUsers().size());

        // Time-based stats
        LocalDateTime today = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime tomorrow = today.plusDays(1);

        long messagesToday = messageRepository.findAll().stream()
            .filter(message -> message.getSentAt().isAfter(today) && message.getSentAt().isBefore(tomorrow))
            .count();
        stats.put("messagesToday", messagesToday);

        long sessionsToday = chatSessionRepository.findAll().stream()
            .filter(session -> session.getCreatedAt().isAfter(today) && session.getCreatedAt().isBefore(tomorrow) && session.isActive())
            .count();
        stats.put("sessionsToday", sessionsToday);

        // Agent performance summary
        List<User> agents = userService.getAllUsers().stream()
            .filter(user -> user.getRoles().stream()
                .anyMatch(role -> "ROLE_AGENT".equals(role.getName()) || "ROLE_ADMIN".equals(role.getName())))
            .collect(Collectors.toList());

        List<Map<String, Object>> agentStats = agents.stream()
            .map(agent -> {
                Map<String, Object> agentStat = new HashMap<>();
                agentStat.put("username", agent.getUsername());
                agentStat.put("name", agent.getName());
                try {
                    Map<String, Object> metrics = getAgentPerformanceMetrics(agent.getId());
                    agentStat.put("activeSessions", metrics.get("activeSessions"));
                    agentStat.put("totalSessions", metrics.get("totalSessions"));
                    agentStat.put("messagesSent", metrics.get("messagesSent"));
                } catch (Exception e) {
                    agentStat.put("activeSessions", 0);
                    agentStat.put("totalSessions", 0);
                    agentStat.put("messagesSent", 0);
                }
                return agentStat;
            })
            .collect(Collectors.toList());

        stats.put("agentPerformance", agentStats);

        return stats;
    }

    // ===========================================================
    // Monthly Reports and Analytics Implementation
    // ===========================================================

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> generateMonthlyChatReport(int year, int month) {
        Map<String, Object> report = new HashMap<>();

        LocalDateTime startOfMonth = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime endOfMonth = startOfMonth.plusMonths(1);

        // Basic monthly statistics
        List<ChatSession> monthlySessions = chatSessionRepository.findAll().stream()
            .filter(session -> session.getCreatedAt().isAfter(startOfMonth) && session.getCreatedAt().isBefore(endOfMonth))
            .collect(Collectors.toList());

        List<Message> monthlyMessages = messageRepository.findAll().stream()
            .filter(message -> message.getSentAt().isAfter(startOfMonth) && message.getSentAt().isBefore(endOfMonth))
            .collect(Collectors.toList());

        report.put("year", year);
        report.put("month", month);
        report.put("totalSessions", monthlySessions.size());
        report.put("totalMessages", monthlyMessages.size());
        report.put("activeSessions", monthlySessions.stream().filter(ChatSession::isActive).count());

        // Agent-specific reports
        List<User> agents = userService.getAllUsers().stream()
            .filter(user -> user.getRoles().stream()
                .anyMatch(role -> "ROLE_AGENT".equals(role.getName()) || "ROLE_ADMIN".equals(role.getName())))
            .collect(Collectors.toList());

        List<Map<String, Object>> agentReports = agents.stream()
            .map(agent -> generateAgentMonthlyReport(agent.getId(), year, month))
            .collect(Collectors.toList());

        report.put("agentReports", agentReports);

        // Daily breakdown
        Map<Integer, Long> dailySessions = monthlySessions.stream()
            .collect(Collectors.groupingBy(
                session -> session.getCreatedAt().getDayOfMonth(),
                Collectors.counting()
            ));
        report.put("dailySessions", dailySessions);

        Map<Integer, Long> dailyMessages = monthlyMessages.stream()
            .collect(Collectors.groupingBy(
                message -> message.getSentAt().getDayOfMonth(),
                Collectors.counting()
            ));
        report.put("dailyMessages", dailyMessages);

        return report;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> generateAgentMonthlyReport(Long agentId, int year, int month) {
        User agent = userService.getUserById(agentId);
        if (agent == null) {
            throw new RuntimeException("Agent not found");
        }

        Map<String, Object> report = new HashMap<>();
        LocalDateTime startOfMonth = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime endOfMonth = startOfMonth.plusMonths(1);

        // Agent's sessions for the month
        List<ChatSession> agentSessions = chatSessionRepository.findAll().stream()
            .filter(session -> session.getParticipants().contains(agent) &&
                             session.getCreatedAt().isAfter(startOfMonth) &&
                             session.getCreatedAt().isBefore(endOfMonth))
            .collect(Collectors.toList());

        // Agent's messages for the month
        List<Message> agentMessages = messageRepository.findAll().stream()
            .filter(message -> message.getSender() != null &&
                             Objects.equals(agentId, message.getSender().getId()) &&
                             message.getSentAt().isAfter(startOfMonth) &&
                             message.getSentAt().isBefore(endOfMonth))
            .collect(Collectors.toList());

        report.put("agentId", agentId);
        report.put("agentName", agent.getName());
        report.put("agentUsername", agent.getUsername());
        report.put("totalSessions", agentSessions.size());
        report.put("totalMessages", agentMessages.size());
        report.put("activeSessions", agentSessions.stream().filter(ChatSession::isActive).count());

        // Average messages per session
        double avgMessagesPerSession = agentSessions.isEmpty() ? 0 :
            (double) agentMessages.size() / agentSessions.size();
        report.put("averageMessagesPerSession", Math.round(avgMessagesPerSession * 100.0) / 100.0);

        // Response time analysis (simplified - would need more complex logic)
        report.put("averageResponseTime", "N/A");

        // Session duration analysis
        List<Long> sessionDurations = agentSessions.stream()
            .filter(session -> session.getUpdatedAt() != null)
            .map(session -> {
                long duration = java.time.Duration.between(session.getCreatedAt(), session.getUpdatedAt()).toMinutes();
                return duration > 0 ? duration : 1L; // Minimum 1 minute
            })
            .collect(Collectors.toList());

        double avgSessionDuration = sessionDurations.isEmpty() ? 0 :
            sessionDurations.stream().mapToLong(Long::longValue).average().orElse(0);
        report.put("averageSessionDurationMinutes", Math.round(avgSessionDuration * 100.0) / 100.0);

        // Daily activity
        Map<Integer, Long> dailyActivity = agentMessages.stream()
            .collect(Collectors.groupingBy(
                message -> message.getSentAt().getDayOfMonth(),
                Collectors.counting()
            ));
        report.put("dailyActivity", dailyActivity);

        return report;
    }

    // ===========================================================
    // Quarterly and Yearly Reports Implementation
    // ===========================================================

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> generateQuarterlyChatReport(int year, int quarter) {
        Map<String, Object> report = new HashMap<>();

        // Calculate quarter start and end dates
        int startMonth = (quarter - 1) * 3 + 1;
        LocalDateTime startOfQuarter = LocalDateTime.of(year, startMonth, 1, 0, 0);
        LocalDateTime endOfQuarter = startOfQuarter.plusMonths(3);

        // Basic quarterly statistics
        List<ChatSession> quarterlySessions = chatSessionRepository.findAll().stream()
            .filter(session -> session.getCreatedAt().isAfter(startOfQuarter) && session.getCreatedAt().isBefore(endOfQuarter))
            .collect(Collectors.toList());

        List<Message> quarterlyMessages = messageRepository.findAll().stream()
            .filter(message -> message.getSentAt().isAfter(startOfQuarter) && message.getSentAt().isBefore(endOfQuarter))
            .collect(Collectors.toList());

        report.put("year", year);
        report.put("quarter", quarter);
        report.put("totalSessions", quarterlySessions.size());
        report.put("totalMessages", quarterlyMessages.size());
        report.put("activeSessions", quarterlySessions.stream().filter(ChatSession::isActive).count());

        // Agent-specific reports
        List<User> agents = userService.getAllUsers().stream()
            .filter(user -> user.getRoles().stream()
                .anyMatch(role -> "ROLE_AGENT".equals(role.getName()) || "ROLE_ADMIN".equals(role.getName())))
            .collect(Collectors.toList());

        List<Map<String, Object>> agentReports = agents.stream()
            .map(agent -> generateAgentQuarterlyReport(agent.getId(), year, quarter))
            .collect(Collectors.toList());

        report.put("agentReports", agentReports);

        // Monthly breakdown within quarter
        Map<Integer, Long> monthlySessions = quarterlySessions.stream()
            .collect(Collectors.groupingBy(
                session -> session.getCreatedAt().getMonthValue(),
                Collectors.counting()
            ));
        report.put("monthlySessions", monthlySessions);

        Map<Integer, Long> monthlyMessages = quarterlyMessages.stream()
            .collect(Collectors.groupingBy(
                message -> message.getSentAt().getMonthValue(),
                Collectors.counting()
            ));
        report.put("monthlyMessages", monthlyMessages);

        return report;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> generateYearlyChatReport(int year) {
        Map<String, Object> report = new HashMap<>();

        LocalDateTime startOfYear = LocalDateTime.of(year, 1, 1, 0, 0);
        LocalDateTime endOfYear = startOfYear.plusYears(1);

        // Basic yearly statistics
        List<ChatSession> yearlySessions = chatSessionRepository.findAll().stream()
            .filter(session -> session.getCreatedAt().isAfter(startOfYear) && session.getCreatedAt().isBefore(endOfYear))
            .collect(Collectors.toList());

        List<Message> yearlyMessages = messageRepository.findAll().stream()
            .filter(message -> message.getSentAt().isAfter(startOfYear) && message.getSentAt().isBefore(endOfYear))
            .collect(Collectors.toList());

        report.put("year", year);
        report.put("totalSessions", yearlySessions.size());
        report.put("totalMessages", yearlyMessages.size());
        report.put("activeSessions", yearlySessions.stream().filter(ChatSession::isActive).count());

        // Agent-specific reports
        List<User> agents = userService.getAllUsers().stream()
            .filter(user -> user.getRoles().stream()
                .anyMatch(role -> "ROLE_AGENT".equals(role.getName()) || "ROLE_ADMIN".equals(role.getName())))
            .collect(Collectors.toList());

        List<Map<String, Object>> agentReports = agents.stream()
            .map(agent -> generateAgentYearlyReport(agent.getId(), year))
            .collect(Collectors.toList());

        report.put("agentReports", agentReports);

        // Quarterly breakdown
        Map<Integer, Long> quarterlySessions = yearlySessions.stream()
            .collect(Collectors.groupingBy(
                session -> (session.getCreatedAt().getMonthValue() - 1) / 3 + 1,
                Collectors.counting()
            ));
        report.put("quarterlySessions", quarterlySessions);

        Map<Integer, Long> quarterlyMessages = yearlyMessages.stream()
            .collect(Collectors.groupingBy(
                message -> (message.getSentAt().getMonthValue() - 1) / 3 + 1,
                Collectors.counting()
            ));
        report.put("quarterlyMessages", quarterlyMessages);

        return report;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> generateAgentQuarterlyReport(Long agentId, int year, int quarter) {
        User agent = userService.getUserById(agentId);
        if (agent == null) {
            throw new RuntimeException("Agent not found");
        }

        Map<String, Object> report = new HashMap<>();
        int startMonth = (quarter - 1) * 3 + 1;
        LocalDateTime startOfQuarter = LocalDateTime.of(year, startMonth, 1, 0, 0);
        LocalDateTime endOfQuarter = startOfQuarter.plusMonths(3);

        // Agent's sessions for the quarter
        List<ChatSession> agentSessions = chatSessionRepository.findAll().stream()
            .filter(session -> session.getParticipants().contains(agent) &&
                             session.getCreatedAt().isAfter(startOfQuarter) &&
                             session.getCreatedAt().isBefore(endOfQuarter))
            .collect(Collectors.toList());

        // Agent's messages for the quarter
        List<Message> agentMessages = messageRepository.findAll().stream()
            .filter(message -> message.getSender() != null &&
                             Objects.equals(agentId, message.getSender().getId()) &&
                             message.getSentAt().isAfter(startOfQuarter) &&
                             message.getSentAt().isBefore(endOfQuarter))
            .collect(Collectors.toList());

        report.put("agentId", agentId);
        report.put("agentName", agent.getName());
        report.put("agentUsername", agent.getUsername());
        report.put("year", year);
        report.put("quarter", quarter);
        report.put("totalSessions", agentSessions.size());
        report.put("totalMessages", agentMessages.size());
        report.put("activeSessions", agentSessions.stream().filter(ChatSession::isActive).count());

        // Average messages per session
        double avgMessagesPerSession = agentSessions.isEmpty() ? 0 :
            (double) agentMessages.size() / agentSessions.size();
        report.put("averageMessagesPerSession", Math.round(avgMessagesPerSession * 100.0) / 100.0);

        return report;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> generateAgentYearlyReport(Long agentId, int year) {
        User agent = userService.getUserById(agentId);
        if (agent == null) {
            throw new RuntimeException("Agent not found");
        }

        Map<String, Object> report = new HashMap<>();
        LocalDateTime startOfYear = LocalDateTime.of(year, 1, 1, 0, 0);
        LocalDateTime endOfYear = startOfYear.plusYears(1);

        // Agent's sessions for the year
        List<ChatSession> agentSessions = chatSessionRepository.findAll().stream()
            .filter(session -> session.getParticipants().contains(agent) &&
                             session.getCreatedAt().isAfter(startOfYear) &&
                             session.getCreatedAt().isBefore(endOfYear))
            .collect(Collectors.toList());

        // Agent's messages for the year
        List<Message> agentMessages = messageRepository.findAll().stream()
            .filter(message -> message.getSender() != null &&
                             Objects.equals(agentId, message.getSender().getId()) &&
                             message.getSentAt().isAfter(startOfYear) &&
                             message.getSentAt().isBefore(endOfYear))
            .collect(Collectors.toList());

        report.put("agentId", agentId);
        report.put("agentName", agent.getName());
        report.put("agentUsername", agent.getUsername());
        report.put("year", year);
        report.put("totalSessions", agentSessions.size());
        report.put("totalMessages", agentMessages.size());
        report.put("activeSessions", agentSessions.stream().filter(ChatSession::isActive).count());

        // Average messages per session
        double avgMessagesPerSession = agentSessions.isEmpty() ? 0 :
            (double) agentMessages.size() / agentSessions.size();
        report.put("averageMessagesPerSession", Math.round(avgMessagesPerSession * 100.0) / 100.0);

        return report;
    }

    // ===========================================================
    // Chat Handling Statistics Implementation
    // ===========================================================

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getUserChatHandlingStatsMonthly(Long userId, int year, int month) {
        Optional<User> userOpt = Optional.ofNullable(userService.getUserById(userId))
            .or(() -> Optional.ofNullable(userService.getUserByUsername(userId.toString())));
        User user = userOpt.orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> stats = new HashMap<>();
        LocalDateTime startOfMonth = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime endOfMonth = startOfMonth.plusMonths(1);
        Long userIdValue = user.getId();

        // Count sessions where user participated
        long totalSessions = chatSessionRepository.findAll().stream()
            .filter(session -> session.getParticipants().contains(user) &&
                             session.getCreatedAt().isAfter(startOfMonth) &&
                             session.getCreatedAt().isBefore(endOfMonth))
            .count();

        // Count messages sent by user
        long totalMessages = messageRepository.findAll().stream()
            .filter(message -> message.getSender() != null &&
                             Objects.equals(userIdValue, message.getSender().getId()) &&
                             message.getSentAt().isAfter(startOfMonth) &&
                             message.getSentAt().isBefore(endOfMonth))
            .count();

        stats.put("userId", user.getId());
        stats.put("userName", user.getName());
        stats.put("userUsername", user.getUsername());
        stats.put("year", year);
        stats.put("month", month);
        stats.put("totalSessionsHandled", totalSessions);
        stats.put("totalMessagesSent", totalMessages);
        stats.put("period", "monthly");

        return stats;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getUserChatHandlingStatsQuarterly(Long userId, int year, int quarter) {
        Optional<User> userOpt = Optional.ofNullable(userService.getUserById(userId))
            .or(() -> Optional.ofNullable(userService.getUserByUsername(userId.toString())));
        User user = userOpt.orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> stats = new HashMap<>();
        int startMonth = (quarter - 1) * 3 + 1;
        LocalDateTime startOfQuarter = LocalDateTime.of(year, startMonth, 1, 0, 0);
        LocalDateTime endOfQuarter = startOfQuarter.plusMonths(3);
        Long userIdValue = user.getId();

        // Count sessions where user participated
        long totalSessions = chatSessionRepository.findAll().stream()
            .filter(session -> session.getParticipants().contains(user) &&
                             session.getCreatedAt().isAfter(startOfQuarter) &&
                             session.getCreatedAt().isBefore(endOfQuarter))
            .count();

        // Count messages sent by user
        long totalMessages = messageRepository.findAll().stream()
            .filter(message -> message.getSender() != null &&
                             Objects.equals(userIdValue, message.getSender().getId()) &&
                             message.getSentAt().isAfter(startOfQuarter) &&
                             message.getSentAt().isBefore(endOfQuarter))
            .count();

        stats.put("userId", user.getId());
        stats.put("userName", user.getName());
        stats.put("userUsername", user.getUsername());
        stats.put("year", year);
        stats.put("quarter", quarter);
        stats.put("totalSessionsHandled", totalSessions);
        stats.put("totalMessagesSent", totalMessages);
        stats.put("period", "quarterly");

        return stats;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getUserChatHandlingStatsYearly(Long userId, int year) {
        Optional<User> userOpt = Optional.ofNullable(userService.getUserById(userId))
            .or(() -> Optional.ofNullable(userService.getUserByUsername(userId.toString())));
        User user = userOpt.orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> stats = new HashMap<>();
        LocalDateTime startOfYear = LocalDateTime.of(year, 1, 1, 0, 0);
        LocalDateTime endOfYear = startOfYear.plusYears(1);
        Long userIdValue = user.getId();

        // Count sessions where user participated
        long totalSessions = chatSessionRepository.findAll().stream()
            .filter(session -> session.getParticipants().contains(user) &&
                             session.getCreatedAt().isAfter(startOfYear) &&
                             session.getCreatedAt().isBefore(endOfYear))
            .count();

        // Count messages sent by user
        long totalMessages = messageRepository.findAll().stream()
            .filter(message -> message.getSender() != null &&
                             Objects.equals(userIdValue, message.getSender().getId()) &&
                             message.getSentAt().isAfter(startOfYear) &&
                             message.getSentAt().isBefore(endOfYear))
            .count();

        stats.put("userId", user.getId());
        stats.put("userName", user.getName());
        stats.put("userUsername", user.getUsername());
        stats.put("year", year);
        stats.put("totalSessionsHandled", totalSessions);
        stats.put("totalMessagesSent", totalMessages);
        stats.put("period", "yearly");

        return stats;
    }

    // ===========================================================
    // Chat History and Session Management Implementation
    // ===========================================================

    @Override
    @Transactional(readOnly = true)
    public List<ChatSession> getAllSessionsForAdmin() {
        return chatSessionRepository.findAll().stream()
            .sorted((s1, s2) -> s2.getUpdatedAt().compareTo(s1.getUpdatedAt()))
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatSession> getAllSessionsForAgent(Long agentId) {
        User agent = userService.getUserById(agentId);
        if (agent == null) {
            throw new RuntimeException("Agent not found");
        }
        return chatSessionRepository.findAllSessionsByUser(agent);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatSession> getSessionsByDateRange(java.time.LocalDateTime startDate, java.time.LocalDateTime endDate) {
        return chatSessionRepository.findAll().stream()
            .filter(session -> session.getCreatedAt().isAfter(startDate) && session.getCreatedAt().isBefore(endDate))
            .sorted((s1, s2) -> s2.getUpdatedAt().compareTo(s1.getUpdatedAt()))
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatSession> getSessionsByUser(Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            // Try to find by username if ID lookup fails
            user = userService.getUserByUsername(userId.toString());
            if (user == null) {
                throw new RuntimeException("User not found");
            }
        }
        return chatSessionRepository.findAllSessionsByUser(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getSessionDetailsWithMessages(Long sessionId) {
        ChatSession session = chatSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Session not found"));

        List<Message> messages = messageRepository.findByChatSessionOrderBySentAtAsc(session);

        Map<String, Object> sessionDetails = new HashMap<>();
        sessionDetails.put("session", session);
        sessionDetails.put("messages", messages);
        sessionDetails.put("participantCount", session.getParticipants().size());
        sessionDetails.put("messageCount", messages.size());
        sessionDetails.put("sessionDuration", session.getUpdatedAt() != null ?
            java.time.Duration.between(session.getCreatedAt(), session.getUpdatedAt()).toMinutes() : 0);

        return sessionDetails;
    }

    // ===========================================================
    // Security helper: Check if user can access session
    // ===========================================================
    @Override
    public boolean canUserAccessSession(Long sessionId, String username) {
        try {
            User user = userService.getUserByUsername(username);
            ChatSession session = chatSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

            // Check if user is a participant in the session
            return session.getParticipants().contains(user);
        } catch (Exception e) {
            return false;
        }
    }
}

