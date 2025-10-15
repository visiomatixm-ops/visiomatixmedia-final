/**
 * ===========================================================
 * File: ChatWebSocketController.java
 * Location: com.visiomatix.chat.chat.chat.controller
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Phase: 4.2
 * Description:
 *   Handles real-time WebSocket messages between users.
 *   - Listens for messages at /app/chat.sendMessage
 *   - Broadcasts to /topic/chat/{sessionId}
 *   - Persists messages through ChatService
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.controller;

// ===========================================================
// Import Statements
// ===========================================================
import org.springframework.messaging.handler.annotation.MessageMapping;     // Maps STOMP message routes
import org.springframework.messaging.handler.annotation.SendTo;             // Sends to broker destination
import org.springframework.stereotype.Controller;                           // Marks as WebSocket controller
import com.visiomatix.chat.chat.chat.dto.ChatMessagePayload;                // DTO for message payload
import com.visiomatix.chat.chat.chat.model.Message;                          // Message entity
import com.visiomatix.chat.chat.chat.service.ChatService;                   // Service for message handling
import org.springframework.beans.factory.annotation.Autowired;              // For DI
import org.slf4j.Logger;                                                    // Logging interface
import org.slf4j.LoggerFactory;                                             // Logging factory

// ===========================================================
// Class Declaration
// ===========================================================
@Controller
public class ChatWebSocketController {

    // ===========================================================
    // Field Declarations
    // ===========================================================
    private static final Logger logger = LoggerFactory.getLogger(ChatWebSocketController.class);
    private final ChatService chatService;

    // ===========================================================
    // Constructor Injection
    // ===========================================================
    @Autowired
    public ChatWebSocketController(ChatService chatService) {
        this.chatService = chatService;
    }

    // ===========================================================
    // Method: sendMessage
    // Description:
    //   Receives messages from /app/chat.sendMessage and
    //   broadcasts to /topic/chat/{sessionId}.
    //   Returns the persisted Message entity.
    // ===========================================================
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/chat/{sessionId}")
    public Message sendMessage(ChatMessagePayload message) {
        logger.info("💬 Received chat message from {} → {}", message.getSender(), message.getReceiver());

        // Persist message
        Message savedMessage = chatService.saveMessage(message);

        // Log delivery
        logger.info("📤 Broadcasting to session: {}", savedMessage.getChatSession().getId());
        return savedMessage;
    }
}
