/**
 * ===========================================================
 * File: Message.java
 * Location: com.visiomatix.chat.chat.chat.model
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  Entity representing individual chat messages.
 *  Stores message content, sender information, timestamps,
 *  and delivery status for real-time chat functionality.
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.model;

// ===========================================================
// Import Statements
// ===========================================================
import com.visiomatix.chat.chat.user.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message {

    // ===========================================================
    // Field Declarations
    // ===========================================================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    @NotBlank(message = "Message content cannot be blank")
    @Size(max = 5000, message = "Message content cannot exceed 5000 characters")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "message_type", nullable = false)
    private MessageType messageType = MessageType.TEXT;

    @Column(name = "sent_at", nullable = false)
    private LocalDateTime sentAt;

    @Column(name = "delivered_at")
    private LocalDateTime deliveredAt;

    @Column(name = "read_at")
    private LocalDateTime readAt;

    @Column(name = "is_edited")
    private boolean edited = false;

    @Column(name = "edited_at")
    private LocalDateTime editedAt;

    // ===========================================================
    // Relationship Mappings
    // ===========================================================
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_session_id", nullable = false)
    @JsonIgnore // Prevent circular reference during JSON serialization
    private ChatSession chatSession;

    // ===========================================================
    // Enum Definitions
    // ===========================================================
    public enum MessageType {
        TEXT,           // Regular text message
        IMAGE,          // Image attachment
        FILE,           // File attachment
        SYSTEM,         // System generated message (user joined, left, etc.)
        NOTIFICATION    // System notification message
    }

    // ===========================================================
    // Constructors
    // ===========================================================
    public Message() {
        this.sentAt = LocalDateTime.now();
    }

    public Message(String content, User sender, ChatSession chatSession) {
        this();
        this.content = content;
        this.sender = sender;
        this.chatSession = chatSession;
    }

    public Message(String content, MessageType messageType, User sender, ChatSession chatSession) {
        this(content, sender, chatSession);
        this.messageType = messageType;
    }

    // ===========================================================
    // Lifecycle Methods
    // ===========================================================
    @PrePersist
    protected void onCreate() {
        if (this.sentAt == null) {
            this.sentAt = LocalDateTime.now();
        }
        // Update chat session's last message timestamp
        if (this.chatSession != null) {
            this.chatSession.updateLastMessageTime();
        }
    }

    // ===========================================================
    // Business Methods
    // ===========================================================
    public void markAsDelivered() {
        this.deliveredAt = LocalDateTime.now();
    }

    public void markAsRead() {
        this.readAt = LocalDateTime.now();
    }

    public void editContent(String newContent) {
        this.content = newContent;
        this.edited = true;
        this.editedAt = LocalDateTime.now();
    }

    public boolean isDelivered() {
        return this.deliveredAt != null;
    }

    public boolean isRead() {
        return this.readAt != null;
    }

    // ===========================================================
    // Getters and Setters
    // ===========================================================
    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public MessageType getMessageType() {
        return messageType;
    }

    public void setMessageType(MessageType messageType) {
        this.messageType = messageType;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    public LocalDateTime getDeliveredAt() {
        return deliveredAt;
    }

    public void setDeliveredAt(LocalDateTime deliveredAt) {
        this.deliveredAt = deliveredAt;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }

    public boolean isEdited() {
        return edited;
    }

    public void setEdited(boolean edited) {
        this.edited = edited;
    }

    public LocalDateTime getEditedAt() {
        return editedAt;
    }

    public void setEditedAt(LocalDateTime editedAt) {
        this.editedAt = editedAt;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public ChatSession getChatSession() {
        return chatSession;
    }

    public void setChatSession(ChatSession chatSession) {
        this.chatSession = chatSession;
    }
}