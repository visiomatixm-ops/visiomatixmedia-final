#!/bin/bash
# ===========================================================
# File: agent_session.sh
# Author: Viral Prajapati
# Date: 14-Oct-2025
# Description:
#   Simulates Agent user login and waits for chat sessions
#   - Logs in as agent
#   - Polls for new chat sessions every few seconds
#   - Displays and replies to user messages in the active session
# ===========================================================

BASE_URL="http://localhost:8080"
USERNAME="agent"
PASSWORD="agent123"
EMAIL="agent@example.com"
NAME="Support Agent"

echo "=== Agent Chat Session ==="

# -----------------------------------------------------------
# Function to make authorized API calls
# -----------------------------------------------------------
api_call() {
  local method=$1
  local endpoint=$2
  local data=$3
  local token=$4

  if [ "$method" = "GET" ]; then
    curl -s -X $method "$BASE_URL$endpoint" \
      -H "Authorization: Bearer $token" \
      -H "Content-Type: application/json"
  else
    curl -s -X $method "$BASE_URL$endpoint" \
      -H "Authorization: Bearer $token" \
      -H "Content-Type: application/json" \
      -d "$data"
  fi
}

# -----------------------------------------------------------
# Step 1 - Login as agent (register if missing)
# -----------------------------------------------------------
echo "[1/3] Logging in as agent..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"$USERNAME\", \"password\": \"$PASSWORD\"}")

AGENT_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token // empty')

if [ -z "$AGENT_TOKEN" ] || [ "$AGENT_TOKEN" = "null" ]; then
  echo "⚠️ Agent not found, registering..."
  REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/users/register" \
    -H "Content-Type: application/json" \
    -d "{\"username\": \"$USERNAME\", \"email\": \"$EMAIL\", \"password\": \"$PASSWORD\", \"name\": \"$NAME\", \"active\": true}")

  LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/users/login" \
    -H "Content-Type: application/json" \
    -d "{\"username\": \"$USERNAME\", \"password\": \"$PASSWORD\"}")
  AGENT_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token // empty')
fi

if [ -z "$AGENT_TOKEN" ] || [ "$AGENT_TOKEN" = "null" ]; then
  echo "❌ Agent login failed!"
  exit 1
fi

echo "✅ Agent logged in successfully."

# -----------------------------------------------------------
# Step 2 - Wait for active sessions
# -----------------------------------------------------------
echo "[2/3] Waiting for active chat sessions..."
LAST_SESSION_ID=""

while true; do
  SESSIONS=$(api_call GET "/api/chat/sessions" "" "$AGENT_TOKEN")
  SESSION_COUNT=$(echo $SESSIONS | jq '. | length')

  if [ "$SESSION_COUNT" -gt 0 ]; then
    SESSION_ID=$(echo $SESSIONS | jq -r '.[0].id')
    if [ "$SESSION_ID" != "$LAST_SESSION_ID" ]; then
      echo "💬 Found session ID: $SESSION_ID"
      LAST_SESSION_ID=$SESSION_ID
    fi

    # Fetch recent messages
    MESSAGES=$(api_call GET "/api/chat/sessions/$SESSION_ID/messages/recent?limit=5" "" "$AGENT_TOKEN")
    echo "$MESSAGES" | jq -r '.[] | "\(.sender.name): \(.content)"'

    echo
    read -p "$NAME: " agent_msg
    if [ "$agent_msg" = "quit" ]; then
      echo "👋 Ending session."
      exit 0
    fi

    if [ -n "$agent_msg" ]; then
      api_call POST "/api/chat/sessions/$SESSION_ID/messages" \
        "{\"content\": \"$agent_msg\", \"messageType\": \"TEXT\"}" \
        "$AGENT_TOKEN" >/dev/null
      echo "✅ Message sent."
    fi
  else
    echo "⏳ Waiting for new chat session..."
    sleep 3
  fi
done
