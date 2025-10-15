# Chat Simulation Scripts Guide

## 📋 Overview
This guide explains how to use the interactive shell scripts to simulate real-time chat sessions between a default user and an agent user in the Visiomatix Chat application.

## 📁 Available Scripts

- **`default_user_chat.sh`** - Simulates a regular user registering, logging in, creating a chat session, and participating in chat
- **`agent_user_chat.sh`** - Simulates a support agent logging in and responding to incoming chat requests

## 🚀 Prerequisites

### 1. Running Backend
Ensure the Spring Boot chat backend is running:
```bash
cd visiomatix.chat/chat
mvn spring-boot:run
```

### 2. Dependencies
- `curl` - For API calls
- `jq` - For JSON parsing (optional but recommended)

### 3. Script Permissions
Scripts are already made executable:
```bash
chmod +x default_user_chat.sh agent_user_chat.sh
```

## 🎯 How to Use

### Step 1: Start Agent Script First
Open a terminal and run the agent script:
```bash
./agent_user_chat.sh
```

The agent will:
- Login as "agent" user (creates if doesn't exist)
- Monitor for active chat sessions
- Wait for incoming connections

### Step 2: Start Default User Script
Open another terminal and run the default user script:
```bash
./default_user_chat.sh
```

The default user will:
- Register as "defaultuser" (if not exists)
- Login and get authentication token
- Create a support chat session
- Start interactive chat

### Step 3: Chat Between Users
Both scripts will show:
- Conversation history
- Real-time message exchange
- Interactive input prompts

## 📝 Script Features

### Default User Script (`default_user_chat.sh`)

**Workflow:**
1. **Registration**: Creates defaultuser account
2. **Authentication**: Logs in and obtains JWT token
3. **Session Creation**: Creates a support chat session
4. **Interactive Chat**: Allows typing messages to send
5. **Message Reception**: Displays incoming messages from agent
6. **Session Cleanup**: Closes session on exit

**Commands:**
- Type messages to send them
- Type `quit` to end the session

### Agent Script (`agent_user_chat.sh`)

**Workflow:**
1. **Authentication**: Logs in as agent (creates account if needed)
2. **Session Monitoring**: Continuously checks for active sessions
3. **Connection Handling**: Connects to available chat sessions
4. **Conversation Display**: Shows chat history
5. **Interactive Response**: Allows agent to respond to user messages
6. **Multi-session Support**: Can handle multiple sessions

**Commands:**
- Type responses to send them
- Type `next` to move to next available session
- Type `quit` to exit completely

## 🔄 Chat Flow Example

### Terminal 1 (Agent):
```bash
$ ./agent_user_chat.sh
=== Agent User Chat Session ===
Username: agent
Waiting for incoming chat connections...

1. Logging in as agent...
✓ Agent login successful
2. Monitoring for active chat sessions...
No active sessions found. Waiting...
Found 1 active session(s)
Connecting to session: Default User Support Session (ID: 1)
--- Conversation History ---
--- End History ---
You are now connected to the chat session.
Type your responses below (type 'quit' to exit, 'next' for next session):

Support Agent: Hello! How can I help you today?
```

### Terminal 2 (Default User):
```bash
$ ./default_user_chat.sh
=== Default User Chat Session ===
Username: defaultuser
Starting chat simulation...

1. Registering user...
✓ User registered successfully
2. Logging in...
✓ Login successful, token obtained
3. Creating chat session...
✓ Chat session created with ID: 1
4. Waiting for agent connection...
Session is ready. You can now chat with the agent.
Type your messages below (type 'quit' to exit):

Default User: Hi, I need help with my account
✓ Message sent
Support Agent: Hello! How can I help you today?
Default User: I'm having trouble logging in
✓ Message sent
```

## 🛠️ Troubleshooting

### Common Issues

**"jq: command not found"**
- Install jq: `sudo apt-get install jq` (Ubuntu/Debian)
- Or remove jq dependencies and use basic parsing

**"Connection refused"**
- Ensure Spring Boot is running on port 8080
- Check `application.properties` for correct configuration

**"Login failed"**
- Verify database is accessible
- Check if users already exist with different passwords

**Scripts not responding**
- Check network connectivity
- Verify API endpoints are correct
- Look for error messages in Spring Boot logs

### Debug Mode
Add debug output by modifying scripts to show raw API responses:
```bash
# In the api_call function, remove -s flag from curl
curl -X $method "$BASE_URL$endpoint" \
     -H "Content-Type: application/json" \
     $auth_header \
     -d "$data"
```

## 🔧 Customization

### Changing User Credentials
Edit the variables at the top of each script:

**Default User:**
```bash
USERNAME="your_username"
PASSWORD="your_password"
EMAIL="your_email"
NAME="Your Name"
```

**Agent User:**
```bash
USERNAME="agent_username"
PASSWORD="agent_password"
EMAIL="agent_email"
NAME="Agent Name"
```

### Troubleshooting Authentication Issues

#### Problem: Scripts fail with 403 Forbidden
**Solution:** Ensure JWT tokens are properly obtained and included in requests.

#### Problem: Session creation fails
**Cause:** Chat service implementation might be incomplete.
**Solution:** Check if `ChatService` and `ChatController` are fully implemented.

#### Problem: Messages not appearing
**Cause:** Real-time WebSocket connection not established.
**Solution:** Scripts use REST API polling, not WebSocket. For real-time chat, implement WebSocket connections.

#### Problem: jq command not found
**Solution:** Install jq JSON processor:
```bash
# Ubuntu/Debian
sudo apt-get install jq

# Or remove jq dependencies and use basic parsing
```

#### Problem: Connection refused
**Solution:** Ensure Spring Boot is running on port 8080:
```bash
cd visiomatix.chat/chat
mvn spring-boot:run
```

### Modifying Session Types
Change session type in default_user_chat.sh:
```bash
SESSION_RESPONSE=$(api_call POST "/api/chat/sessions" "{
    \"sessionName\": \"Your Session Name\",
    \"sessionType\": \"AGENT_CLIENT\"  # or \"GROUP\" or \"SUPPORT\"
}")
```

## 📊 Monitoring

### View Active Sessions
Check active sessions from another terminal:
```bash
curl -X GET http://localhost:8080/api/chat/sessions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

### View Messages
Monitor messages in real-time:
```bash
# Replace SESSION_ID with actual session ID
curl -X GET http://localhost:8080/api/chat/sessions/SESSION_ID/messages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## 🎯 Best Practices

1. **Start Agent First**: Always start the agent script before the user script
2. **Multiple Sessions**: Agent can handle multiple user sessions simultaneously
3. **Session Cleanup**: Scripts automatically close sessions on exit
4. **Error Handling**: Scripts handle common errors gracefully
5. **Demo Mode**: Scripts continue working even if backend chat service is incomplete
6. **Real-time Simulation**: Mimics actual chat application behavior

## 🔧 Demo Mode Features

When the backend chat service is not fully implemented, the scripts automatically enter **demo mode**:

### Default User Script Demo Mode:
- Creates a mock session ID
- Simulates agent responses occasionally
- Allows full chat interface testing
- Shows "Message sent (demo mode)" confirmations

### Agent Script Demo Mode:
- Monitors for real sessions, falls back to demo if none found
- Simulates user messages occasionally
- Allows full agent interface testing
- Shows "Message sent (demo mode)" confirmations

### Benefits of Demo Mode:
- **Complete UI Testing**: Test the entire chat interface without backend
- **Development Aid**: Continue development while backend is being completed
- **User Experience Testing**: Validate chat flow and user interactions
- **API Debugging**: Identify which endpoints need implementation

## 📋 Steps to Complete Backend Implementation

### 1. Implement Chat Session Management
```java
// In ChatController.java
@PostMapping("/sessions")
public ResponseEntity<ChatSession> createSession(@RequestBody CreateSessionRequest request) {
    ChatSession session = chatService.createSession(request);
    return ResponseEntity.ok(session);
}

@GetMapping("/sessions")
public ResponseEntity<List<ChatSession>> getAllSessions() {
    List<ChatSession> sessions = chatService.getAllSessions();
    return ResponseEntity.ok(sessions);
}
```

### 2. Implement Message Handling
```java
// In ChatController.java
@PostMapping("/sessions/{sessionId}/messages")
public ResponseEntity<Message> sendMessage(@PathVariable Long sessionId, @RequestBody MessageRequest request) {
    Message message = chatService.sendMessage(sessionId, request);
    return ResponseEntity.ok(message);
}

@GetMapping("/sessions/{sessionId}/messages/recent")
public ResponseEntity<List<Message>> getRecentMessages(@PathVariable Long sessionId, @RequestParam(defaultValue = "10") int limit) {
    List<Message> messages = chatService.getRecentMessages(sessionId, limit);
    return ResponseEntity.ok(messages);
}
```

### 3. Complete ChatService Implementation
```java
// In ChatServiceImpl.java
@Override
public ChatSession createSession(CreateSessionRequest request) {
    ChatSession session = new ChatSession();
    session.setSessionName(request.getSessionName());
    session.setSessionType(request.getSessionType());
    session.setActive(true);
    session.setCreatedAt(LocalDateTime.now());
    return chatSessionRepository.save(session);
}

@Override
public List<Message> getRecentMessages(Long sessionId, int limit) {
    return messageRepository.findTopByChatSessionIdOrderBySentAtDesc(sessionId, limit);
}
```

### 4. Database Schema
Create these tables in MySQL:

```sql
-- Chat Sessions Table
CREATE TABLE chat_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_name VARCHAR(255),
    session_type ENUM('AGENT_CLIENT', 'GROUP', 'SUPPORT'),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_message_at TIMESTAMP NULL
);

-- Messages Table
CREATE TABLE messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    message_type ENUM('TEXT', 'IMAGE', 'FILE', 'SYSTEM', 'NOTIFICATION') DEFAULT 'TEXT',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP NULL,
    read_at TIMESTAMP NULL,
    edited BOOLEAN DEFAULT FALSE,
    edited_at TIMESTAMP NULL,
    sender_id BIGINT NOT NULL,
    chat_session_id BIGINT NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (chat_session_id) REFERENCES chat_sessions(id)
);

-- Chat Session Participants (for group chats)
CREATE TABLE chat_session_participants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    chat_session_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_session_id) REFERENCES chat_sessions(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_session_user (chat_session_id, user_id)
);
```

### 5. Testing
Once backend is complete:
1. Restart Spring Boot application
2. Run scripts again - they will automatically use real API instead of demo mode
3. Test real-time messaging between terminals
4. Scripts will show "✓ Message sent" instead of "✓ Message sent (demo mode)"

## 📚 Related Documentation

- [API Endpoint Guide](API_Endpoint_Guide.md) - Complete API reference
- [Test Chat Session](test-chat-session.md) - API testing guide
- [Project Guide](project-guide.md) - Overall project documentation

---

*Created: October 14, 2025*
*Scripts Version: 1.0.0*
*Compatible with: Visiomatix Chat API v1.0.0*