
/**
 * ===========================================================
 * File        : MessagePersistenceService.java
 * Location    : com.visiomatix.chat.chat.service
 * Author      : Viral Prajapati
 * Date        : 16-Oct-2025
 * Description :
 *   Handles persistence of chat messages.
 *   - Saves each message to DB when received from WebSocket.
 *   - Updates chat_session.lastMessageAt timestamp.
 *   - Designed for async invocation from ChatController.
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.service;

// ===========================================================
// Import Statements
// ===========================================================
import org.springframework.beans.factory.annotation.Autowired;                    // For DI
import org.springframework.scheduling.annotation.Async;                         // Enables async save
import org.springframework.stereotype.Service;                                  // Marks as service component
import org.springframework.transaction.annotation.Transactional;                // Transaction management
import java.time.LocalDateTime;                                                 // Timestamp
import java.util.List;

import com.visiomatix.chat.chat.chat.model.Message;                                // Entity class
import com.visiomatix.chat.chat.chat.model.ChatSession;                            // Entity class
import com.visiomatix.chat.chat.chat.repository.MessageRepository;                   // Message repo
import com.visiomatix.chat.chat.chat.repository.ChatSessionRepository;               // Chat session repo

// ===========================================================
// Class Declaration
// ===========================================================
@Service
public class MessagePersistenceService {

    // =======================================================
    // Field Declarations
    // =======================================================
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatSessionRepository chatSessionRepository;

    public MessagePersistenceService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional(readOnly = true)
    public List<Message> getTranscriptForSession(Long sessionId) {
        // delegate to repository - implement findByChatSessionOrderBySentAtAsc in repo
        return messageRepository.getMessagesForSessionOrdered(sessionId);
    }

    // Optionally create an archival record / write to file / export JSON
    public void archiveTranscript(Long sessionId) {
        List<Message> msgs = getTranscriptForSession(sessionId);
        // convert messages -> JSON or text and store to disk / S3 / audit table
    }
    // =======================================================
    // Method: saveMessage
    // Description:
    //   Persists message entity and updates parent session timestamp.
    // =======================================================
    @Async
    @Transactional
    public void saveMessage(Message message) {
        try {
            // 1️⃣ Save message in DB
            message.setSentAt(LocalDateTime.now());
            messageRepository.save(message);

            // 2️⃣ Update session's last activity
            ChatSession session = chatSessionRepository.findById(message.getChatSession().getId())
                    .orElse(null);
            if (session != null) {
                session.updateLastMessageTime();
                chatSessionRepository.save(session);
            }

            System.out.println("[INFO] Message persisted successfully: " + message.getContent());
        } catch (Exception e) {
            System.err.println("[ERROR] Message persistence failed: " + e.getMessage());
        }
    }
}
