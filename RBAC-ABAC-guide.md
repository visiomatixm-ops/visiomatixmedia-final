# RBAC + ABAC Hybrid Access Control Technical Guide

## Table of Contents
1. [System Architecture Overview](#system-architecture-overview)
2. [Core Components and Responsibilities](#core-components-and-responsibilities)
3. [Method-Level Technical Analysis](#method-level-technical-analysis)
4. [Troubleshooting Flow](#troubleshooting-flow)
5. [Frontend Integration Analysis](#frontend-integration-analysis)
6. [Specific Issue: User "kaal" Admin Tab Access](#specific-issue-user-kaal-admin-tab-access)
7. [CURL Testing Scripts](#curl-testing-scripts)
8. [Common Issues and Solutions](#common-issues-and-solutions)

## System Architecture Overview

The system implements a **hybrid RBAC (Role-Based Access Control) + ABAC (Attribute-Based Access Control)** model with the following key components:

### RBAC Components
- **Roles**: Standard roles (ROLE_ADMIN, ROLE_AGENT, ROLE_USER) with direct permissions
- **Custom Roles**: Dynamic roles with privileges and ABAC attributes
- **Permissions**: Granular permissions (CHAT_ACCESS, ADMIN_ACCESS, USER_MANAGEMENT, etc.)
- **Privileges**: Groups of permissions (ACCESS_ROLE_MANAGEMENT, ACCESS_USER_MANAGEMENT, etc.)

### ABAC Components
- **ABAC Attributes**: Key-value pairs stored in custom roles for fine-grained access control
- **Policy Engine**: `AbacPolicyEngine` for evaluating attribute-based policies
- **JWT Integration**: ABAC context embedded in JWT tokens

### Hybrid Flow
```
User Login → JWT Generation → Authorities Loading → Access Control Evaluation
```

## Core Components and Responsibilities

### Backend Java Components

#### 1. Models (Data Entities)
| Component | Location | Responsibility |
|-----------|----------|----------------|
| `Role.java` | `user/model/Role.java` | Standard RBAC roles with permissions and privileges |
| `CustomRole.java` | `user/model/CustomRole.java` | Dynamic roles with ABAC attributes |
| `Permission.java` | `user/model/Permission.java` | Individual permissions with types and resource patterns |
| `Privilege.java` | `user/model/Privilege.java` | Permission groups with many-to-many relationships |

#### 2. Services (Business Logic)
| Component | Location | Responsibility |
|-----------|----------|----------------|
| `CustomUserDetailsService.java` | `user/service/CustomUserDetailsService.java` | **CRITICAL** - Loads user authorities from roles and privileges |
| `RoleService.java` | `user/service/RoleService.java` | Standard role CRUD operations |
| `CustomRoleService.java` | `user/service/CustomRoleService.java` | Custom role management with ABAC attributes |
| `PermissionService.java` | `user/service/PermissionService.java` | Permission management |
| `PrivilegeServiceImpl.java` | `user/service/PrivilegeServiceImpl.java` | Privilege CRUD with permission associations |
| `AbacPolicyEngine.java` | `user/service/AbacPolicyEngine.java` | ABAC policy evaluation engine |

#### 3. Controllers (REST API)
| Component | Location | Responsibility |
|-----------|----------|----------------|
| `CustomRoleController.java` | `user/controller/CustomRoleController.java` | Custom role API endpoints |
| `RoleController.java` | `user/controller/RoleController.java` | Standard role API endpoints |
| `PermissionController.java` | `user/controller/PermissionController.java` | Permission management API |
| `AdminController.java` | `user/controller/AdminController.java` | Admin operations combining all access controls |

#### 4. Security Configuration
| Component | Location | Responsibility |
|-----------|----------|----------------|
| `SecurityConfig.java` | `config/SecurityConfig.java` | Spring Security configuration with RBAC + ABAC rules |
| `JwtAuthenticationFilter.java` | `config/JwtAuthenticationFilter.java` | JWT authentication with ABAC context extraction |

#### 5. Utilities
| Component | Location | Responsibility |
|-----------|----------|----------------|
| `JwtUtil.java` | `user/util/JwtUtil.java` | JWT token generation with ABAC context |
| `DataSeeder.java` | `user/util/DataSeeder.java` | Initializes default roles, permissions, and privileges |

### Frontend Components

#### React Components
| Component | Location | Responsibility |
|-----------|----------|----------------|
| `AdminPanel.tsx` | `pages/AdminPanel.tsx` | Main admin interface with privilege-based tab access |
| `RolesTab.tsx` | `components/admin/RolesTab.tsx` | Role management UI |
| `AgentDashboard.tsx` | `pages/AgentDashboard.tsx` | Agent console with admin tab access control |
| `api.ts` | `api/api.ts` | API client for backend communication |

## Method-Level Technical Analysis

### Critical Methods in CustomUserDetailsService.java

#### `loadUserByUsername(String username)`
**Location**: `CustomUserDetailsService.java:40-101`
**Purpose**: Loads user authorities from both standard roles and custom roles
**Algorithm**:
1. Fetch user from database
2. Initialize authorities set
3. Process standard roles → extract permissions + privileges → add to authorities
4. Process custom roles → extract privileges + permissions + ABAC attributes → add to authorities
5. Convert to GrantedAuthority objects
6. Return UserDetails with all authorities

**Key Logic for Permission Mapping**:
```java
// For custom roles - CRITICAL FIX
if (customRole.getPrivileges() != null) {
    authorities.addAll(customRole.getPrivileges().stream()
            .map(Privilege::getName)
            .collect(Collectors.toSet()));

    // Add permissions from privileges (granular permission mapping)
    authorities.addAll(customRole.getPrivileges().stream()
            .filter(privilege -> privilege.getPermissions() != null)
            .flatMap(privilege -> privilege.getPermissions().stream())
            .map(Permission::getName)
            .collect(Collectors.toSet()));
}
```

### Security Configuration Methods

#### Security Filter Chain Configuration
**Location**: `SecurityConfig.java:108-161`
**Key Rules**:
```java
// ABAC-aware admin endpoints
.requestMatchers("/api/admin/users/*/chat-stats/**").hasAnyAuthority("ACCESS_STATISTICS_TAB", "ROLE_ADMIN")
.requestMatchers("/api/admin/users/**").hasAnyAuthority("ACCESS_USER_MANAGEMENT", "ROLE_ADMIN")
.requestMatchers("/api/admin/roles/**").hasAnyAuthority("ACCESS_ROLE_MANAGEMENT", "ROLE_ADMIN")
```

### JWT Token Methods

#### `generateTokenWithAuthorities()`
**Location**: `JwtUtil.java:122-137`
**Purpose**: Embeds RBAC + ABAC authorities in JWT claims

#### `extractAuthoritiesFromAbacToken()`
**Location**: `JwtUtil.java:179-???`
**Purpose**: Extracts authorities from JWT for authentication

## Troubleshooting Flow

### Step 1: Verify User Authentication
```bash
# Check if user can login and get JWT token
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"kaal","password":"password"}'
```

### Step 2: Decode JWT Token
```bash
# Extract and decode JWT to check authorities
# Use jwt.io or manual decoding
echo "eyJhbGciOiJIUzI1NiJ9..." | cut -d'.' -f2 | base64 -d
```

### Step 3: Check User Roles and Custom Roles
```bash
# Get user details
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8080/api/admin/users/username/kaal
```

### Step 4: Verify Custom Role Configuration
```bash
# Check custom roles assigned to user
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8080/api/custom-roles/all
```

### Step 5: Test Privilege-Permission Mapping
```bash
# Check if privileges contain required permissions
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8080/api/admin/privileges
```

### Step 6: Test Admin Endpoint Access
```bash
# Try accessing admin roles endpoint
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8080/api/admin/roles
```

## Frontend Integration Analysis

### AdminPanel.tsx Privilege Checking
**Location**: `AdminPanel.tsx:586-593`
**Current Implementation**:
```javascript
const hasPrivilege = (privilegeName: string) => {
    // TODO: Implement proper privilege checking by decoding JWT token
    return true; // Currently returns true for all
};
```

**Issue**: Frontend doesn't actually check JWT token for privileges - always returns true!

### AgentDashboard.tsx Admin Tab Access
**Location**: `AgentDashboard.tsx:556-566`
**Logic**:
```javascript
{(userRole === "ROLE_ADMIN" ||
  userPrivileges?.includes('ACCESS_ROLE_MANAGEMENT') ||
  userPrivileges?.includes('ACCESS_PERMISSION_MANAGEMENT') ||
  userPrivileges?.includes('ACCESS_USER_MANAGEMENT')) && (
  // Admin Panel Tab
)}
```

**Problem**: `userPrivileges` comes from props but may not be properly extracted from JWT.

## Specific Issue: User "kaal" Admin Tab Access

### Root Cause Analysis

1. **Backend Permission Mapping Issue** (FIXED):
   - CustomUserDetailsService was not including permissions from privileges in custom roles
   - Fixed by adding privilege permission extraction

2. **Frontend Privilege Checking Issue** (NOT FIXED):
   - AdminPanel.tsx has placeholder privilege checking that always returns true
   - AgentDashboard.tsx relies on props that may not be properly populated

3. **JWT Authority Extraction Issue**:
   - Frontend may not be properly extracting authorities from JWT token

### Step-by-Step Diagnosis for User "kaal"

#### 1. Check User's Current Roles and Custom Roles
```bash
curl -X GET "http://localhost:8080/api/admin/users/username/kaal" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT"
```

#### 2. Check Custom Role Details
```bash
curl -X GET "http://localhost:8080/api/custom-roles/all" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT"
```

#### 3. Verify Privilege-Permission Relationships
```bash
curl -X GET "http://localhost:8080/api/admin/privileges" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT"
```

#### 4. Test Direct API Access
```bash
# Login as kaal
curl -X POST "http://localhost:8080/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"kaal","password":"kaal123"}'

# Try admin endpoint with kaal's token
curl -X GET "http://localhost:8080/api/admin/roles" \
  -H "Authorization: Bearer KAAL_JWT_TOKEN"
```

#### 5. Check JWT Token Contents
Decode the JWT token to verify authorities are included:
- Should contain: `["ROLE_CUSTOM_ROLE_NAME", "ACCESS_ROLE_MANAGEMENT", "ADMIN_ACCESS", ...]`

## CURL Testing Scripts

### Complete Testing Suite

```bash
#!/bin/bash

# Configuration
API_BASE="http://localhost:8080/api"
ADMIN_USER="admin"
ADMIN_PASS="admin123"

echo "=== RBAC + ABAC Testing Suite ==="

# 1. Admin Login
echo "1. Admin Login..."
ADMIN_TOKEN=$(curl -s -X POST "$API_BASE/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"$ADMIN_USER\",\"password\":\"$ADMIN_PASS\"}" | jq -r '.token')

if [ "$ADMIN_TOKEN" = "null" ] || [ -z "$ADMIN_TOKEN" ]; then
    echo "❌ Admin login failed"
    exit 1
fi
echo "✅ Admin login successful"

# 2. Create Custom Role with Privileges
echo "2. Creating custom role with ACCESS_ROLE_MANAGEMENT privilege..."
CREATE_RESPONSE=$(curl -s -X POST "$API_BASE/custom-roles/create" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TEST_ADMIN_ROLE",
    "description": "Test admin role",
    "privilegeNames": ["ACCESS_ROLE_MANAGEMENT", "ACCESS_USER_MANAGEMENT"],
    "createdBy": "admin"
  }')

echo "Create response: $CREATE_RESPONSE"

# 3. Create Test User
echo "3. Creating test user 'kaal'..."
USER_RESPONSE=$(curl -s -X POST "$API_BASE/admin/users" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "kaal",
    "email": "kaal@test.com",
    "name": "Kaal Test",
    "password": "kaal123",
    "roles": ["TEST_ADMIN_ROLE"]
  }')

echo "User creation response: $USER_RESPONSE"

# 4. Assign Custom Role to User
echo "4. Assigning custom role to user..."
ASSIGN_RESPONSE=$(curl -s -X POST "$API_BASE/custom-roles/assign/USER_ID/ROLE_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

echo "Assignment response: $ASSIGN_RESPONSE"

# 5. Test User Login
echo "5. Testing user login..."
USER_TOKEN=$(curl -s -X POST "$API_BASE/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"kaal","password":"kaal123"}' | jq -r '.token')

if [ "$USER_TOKEN" = "null" ] || [ -z "$USER_TOKEN" ]; then
    echo "❌ User login failed"
    exit 1
fi
echo "✅ User login successful"

# 6. Decode JWT to check authorities
echo "6. Decoding JWT token..."
JWT_PAYLOAD=$(echo $USER_TOKEN | cut -d'.' -f2 | base64 -d 2>/dev/null)
echo "JWT Payload: $JWT_PAYLOAD"

# 7. Test Admin Endpoint Access
echo "7. Testing admin endpoint access..."
ADMIN_ACCESS=$(curl -s -w "%{http_code}" -X GET "$API_BASE/admin/roles" \
  -H "Authorization: Bearer $USER_TOKEN" -o /dev/null)

if [ "$ADMIN_ACCESS" = "200" ]; then
    echo "✅ Admin endpoint access successful"
else
    echo "❌ Admin endpoint access failed (HTTP $ADMIN_ACCESS)"
fi

echo "=== Testing Complete ==="
```

## Common Issues and Solutions

### Issue 1: Custom Role Permissions Not Working
**Symptoms**: User has custom role but can't access admin functions
**Cause**: CustomUserDetailsService not including permissions from privileges
**Solution**: Ensure the fix in CustomUserDetailsService.java is applied

### Issue 2: Frontend Privilege Checking Not Working
**Symptoms**: Admin tabs visible but API calls fail
**Cause**: AdminPanel.tsx has placeholder privilege checking
**Solution**: Implement proper JWT token parsing in frontend

### Issue 3: ABAC Attributes Not Applied
**Symptoms**: Role-based access works but attribute-based policies fail
**Cause**: ABAC attributes not included in JWT or policy engine not evaluating them
**Solution**: Check AbacPolicyEngine.java and JWT generation

### Issue 4: Privilege-Permission Relationships Broken
**Symptoms**: User has privilege but missing specific permissions
**Cause**: privilege_permissions table not properly populated
**Solution**: Check migration V5__create_privilege_permissions_table.sql

### Issue 5: JWT Token Missing Authorities
**Symptoms**: Login successful but no authorities in token
**Cause**: CustomUserDetailsService not loading authorities properly
**Solution**: Debug loadUserByUsername method

## Quick Diagnosis Commands

```bash
# Check running processes
ps aux | grep java

# Check application logs
tail -f visiomatix.chat/chat/logs/application.log

# Test database connectivity
# (Check if privilege_permissions table has data)

# Verify JWT token contents
# Use https://jwt.io debugger
```

## Emergency Fixes

### If Custom Roles Not Working
1. Check CustomUserDetailsService.java has the privilege permission mapping fix
2. Restart the application
3. Clear any cached JWT tokens

### If Frontend Issues
1. Check that AgentDashboard receives proper userRole and userPrivileges props
2. Implement JWT token decoding in AdminPanel.tsx hasPrivilege function
3. Verify API calls include proper Authorization headers

This comprehensive guide covers the complete RBAC + ABAC hybrid system implementation, troubleshooting methodologies, and specific solutions for the user "kaal" admin tab access issue.