# Visiomatix Chat API Endpoint Guide

## 📋 Overview
This guide provides comprehensive documentation for all available REST API endpoints in the Visiomatix Chat application, including authentication, user management, role management, and permission management.

## 🔧 Configuration
- **Base URL**: `http://localhost:8080`
- **Authentication**: JWT Bearer Token (except for registration and login)
- **Content-Type**: `application/json`

## 🔑 Authentication Flow

### 1. Register New User
**Endpoint**: `POST /api/users/register`  
**Access**: Public  
**Description**: Register a new user account

**Request Body**:
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User",
  "active": true
}
```

**Curl Command**:
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123",
    "name": "Test User",
    "active": true
  }'
```

**Expected Response**:
```json
{
  "id": 1,
  "username": "testuser",
  "email": "testuser@example.com",
  "name": "Test User",
  "active": true,
  "roles": [
    {
      "id": 3,
      "name": "ROLE_USER",
      "privileges": []
    }
  ],
  "createdBy": null,
  "modifiedBy": null,
  "lastLoginAt": null
}
```

### 2. User Login
**Endpoint**: `POST /api/users/login`  
**Access**: Public  
**Description**: Authenticate user and receive JWT token

**Request Body**:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Curl Command**:
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**Expected Response**:
```json
{
  "token": "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbjEiLCJpYXQiOjE3NjA0Mjg3MTgsImV4cCI6MTc2MDQzMjMxOH0.R6hz0nz1Stxyl7hpmXWXKfEnCwa8ay24jGTfhQbTFMqrImgCSmU1LuG_v8SIkG6_",
  "username": "admin",
  "role": "ROLE_ADMIN"
}
```

---

## 👤 User Management APIs

### 3. Get User by Username
**Endpoint**: `GET /api/users/{username}`  
**Access**: Admin or Owner  
**Description**: Retrieve user details by username

**Curl Command**:
```bash
# Replace YOUR_JWT_TOKEN with actual token from login
curl -X GET http://localhost:8080/api/users/admin1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
{
  "id": 20,
  "username": "admin1",
  "email": "admin1@example.com",
  "name": "Admin One",
  "active": true,
  "roles": [
    {
      "id": 1,
      "name": "ROLE_ADMIN",
      "privileges": [
        {
          "id": 1,
          "name": "MANAGE_USERS"
        },
        {
          "id": 2,
          "name": "MANAGE_ROLES"
        }
      ]
    }
  ]
}
```

### 4. Update User
**Endpoint**: `PUT /api/users/{userId}`  
**Access**: Admin Only  
**Description**: Update user information

**Request Body**:
```json
{
  "username": "updateduser",
  "email": "updated@example.com",
  "name": "Updated Name",
  "active": true
}
```

**Curl Command**:
```bash
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "updateduser",
    "email": "updated@example.com",
    "name": "Updated Name",
    "active": true
  }'
```

### 5. Delete User
**Endpoint**: `DELETE /api/users/{userId}`  
**Access**: Admin Only  
**Description**: Delete a user by ID

**Curl Command**:
```bash
curl -X DELETE http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
"User deleted successfully"
```

---

## 🛡️ Role Management APIs

### 6. Create Role
**Endpoint**: `POST /api/roles/create`  
**Access**: Admin (Recommended)  
**Description**: Create a new role with permissions

**Request Body**:
```json
{
  "name": "ROLE_MODERATOR",
  "permissions": [
    {
      "id": 1,
      "name": "MANAGE_CHAT"
    }
  ]
}
```

**Curl Command**:
```bash
curl -X POST http://localhost:8080/api/roles/create \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ROLE_MODERATOR",
    "permissions": [
      {
        "id": 1,
        "name": "MANAGE_CHAT"
      }
    ]
  }'
```

### 7. Get All Roles
**Endpoint**: `GET /api/roles/list`  
**Access**: Authenticated Users  
**Description**: Retrieve all available roles

**Curl Command**:
```bash
curl -X GET http://localhost:8080/api/roles/list \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
[
  {
    "id": 1,
    "name": "ROLE_ADMIN",
    "privileges": [
      {
        "id": 1,
        "name": "MANAGE_USERS"
      }
    ],
    "permissions": [
      {
        "id": 1,
        "name": "MANAGE_CHAT"
      }
    ]
  },
  {
    "id": 2,
    "name": "ROLE_USER",
    "privileges": [],
    "permissions": []
  }
]
```

### 8. Delete Role
**Endpoint**: `DELETE /api/roles/delete/{id}`  
**Access**: Admin Only  
**Description**: Delete a role by ID

**Curl Command**:
```bash
curl -X DELETE http://localhost:8080/api/roles/delete/3 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
"Role deleted successfully"
```

---

## 🔐 Permission Management APIs

### 9. Create Permission
**Endpoint**: `POST /api/permissions`  
**Access**: Admin Only  
**Description**: Create a new permission

**Request Body**:
```json
{
  "name": "MANAGE_REPORTS",
  "description": "Allow user to manage reports"
}
```

**Curl Command**:
```bash
curl -X POST http://localhost:8080/api/permissions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MANAGE_REPORTS",
    "description": "Allow user to manage reports"
  }'
```

### 10. Get All Permissions
**Endpoint**: `GET /api/permissions`  
**Access**: Authenticated Users  
**Description**: Retrieve all available permissions

**Curl Command**:
```bash
curl -X GET http://localhost:8080/api/permissions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
[
  {
    "id": 1,
    "name": "MANAGE_CHAT",
    "description": "Manage chat functionality"
  },
  {
    "id": 2,
    "name": "MANAGE_USERS",
    "description": "Manage user accounts"
  }
]
```

### 11. Delete Permission
**Endpoint**: `DELETE /api/permissions/{id}`  
**Access**: Admin Only  
**Description**: Delete a permission by ID

**Curl Command**:
```bash
curl -X DELETE http://localhost:8080/api/permissions/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

---

## 🔄 Complete Testing Workflow

### Step 1: Register a New User
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "apitest",
    "email": "apitest@example.com",
    "password": "test123",
    "name": "API Test User",
    "active": true
  }'
```

### Step 2: Login and Get Token
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "apitest",
    "password": "test123"
  }'
```

### Step 3: Use Token for Authenticated Requests
```bash
# Export the token for easy reuse
export JWT_TOKEN="your_jwt_token_here"

# Test getting user info
curl -X GET http://localhost:8080/api/users/apitest \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json"
```

---

## 🛠️ Error Handling

### Common Error Responses

**401 Unauthorized** - Invalid or missing JWT token:
```json
{
  "path": "/api/users/admin",
  "error": "Unauthorized",
  "message": "Access Denied",
  "timestamp": "2025-10-14T13:29:42.584693144",
  "status": 401
}
```

**403 Forbidden** - Insufficient permissions:
```json
{
  "path": "/api/users/1",
  "error": "Forbidden",
  "message": "Access Denied",
  "timestamp": "2025-10-14T13:29:42.584693144",
  "status": 403
}
```

**400 Bad Request** - Validation errors:
```json
{
  "path": "/api/users/register",
  "error": "Bad Request",
  "message": "Username is required",
  "timestamp": "2025-10-14T13:29:42.584693144",
  "status": 400
}
```

---

## 🔒 Security Notes

1. **JWT Token Expiration**: Tokens expire after 1 hour (3600000ms)
2. **Role-Based Access**: Different endpoints require different roles
3. **Password Security**: Passwords are never returned in API responses
4. **CORS**: Configured for cross-origin requests

## 🧪 Quick Test Script

Save this as `test_api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:8080"

echo "=== Testing Visiomatix Chat API ==="

# 1. Register user
echo "1. Registering new user..."
curl -s -X POST $BASE_URL/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testapi",
    "email": "testapi@example.com",
    "password": "test123",
    "name": "Test API User"
  }' | jq '.'

# 2. Login and get token
echo -e "\n2. Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testapi",
    "password": "test123"
  }')

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo "Token received: ${TOKEN:0:50}..."

# 3. Get user info
echo -e "\n3. Getting user info..."
curl -s -X GET $BASE_URL/api/users/testapi \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | jq '.'

echo -e "\n=== API Testing Complete ==="
```

Make it executable and run:
```bash
chmod +x test_api.sh
./test_api.sh
```

---

## 📚 Additional Resources

- **Spring Security Documentation**: For understanding role-based access
- **JWT.io**: For decoding and debugging JWT tokens
- **Postman Collection**: Consider importing these endpoints into Postman for easier testing

---

*Last Updated: October 14, 2025*
*Author: Viral Prajapati*

---

## 💬 Chat Management APIs

### 12. Start or Retrieve Chat Session
**Endpoint**: `POST /api/chat/start`
**Access**: Authenticated Users
**Description**: Start a new chat session or retrieve existing session between two users

**Request Body**:
```json
{
  "sender": "user1",
  "receiver": "user2"
}
```

**Curl Command**:
```bash
curl -X POST http://localhost:8080/api/chat/start \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "user1",
    "receiver": "user2"
  }'
```

**Expected Response**:
```json
{
  "id": 1,
  "sessionName": "Chat: user1 & user2",
  "sessionType": "AGENT_CLIENT",
  "active": true,
  "participants": [
    {
      "id": 1,
      "username": "user1"
    },
    {
      "id": 2,
      "username": "user2"
    }
  ],
  "createdAt": "2025-10-16T06:59:00.000Z",
  "lastMessageTime": null
}
```

### 13. Send Message via REST
**Endpoint**: `POST /api/chat/send`
**Access**: Authenticated Users
**Description**: Send a message using ChatMessagePayload

**Request Body**:
```json
{
  "sender": "user1",
  "receiver": "user2",
  "content": "Hello, how are you?",
  "messageType": "TEXT"
}
```

**Curl Command**:
```bash
curl -X POST http://localhost:8080/api/chat/send \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "user1",
    "receiver": "user2",
    "content": "Hello, how are you?",
    "messageType": "TEXT"
  }'
```

### 14. Get Chat History Between Two Users
**Endpoint**: `GET /api/chat/history?sender={username}&receiver={username}`
**Access**: Authenticated Users
**Description**: Retrieve chat history between two specific users

**Curl Command**:
```bash
curl -X GET "http://localhost:8080/api/chat/history?sender=user1&receiver=user2" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 15. Get Messages by Session ID
**Endpoint**: `GET /api/chat/session/{sessionId}/messages?page={page}&size={size}`
**Access**: Authenticated Users (Session Participants)
**Description**: Get paginated messages for a specific chat session

**Curl Command**:
```bash
curl -X GET "http://localhost:8080/api/chat/session/1/messages?page=0&size=50" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 16. Get User Sessions
**Endpoint**: `GET /api/chat/sessions`
**Access**: Authenticated Users
**Description**: Get all active chat sessions for the authenticated user

**Curl Command**:
```bash
curl -X GET http://localhost:8080/api/chat/sessions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 17. Create Chat Session
**Endpoint**: `POST /api/chat/sessions`
**Access**: Authenticated Users
**Description**: Create a new chat session

**Request Body**:
```json
{
  "sessionName": "Group Chat",
  "sessionType": "AGENT_CLIENT"
}
```

**Curl Command**:
```bash
curl -X POST http://localhost:8080/api/chat/sessions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionName": "Group Chat",
    "sessionType": "AGENT_CLIENT"
  }'
```

### 18. Get Chat Session Details
**Endpoint**: `GET /api/chat/sessions/{sessionId}`
**Access**: Authenticated Users (Session Participants)
**Description**: Get details of a specific chat session

**Curl Command**:
```bash
curl -X GET http://localhost:8080/api/chat/sessions/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 19. Add Participant to Session
**Endpoint**: `POST /api/chat/sessions/{sessionId}/participants/{userId}`
**Access**: Authenticated Users
**Description**: Add a participant to an existing chat session

**Curl Command**:
```bash
curl -X POST http://localhost:8080/api/chat/sessions/1/participants/2 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 20. Close Chat Session
**Endpoint**: `DELETE /api/chat/sessions/{sessionId}`
**Access**: Authenticated Users (Session Participants)
**Description**: Deactivate/close a chat session

**Curl Command**:
```bash
curl -X DELETE http://localhost:8080/api/chat/sessions/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 21. Get Messages for Session (Authenticated)
**Endpoint**: `GET /api/chat/sessions/{sessionId}/messages?page={page}&size={size}`
**Access**: Authenticated Users (Session Participants)
**Description**: Get paginated messages for a session (authenticated version)

**Curl Command**:
```bash
curl -X GET "http://localhost:8080/api/chat/sessions/1/messages?page=0&size=20" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 22. Get Recent Messages
**Endpoint**: `GET /api/chat/sessions/{sessionId}/messages/recent?limit={limit}`
**Access**: Authenticated Users
**Description**: Get recent messages for quick loading

**Curl Command**:
```bash
curl -X GET "http://localhost:8080/api/chat/sessions/1/messages/recent?limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 23. Mark All Messages as Read
**Endpoint**: `POST /api/chat/sessions/{sessionId}/messages/mark-read`
**Access**: Authenticated Users
**Description**: Mark all messages in a session as read for the current user

**Curl Command**:
```bash
curl -X POST http://localhost:8080/api/chat/sessions/1/messages/mark-read \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 24. Get Unread Message Count
**Endpoint**: `GET /api/chat/sessions/{sessionId}/unread-count`
**Access**: Authenticated Users
**Description**: Get count of unread messages in a session

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

### 25. Search Messages in Session
**Endpoint**: `GET /api/chat/sessions/{sessionId}/messages/search?query={searchTerm}`
**Access**: Authenticated Users (Session Participants)
**Description**: Search for messages containing specific text in a session

**Curl Command**:
```bash
curl -X GET "http://localhost:8080/api/chat/sessions/1/messages/search?query=hello" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 26. Send Message to Session
**Endpoint**: `POST /api/chat/sessions/{sessionId}/messages`
**Access**: Authenticated Users (Session Participants)
**Description**: Send a message directly to a specific session

**Request Body**:
```json
{
  "content": "This is a test message",
  "messageType": "TEXT"
}
```

**Curl Command**:
```bash
curl -X POST http://localhost:8080/api/chat/sessions/1/messages \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is a test message",
    "messageType": "TEXT"
  }'
```

### 27. Get Chat Statistics (Admin)
**Endpoint**: `GET /api/chat/admin/statistics`
**Access**: Admin Users
**Description**: Get chat statistics for admin dashboard

**Curl Command**:
```bash
curl -X GET http://localhost:8080/api/chat/admin/statistics \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 28. Get Active Sessions Count (Admin)
**Endpoint**: `GET /api/chat/admin/active-sessions-count`
**Access**: Admin Users
**Description**: Get count of active chat sessions

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

## 🔄 WebSocket Endpoints

### 29. Send Message via WebSocket
**Endpoint**: `WebSocket /app/sendMessage`
**Access**: Authenticated Users
**Description**: Send message via WebSocket for real-time communication

**WebSocket Message**:
```json
{
  "sender": "user1",
  "receiver": "user2",
  "content": "Real-time message",
  "messageType": "TEXT"
}
```

### 30. Typing Indicator
**Endpoint**: `WebSocket /app/typing`
**Access**: Authenticated Users
**Description**: Send typing indicators

**WebSocket Message**:
```json
{
  "sessionId": 1,
  "username": "user1",
  "isTyping": true
}
```

### 31. Receive Messages
**Subscription**: `WebSocket /topic/chat/{sessionId}`
**Access**: Authenticated Users (Session Participants)
**Description**: Subscribe to receive messages for a specific session

### 32. Receive Typing Indicators
**Subscription**: `WebSocket /topic/typing/{sessionId}`
**Access**: Authenticated Users (Session Participants)
**Description**: Subscribe to receive typing indicators for a session

### 33. Receive User Status Updates
**Subscription**: `WebSocket /topic/user/status`
**Access**: Authenticated Users
**Description**: Subscribe to receive user online/offline status updates

### 34. Receive Session Events
**Subscription**: `WebSocket /topic/session/{event}`
**Access**: Authenticated Users
**Description**: Subscribe to session-related events (closed, etc.)

---

## 🔄 Complete Chat Testing Workflow

### Step 1: Register and Login Users
```bash
# Register user1
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user1",
    "email": "user1@example.com",
    "password": "password123",
    "name": "User One"
  }'

# Register user2
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user2",
    "email": "user2@example.com",
    "password": "password123",
    "name": "User Two"
  }'

# Login user1 and get token
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user1",
    "password": "password123"
  }')
USER1_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

# Login user2 and get token
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user2",
    "password": "password123"
  }')
USER2_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
```

### Step 2: Start Chat Session
```bash
# Start chat session between user1 and user2
SESSION_RESPONSE=$(curl -s -X POST http://localhost:8080/api/chat/start \
  -H "Authorization: Bearer $USER1_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "user1",
    "receiver": "user2"
  }')
SESSION_ID=$(echo $SESSION_RESPONSE | jq -r '.id')
echo "Session ID: $SESSION_ID"
```

### Step 3: Send Messages
```bash
# User1 sends message
curl -X POST http://localhost:8080/api/chat/send \
  -H "Authorization: Bearer $USER1_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "user1",
    "receiver": "user2",
    "content": "Hello from user1!",
    "messageType": "TEXT"
  }'

# User2 sends message
curl -X POST http://localhost:8080/api/chat/send \
  -H "Authorization: Bearer $USER2_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "user2",
    "receiver": "user1",
    "content": "Hi user1, how are you?",
    "messageType": "TEXT"
  }'
```

### Step 4: Get Chat History
```bash
# Get chat history
curl -X GET "http://localhost:8080/api/chat/history?sender=user1&receiver=user2" \
  -H "Authorization: Bearer $USER1_TOKEN" \
  -H "Content-Type: application/json"
```

### Step 5: Get Session Messages
```bash
# Get messages by session ID
curl -X GET "http://localhost:8080/api/chat/session/$SESSION_ID/messages?page=0&size=50" \
  -H "Authorization: Bearer $USER1_TOKEN" \
  -H "Content-Type: application/json"
```

---

## ✅ **Validation & Testing Status**

**Password Serialization Issue Fixed**:
- Changed from `@JsonIgnore` to `@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)`
- This allows passwords in request bodies while preventing them in responses
- ✅ Registration endpoint now works correctly

**Chat API Testing**:
```bash
# ✅ WORKING: Start Chat Session
curl -X POST http://localhost:8080/api/chat/start \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sender": "user1", "receiver": "user2"}'

# ✅ WORKING: Send Message
curl -X POST http://localhost:8080/api/chat/send \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sender": "user1", "receiver": "user2", "content": "Test message", "messageType": "TEXT"}'

# ✅ WORKING: Get Chat History
curl -X GET "http://localhost:8080/api/chat/history?sender=user1&receiver=user2" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# ✅ WORKING: Get Session Messages
curl -X GET "http://localhost:8080/api/chat/session/1/messages?page=0&size=20" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Note**: All endpoints have been documented and validated for proper functionality.

---

*Document Status: All API endpoints documented and tested*
*Last Validation: October 16, 2025*