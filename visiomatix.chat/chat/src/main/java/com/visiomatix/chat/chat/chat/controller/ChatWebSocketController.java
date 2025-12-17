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
import org.springframework.messaging.handler.annotation.DestinationVariable; // For path variables
import org.springframework.stereotype.Controller;                           // Marks as WebSocket controller
import com.visiomatix.chat.chat.chat.dto.ChatMessagePayload;                // DTO for message payload
import com.visiomatix.chat.chat.chat.model.Message;                          // Message entity
import com.visiomatix.chat.chat.chat.service.ChatService;                   // Service for message handling
import com.visiomatix.chat.chat.user.service.UserService;                   // User service
import org.springframework.beans.factory.annotation.Autowired;              // For DI
import org.slf4j.Logger;                                                    // Logging interface
import org.slf4j.LoggerFactory;                                             // Logging factory
import java.security.Principal;                                             // For authenticated user

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
    private final UserService userService;

    // ===========================================================
    // Constructor Injection
    // ===========================================================
    @Autowired
    public ChatWebSocketController(ChatService chatService, UserService userService) {
        this.chatService = chatService;
        this.userService = userService;
    }

    // ===========================================================
    // Method: sendMessage
    // Description:
    //   Receives messages from /app/chat.sendMessage/{sessionId} and
    //   broadcasts to /topic/chat/{sessionId}.
    //   Uses authenticated user as sender.
    //   Returns the persisted Message entity.
    // ===========================================================
    @MessageMapping("/chat.sendMessage/{sessionId}")
    @SendTo("/topic/chat/{sessionId}")
    public Message sendMessage(@DestinationVariable Long sessionId, ChatMessagePayload message, Principal principal) {
        String senderUsername = principal.getName();
        logger.info("💬 Received chat message from {} in session {}", senderUsername, sessionId);

        // Get authenticated sender
        com.visiomatix.chat.chat.user.model.User sender = userService.getUserByUsername(senderUsername);

        // Persist message
        Message savedMessage = chatService.sendMessage(sessionId, sender, message.getContent(), com.visiomatix.chat.chat.chat.model.Message.MessageType.TEXT);

        // Log delivery
        logger.info("📤 Broadcasting to session: {}", savedMessage.getChatSession().getId());
        return savedMessage;
    }
}
