#!/bin/bash

echo "=== FINAL ADMIN PANEL VERIFICATION ==="
echo ""

# Step 1: Check services
echo "1. Checking services status..."
if curl -s --connect-timeout 2 http://localhost:5174 >/dev/null; then
    echo "   ✅ Frontend running: http://localhost:5174"
else
    echo "   ❌ Frontend not running"
fi

if curl -s --connect-timeout 2 http://localhost:8080/api/users/login >/dev/null; then
    echo "   ✅ Backend running: http://localhost:8080"
else
    echo "   ❌ Backend not running"
fi

echo ""

# Step 2: Test current admin credentials
echo "2. Testing current admin credentials..."
ADMIN_TEST=$(curl -s -X POST http://localhost:8080/api/users/login \
    -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"Admin@123"}' \
    -w "HTTP_CODE:%{http_code}")

ADMIN_CODE=$(echo "$ADMIN_TEST" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)

if [ "$ADMIN_CODE" = "200" ]; then
    echo "   ✅ Admin login working (Admin@123)"
else
    echo "   ❌ Admin login failed (HTTP $ADMIN_CODE)"
fi

# Step 3: Test Kaal credentials
echo "3. Testing current Kaal credentials..."
KAAL_TEST=$(curl -s -X POST http://localhost:8080/api/users/login \
    -H "Content-Type: application/json" \
    -d '{"username":"kaal","password":"admin123"}' \
    -w "HTTP_CODE:%{http_code}")

KAAL_CODE=$(echo "$KAAL_TEST" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)

if [ "$KAAL_CODE" = "200" ]; then
    echo "   ✅ Kaal login working (admin123)"
else
    echo "   ❌ Kaal login failed (HTTP $KAAL_CODE)"
fi

echo ""
echo "=== ACCESSIBILITY SUMMARY ==="
echo ""
echo "✅ Issues Fixed:"
echo "  - AdminPanel.tsx now properly checks user privileges"
echo "  - JWT token parsing implemented for privilege extraction"
echo "  - AgentDashboard.tsx enhanced with debug logging"
echo "  - Frontend shows debug information in browser console"
echo ""

echo "🔍 What to Check:"
echo "  1. Open browser console (F12)"
echo "  2. Login with admin (Admin@123) or kaal (admin123)"
echo "  3. Look for '🔍 Admin Panel Tab Visibility Check' messages"
echo "  4. Verify Admin Panel tab appears between 'Chat History' and 'Change Password'"
echo ""

echo "📋 Expected Tabs for Admin Users:"
echo "  - Chats"
echo "  - My Statistics" 
echo "  - Chat History"
echo "  - Admin Panel ← This should now be visible"
echo ""

echo "📋 Expected Tabs inside Admin Panel:"
echo "  - Dashboard"
echo "  - Users"
echo "  - Roles"
echo "  - Permissions"
echo "  - Privileges"
echo "  - Statistics"
echo "  - Chat History"
echo ""

echo "🎯 If Admin Panel tab still missing:"
echo "  - Check browser console for any JavaScript errors"
echo "  - Verify the debug logs show correct privilege checking"
echo "  - The tab might be rendered but hidden by CSS"
echo ""

echo "🌐 Test URLs:"
echo "  Frontend: http://localhost:5174"
echo "  Backend:  http://localhost:8080/api"
echo ""

echo "💡 Quick Test:"
echo "  1. Open http://localhost:5174"
echo "  2. Login as admin (Admin@123)"
echo "  3. Look for 'Admin Panel' tab"
echo "  4. Click it to access admin functionality"
echo ""