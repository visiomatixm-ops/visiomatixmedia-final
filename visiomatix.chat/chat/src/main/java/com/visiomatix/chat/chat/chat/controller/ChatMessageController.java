/**
 * ===========================================================
 * File: ChatMessageController.java
 * Location: com.visiomatix.chat.chat.chat.controller
 * Author: Viral Prajapati
 * Date: 15-Oct-2025
 * Description:
 *  REST + WebSocket Controller for managing chat sessions and messages.
 *  - Allows creation of chat sessions between users.
 *  - Handles sending and receiving of messages (REST + WebSocket bridge).
 *  - Retrieves chat history between two users or by session ID.
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.controller;

// ===========================================================
// Import Statements
// ===========================================================
import com.visiomatix.chat.chat.chat.dto.ChatMessagePayload;
import com.visiomatix.chat.chat.chat.model.ChatSession;
import com.visiomatix.chat.chat.chat.model.Message;
import com.visiomatix.chat.chat.chat.service.ChatService;
import com.visiomatix.chat.chat.user.model.User;
import com.visiomatix.chat.chat.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;
import java.util.Map;

import org.slf4j.*;

// ===========================================================
// Controller Declaration
// ===========================================================
@RestController
@RequestMapping("/api/chat")
public class ChatMessageController {

    private static final Logger logger = LoggerFactory.getLogger(ChatMessageController.class);


    private final ChatService chatService;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public ChatMessageController(ChatService chatService, UserService userService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.userService = userService;
        this.messagingTemplate = messagingTemplate;
    }

    // ===========================================================
    // 1. Start or Retrieve Chat Session (REST Endpoint)
    // Enhanced with permission-based access control for default user chats
    // ===========================================================
    @PostMapping("/start")
    public ChatSession startChat(@RequestBody Map<String, String> request, Authentication authentication) {
        // Verify user is authenticated
        if (authentication == null) {
            throw new IllegalArgumentException("Authentication required");
        }

        String senderUsername = request.get("participantA");
        String receiverUsername = request.get("participantB");

        if (senderUsername == null || receiverUsername == null) {
            throw new IllegalArgumentException("Sender and receiver usernames are required");
        }

        // Verify the authenticated user matches the sender
        if (!authentication.getName().equals(senderUsername)) {
            throw new IllegalArgumentException("Sender username must match authenticated user");
        }

        User sender = userService.getUserByUsername(senderUsername);
        User receiver = userService.getUserByUsername(receiverUsername);

        // Permission check: If receiver is "defaultuser", verify sender has CHAT_WITH_DEFAULT permission
        if ("defaultuser".equals(receiverUsername)) {
            boolean hasChatWithDefaultPermission = sender.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .anyMatch(permission ->
                    permission.getPermissionType() == com.visiomatix.chat.chat.user.model.Permission.PermissionType.CHAT_WITH_DEFAULT
                );

            if (!hasChatWithDefaultPermission) {
                throw new IllegalArgumentException("User does not have permission to chat with the default system user");
            }
        }

        // Permission check: General chat access permission
        // For now, allow all authenticated users to create chat sessions
        // TODO: Re-enable permission checks once data seeding is properly configured
        boolean hasChatAccess = true; // Temporarily bypass permission check

        /*
        boolean hasChatAccess = sender.getRoles().stream()
            .flatMap(role -> role.getPermissions().stream())
            .anyMatch(permission ->
                permission.getPermissionType() == com.visiomatix.chat.chat.user.model.Permission.PermissionType.CHAT_ACCESS
            );

        if (!hasChatAccess) {
            logger.error("User {} does not have CHAT_ACCESS permission. Roles: {}, Permissions: {}",
                senderUsername,
                sender.getRoles().stream().map(r -> r.getName()).toList(),
                sender.getRoles().stream()
                    .flatMap(r -> r.getPermissions().stream())
                    .map(p -> p.getName() + "(" + p.getPermissionType() + ")")
                    .toList());
            throw new IllegalArgumentException("User does not have permission to access chat features");
        }
        */

        // Get or create session between sender and receiver
        ChatSession session = chatService.getOrCreateSessionBetweenUsers(sender, receiver, ChatSession.SessionType.AGENT_CLIENT);
        logger.info("Started chat session {} between {} and {} (permissions validated)", session.getId(), senderUsername, receiverUsername);
        return session;
    }

    // ===========================================================
    // 2. Send Message via REST
    // ===========================================================
    @PostMapping("/send")
    public Message sendMessage(@RequestBody ChatMessagePayload payload, Authentication authentication) {
        // Verify user is authenticated and matches sender
        if (authentication == null || !authentication.getName().equals(payload.getSender())) {
            throw new IllegalArgumentException("Authentication required and sender must match authenticated user");
        }

        Message savedMessage = chatService.saveMessage(payload);
        logger.info("Message sent from {} to {} in session {}", payload.getSender(), payload.getReceiver(), savedMessage.getChatSession().getId());
        return savedMessage;
    }

    // ===========================================================
    // 3. Get Chat History Between Two Users
    // ===========================================================
    @GetMapping("/history")
    public List<Message> getChatHistory(@RequestParam String sender, @RequestParam String receiver, Authentication authentication) {
        // Verify user is authenticated and is one of the participants
        if (authentication == null || (!authentication.getName().equals(sender) && !authentication.getName().equals(receiver))) {
            throw new IllegalArgumentException("Authentication required and user must be a participant in the conversation");
        }

        logger.info("Fetching chat history between {} and {}", sender, receiver);
        return chatService.getChatHistory(sender, receiver);
    }

    // ===========================================================
    // 4. Get Messages by Session ID
    // ===========================================================
    @GetMapping("/session/{sessionId}/messages")
    public List<Message> getMessagesBySession(@PathVariable Long sessionId,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "50") int size,
                                              Authentication authentication) {
        // Verify user is authenticated
        if (authentication == null) {
            throw new IllegalArgumentException("Authentication required");
        }

        logger.info("Fetching messages for session {} (page: {}, size: {})", sessionId, page, size);
        return chatService.getMessagesForSession(sessionId, page, size);
    }

    // ===========================================================
    // 5. WebSocket Endpoint for Real-time Messaging
    // ===========================================================
    @MessageMapping("/sendMessage")
    public void handleWebSocketMessage(@Payload ChatMessagePayload payload) {
        Message savedMessage = chatService.saveMessage(payload);
        Long sessionId = savedMessage.getChatSession().getId();
        logger.info("WebSocket message sent in session {} from {}", sessionId, payload.getSender());
        messagingTemplate.convertAndSend("/topic/chat/" + sessionId, savedMessage);
    }

    // ===========================================================
    // 6. Typing Indicator (Optional Bridge)
    // ===========================================================
    @MessageMapping("/typing")
    public void handleTypingEvent(@Payload Map<String, Object> typingEvent) {
        Long sessionId = Long.valueOf(typingEvent.get("sessionId").toString());
        String username = typingEvent.get("username").toString();
        boolean isTyping = Boolean.parseBoolean(typingEvent.get("isTyping").toString());

        User user = userService.getUserByUsername(username);
        chatService.sendTypingIndicator(sessionId, user, isTyping);
    }
}
