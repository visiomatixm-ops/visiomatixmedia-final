/**
 * ===========================================================
 * File: ChatMessagePayload.java
 * Location: com.visiomatix.chat.chat.chat.dto
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Phase: 4.2
 * Description:
 *   Data Transfer Object (DTO) representing an incoming or
 *   outgoing chat message payload for WebSocket communication.
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.dto;

// ===========================================================
// Class Declaration
// ===========================================================
public class ChatMessagePayload {
    // ===========================================================
    // Field Declarations
    // ===========================================================
    private Long sessionId;       // Chat session ID
    private String sender;        // Username of the sender
    private String receiver;      // Username of the receiver
    private String content;       // Actual message text
    private String timestamp;     // ISO timestamp for message creation
    private String messageType;   // Type of the message (e.g., TEXT, IMAGE)

    // ===========================================================
    // Constructors
    // ===========================================================
    public ChatMessagePayload() {}

    // ===========================================================
    // Getters and Setters
    // ===========================================================
    public Long getSessionId() { return sessionId; }
    public void setSessionId(Long sessionId) { this.sessionId = sessionId; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getReceiver() { return receiver; }
    public void setReceiver(String receiver) { this.receiver = receiver; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getMessageType() { return messageType; }
    public void setMessageType(String messageType) { this.messageType = messageType; }
}
