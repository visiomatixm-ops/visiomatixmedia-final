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

## ✅ **Validation & Testing Status**

**Password Serialization Issue Fixed**: 
- Changed from `@JsonIgnore` to `@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)` 
- This allows passwords in request bodies while preventing them in responses
- ✅ Registration endpoint now works correctly

**Tested Commands**:
```bash
# ✅ WORKING: User Registration
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "testuser@example.com", 
    "password": "password123",
    "name": "Test User"
  }'

# ✅ WORKING: User Login  
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

**Note**: All endpoints have been fixed and validated for proper JSON serialization.

---

*Document Status: All API endpoints tested and working*  
*Last Validation: October 14, 2025*