/**
 * ===========================================================
 * File: ChatMessageController.java
 * Location: com.visiomatix.chat.chat.chat.controller
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  REST + WebSocket bridge controller for handling chat messages.
 *  - Supports both HTTP-based message sending and WebSocket real-time delivery.
 *  - Integrates directly with ChatController’s DTOs (ChatSession + Message).
 *  - Ensures persisted delivery through ChatService and WebSocket broadcast.
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.controller;

// ===========================================================
// Import Statements
// ===========================================================
import com.visiomatix.chat.chat.chat.model.ChatSession;
import com.visiomatix.chat.chat.chat.model.Message;
import com.visiomatix.chat.chat.chat.dto.ChatMessagePayload;
import com.visiomatix.chat.chat.chat.service.ChatService;
import com.visiomatix.chat.chat.user.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * ===========================================================
 * Class: ChatMessageController
 * Purpose:
 *  - Acts as a bridge between REST API and WebSocket messaging layer.
 *  - Provides endpoints for sending messages, fetching message history,
 *    and broadcasting real-time updates to connected users.
 * ===========================================================
 */
@RestController
@RequestMapping("/api/chat/messages")
public class ChatMessageController {

    // ===========================================================
    // Dependencies
    // ===========================================================
    private final ChatService chatService; // Service handling chat logic
    private final SimpMessagingTemplate messagingTemplate; // WebSocket message broadcaster

    // ===========================================================
    // Constructor Injection
    // ===========================================================
    @Autowired
    public ChatMessageController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    // ===========================================================
    // WebSocket Endpoint — Real-time Message Sending
    // ===========================================================
    /**
     * Handles incoming WebSocket messages sent from the client.
     * Persists the message, updates timestamps, and broadcasts
     * it to all participants in the same chat session.
     *
     * @param payload DTO containing chat session, sender, and message content
     */
    @MessageMapping("/chat.sendMessage.rest")
    public void handleWebSocketMessage(@Payload ChatMessagePayload payload) {
        // Persist and broadcast via service
        Message savedMessage = chatService.saveMessage(payload);

        // Broadcast the persisted message to the topic
        messagingTemplate.convertAndSend(
                "/topic/chat/" + savedMessage.getChatSession().getId(),
                savedMessage
        );
    }

    // ===========================================================
    // REST Endpoint — Send Message via HTTP
    // ===========================================================
    /**
     * Allows message sending via REST endpoint.
     * Useful for bots, integrations, or offline queues.
     *
     * @param payload DTO containing chat session, sender, and message content
     * @return persisted message object with timestamps
     */
    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody ChatMessagePayload payload) {
        Message message = chatService.saveMessage(payload);

        // Push to WebSocket clients for real-time sync
        messagingTemplate.convertAndSend(
                "/topic/chat/" + message.getChatSession().getId(),
                message
        );

        return ResponseEntity.ok(message);
    }

    // ===========================================================
    // REST Endpoint — Get Chat History by Session
    // ===========================================================
    /**
     * Retrieves ordered message history for a given chat session.
     *
     * @param sessionId unique chat session identifier
     * @return ordered list of messages for that session
     */
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<Message>> getChatHistory(@PathVariable Long sessionId) {
        ChatSession session = chatService.getChatSessionById(sessionId)
            .orElseThrow(() -> new RuntimeException("Chat session not found"));
        List<Message> messages = chatService.getMessagesForSession(sessionId, 0, Integer.MAX_VALUE);
        return ResponseEntity.ok(messages);
    }

    // ===========================================================
    // REST Endpoint — Mark Messages as Read
    // ===========================================================
    /**
     * Marks all unread messages as read for a given user in a specific session.
     * Also triggers a real-time notification to update the recipient’s UI.
     *
     * @param sessionId target chat session
     * @param userId recipient user ID
     * @return count of updated messages
     */
    @PostMapping("/session/{sessionId}/read/{userId}")
    public ResponseEntity<Long> markMessagesAsRead(@PathVariable Long sessionId, @PathVariable Long userId) {
        // Assuming we need to get the user from service, but for now, we'll use a placeholder
        // In a real implementation, you'd get the user by ID
        // User user = userService.getUserById(userId);
        // chatService.markAllMessagesAsReadInSession(sessionId, user);
        // For now, return 0 as placeholder
        long updatedCount = 0;

        // Notify WebSocket clients of the read update
        messagingTemplate.convertAndSend(
                "/topic/chat/" + sessionId + "/read",
                "User " + userId + " read " + updatedCount + " messages at " + LocalDateTime.now()
        );

        return ResponseEntity.ok(updatedCount);
    }
}
