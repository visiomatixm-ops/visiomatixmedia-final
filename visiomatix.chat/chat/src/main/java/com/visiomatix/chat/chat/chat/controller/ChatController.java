/**
 * ===========================================================
 * File: ChatController.java
 * Location: com.visiomatix.chat.chat.chat.controller
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  REST controller for chat session management.
 *  Provides HTTP endpoints for creating, managing,
 *  and retrieving chat sessions and message history.
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.controller;

// ===========================================================
// Import Statements
// ===========================================================
import com.visiomatix.chat.chat.chat.model.ChatSession;
import com.visiomatix.chat.chat.chat.model.Message;
import com.visiomatix.chat.chat.chat.service.ChatService;
import com.visiomatix.chat.chat.user.model.User;
import com.visiomatix.chat.chat.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Arrays;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    // ===========================================================
    // Chat Session Management Endpoints
    // ===========================================================

    /**
     * Get all active chat sessions for the authenticated user
     */
    @GetMapping("/sessions")
    public ResponseEntity<List<ChatSession>> getUserSessions(Authentication authentication) {
        try {
            User currentUser = userService.getUserByUsername(authentication.getName());
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            List<ChatSession> sessions = chatService.getActiveSessionsForUser(currentUser);
            return ResponseEntity.ok(sessions);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Create a new chat session
     */
    @PostMapping("/sessions")
    public ResponseEntity<ChatSession> createChatSession(
        @RequestBody @Valid Map<String, Object> sessionData,
        Authentication authentication
    ) {
        try {
            User currentUser = userService.getUserByUsername(authentication.getName());
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            String sessionName = (String) sessionData.get("sessionName");
            String sessionTypeStr = (String) sessionData.getOrDefault("sessionType", "AGENT_CLIENT");
            ChatSession.SessionType sessionType = ChatSession.SessionType.valueOf(sessionTypeStr);

            // For now, create session with just the current user
            List<User> participants = Arrays.asList(currentUser);
            
            ChatSession session = chatService.createChatSession(sessionName, sessionType, participants);
            return ResponseEntity.status(HttpStatus.CREATED).body(session);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Start a chat session with another user
     */
    @PostMapping("/sessions/with/{otherUserId}")
    public ResponseEntity<ChatSession> startChatWithUser(
        @PathVariable Long otherUserId,
        Authentication authentication
    ) {
        try {
            User currentUser = userService.getUserByUsername(authentication.getName());
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            // Get the other user (this would need to be implemented in UserService)
            // For now, we'll assume getUserById exists or needs to be added
            // User otherUser = userService.getUserById(otherUserId);
            
            // Temporary implementation - you may need to add getUserById to UserService
            ChatSession session = chatService.createChatSession(
                "Chat with User " + otherUserId, 
                ChatSession.SessionType.AGENT_CLIENT, 
                Arrays.asList(currentUser)
            );
            
            return ResponseEntity.status(HttpStatus.CREATED).body(session);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Get chat session details by ID
     */
    @GetMapping("/sessions/{sessionId}")
    public ResponseEntity<ChatSession> getChatSession(
        @PathVariable Long sessionId,
        Authentication authentication
    ) {
        try {
            User currentUser = userService.getUserByUsername(authentication.getName());
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            Optional<ChatSession> session = chatService.getChatSessionById(sessionId);
            if (session.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            // Check if user is participant in this session
            boolean isParticipant = session.get().getParticipants()
                .stream()
                .anyMatch(user -> user.getId().equals(currentUser.getId()));

            if (!isParticipant) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            return ResponseEntity.ok(session.get());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Add participant to chat session
     */
    @PostMapping("/sessions/{sessionId}/participants/{userId}")
    public ResponseEntity<ChatSession> addParticipant(
        @PathVariable Long sessionId,
        @PathVariable Long userId,
        Authentication authentication
    ) {
        try {
            User currentUser = userService.getUserByUsername(authentication.getName());
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            // In a real implementation, you'd get the user by ID
            // User newParticipant = userService.getUserById(userId);
            
            // For now, we'll just use the current user as placeholder
            ChatSession updatedSession = chatService.addParticipantToSession(sessionId, currentUser);
            return ResponseEntity.ok(updatedSession);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Close/deactivate chat session
     */
    @DeleteMapping("/sessions/{sessionId}")
    public ResponseEntity<Void> closeChatSession(
        @PathVariable Long sessionId,
        Authentication authentication
    ) {
        try {
            User currentUser = userService.getUserByUsername(authentication.getName());
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            // Verify user is participant before allowing to close
            Optional<ChatSession> session = chatService.getChatSessionById(sessionId);
            if (session.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            boolean isParticipant = session.get().getParticipants()
                .stream()
                .anyMatch(user -> user.getId().equals(currentUser.getId()));

            if (!isParticipant) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            chatService.deactivateChatSession(sessionId);
            return ResponseEntity.noContent().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ===========================================================
    // Message Management Endpoints
    // ===========================================================

    /**
     * Get message history for a chat session
     */
    @GetMapping("/sessions/{sessionId}/messages")
    public ResponseEntity<List<Message>> getMessages(
        @PathVariable Long sessionId,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size,
        Authentication authentication
    ) {
        try {
            User currentUser = userService.getUserByUsername(authentication.getName());
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            // Verify user is participant
            Optional<ChatSession> session = chatService.getChatSessionById(sessionId);
            if (session.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            boolean isParticipant = session.get().getParticipants()
                .stream()
                .anyMatch(user -> user.getId().equals(currentUser.getId()));

            if (!isParticipant) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            List<Message> messages = chatService.getMessagesForSession(sessionId, page, size);
            return ResponseEntity.ok(messages);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get recent messages for quick loading
     */
    @GetMapping("/sessions/{sessionId}/messages/recent")
    public ResponseEntity<List<Message>> getRecentMessages(
        @PathVariable Long sessionId,
        @RequestParam(defaultValue = "10") int limit,
        Authentication authentication
    ) {
        try {
            User currentUser = userService.getUserByUsername(authentication.getName());
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            List<Message> messages = chatService.getRecentMessagesForSession(sessionId, limit);
            return ResponseEntity.ok(messages);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Mark all messages as read in a session
     */
    @PostMapping("/sessions/{sessionId}/messages/mark-read")
    public ResponseEntity<Void> markAllAsRead(
        @PathVariable Long sessionId,
        Authentication authentication
    ) {
        try {
            User currentUser = userService.getUserByUsername(authentication.getName());
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            chatService.markAllMessagesAsReadInSession(sessionId, currentUser);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get unread message count for a session
     */
    @GetMapping("/sessions/{sessionId}/unread-count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(
        @PathVariable Long sessionId,
        Authentication authentication
    ) {
        try {
            User currentUser = userService.getUserByUsername(authentication.getName());
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            long count = chatService.getUnreadMessagesCount(sessionId, currentUser);
            return ResponseEntity.ok(Map.of("unreadCount", count));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Search messages in a session
     */
    @GetMapping("/sessions/{sessionId}/messages/search")
    public ResponseEntity<List<Message>> searchMessages(
        @PathVariable Long sessionId,
        @RequestParam String query,
        Authentication authentication
    ) {
        try {
            User currentUser = userService.getUserByUsername(authentication.getName());
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            List<Message> messages = chatService.searchMessagesInSession(sessionId, query);
            return ResponseEntity.ok(messages);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ===========================================================
    // Admin/Dashboard Endpoints
    // ===========================================================

    /**
     * Get chat statistics for admin dashboard
     */
    @GetMapping("/admin/statistics")
    public ResponseEntity<Object> getChatStatistics(Authentication authentication) {
        try {
            // In a real app, you'd check if user has admin role
            Object stats = chatService.getMessageStatistics();
            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get active sessions count
     */
    @GetMapping("/admin/active-sessions-count")
    public ResponseEntity<Map<String, Long>> getActiveSessionsCount() {
        try {
            long count = chatService.getActiveSessionsCount();
            return ResponseEntity.ok(Map.of("activeSessionsCount", count));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}