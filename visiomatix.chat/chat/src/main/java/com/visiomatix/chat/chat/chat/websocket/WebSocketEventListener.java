/**
 * ===========================================================
 * File: WebSocketEventListener.java
 * Location: com.visiomatix.chat.chat.chat.websocket
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  Listens for WebSocket connect and disconnect events.
 *  - Logs connection lifecycle
 *  - Broadcasts “user joined” and “user left” system messages
 *  - Keeps consistent with ChatMessageController topics
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.websocket;

// ===========================================================
// Import Statements
// ===========================================================
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.time.LocalDateTime;

/**
 * ===========================================================
 * Class: WebSocketEventListener
 * Purpose:
 *  - Monitor user connections and disconnections.
 *  - Emit notifications for user presence updates.
 * ===========================================================
 */
@Component
public class WebSocketEventListener {

    // ===========================================================
    // Logger
    // ===========================================================
    private static final Logger log = LoggerFactory.getLogger(WebSocketEventListener.class);

    // ===========================================================
    // Dependency Injection
    // ===========================================================
    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketEventListener(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // ===========================================================
    // WebSocket Connection Listener
    // ===========================================================
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = null;
        if (headerAccessor.getSessionAttributes() != null) {
            username = (String) headerAccessor.getSessionAttributes().get("username");
        }

        log.info("🔗 WebSocket connected: {}", username != null ? username : "Anonymous");
        messagingTemplate.convertAndSend("/topic/system", "User connected at " + LocalDateTime.now());
    }

    // ===========================================================
    // WebSocket Disconnection Listener
    // ===========================================================
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = null;
        if (headerAccessor.getSessionAttributes() != null) {
            username = (String) headerAccessor.getSessionAttributes().get("username");
        }

        log.info("❌ WebSocket disconnected: {}", username != null ? username : "Anonymous");
        messagingTemplate.convertAndSend("/topic/system", "User disconnected at " + LocalDateTime.now());
    }
}
