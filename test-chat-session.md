# Chat Session API Testing Guide

## 📋 Overview
This guide provides step-by-step instructions for testing the chat session functionality in the Visiomatix Chat application using REST API endpoints. It covers creating chat sessions, sending messages, retrieving message history, and managing chat sessions through the API.

## 🔧 Prerequisites

### 1. Running Application
Ensure the Spring Boot backend is running on `http://localhost:8080`:
```bash
cd visiomatix.chat/chat
mvn spring-boot:run
```

### 2. Authentication Token
You'll need a valid JWT token. Follow the authentication steps below or use an existing token.

### 3. Tools Required
- **curl** (command line) or **Postman/Insomnia**
- **jq** (optional, for JSON formatting in terminal)

## 🔑 Authentication Setup

### Step 1: Register Test Users
Create two test users for chat testing:

```bash
# Register User 1
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "chattest1",
    "email": "chattest1@example.com",
    "password": "test123",
    "name": "Chat Test User 1",
    "active": true
  }'

# Register User 2
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "chattest2",
    "email": "chattest2@example.com",
    "password": "test123",
    "name": "Chat Test User 2",
    "active": true
  }'
```

### Step 2: Login and Get Tokens
Login with both users to obtain JWT tokens:

```bash
# Login User 1
LOGIN1_RESPONSE=$(curl -s -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "chattest1",
    "password": "test123"
  }')

TOKEN1=$(echo $LOGIN1_RESPONSE | jq -r '.token')
echo "User 1 Token: ${TOKEN1:0:50}..."

# Login User 2
LOGIN2_RESPONSE=$(curl -s -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "chattest2",
    "password": "test123"
  }')

TOKEN2=$(echo $LOGIN2_RESPONSE | jq -r '.token')
echo "User 2 Token: ${TOKEN2:0:50}..."
```

## 💬 Chat Session Testing

### Step 3: Create a Chat Session
Create a new chat session between the two users:

```bash
# Using User 1's token to create session
CREATE_SESSION_RESPONSE=$(curl -s -X POST http://localhost:8080/api/chat/sessions \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionName": "Test Chat Session",
    "sessionType": "AGENT_CLIENT"
  }')

SESSION_ID=$(echo $CREATE_SESSION_RESPONSE | jq -r '.id')
echo "Created Session ID: $SESSION_ID"
```

**Expected Response:**
```json
{
  "id": 1,
  "sessionName": "Test Chat Session",
  "sessionType": "AGENT_CLIENT",
  "active": true,
  "createdAt": "2025-10-14T09:13:08.190Z",
  "participants": [
    {
      "id": 1,
      "username": "chattest1",
      "name": "Chat Test User 1"
    }
  ]
}
```

### Step 4: Start Chat with Another User
Add User 2 to the chat session:

```bash
# Using User 1's token to start chat with User 2 (assuming User 2 ID is 2)
START_CHAT_RESPONSE=$(curl -s -X POST http://localhost:8080/api/chat/sessions/with/2 \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json")

echo "Started chat with User 2"
```

### Step 5: Send Messages
Send messages from both users:

```bash
# User 1 sends first message
curl -X POST http://localhost:8080/api/chat/sessions/$SESSION_ID/messages \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello from User 1!",
    "messageType": "TEXT"
  }'

# User 2 sends response
curl -X POST http://localhost:8080/api/chat/sessions/$SESSION_ID/messages \
  -H "Authorization: Bearer $TOKEN2" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hi User 1! This is User 2.",
    "messageType": "TEXT"
  }'

# User 1 sends another message
curl -X POST http://localhost:8080/api/chat/sessions/$SESSION_ID/messages \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Great! The chat session is working perfectly.",
    "messageType": "TEXT"
  }'
```

### Step 6: Retrieve Messages
Get message history for the session:

```bash
# Get all messages for the session
curl -X GET http://localhost:8080/api/chat/sessions/$SESSION_ID/messages \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "content": "Hello from User 1!",
    "messageType": "TEXT",
    "sentAt": "2025-10-14T09:13:08.190Z",
    "sender": {
      "id": 1,
      "username": "chattest1",
      "name": "Chat Test User 1"
    },
    "chatSession": {
      "id": 1,
      "sessionName": "Test Chat Session"
    }
  },
  {
    "id": 2,
    "content": "Hi User 1! This is User 2.",
    "messageType": "TEXT",
    "sentAt": "2025-10-14T09:13:09.190Z",
    "sender": {
      "id": 2,
      "username": "chattest2",
      "name": "Chat Test User 2"
    },
    "chatSession": {
      "id": 1,
      "sessionName": "Test Chat Session"
    }
  }
]
```

### Step 7: Get Recent Messages
Retrieve only the most recent messages:

```bash
# Get last 5 messages
curl -X GET http://localhost:8080/api/chat/sessions/$SESSION_ID/messages/recent?limit=5 \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json"
```

### Step 8: Mark Messages as Read
Mark all messages as read for User 2:

```bash
curl -X POST http://localhost:8080/api/chat/sessions/$SESSION_ID/messages/mark-read \
  -H "Authorization: Bearer $TOKEN2" \
  -H "Content-Type: application/json"
```

### Step 9: Get Unread Count
Check unread message count:

```bash
curl -X GET http://localhost:8080/api/chat/sessions/$SESSION_ID/unread-count \
  -H "Authorization: Bearer $TOKEN2" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "unreadCount": 0
}
```

### Step 10: Search Messages
Search for specific content in messages:

```bash
# Search for messages containing "User"
curl -X GET http://localhost:8080/api/chat/sessions/$SESSION_ID/messages/search?query=User \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json"
```

### Step 11: Get Chat Session Details
Retrieve session information:

```bash
curl -X GET http://localhost:8080/api/chat/sessions/$SESSION_ID \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json"
```

### Step 12: List All Chat Sessions
Get all sessions for a user:

```bash
curl -X GET http://localhost:8080/api/chat/sessions \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json"
```

## 🧹 Cleanup

### Step 13: Close Chat Session
Close the chat session when done:

```bash
curl -X DELETE http://localhost:8080/api/chat/sessions/$SESSION_ID \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
"Chat session closed successfully"
```

## 🧪 Complete Test Script

Save this as `test_chat_session.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:8080"

echo "=== Visiomatix Chat Session API Test ==="

# Register users
echo "1. Registering test users..."
curl -s -X POST $BASE_URL/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"chattest1","email":"chattest1@example.com","password":"test123","name":"Chat Test User 1"}' > /dev/null

curl -s -X POST $BASE_URL/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"chattest2","email":"chattest2@example.com","password":"test123","name":"Chat Test User 2"}' > /dev/null

# Login and get tokens
echo "2. Logging in users..."
TOKEN1=$(curl -s -X POST $BASE_URL/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"chattest1","password":"test123"}' | jq -r '.token')

TOKEN2=$(curl -s -X POST $BASE_URL/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"chattest2","password":"test123"}' | jq -r '.token')

echo "Tokens obtained successfully"

# Create session
echo "3. Creating chat session..."
SESSION_RESPONSE=$(curl -s -X POST $BASE_URL/api/chat/sessions \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json" \
  -d '{"sessionName":"API Test Session","sessionType":"AGENT_CLIENT"}')

SESSION_ID=$(echo $SESSION_RESPONSE | jq -r '.id')
echo "Session ID: $SESSION_ID"

# Send messages
echo "4. Sending test messages..."
curl -s -X POST $BASE_URL/api/chat/sessions/$SESSION_ID/messages \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello from API test!","messageType":"TEXT"}' > /dev/null

curl -s -X POST $BASE_URL/api/chat/sessions/$SESSION_ID/messages \
  -H "Authorization: Bearer $TOKEN2" \
  -H "Content-Type: application/json" \
  -d '{"content":"API test response!","messageType":"TEXT"}' > /dev/null

# Retrieve messages
echo "5. Retrieving messages..."
MESSAGES=$(curl -s -X GET $BASE_URL/api/chat/sessions/$SESSION_ID/messages \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json")

MESSAGE_COUNT=$(echo $MESSAGES | jq '. | length')
echo "Retrieved $MESSAGE_COUNT messages"

# Cleanup
echo "6. Cleaning up..."
curl -s -X DELETE $BASE_URL/api/chat/sessions/$SESSION_ID \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json" > /dev/null

echo "=== Test Complete ==="
```

Make executable and run:
```bash
chmod +x test_chat_session.sh
./test_chat_session.sh
```

## 🔍 Error Handling

### Common Issues

**401 Unauthorized**
- Ensure JWT token is valid and not expired
- Check token format: `Bearer <token>`

**403 Forbidden**
- Verify user has permission to access the session
- Check if session belongs to the user

**404 Not Found**
- Confirm session ID exists
- Check endpoint URLs

**400 Bad Request**
- Validate JSON payload format
- Ensure required fields are present

## 📊 Testing Checklist

- [ ] User registration successful
- [ ] User login and token retrieval
- [ ] Chat session creation
- [ ] Message sending from both users
- [ ] Message retrieval and history
- [ ] Message search functionality
- [ ] Read status and unread counts
- [ ] Session details retrieval
- [ ] Session listing
- [ ] Session closure

## 📚 Additional Resources

- [API Endpoint Guide](API_Endpoint_Guide.md) - Complete API documentation
- [Postman Collections](API_Collections_Guide.md) - GUI testing tools
- [WebSocket Testing](WebSocket_Testing_Guide.md) - Real-time messaging tests

---

*Created: October 14, 2025*
*Tested with: Spring Boot 3.5.6, MySQL 8.4*
*API Version: 1.0.0*