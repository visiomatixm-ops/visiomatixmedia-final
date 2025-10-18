/**
 * ===========================================================
 * File: ChatSession.java
 * Location: com.visiomatix.chat.chat.chat.model
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  Entity representing a chat session between users.
 *  Supports one-on-one and group chat scenarios.
 *  Tracks participants, session metadata, and activity status.
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
// ===========================================================
// Import Statements
// ===========================================================
import com.visiomatix.chat.chat.user.model.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "chat_sessions")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class ChatSession {

    // ===========================================================
    // Field Declarations
    // ===========================================================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "session_name", length = 100)
    private String sessionName;

    @Enumerated(EnumType.STRING)
    @Column(name = "session_type", nullable = false)
    private SessionType sessionType = SessionType.AGENT_CLIENT;

    @Column(name = "is_active")
    private boolean active = true;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "last_message_at")
    private LocalDateTime lastMessageAt;

    @Column(name = "session_expiry")
    private LocalDateTime sessionExpiry;


    // constructors, addParticipant, removeParticipant, etc. kept as before


    // ===========================================================
    // Relationship Mappings
    // ===========================================================
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "chat_session_participants",
        joinColumns = @JoinColumn(name = "session_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants = new HashSet<>();

    @OneToMany(mappedBy = "chatSession", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Message> messages = new HashSet<>();



  
    // ===========================================================
    // Enum Definitions
    // ===========================================================
    public enum SessionType {
        AGENT_CLIENT,   // Direct chat between agent and client
        GROUP,          // Group chat with multiple participants
        SUPPORT         // Support/help desk session
    }

    // ===========================================================
    // Constructors
    // ===========================================================
    public ChatSession() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public ChatSession(String sessionName, SessionType sessionType) {
        this();
        this.sessionName = sessionName;
        this.sessionType = sessionType;
    }

    // ===========================================================
    // Lifecycle Methods
    // ===========================================================
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // ===========================================================
    // Business Methods
    // ===========================================================
    public void addParticipant(User user) {
        this.participants.add(user);
    }

    public void removeParticipant(User user) {
        this.participants.remove(user);
    }

    public void updateLastMessageTime() {
        this.lastMessageAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    //===============================================
    //Session Expiry Handling
    //===============================================



    public boolean isExpired() {
        return sessionExpiry != null && LocalDateTime.now().isAfter(sessionExpiry);
    }
public void extendSessionMillis(long millis) {
        if (this.sessionExpiry == null) {
            this.sessionExpiry = LocalDateTime.now().plusNanos(millis * 1_000_000);
        } else {
            this.sessionExpiry = this.sessionExpiry.plusNanos(millis * 1_000_000);
        }
        this.updatedAt = LocalDateTime.now();
    }

    public void setSessionExpiryFromNowMillis(long millis) {
        this.sessionExpiry = LocalDateTime.now().plusNanos(millis * 1_000_000);
        this.updatedAt = LocalDateTime.now();
    }

    // convenience
    public void touch() {
        this.updatedAt = LocalDateTime.now();
    }

    // ===========================================================
    // Getters and Setters
    // ===========================================================
    public Long getId() {
        return id;
    }

    public String getSessionName() {
        return sessionName;
    }

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }

    public SessionType getSessionType() {
        return sessionType;
    }

    public void setSessionType(SessionType sessionType) {
        this.sessionType = sessionType;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getLastMessageAt() {
        return lastMessageAt;
    }

    public Set<User> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<User> participants) {
        this.participants = participants;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    public void setLastMessageAt(LocalDateTime now) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setLastMessageAt'");
    }
}