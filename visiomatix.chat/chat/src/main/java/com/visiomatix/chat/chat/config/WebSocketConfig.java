/**
 * ===========================================================
 * File: WebSocketConfig.java
 * Location: com.visiomatix.chat.chat.config
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Phase: 4.2
 * Description:
 *   Configures WebSocket endpoints and message broker for 
 *   real-time chat communication between authenticated users.
 *   - Defines STOMP endpoint: /ws-chat
 *   - Enables simple in-memory message broker (/topic)
 *   - Registers custom WebSocketAuthInterceptor for JWT validation
 * ===========================================================
 */

package com.visiomatix.chat.chat.config;

// ===========================================================
// Import Statements
// ===========================================================
import org.springframework.context.annotation.Configuration;                 // Marks class as Spring configuration
import org.springframework.messaging.simp.config.MessageBrokerRegistry;    // Broker configuration
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker; // Enables WebSocket message broker
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;         // Registers STOMP endpoints
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer; // Allows endpoint + broker config
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;   // To manage session attributes
import org.springframework.messaging.simp.config.ChannelRegistration;                   // For channel configuration
import org.springframework.beans.factory.annotation.Autowired;                         // For dependency injection

// ===========================================================
// Class Declaration
// ===========================================================
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // ===========================================================
    // Field Declarations
    // ===========================================================
    private final WebSocketAuthInterceptor authInterceptor; 
    // Custom interceptor to validate JWT during WebSocket handshake

    // ===========================================================
    // Constructor Injection
    // ===========================================================
    @Autowired
    public WebSocketConfig(WebSocketAuthInterceptor authInterceptor) {
        this.authInterceptor = authInterceptor;
    }

    // ===========================================================
    // Method: registerStompEndpoints
    // Description:
    //   Registers WebSocket endpoint (/ws-chat) used by clients
    //   to connect. Enables CORS and SockJS fallback.
    // ===========================================================
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
            .addEndpoint("/ws-chat")                    // Main WebSocket connection endpoint
            .addInterceptors(new HttpSessionHandshakeInterceptor())
            .setAllowedOriginPatterns("*")              // Allow all origins for dev
            .withSockJS();                              // Enables SockJS fallback for browsers without WS support
    }

    // ===========================================================
    // Method: configureMessageBroker
    // Description:
    //   Configures message broker channels:
    //   - /app → incoming application messages
    //   - /topic → broadcast destination for subscribers
    // ===========================================================
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");  // Enables simple in-memory broker
        registry.setApplicationDestinationPrefixes("/app"); // Prefix for messages sent from client
    }

    // ===========================================================
    // Method: configureClientInboundChannel
    // Description:
    //   Registers the WebSocketAuthInterceptor for incoming messages
    //   to handle JWT authentication during WebSocket connections.
    // ===========================================================
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(authInterceptor);
    }
}
