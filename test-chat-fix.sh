#!/bin/bash

echo "=== Chat Fix Testing Script ==="
echo ""

# Check if backend is running
echo "1. Checking backend status..."
if curl -s http://localhost:8080/api/chat/sessions > /dev/null; then
    echo "✅ Backend is running"
else
    echo "❌ Backend is not running. Please start the backend first."
    echo "Run: cd visiomatix.chat/chat && mvn spring-boot:run"
    exit 1
fi

# Test the specific session that's problematic
echo ""
echo "2. Testing session 22 (the problematic session)..."
SESSION_22=$(curl -s "http://localhost:8080/api/chat/sessions/22" | jq -r '.is_active')
echo "Session 22 active status: $SESSION_22"

if [ "$SESSION_22" = "true" ]; then
    echo "✅ Session 22 is active"
else
    echo "❌ Session 22 is inactive. This might be why the agent can't send messages."
fi

# Check active sessions
echo ""
echo "3. Checking active sessions for agent..."
curl -s "http://localhost:8080/api/chat/sessions" | jq -r '.[].id' | head -5

# Test message sending endpoint
echo ""
echo "4. Testing message sending endpoint..."
RESPONSE=$(curl -s -X POST "http://localhost:8080/api/chat/sessions/22/messages" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $(cat agent-frontend/.env | grep JWT_TOKEN | cut -d'=' -f2)" \
    -d '{"content": "Test message from script", "messageType": "TEXT"}' \
    -w "\nHTTP Status: %{http_code}")

echo "Response: $RESPONSE"

echo ""
echo "=== Testing Complete ==="
echo ""
echo "Next steps:"
echo "1. If session 22 is inactive, try creating a new chat session from the website"
echo "2. Open agent frontend and test message sending with the enhanced error handling"
echo "3. Check browser console for any errors during message sending"