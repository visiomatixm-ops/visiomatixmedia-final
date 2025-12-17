#!/bin/bash

echo "=== COMPREHENSIVE ADMIN PANEL API DEBUGGING ==="
echo ""

BASE_URL="http://localhost:8080/api"
FRONTEND_URL="http://localhost:5174"

echo "🔍 Testing API Endpoints and Authentication Flow"
echo ""

# Test 1: Check if backend is responding
echo "1. Testing backend connectivity..."
RESPONSE=$(curl -s -w "%{http_code}" -o /tmp/response.txt $BASE_URL/users/login 2>/dev/null)
echo "   Backend Response Code: $RESPONSE"

if [ "$RESPONSE" = "000" ]; then
    echo "   ❌ Backend is NOT accessible"
    echo "   Please start the backend service first"
    exit 1
else
    echo "   ✅ Backend is accessible"
fi
echo ""

# Test 2: Test Admin Login
echo "2. Testing Admin User Login..."
ADMIN_RESPONSE=$(curl -s -X POST $BASE_URL/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}' \
  -w "\nHTTP_CODE:%{http_code}")

ADMIN_CODE=$(echo "$ADMIN_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
ADMIN_BODY=$(echo "$ADMIN_RESPONSE" | grep -v "HTTP_CODE:")

echo "   Admin Login Response Code: $ADMIN_CODE"
echo "   Admin Response Body: $ADMIN_BODY"

if [ "$ADMIN_CODE" = "200" ]; then
    echo "   ✅ Admin login successful"
    
    # Extract token and other data
    ADMIN_TOKEN=$(echo "$ADMIN_BODY" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    ADMIN_ROLE=$(echo "$ADMIN_BODY" | grep -o '"role":"[^"]*"' | cut -d'"' -f4)
    ADMIN_PRIVILEGES=$(echo "$ADMIN_BODY" | grep -o '"privileges":\[[^]]*\]')
    
    echo "   📋 Admin Token: ${ADMIN_TOKEN:0:50}..."
    echo "   📋 Admin Role: $ADMIN_ROLE"
    echo "   📋 Admin Privileges: $ADMIN_PRIVILEGES"
else
    echo "   ❌ Admin login failed"
    echo "   Response: $ADMIN_BODY"
fi
echo ""

# Test 3: Test Kaal User Login
echo "3. Testing Kaal User Login..."
KAAL_RESPONSE=$(curl -s -X POST $BASE_URL/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"kaal","password":"kaal123"}' \
  -w "\nHTTP_CODE:%{http_code}")

KAAL_CODE=$(echo "$KAAL_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
KAAL_BODY=$(echo "$KAAL_RESPONSE" | grep -v "HTTP_CODE:")

echo "   Kaal Login Response Code: $KAAL_CODE"
echo "   Kaal Response Body: $KAAL_BODY"

if [ "$KAAL_CODE" = "200" ]; then
    echo "   ✅ Kaal login successful"
    
    # Extract token and other data
    KAAL_TOKEN=$(echo "$KAAL_BODY" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    KAAL_ROLE=$(echo "$KAAL_BODY" | grep -o '"role":"[^"]*"' | cut -d'"' -f4)
    KAAL_PRIVILEGES=$(echo "$KAAL_BODY" | grep -o '"privileges":\[[^]]*\]')
    
    echo "   📋 Kaal Token: ${KAAL_TOKEN:0:50}..."
    echo "   📋 Kaal Role: $KAAL_ROLE"
    echo "   📋 Kaal Privileges: $KAAL_PRIVILEGES"
else
    echo "   ❌ Kaal login failed"
    echo "   Trying different password..."
    
    # Try common passwords
    for pwd in "kaal" "password" "123456" "admin"; do
        echo "   Trying password: $pwd"
        TEST_RESPONSE=$(curl -s -X POST $BASE_URL/users/login \
          -H "Content-Type: application/json" \
          -d "{\"username\":\"kaal\",\"password\":\"$pwd\"}" \
          -w "\nHTTP_CODE:%{http_code}")
        
        TEST_CODE=$(echo "$TEST_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
        if [ "$TEST_CODE" = "200" ]; then
            echo "   ✅ Found working password: $pwd"
            KAAL_TOKEN=$(echo "$TEST_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
            KAAL_ROLE=$(echo "$TEST_RESPONSE" | grep -o '"role":"[^"]*"' | cut -d'"' -f4)
            KAAL_PRIVILEGES=$(echo "$TEST_RESPONSE" | grep -o '"privileges":\[[^]]*\]')
            echo "   📋 Kaal Role: $KAAL_ROLE"
            echo "   📋 Kaal Privileges: $KAAL_PRIVILEGES"
            break
        fi
    done
fi
echo ""

# Test 4: Test Admin API endpoints with tokens
echo "4. Testing Admin API Endpoints..."

if [ -n "$ADMIN_TOKEN" ]; then
    echo "   Testing with Admin token..."
    
    # Test users endpoint
    USERS_RESPONSE=$(curl -s -H "Authorization: Bearer $ADMIN_TOKEN" $BASE_URL/admin/users)
    echo "   📋 Users Endpoint Response: $(echo $USERS_RESPONSE | head -c 100)..."
    
    # Test roles endpoint
    ROLES_RESPONSE=$(curl -s -H "Authorization: Bearer $ADMIN_TOKEN" $BASE_URL/admin/roles)
    echo "   📋 Roles Endpoint Response: $(echo $ROLES_RESPONSE | head -c 100)..."
    
    # Test privileges endpoint
    PRIVS_RESPONSE=$(curl -s -H "Authorization: Bearer $ADMIN_TOKEN" $BASE_URL/admin/privileges)
    echo "   📋 Privileges Endpoint Response: $(echo $PRIVS_RESPONSE | head -c 100)..."
fi
echo ""

# Test 5: Test Kaal API endpoints with token
echo "5. Testing Kaal User API Endpoints..."

if [ -n "$KAAL_TOKEN" ]; then
    echo "   Testing with Kaal token..."
    
    # Test users endpoint
    KAAL_USERS_RESPONSE=$(curl -s -H "Authorization: Bearer $KAAL_TOKEN" $BASE_URL/admin/users -w "\nHTTP_CODE:%{http_code}")
    KAAL_USERS_CODE=$(echo "$KAAL_USERS_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
    echo "   📋 Kaal Users Access - HTTP Code: $KAAL_USERS_CODE"
    
    # Test roles endpoint
    KAAL_ROLES_RESPONSE=$(curl -s -H "Authorization: Bearer $KAAL_TOKEN" $BASE_URL/admin/roles -w "\nHTTP_CODE:%{http_code}")
    KAAL_ROLES_CODE=$(echo "$KAAL_ROLES_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
    echo "   📋 Kaal Roles Access - HTTP Code: $KAAL_ROLES_CODE"
    
    # Test privileges endpoint
    KAAL_PRIVS_RESPONSE=$(curl -s -H "Authorization: Bearer $KAAL_TOKEN" $BASE_URL/admin/privileges -w "\nHTTP_CODE:%{http_code}")
    KAAL_PRIVS_CODE=$(echo "$KAAL_PRIVS_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
    echo "   📋 Kaal Privileges Access - HTTP Code: $KAAL_PRIVS_CODE"
fi
echo ""

# Test 6: Check database data
echo "6. Checking Database Data (Manual verification needed)"
echo "   Run these MySQL queries to verify data:"
echo ""
echo "   -- Check if Kaal user exists and has correct role"
echo "   SELECT u.id, u.username, u.name, r.name as role_name"
echo "   FROM users u"
echo "   JOIN user_roles ur ON u.id = ur.user_id"
echo "   JOIN roles r ON ur.role_id = r.id"
echo "   WHERE u.username = 'kaal';"
echo ""
echo "   -- Check CUSTOMER_SUCCESS_MANAGER role privileges"
echo "   SELECT p.name as privilege_name"
echo "   FROM roles r"
echo "   JOIN role_privileges rp ON r.id = rp.role_id"
echo "   JOIN privileges p ON rp.privilege_id = p.id"
echo "   WHERE r.name = 'ROLE_CUSTOMER_SUCCESS_MANAGER';"
echo ""

echo "=== ANALYSIS AND RECOMMENDATIONS ==="
echo ""

# Analysis
echo "🔍 ISSUE ANALYSIS:"
echo ""

if [ -z "$KAAL_TOKEN" ]; then
    echo "❌ CRITICAL: Kaal user cannot authenticate"
    echo "   → Check if user exists in database"
    echo "   → Verify correct password"
    echo "   → Check password encoding"
elif [ "$KAAL_USERS_CODE" = "403" ] || [ "$KAAL_USERS_CODE" = "401" ]; then
    echo "❌ CRITICAL: Kaal user lacks admin privileges"
    echo "   → Check role assignments in database"
    echo "   → Verify CUSTOMER_SUCCESS_MANAGER role exists"
    echo "   → Check role-privilege mappings"
elif [ "$KAAL_USERS_CODE" = "200" ]; then
    echo "✅ Kaal user has admin access to backend"
    echo "   → Issue is likely in frontend privilege checking"
    echo "   → Check frontend JWT token parsing"
    echo "   → Verify Admin panel tab visibility logic"
fi

echo ""
echo "🚀 NEXT STEPS:"
echo "1. If Kaal cannot login → Check database and password"
echo "2. If Kaal can login but backend returns 403 → Fix role assignments"
echo "3. If Kaal can access backend but frontend shows no tabs → Fix frontend logic"
echo "4. Run frontend with browser console open to see detailed errors"
echo ""
echo "🌐 Frontend URL: $FRONTEND_URL"
echo "🔧 Backend URL: $BASE_URL"