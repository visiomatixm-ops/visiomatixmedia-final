#!/bin/bash

echo "=== COMPLETE ADMIN PANEL FIX AND TESTING ==="
echo ""

# Step 1: Test if backend is running
echo "1. Testing backend connectivity..."
if curl -s --connect-timeout 3 http://localhost:8080/api/users/login >/dev/null 2>&1; then
    echo "   ✅ Backend is running"
else
    echo "   ❌ Backend is not running!"
    echo "   Please start backend first:"
    echo "   cd visiomatix.chat/chat && ./mvnw spring-boot:run"
    exit 1
fi

echo ""

# Step 2: Test Kaal login with common passwords
echo "2. Testing Kaal login with various passwords..."

PASSWORD_TRIES=("kaal123" "kaal" "password" "123456" "admin" "test" "KAAL123")
WORKING_PASSWORD=""

for pwd in "${PASSWORD_TRIES[@]}"; do
    echo "   Trying password: $pwd"
    
    RESPONSE=$(curl -s -X POST http://localhost:8080/api/users/login \
        -H "Content-Type: application/json" \
        -d "{\"username\":\"kaal\",\"password\":\"$pwd\"}" \
        -w "\nHTTP_CODE:%{http_code}")
    
    CODE=$(echo "$RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
    
    if [ "$CODE" = "200" ]; then
        echo "   ✅ SUCCESS! Working password found: $pwd"
        WORKING_PASSWORD="$pwd"
        break
    else
        echo "   ❌ Failed (HTTP $CODE)"
    fi
done

if [ -z "$WORKING_PASSWORD" ]; then
    echo ""
    echo "   🔧 ISSUE: Kaal user cannot authenticate with any common password"
    echo "   📋 SOLUTION: You need to update the password in the database"
    echo ""
    echo "   Run this SQL command in your database:"
    echo "   UPDATE users SET password = '\$2a\$10\$lygvpBKDacr01mEaq0jChOQlhPnenDg3KtT8p4byGC8wIq2qiTP4q' WHERE username = 'kaal';"
    echo ""
    echo "   This will set Kaal's password to 'kaal123'"
    echo ""
    echo "   After running the SQL, test again with:"
    echo "   username: kaal"
    echo "   password: kaal123"
    echo ""
else
    echo ""
    echo "   ✅ Kaal can login with password: $WORKING_PASSWORD"
fi

# Step 3: Test Admin login
echo "3. Testing Admin login..."
ADMIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/users/login \
    -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"Admin@123"}' \
    -w "\nHTTP_CODE:%{http_code}")

ADMIN_CODE=$(echo "$ADMIN_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
ADMIN_BODY=$(echo "$ADMIN_RESPONSE" | grep -v "HTTP_CODE:")

if [ "$ADMIN_CODE" = "200" ]; then
    echo "   ✅ Admin login successful"
    
    # Extract admin token
    ADMIN_TOKEN=$(echo "$ADMIN_BODY" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    ADMIN_PRIVILEGES=$(echo "$ADMIN_BODY" | grep -o '"privileges":\[[^]]*\]')
    
    echo "   📋 Admin privileges: $ADMIN_PRIVILEGES"
else
    echo "   ❌ Admin login failed (HTTP $ADMIN_CODE)"
fi

# Step 4: Test API endpoints with Admin token
echo ""
echo "4. Testing Admin API endpoints..."

if [ -n "$ADMIN_TOKEN" ]; then
    ENDPOINTS=(
        "admin/users"
        "admin/roles"
        "admin/privileges"
        "admin/permissions"
    )
    
    for endpoint in "${ENDPOINTS[@]}"; do
        RESPONSE=$(curl -s -H "Authorization: Bearer $ADMIN_TOKEN" \
            "http://localhost:8080/api/$endpoint" \
            -w "\nHTTP_CODE:%{http_code}")
        
        CODE=$(echo "$RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
        
        if [ "$CODE" = "200" ]; then
            echo "   ✅ $endpoint - Access granted"
        else
            echo "   ❌ $endpoint - HTTP $CODE"
        fi
    done
fi

# Step 5: Summary and next steps
echo ""
echo "=== SUMMARY ==="
echo ""

if [ -n "$WORKING_PASSWORD" ]; then
    echo "✅ KAAL USER READY FOR TESTING:"
    echo "   Username: kaal"
    echo "   Password: $WORKING_PASSWORD"
    echo ""
    echo "🚀 NEXT STEPS:"
    echo "1. Open frontend: http://localhost:5174"
    echo "2. Login with kaal / $WORKING_PASSWORD"
    echo "3. Check if Admin Panel tabs are visible"
    echo "4. If tabs are still missing, check browser console"
else
    echo "❌ KAAL USER NEEDS PASSWORD RESET"
    echo ""
    echo "📋 IMMEDIATE ACTION REQUIRED:"
    echo "1. Run the SQL command provided above to reset password"
    echo "2. Then test login with: kaal / kaal123"
    echo "3. Once login works, test admin panel access"
fi

echo ""
echo "🔧 ADMIN PANEL PRIVILEGE CHECKING:"
echo "✅ Fixed AdminPanel.tsx to properly check user privileges"
echo "✅ Added JWT token parsing for privilege extraction"
echo "✅ Updated AgentDashboard to pass userPrivileges prop"
echo ""

echo "🌐 URLS:"
echo "Frontend: http://localhost:5174"
echo "Backend:  http://localhost:8080/api"
echo ""

echo "📝 If Kaal can login but admin tabs are still not visible:"
echo "1. Check browser console for JavaScript errors"
echo "2. Verify that CUSTOMER_SUCCESS_MANAGER role has correct privileges in DB"
echo "3. Run this SQL to verify role privileges:"
echo "   SELECT p.name FROM roles r"
echo "   JOIN role_privileges rp ON r.id = rp.role_id" 
echo "   JOIN privileges p ON rp.privilege_id = p.id"
echo "   WHERE r.name = 'ROLE_CUSTOMER_SUCCESS_MANAGER';"
echo ""

# Create a simple test HTML page for manual testing
cat > test_admin_access.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel Test</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <h1>Admin Panel Access Test</h1>
    
    <div id="test-results"></div>
    
    <script>
        const API_BASE = 'http://localhost:8080/api';
        const FRONTEND_URL = 'http://localhost:5174';
        
        async function testKaalLogin() {
            try {
                const response = await axios.post(`${API_BASE}/users/login`, {
                    username: 'kaal',
                    password: 'kaal123'
                });
                
                const token = response.data.token;
                const privileges = response.data.privileges || [];
                
                document.getElementById('test-results').innerHTML += `
                    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                        <h3>✅ Kaal Login Success</h3>
                        <p><strong>Username:</strong> ${response.data.username}</p>
                        <p><strong>Role:</strong> ${response.data.role}</p>
                        <p><strong>Privileges:</strong> ${privileges.join(', ')}</p>
                        <p><strong>Token:</strong> ${token.substring(0, 50)}...</p>
                        <p><strong>Expected Admin Tabs:</strong></p>
                        <ul>
                            <li>ACCESS_USER_MANAGEMENT: ${privileges.includes('ACCESS_USER_MANAGEMENT') ? '✅' : '❌'}</li>
                            <li>ACCESS_ROLE_MANAGEMENT: ${privileges.includes('ACCESS_ROLE_MANAGEMENT') ? '✅' : '❌'}</li>
                            <li>ACCESS_PERMISSION_MANAGEMENT: ${privileges.includes('ACCESS_PERMISSION_MANAGEMENT') ? '✅' : '❌'}</li>
                            <li>ACCESS_STATISTICS_TAB: ${privileges.includes('ACCESS_STATISTICS_TAB') ? '✅' : '❌'}</li>
                            <li>ACCESS_CHAT_HISTORY_TAB: ${privileges.includes('ACCESS_CHAT_HISTORY_TAB') ? '✅' : '❌'}</li>
                        </ul>
                    </div>
                `;
                
                // Test admin endpoints
                const endpoints = ['admin/users', 'admin/roles', 'admin/privileges'];
                for (const endpoint of endpoints) {
                    try {
                        const testResponse = await axios.get(`${API_BASE}/${endpoint}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        document.getElementById('test-results').innerHTML += `
                            <div style="color: green; margin: 5px 0;">
                                ✅ ${endpoint} - Access granted (${testResponse.data.length} items)
                            </div>
                        `;
                    } catch (error) {
                        document.getElementById('test-results').innerHTML += `
                            <div style="color: red; margin: 5px 0;">
                                ❌ ${endpoint} - ${error.response?.status}: ${error.response?.data?.message || error.message}
                            </div>
                        `;
                    }
                }
                
                document.getElementById('test-results').innerHTML += `
                    <div style="border: 2px solid #007bff; padding: 15px; margin: 20px 0;">
                        <h3>🚀 Test Frontend Access</h3>
                        <p><a href="${FRONTEND_URL}" target="_blank">Open Frontend</a></p>
                        <p>Login with: <strong>kaal</strong> / <strong>kaal123</strong></p>
                        <p>Look for Admin Panel tabs in the interface</p>
                    </div>
                `;
                
            } catch (error) {
                document.getElementById('test-results').innerHTML += `
                    <div style="border: 1px solid red; padding: 10px; margin: 10px;">
                        <h3>❌ Kaal Login Failed</h3>
                        <p><strong>Error:</strong> ${error.response?.data?.message || error.message}</p>
                        <p><strong>Status:</strong> ${error.response?.status || 'Unknown'}</p>
                        <p>You need to reset Kaal's password in the database first.</p>
                    </div>
                `;
            }
        }
        
        // Auto-run test
        testKaalLogin();
    </script>
</body>
</html>
EOF

echo "📄 Created test page: test_admin_access.html"
echo "   Open this file in your browser to test admin access programmatically"