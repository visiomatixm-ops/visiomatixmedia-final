# Login API Testing Guide

This guide provides curl commands to test the user registration and login endpoints for the Visiomatix Chat API.

## Prerequisites

- The Spring Boot application must be running on `http://localhost:8080` (default port).
- Ensure the database is configured and accessible as per `application.properties`.

## API Endpoints

### 1. User Registration

Register a new user with the following curl command:

```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

**Expected Response:**
- Status: 200 OK
- Body: JSON representation of the created User object.

### 2. User Login

Login with the registered user credentials to obtain a JWT token:

```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

**Expected Response:**
- Status: 200 OK
- Body: JWT token string (e.g., `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`).

### 3. Using the JWT Token

For authenticated endpoints, include the token in the Authorization header:

```bash
curl -X GET http://localhost:8080/api/users/testuser \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

Replace `YOUR_JWT_TOKEN_HERE` with the token obtained from the login response.

## Notes

- Usernames must be unique.
- Passwords must be at least 6 characters long.
- Emails must be valid.
- If registration fails due to validation errors, check the response for details.
- Ensure the application is running before executing these commands.