# Visiomatix Chat API Collections Guide

## 📋 Overview
This guide provides instructions for importing and using the Visiomatix Chat API collections in both Postman and Insomnia REST clients.

## 📁 Available Files

- [`Visiomatix_Chat_API.postman_collection.json`](Visiomatix_Chat_API.postman_collection.json) - Postman collection
- [`Visiomatix_Chat_API.postman_environment.json`](Visiomatix_Chat_API.postman_environment.json) - Postman environment variables
- [`Visiomatix_Chat_API.insomnia_collection.json`](Visiomatix_Chat_API.insomnia_collection.json) - Insomnia collection

---

## 🟧 Postman Setup

### Step 1: Import Collection
1. Open Postman
2. Click **Import** button (top left)
3. Select **File** tab
4. Choose `Visiomatix_Chat_API.postman_collection.json`
5. Click **Import**

### Step 2: Import Environment
1. Click **Import** again
2. Select `Visiomatix_Chat_API.postman_environment.json`
3. Click **Import**
4. In the top-right corner, select **"Visiomatix Chat API Environment"** from the environment dropdown

### Step 3: Start Testing
1. Navigate to **Authentication** → **Register User**
2. Click **Send** to register a new user
3. Go to **Authentication** → **Login User** 
4. Click **Send** to login and automatically store JWT token
5. Test other endpoints that require authentication

### Postman Features
- ✅ **Automatic JWT Token Storage**: Login request automatically saves token to environment
- ✅ **Test Scripts**: Automatic validation of responses
- ✅ **Environment Variables**: Pre-configured variables for easy testing
- ✅ **Request Organization**: Grouped by functionality (Auth, Users, Roles, Permissions)

---

## 🟪 Insomnia Setup

### Step 1: Import Collection
1. Open Insomnia
2. Click **Create** → **Import From** → **File**
3. Select `Visiomatix_Chat_API.insomnia_collection.json`
4. Click **Import**

### Step 2: Configure Environment
1. The environment variables are included in the collection
2. You can modify them by clicking the **Environment** dropdown
3. Select **Base Environment** to see all variables

### Step 3: Manual Token Management
1. Run **Authentication** → **Login User**
2. Copy the `token` value from the response
3. Go to **Environment** → **Base Environment**
4. Paste the token in the `jwt_token` field
5. Save the environment

### Insomnia Features
- ✅ **Clean Interface**: Minimal, focused UI
- ✅ **Environment Variables**: Template system with `{{ _.variable_name }}`
- ✅ **Request Organization**: Organized in folders
- ✅ **Response Preview**: Beautiful JSON formatting

---

## 🔧 Environment Variables

Both collections use the same environment variables:

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `base_url` | `http://localhost:8080` | API base URL |
| `jwt_token` | `""` | JWT authentication token (auto-populated in Postman) |
| `test_username` | `testuser` | Username for registration testing |
| `test_email` | `testuser@example.com` | Email for registration testing |
| `test_password` | `password123` | Password for testing |
| `login_username` | `admin` | Username for login testing |
| `login_password` | `admin123` | Password for login testing |
| `user_id` | `1` | User ID for update/delete operations |
| `role_id` | `1` | Role ID for role operations |
| `permission_id` | `1` | Permission ID for permission operations |

---

## 🧪 Quick Test Workflow

### Option 1: Use Pre-configured Test Requests
Both collections include a **"Quick Test Workflow"** folder with:
1. **Register Test User** - Creates `apitest` user
2. **Login Test User** - Authenticates and gets token
3. **Get Test User Info** - Retrieves user details

### Option 2: Manual Testing
1. **Register**: Use any username/email/password
2. **Login**: Use the same credentials
3. **Copy Token**: From login response (manual in Insomnia)
4. **Test Endpoints**: Use the token for authenticated requests

---

## 📊 API Endpoint Coverage

Both collections include all **11 API endpoints**:

### Authentication (Public)
- ✅ `POST /api/users/register` - User registration
- ✅ `POST /api/users/login` - User login with JWT response

### User Management (Authenticated)
- ✅ `GET /api/users/{username}` - Get user by username
- ✅ `PUT /api/users/{userId}` - Update user (Admin only)
- ✅ `DELETE /api/users/{userId}` - Delete user (Admin only)

### Role Management (Authenticated)
- ✅ `POST /api/roles/create` - Create new role
- ✅ `GET /api/roles/list` - List all roles
- ✅ `DELETE /api/roles/delete/{id}` - Delete role

### Permission Management (Authenticated)
- ✅ `POST /api/permissions` - Create permission
- ✅ `GET /api/permissions` - List all permissions
- ✅ `DELETE /api/permissions/{id}` - Delete permission

---

## 🔒 Authentication Flow

### Standard Flow:
1. **Register** a user (or use existing credentials)
2. **Login** to get JWT token
3. **Use token** in Authorization header: `Bearer <your_jwt_token>`
4. **Test endpoints** with proper authentication

### Token Management:
- **Postman**: Token automatically stored after login
- **Insomnia**: Manual copy-paste of token to environment

---

## 🛠️ Troubleshooting

### Common Issues:

**1. "401 Unauthorized" Error**
- ✅ Ensure JWT token is properly set in environment
- ✅ Check token hasn't expired (1 hour expiration)
- ✅ Re-login to get fresh token

**2. "403 Forbidden" Error**
- ✅ Check if endpoint requires admin role
- ✅ Login with admin credentials if needed
- ✅ Verify user has proper permissions

**3. "Connection Refused" Error**
- ✅ Ensure Spring Boot application is running
- ✅ Verify base_url is correct (`http://localhost:8080`)
- ✅ Check if port 8080 is in use

**4. Variables Not Working**
- **Postman**: Use `{{variable_name}}` format
- **Insomnia**: Use `{{ _.variable_name }}` format
- ✅ Ensure environment is selected in Postman

---

## 🔄 Updating Collections

### When API Changes:
1. **Export** updated collection from Postman/Insomnia
2. **Replace** the existing JSON files
3. **Update** environment variables if needed
4. **Test** all endpoints to ensure compatibility

### Version Control:
- Collections are in JSON format for easy version control
- Include in your project repository
- Share with team members for consistent testing

---

## 📚 Additional Features

### Postman Advanced Features:
- **Tests**: Automatic response validation
- **Scripts**: Pre-request and post-response processing
- **Monitors**: Automated testing schedules
- **Mock Servers**: API mocking for development

### Insomnia Advanced Features:
- **Plugins**: Extend functionality
- **Code Generation**: Generate code snippets
- **GraphQL Support**: For future GraphQL endpoints
- **Design Documents**: API documentation

---

## 🎯 Best Practices

1. **Always test in order**: Register → Login → Use authenticated endpoints
2. **Use environment variables**: Don't hardcode values
3. **Keep tokens secure**: Don't share JWT tokens
4. **Test error cases**: Try invalid tokens, missing fields, etc.
5. **Update regularly**: Keep collections in sync with API changes

---

## 📞 Support

For issues with the API collections:
1. Check the [API Endpoint Guide](API_Endpoint_Guide.md)
2. Verify your Spring Boot application is running
3. Test with curl commands first to isolate issues
4. Check application logs for detailed error messages

---

*Created: October 14, 2025*  
*Collections Version: 1.0*  
*Compatible with: Postman 10.x+, Insomnia 2023.x+*