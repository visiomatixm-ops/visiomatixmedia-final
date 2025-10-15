#!/bin/bash
# ===========================================================
# File: default_user_session.sh
# Author: Viral Prajapati
# Date: 14-Oct-2025
# Description:
#   Simulates Default User starting a new chat session
#   - Registers/logs in user
#   - Creates a chat session
#   - Sends messages to agent
# ===========================================================

BASE_URL="http://localhost:8080"
USERNAME="defaultuser"
PASSWORD="default123"
EMAIL="default@example.com"
NAME="Default User"

echo "=== Default User Chat Session ==="

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
# Step 1 - Login or Register user
# -----------------------------------------------------------
echo "[1/3] Logging in as user..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"$USERNAME\", \"password\": \"$PASSWORD\"}")

USER_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token // empty')

if [ -z "$USER_TOKEN" ] || [ "$USER_TOKEN" = "null" ]; then
  echo "⚠️ User not found, registering..."
  REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/users/register" \
    -H "Content-Type: application/json" \
    -d "{\"username\": \"$USERNAME\", \"email\": \"$EMAIL\", \"password\": \"$PASSWORD\", \"name\": \"$NAME\", \"active\": true}")

  LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/users/login" \
    -H "Content-Type: application/json" \
    -d "{\"username\": \"$USERNAME\", \"password\": \"$PASSWORD\"}")
  USER_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token // empty')
fi

if [ -z "$USER_TOKEN" ] || [ "$USER_TOKEN" = "null" ]; then
  echo "❌ Login failed!"
  exit 1
fi

echo "✅ User logged in successfully."

# -----------------------------------------------------------
# Step 2 - Create Chat Session
# -----------------------------------------------------------
echo "[2/3] Creating new chat session..."
SESSION_RESPONSE=$(api_call POST "/api/chat/sessions" \
  "{\"sessionName\": \"${NAME}'s Support Session\", \"sessionType\": \"AGENT_CLIENT\"}" \
  "$USER_TOKEN")

SESSION_ID=$(echo $SESSION_RESPONSE | jq -r '.id // empty')
if [ -z "$SESSION_ID" ]; then
  echo "❌ Failed to create session."
  exit 1
fi

echo "✅ Chat session created (ID: $SESSION_ID)"
echo "You can now chat with the agent. Type 'quit' to exit."
echo

# -----------------------------------------------------------
# Step 3 - Chat Loop
# -----------------------------------------------------------
while true; do
  # Fetch latest messages
  MESSAGES=$(api_call GET "/api/chat/sessions/$SESSION_ID/messages/recent?limit=5" "" "$USER_TOKEN")
  echo "$MESSAGES" | jq -r '.[] | "\(.sender.name): \(.content)"'

  read -p "$NAME: " user_msg
  if [ "$user_msg" = "quit" ]; then
    echo "👋 Ending chat session."
    break
  fi

  if [ -n "$user_msg" ]; then
    api_call POST "/api/chat/sessions/$SESSION_ID/messages" \
      "{\"content\": \"$user_msg\", \"messageType\": \"TEXT\"}" \
      "$USER_TOKEN" >/dev/null
    echo "✅ Message sent."
  fi

  sleep 1
done
