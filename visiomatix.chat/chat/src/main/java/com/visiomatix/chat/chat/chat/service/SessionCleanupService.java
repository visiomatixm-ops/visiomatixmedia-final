/**
 * ===========================================================
 * File        : SessionCleanupService.java
 * Location    : com.visiomatix.chat.chat.service
 * Author      : Viral Prajapati
 * Date        : 16-Oct-2025
 * Description :
 *   Background cleanup task for stale chat sessions.
 *   - Runs every 5 minutes.
 *   - Marks sessions inactive if no messages within timeout.
 *   - Persists closure timestamp for audit trail.
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.service;

// ===========================================================
// Import Statements
// ===========================================================
import org.springframework.beans.factory.annotation.Autowired;                 // For DI
import org.springframework.scheduling.annotation.Scheduled;                   // Scheduler
import org.springframework.stereotype.Service;                                // Service component
import org.springframework.transaction.annotation.Transactional;              // Transaction mgmt
import java.time.LocalDateTime;                                               // Timestamp
import java.time.Duration;                                                    // Difference calc
import java.util.List;                                                        // List collection

import com.visiomatix.chat.chat.chat.model.ChatSession;                           // Entity
import com.visiomatix.chat.chat.chat.repository.ChatSessionRepository;              // Repo

// ===========================================================
// Class Declaration
// ===========================================================
@Service
public class SessionCleanupService {

    private final ChatService chatService;

    public SessionCleanupService(ChatSessionRepository chatSessionRepository, ChatService chatService) {
        this.chatSessionRepository = chatSessionRepository;
        this.chatService = chatService;
    }
    
    // =======================================================
    // Field Declaration
    // =======================================================
    @Autowired
    private ChatSessionRepository chatSessionRepository;

    // =======================================================
    // Method: cleanInactiveSessions
    // Description:
    //   Checks sessions and closes those idle >15 minutes.
    //   Runs every 5 minutes via Spring Scheduler.
    // =======================================================
    @Scheduled(fixedRate = 300000) // 5 min
    @Transactional
    public void cleanInactiveSessions() {
        LocalDateTime now = LocalDateTime.now();
        List<ChatSession> sessions = chatSessionRepository.findAll();

        for (ChatSession s : sessions) {
            if (s.isActive()) {
                LocalDateTime lastMsg = s.getLastMessageAt();
                if (lastMsg != null) {
                    Duration idle = Duration.between(lastMsg, now);
                    if (idle.toMinutes() >= 15) {
                        s.setActive(false);
                        chatSessionRepository.save(s);
                        System.out.println("[CLEANUP] Closed idle session ID " + s.getId());
                    }
                }
            }

            try {
                // mark inactive and notify
                chatService.deactivateChatSession(s.getId());
            } catch (Exception ex) {
                // Log and continue — don't let one failure stop cleanup
                org.slf4j.LoggerFactory.getLogger(SessionCleanupService.class)
                        .error("Failed to deactivate expired session id={}", s.getId(), ex);
            }
        }
    }
}
