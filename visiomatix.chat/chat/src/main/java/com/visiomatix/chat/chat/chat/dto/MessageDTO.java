
/**
 * ===========================================================
 * File        : MessageDTO.java
 * Location    : com.visiomatix.chat.chat.dto
 * Author      : Viral Prajapati
 * Date        : 16-Oct-2025
 * Description :
 *   Data Transfer Object for chat messages exchanged
 *   between frontend and backend over WebSocket + REST.
 *   - Shields entity internals.
 *   - Includes session reference and sender/receiver info.
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.dto;

// ===========================================================
// Import Statements
// ===========================================================
import lombok.AllArgsConstructor;       // Generates full constructor
import lombok.Data;                     // Generates getters/setters/toString
import lombok.NoArgsConstructor;        // Generates empty constructor
import java.time.LocalDateTime;         // For timestamp fields

// ===========================================================
// Class Declaration
// ===========================================================
@Data
@NoArgsConstructor
public class MessageDTO {

    // ===========================================================
    // Getters and Setters (Lombok will generate these)
    // ===========================================================

    private Long id;                    // Message ID
    private String sender;              // Sender username
    private String receiver;            // Receiver username
    private String content;             // Message content
    private String messageType;         // TEXT / IMAGE / SYSTEM
    private Long sessionId;             // Chat session reference
    private LocalDateTime sentAt;       // Message timestamp

    // All-args constructor
    public MessageDTO(Long id, String sender, String receiver, String content, String messageType, Long sessionId, LocalDateTime sentAt) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.messageType = messageType;
        this.sessionId = sessionId;
        this.sentAt = sentAt;
    }
}
