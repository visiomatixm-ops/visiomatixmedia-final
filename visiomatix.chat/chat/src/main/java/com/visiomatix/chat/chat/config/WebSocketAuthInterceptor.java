/**
 * ===========================================================
 * File: WebSocketAuthInterceptor.java
 * Location: com.visiomatix.chat.chat.config
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  JWT authentication interceptor for WebSocket connections.
 *  Validates JWT tokens in WebSocket connect headers and
 *  sets authentication context for secure chat sessions.
 * ===========================================================
 */

package com.visiomatix.chat.chat.config;

// ===========================================================
// Import Statements
// ===========================================================
import com.visiomatix.chat.chat.user.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class WebSocketAuthInterceptor implements ChannelInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    // ===========================================================
    // Pre-send Interceptor Method
    // ===========================================================
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        
        // Only process CONNECT commands for authentication
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            // Extract JWT token from Authorization header
            List<String> authHeaders = accessor.getNativeHeader("Authorization");
            
            if (authHeaders != null && !authHeaders.isEmpty()) {
                String authHeader = authHeaders.get(0);
                
                // Check if header starts with "Bearer "
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    String token = authHeader.substring(7);
                    
                    try {
                        // Extract username from JWT token
                        String username = jwtUtil.extractUsername(token);
                        
                        // Validate token
                        if (username != null && jwtUtil.validateToken(token, username)) {
                            // Load user details
                            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                            
                            // Create authentication object
                            UsernamePasswordAuthenticationToken authToken = 
                                new UsernamePasswordAuthenticationToken(
                                    userDetails, 
                                    null, 
                                    userDetails.getAuthorities()
                                );
                            
                            // Set authentication in context
                            SecurityContextHolder.getContext().setAuthentication(authToken);
                            
                            // Store user in WebSocket session
                            accessor.setUser(authToken);
                            
                            System.out.println("WebSocket authenticated for user: " + username);
                        } else {
                            System.err.println("Invalid JWT token for WebSocket connection");
                            throw new IllegalArgumentException("Invalid JWT token");
                        }
                    } catch (Exception e) {
                        System.err.println("WebSocket authentication failed: " + e.getMessage());
                        throw new IllegalArgumentException("Authentication failed", e);
                    }
                } else {
                    System.err.println("Missing or invalid Authorization header format");
                    throw new IllegalArgumentException("Missing or invalid Authorization header");
                }
            } else {
                System.err.println("No Authorization header found in WebSocket connection");
                throw new IllegalArgumentException("Authorization header required");
            }
        }
        
        return message;
    }
}