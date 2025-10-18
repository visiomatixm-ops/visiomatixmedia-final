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
    // ===========================================================
    @PostMapping("/start")
    public ChatSession startChat(@RequestBody Map<String, String> request) {
        String senderUsername = request.get("participantA");
        String receiverUsername = request.get("participantB");

        if (senderUsername == null || receiverUsername == null) {
            throw new IllegalArgumentException("Sender and receiver usernames are required");
        }

        User sender = userService.getUserByUsername(senderUsername);
        User receiver = userService.getUserByUsername(receiverUsername);

        // Get or create session between sender and receiver
        return chatService.getOrCreateSessionBetweenUsers(sender, receiver, ChatSession.SessionType.AGENT_CLIENT);
    }

    // ===========================================================
    // 2. Send Message via REST
    // ===========================================================
    @PostMapping("/send")
    public Message sendMessage(@RequestBody ChatMessagePayload payload) {
        return chatService.saveMessage(payload);
    }

    // ===========================================================
    // 3. Get Chat History Between Two Users
    // ===========================================================
    @GetMapping("/history")
    public List<Message> getChatHistory(@RequestParam String sender, @RequestParam String receiver) {
        return chatService.getChatHistory(sender, receiver);
    }

    // ===========================================================
    // 4. Get Messages by Session ID
    // ===========================================================
    @GetMapping("/session/{sessionId}/messages")
    public List<Message> getMessagesBySession(@PathVariable Long sessionId,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "50") int size) {
        return chatService.getMessagesForSession(sessionId, page, size);
    }

    // ===========================================================
    // 5. WebSocket Endpoint for Real-time Messaging
    // ===========================================================
    @MessageMapping("/sendMessage")
    public void handleWebSocketMessage(@Payload ChatMessagePayload payload) {
        Message savedMessage = chatService.saveMessage(payload);
        Long sessionId = savedMessage.getChatSession().getId();
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
