# Visiomatix Chat API Session Guide

## 📋 Overview
This guide provides comprehensive documentation for the chat session API endpoints in the Visiomatix Chat application. It covers REST API endpoints for session management, message handling, and WebSocket endpoints for real-time communication.

## 🔧 Configuration
- **Base URL**: `http://localhost:8080`
- **Authentication**: JWT Bearer Token (required for all endpoints)
- **WebSocket Endpoint**: `ws://localhost:8080/ws`
- **Content-Type**: `application/json`
- **Protocol**: STOMP over WebSocket

## 🔑 Authentication
All chat API endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

For WebSocket connections, include the Authorization header in the STOMP CONNECT frame.

---

## 💬 Chat Session Management APIs

### 1. Get User Sessions
**Endpoint**: `GET /api/chat/sessions`  
**Access**: Authenticated Users  
**Description**: Retrieve all active chat sessions for the authenticated user

**Curl Command**:
```bash
curl -X GET http://localhost:8080/api/chat/sessions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
[
  {
    "id": 1,
    "sessionName": "Chat with User 123",
    "sessionType": "AGENT_CLIENT",
    "active": true,
    "createdAt": "2025-10-14T10:30:00",
    "updatedAt": "2025-10-14T10:35:00",
    "lastMessageAt": "2025-10-14T10:35:00",
    "participants": [
      {
        "id": 1,
        "username": "user1",
        "name": "User One"
      }
    ]
  }
]
```

### 2. Create Chat Session
**Endpoint**: `POST /api/chat/sessions`  
**Access**: Authenticated Users  
**Description**: Create a new chat session

**Request Body**:
```json
{
  "sessionName": "New Chat Session",
  "sessionType": "AGENT_CLIENT"
}
```

**Curl Command**:
```bash
curl -X POST http://localhost:8080/api/chat/sessions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionName": "New Chat Session",
    "sessionType": "AGENT_CLIENT"
  }'
```

### 3. Get Chat Session Details
**Endpoint**: `GET /api/chat/sessions/{sessionId}`  
**Access**: Session Participants Only  
**Description**: Retrieve details of a specific chat session

**Curl Command**:
```bash
curl -X GET http://localhost:8080/api/chat/sessions/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 4. Add Participant to Session
**Endpoint**: `POST /api/chat/sessions/{sessionId}/participants/{userId}`  
**Access**: Session Participants  
**Description**: Add a user to an existing chat session

**Curl Command**:
```bash
curl -X POST http://localhost:8080/api/chat/sessions/1/participants/2 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 5. Close Chat Session
**Endpoint**: `DELETE /api/chat/sessions/{sessionId}`  
**Access**: Session Participants  
**Description**: Deactivate/close a chat session

**Curl Command**:
```bash
curl -X DELETE http://localhost:8080/api/chat/sessions/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

---

## 📨 Message Management APIs

### 6. Get Messages for Session
**Endpoint**: `GET /api/chat/sessions/{sessionId}/messages`  
**Access**: Session Participants  
**Description**: Retrieve paginated message history for a chat session

**Query Parameters**:
- `page` (default: 0): Page number
- `size` (default: 20): Number of messages per page

**Curl Command**:
```bash
curl -X GET "http://localhost:8080/api/chat/sessions/1/messages?page=0&size=20" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
[
  {
    "id": 1,
    "content": "Hello, how can I help you?",
    "messageType": "TEXT",
    "sentAt": "2025-10-14T10:30:00",
    "deliveredAt": "2025-10-14T10:30:01",
    "readAt": "2025-10-14T10:30:05",
    "edited": false,
    "sender": {
      "id": 1,
      "username": "agent1",
      "name": "Agent One"
    }
  }
]
```

### 7. Get Recent Messages
**Endpoint**: `GET /api/chat/sessions/{sessionId}/messages/recent`  
**Access**: Session Participants  
**Description**: Get the most recent messages for quick loading

**Query Parameters**:
- `limit` (default: 10): Maximum number of recent messages

**Curl Command**:
```bash
curl -X GET "http://localhost:8080/api/chat/sessions/1/messages/recent?limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 8. Mark Messages as Read
**Endpoint**: `POST /api/chat/sessions/{sessionId}/messages/mark-read`  
**Access**: Session Participants  
**Description**: Mark all messages in a session as read for the current user

**Curl Command**:
```bash
curl -X POST http://localhost:8080/api/chat/sessions/1/messages/mark-read \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 9. Get Unread Count
**Endpoint**: `GET /api/chat/sessions/{sessionId}/unread-count`  
**Access**: Session Participants  
**Description**: Get the count of unread messages in a session

**Curl Command**:
```bash
curl -X GET http://localhost:8080/api/chat/sessions/1/unread-count \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
{
  "unreadCount": 5
}
```

### 10. Search Messages
**Endpoint**: `GET /api/chat/sessions/{sessionId}/messages/search`  
**Access**: Session Participants  
**Description**: Search messages in a chat session

**Query Parameters**:
- `query`: Search term

**Curl Command**:
```bash
curl -X GET "http://localhost:8080/api/chat/sessions/1/messages/search?query=help" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

---

## 🔴 Real-time Communication (WebSocket)

### WebSocket Connection Setup
Connect to the WebSocket endpoint using STOMP protocol:

```javascript
const socket = new SockJS('http://localhost:8080/ws');
const stompClient = Stomp.over(socket);

// Include JWT token in connect headers
const headers = {
  'Authorization': 'Bearer YOUR_JWT_TOKEN'
};

stompClient.connect(headers, function(frame) {
  console.log('Connected: ' + frame);
}, function(error) {
  console.log('Connection error: ' + error);
});
```

### 11. Send Message
**WebSocket Destination**: `/app/chat/{sessionId}/send`  
**Description**: Send a message to a chat session

**Message Payload**:
```json
{
  "content": "Hello, this is my message!",
  "messageType": "TEXT"
}
```

**JavaScript Example**:
```javascript
stompClient.send(`/app/chat/1/send`, {}, JSON.stringify({
  content: "Hello, this is my message!",
  messageType: "TEXT"
}));
```

### 12. Receive Messages
**Subscribe Destination**: `/topic/chat/{sessionId}`  
**Description**: Subscribe to receive messages from a chat session

**JavaScript Example**:
```javascript
stompClient.subscribe('/topic/chat/1', function(message) {
  const messageData = JSON.parse(message.body);
  console.log('Received message:', messageData);
});
```

### 13. Typing Indicators
**Send Destination**: `/app/chat/{sessionId}/typing`  
**Subscribe Destination**: `/topic/typing/{sessionId}`  
**Description**: Send and receive typing indicators

**Send Payload**:
```json
{
  "isTyping": true
}
```

**JavaScript Example**:
```javascript
// Send typing indicator
stompClient.send(`/app/chat/1/typing`, {}, JSON.stringify({
  isTyping: true
}));

// Subscribe to typing indicators
stompClient.subscribe('/topic/typing/1', function(typingData) {
  const data = JSON.parse(typingData.body);
  console.log(data.username + ' is typing:', data.isTyping);
});
```

### 14. Mark Message as Read
**WebSocket Destination**: `/app/chat/message/{messageId}/read`  
**Description**: Mark a specific message as read

**JavaScript Example**:
```javascript
stompClient.send(`/app/chat/message/123/read`, {}, {});
```

### 15. User Status Updates
**Subscribe Destination**: `/topic/user/status`  
**Description**: Receive user online/offline status updates

**JavaScript Example**:
```javascript
stompClient.subscribe('/topic/user/status', function(statusData) {
  const data = JSON.parse(statusData.body);
  console.log(data.username + ' is ' + (data.isOnline ? 'online' : 'offline'));
});
```

---

## 📊 Admin/Dashboard APIs

### 16. Get Chat Statistics
**Endpoint**: `GET /api/chat/admin/statistics`  
**Access**: Admin Users  
**Description**: Retrieve chat statistics for admin dashboard

**Curl Command**:
```bash
curl -X GET http://localhost:8080/api/chat/admin/statistics \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 17. Get Active Sessions Count
**Endpoint**: `GET /api/chat/admin/active-sessions-count`  
**Access**: Authenticated Users  
**Description**: Get the total count of active chat sessions

**Curl Command**:
```bash
curl -X GET http://localhost:8080/api/chat/admin/active-sessions-count \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
{
  "activeSessionsCount": 15
}
```

---

## 🛠️ Error Handling

### Common Error Responses

**401 Unauthorized** - Invalid or missing JWT token:
```json
{
  "timestamp": "2025-10-14T10:36:27.123Z",
  "status": 401,
  "error": "Unauthorized",
  "message": "Access Denied",
  "path": "/api/chat/sessions"
}
```

**403 Forbidden** - User not participant in session:
```json
{
  "timestamp": "2025-10-14T10:36:27.123Z",
  "status": 403,
  "error": "Forbidden",
  "message": "Access Denied",
  "path": "/api/chat/sessions/1"
}
```

**404 Not Found** - Session or message not found:
```json
{
  "timestamp": "2025-10-14T10:36:27.123Z",
  "status": 404,
  "error": "Not Found",
  "message": "Chat session not found",
  "path": "/api/chat/sessions/999"
}
```

---

## 🔄 Complete Testing Workflow

### Step 1: Authentication
```bash
# Login to get JWT token
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }')

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo "JWT Token: $TOKEN"
```

### Step 2: Create Chat Session
```bash
SESSION_RESPONSE=$(curl -s -X POST http://localhost:8080/api/chat/sessions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionName": "Test Chat Session",
    "sessionType": "AGENT_CLIENT"
  }')

SESSION_ID=$(echo $SESSION_RESPONSE | jq -r '.id')
echo "Created session ID: $SESSION_ID"
```

### Step 3: WebSocket Testing
```javascript
// Connect to WebSocket
const socket = new SockJS('http://localhost:8080/ws');
const stompClient = Stomp.over(socket);

stompClient.connect({
  'Authorization': 'Bearer ' + token
}, function(frame) {
  console.log('Connected to WebSocket');

  // Subscribe to messages
  stompClient.subscribe('/topic/chat/' + sessionId, function(message) {
    console.log('Received:', JSON.parse(message.body));
  });

  // Send a message
  stompClient.send('/app/chat/' + sessionId + '/send', {}, JSON.stringify({
    content: "Hello from WebSocket!",
    messageType: "TEXT"
  }));
});
```

### Step 4: Get Message History
```bash
curl -X GET "http://localhost:8080/api/chat/sessions/$SESSION_ID/messages" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

---

## 📚 Message Types

The API supports different message types:

- **TEXT**: Regular text messages
- **IMAGE**: Image attachments
- **FILE**: File attachments
- **SYSTEM**: System-generated messages (user joined/left, session created)
- **NOTIFICATION**: System notifications

## 🔒 Session Types

Chat sessions can be of different types:

- **AGENT_CLIENT**: Direct chat between agent and client
- **GROUP**: Multi-participant group chat
- **SUPPORT**: Support/help desk session

## 🧪 Quick Test Script

Save this as `test_chat_api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:8080"
WS_URL="ws://localhost:8080/ws"

echo "=== Testing Visiomatix Chat API ==="

# 1. Login and get token
echo "1. Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }')

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
  echo "Login failed!"
  exit 1
fi
echo "Token received: ${TOKEN:0:50}..."

# 2. Create chat session
echo -e "\n2. Creating chat session..."
SESSION_RESPONSE=$(curl -s -X POST $BASE_URL/api/chat/sessions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionName": "API Test Session",
    "sessionType": "AGENT_CLIENT"
  }')

SESSION_ID=$(echo $SESSION_RESPONSE | jq -r '.id')
echo "Created session ID: $SESSION_ID"

# 3. Get user sessions
echo -e "\n3. Getting user sessions..."
curl -s -X GET $BASE_URL/api/chat/sessions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | jq '.'

# 4. Get session details
echo -e "\n4. Getting session details..."
curl -s -X GET $BASE_URL/api/chat/sessions/$SESSION_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | jq '.'

echo -e "\n=== Chat API Testing Complete ==="
echo "Session ID: $SESSION_ID"
echo "Use this session ID for WebSocket testing"
```

Make executable and run:
```bash
chmod +x test_chat_api.sh
./test_chat_api.sh
```

---

## 📖 Additional Resources

- **STOMP Protocol**: For WebSocket message format specifications
- **SockJS Documentation**: For WebSocket fallback support
- **JWT.io**: For token debugging
- **Postman Collection**: Import the provided collection for API testing

---

*Last Updated: October 14, 2025*
*Author: Viral Prajapati*
*Version: 1.0*

---

## ✅ **Testing Status**

**REST API Endpoints**: ✅ Tested and working
- Session creation, retrieval, and management
- Message history and pagination
- Participant management
- Admin statistics

**WebSocket Endpoints**: ✅ Tested and working
- Real-time messaging
- Typing indicators
- User status updates
- JWT authentication

**Error Handling**: ✅ Implemented
- Proper HTTP status codes
- Authentication validation
- Authorization checks
- Session participant verification

---

*Document Status: All chat API endpoints documented and tested*
*Last Validation: October 14, 2025*