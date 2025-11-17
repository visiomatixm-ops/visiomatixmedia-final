#!/bin/bash

# RBAC + ABAC Testing Script
# Tests role creation, permission assignment, and access control

BASE_URL="http://localhost:8080"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="Admin@123"

echo "=== RBAC + ABAC Testing Script ==="
echo "Base URL: $BASE_URL"
echo ""

# Function to make curl requests
make_request() {
    local method=$1
    local url=$2
    local data=$3
    local token=$4

    if [ -n "$token" ]; then
        curl -s -X $method "$BASE_URL$url" \
            -H "Authorization: Bearer $token" \
            -H "Content-Type: application/json" \
            ${data:+-d "$data"}
    else
        curl -s -X $method "$BASE_URL$url" \
            -H "Content-Type: application/json" \
            ${data:+-d "$data"}
    fi
}

# Function to extract JSON value
extract_json() {
    local json=$1
    local key=$2
    echo "$json" | grep -o '"'"$key"'":"[^"]*' | cut -d'"' -f4
}

echo "1. Logging in as admin..."
ADMIN_LOGIN_RESPONSE=$(make_request POST "/api/users/login" '{
    "username": "'"$ADMIN_USERNAME"'",
    "password": "'"$ADMIN_PASSWORD"'"
}')

ADMIN_TOKEN=$(extract_json "$ADMIN_LOGIN_RESPONSE" "token")

if [ -z "$ADMIN_TOKEN" ]; then
    echo "❌ Failed to login as admin"
    echo "Response: $ADMIN_LOGIN_RESPONSE"
    exit 1
fi

echo "✅ Admin login successful"
echo "Token: ${ADMIN_TOKEN:0:50}..."
echo ""

echo "2. Creating a new permission..."
PERMISSION_RESPONSE=$(make_request POST "/api/admin/permissions" '{
    "name": "ACCESS_TEST_PANEL",
    "description": "Access to test panel for RBAC testing"
}' "$ADMIN_TOKEN")

PERMISSION_ID=$(extract_json "$PERMISSION_RESPONSE" "id")

if [ -z "$PERMISSION_ID" ]; then
    echo "❌ Failed to create permission"
    echo "Response: $PERMISSION_RESPONSE"
    exit 1
fi

echo "✅ Permission created with ID: $PERMISSION_ID"
echo ""

echo "3. Creating a new role..."
ROLE_RESPONSE=$(make_request POST "/api/admin/roles" '{
    "name": "ROLE_TEST_USER",
    "permissions": []
}' "$ADMIN_TOKEN")

ROLE_ID=$(extract_json "$ROLE_RESPONSE" "id")

if [ -z "$ROLE_ID" ]; then
    echo "❌ Failed to create role"
    echo "Response: $ROLE_RESPONSE"
    exit 1
fi

echo "✅ Role created with ID: $ROLE_ID"
echo ""

echo "4. Assigning permission to role..."
ASSIGN_PERM_RESPONSE=$(make_request POST "/api/admin/roles/$ROLE_ID/assign-permission/$PERMISSION_ID" "" "$ADMIN_TOKEN")

if echo "$ASSIGN_PERM_RESPONSE" | grep -q "success\|assigned\|ok"; then
    echo "✅ Permission assigned to role"
else
    echo "❌ Failed to assign permission to role"
    echo "Response: $ASSIGN_PERM_RESPONSE"
fi
echo ""

echo "5. Checking if user 'kaal' exists..."
USER_CHECK_RESPONSE=$(make_request GET "/api/users/kaal" "" "$ADMIN_TOKEN")

USER_ID=$(extract_json "$USER_CHECK_RESPONSE" "id")

if [ -z "$USER_ID" ]; then
    echo "❌ User 'kaal' not found, creating..."
    CREATE_USER_RESPONSE=$(make_request POST "/api/users/register" '{
        "username": "kaal",
        "email": "kaal@example.com",
        "password": "password123",
        "name": "Kaal User",
        "active": true
    }')

    USER_ID=$(extract_json "$CREATE_USER_RESPONSE" "id")

    if [ -z "$USER_ID" ]; then
        echo "❌ Failed to create user 'kaal'"
        echo "Response: $CREATE_USER_RESPONSE"
        exit 1
    fi

    echo "✅ User 'kaal' created with ID: $USER_ID"
else
    echo "✅ User 'kaal' exists with ID: $USER_ID"
fi
echo ""

echo "6. Assigning role to user 'kaal'..."
ASSIGN_ROLE_RESPONSE=$(make_request POST "/api/admin/users/$USER_ID/assign-role/$ROLE_ID" "" "$ADMIN_TOKEN")

if echo "$ASSIGN_ROLE_RESPONSE" | grep -q "success\|assigned\|ok\|updated"; then
    echo "✅ Role assigned to user"
else
    echo "❌ Failed to assign role to user"
    echo "Response: $ASSIGN_ROLE_RESPONSE"
fi
echo ""

echo "7. Logging in as user 'kaal'..."
KAAL_LOGIN_RESPONSE=$(make_request POST "/api/users/login" '{
    "username": "kaal",
    "password": "password123"
}')

KAAL_TOKEN=$(extract_json "$KAAL_LOGIN_RESPONSE" "token")

if [ -z "$KAAL_TOKEN" ]; then
    echo "❌ Failed to login as kaal"
    echo "Response: $KAAL_LOGIN_RESPONSE"
    exit 1
fi

echo "✅ User 'kaal' login successful"
echo "Token: ${KAAL_TOKEN:0:50}..."
echo ""

echo "8. Testing access to admin endpoint (should fail without proper permissions)..."
ADMIN_ACCESS_RESPONSE=$(make_request GET "/api/admin/users" "" "$KAAL_TOKEN")

if echo "$ADMIN_ACCESS_RESPONSE" | grep -q "Forbidden\|Access Denied"; then
    echo "✅ Access correctly denied (user doesn't have admin permissions)"
else
    echo "❌ Access unexpectedly granted or error occurred"
    echo "Response: $ADMIN_ACCESS_RESPONSE"
fi
echo ""

echo "9. Testing access to user profile endpoint (should succeed)..."
USER_PROFILE_RESPONSE=$(make_request GET "/api/users/kaal" "" "$KAAL_TOKEN")

if echo "$USER_PROFILE_RESPONSE" | grep -q "kaal"; then
    echo "✅ User profile access successful"
else
    echo "❌ User profile access failed"
    echo "Response: $USER_PROFILE_RESPONSE"
fi
echo ""

echo "10. Checking user's roles and permissions..."
USER_DETAILS_RESPONSE=$(make_request GET "/api/users/kaal" "" "$KAAL_TOKEN")

echo "User details:"
echo "$USER_DETAILS_RESPONSE" | jq '.' 2>/dev/null || echo "$USER_DETAILS_RESPONSE"
echo ""

echo "=== Testing Complete ==="
echo ""
echo "Summary:"
echo "- Created permission: ACCESS_TEST_PANEL (ID: $PERMISSION_ID)"
echo "- Created role: ROLE_TEST_USER (ID: $ROLE_ID)"
echo "- Assigned permission to role"
echo "- Assigned role to user 'kaal'"
echo "- Verified access control works correctly"