#!/bin/bash

echo "=== INTEGRATED ADMIN DASHBOARD TEST ==="
echo ""

echo "🔍 Testing the new integrated dashboard approach..."
echo "This removes the separate 'Admin Panel' tab and integrates all admin functionality directly into the main interface."
echo ""

# Check if frontend is running
echo "1. Checking services..."
if curl -s --connect-timeout 2 http://localhost:5174 >/dev/null; then
    echo "   ✅ Frontend running: http://localhost:5174"
else
    echo "   ❌ Frontend not running"
    echo "   Start with: cd agent-frontend && npm run dev"
fi

if curl -s --connect-timeout 2 http://localhost:8080/api/users/login >/dev/null; then
    echo "   ✅ Backend running: http://localhost:8080"
else
    echo "   ❌ Backend not running"
    echo "   Start with: cd visiomatix.chat/chat && ./mvnw spring-boot:run"
fi

echo ""
echo "2. Testing login credentials..."

# Test admin login
ADMIN_LOGIN=$(curl -s -X POST http://localhost:8080/api/users/login \
    -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"Admin@123"}' \
    -w "HTTP_CODE:%{http_code}")

ADMIN_CODE=$(echo "$ADMIN_LOGIN" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)

if [ "$ADMIN_CODE" = "200" ]; then
    echo "   ✅ Admin login successful (Admin@123)"
    ADMIN_PRIVILEGES=$(echo "$ADMIN_LOGIN" | grep -o '"privileges":\[[^]]*\]' || echo "No privileges")
    echo "   📋 Admin privileges: $ADMIN_PRIVILEGES"
else
    echo "   ❌ Admin login failed (HTTP $ADMIN_CODE)"
fi

echo ""

# Test Kaal login
KAAL_LOGIN=$(curl -s -X POST http://localhost:8080/api/users/login \
    -H "Content-Type: application/json" \
    -d '{"username":"kaal","password":"admin123"}' \
    -w "HTTP_CODE:%{http_code}")

KAAL_CODE=$(echo "$KAAL_LOGIN" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)

if [ "$KAAL_CODE" = "200" ]; then
    echo "   ✅ Kaal login successful (admin123)"
    KAAL_PRIVILEGES=$(echo "$KAAL_LOGIN" | grep -o '"privileges":\[[^]]*\]' || echo "No privileges")
    echo "   📋 Kaal privileges: $KAAL_PRIVILEGES"
else
    echo "   ❌ Kaal login failed (HTTP $KAAL_CODE)"
    echo "   ⚠️  Note: Your earlier console logs showed Kaal login working with different credentials"
fi

echo ""
echo "=== INTEGRATED DASHBOARD CHANGES ==="
echo ""

echo "✅ WHAT'S NEW:"
echo "  📄 IntegratedAdminDashboard.tsx - New integrated interface"
echo "  🔄 Updated App.tsx - Uses integrated dashboard by default"
echo "  ❌ Removed separate 'Admin Panel' tab"
echo "  ✅ All admin functionality now in main tabs"
echo ""

echo "🗂️ NEW TAB STRUCTURE:"
echo "  💬 Chats - Live chat functionality"
echo "  📊 Dashboard - System overview & statistics"
echo "  👥 Users - User management"
echo "  🔑 Roles - Role management"
echo "  🛡️ Permissions - Permission management" 
echo "  ⚡ Privileges - Privilege management"
echo "  📚 Chat History - Admin chat history"
echo ""

echo "🔧 KEY IMPROVEMENTS:"
echo "  • No need for separate 'Admin Panel' navigation"
echo "  • All admin functions immediately visible"
echo "  • Clean integration with existing chat functionality"
echo "  • Maintains all privilege checking"
echo "  • Enhanced UI with color-coded tabs"
echo ""

echo "🧪 TESTING STEPS:"
echo "1. Open browser to: http://localhost:5174"
echo "2. Login as admin (Admin@123) or kaal (admin123)"
echo "3. You should see 7 colored tabs immediately:"
echo "   - Blue: Chats"
echo "   - Green: Dashboard" 
echo "   - Red: Users"
echo "   - Orange: Roles"
echo "   - Purple: Permissions"
echo "   - Teal: Privileges"
echo "   - Yellow: Chat History"
echo "4. Click any tab to access admin functionality"
echo "5. All functionality should work without separate navigation"
echo ""

echo "💡 EXPECTED RESULTS:"
echo "  ✅ All admin tabs visible and accessible"
echo "  ✅ No separate 'Admin Panel' tab needed"
echo "  ✅ Smooth navigation between all features"
echo "  ✅ All user/role/permission management works"
echo "  ✅ Chat functionality preserved and enhanced"
echo ""

echo "🌐 ACCESS THE INTEGRATED DASHBOARD:"
echo "   Frontend: http://localhost:5174"
echo "   Backend:  http://localhost:8080/api"
echo ""

echo "=== SUMMARY ==="
echo ""
echo "The integrated dashboard solution removes the complexity of"
echo "separate admin panel navigation and makes all admin features"
echo "immediately accessible through colored tabs in the main interface."
echo ""
echo "This approach is cleaner, more user-friendly, and ensures all"
echo "admin functionality is prominently displayed for authorized users."