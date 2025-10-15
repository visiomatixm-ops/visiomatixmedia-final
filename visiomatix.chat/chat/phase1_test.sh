#!/bin/bash
# ===========================================================
# File: phase1_postman_style.sh
# Author: Viral Prajapati
# Date: 14-Oct-2025
# Description:
#   Phase 1+2+3 test for live_chat_db
#   - Postman-style curl commands for all APIs
#   - JWT-based authentication
#   - Register users, login, getUser, updateUser, deleteUser
# ===========================================================

API_URL="http://localhost:8080/api/users"
echo "==============================="
echo "PHASE 1+2+3 POSTMAN STYLE TEST"
echo "==============================="

# -----------------------------------------------------------
# 1️⃣ REGISTER USERS
# -----------------------------------------------------------
echo -e "\n1️⃣ REGISTER USERS"

declare -A USERS
USERS=( 
  ["admin1"]="Admin@123" 
  ["agent1"]="Agent@123" 
  ["agent2"]="Agent@456" 
  ["user1"]="User@123"
)

for USER in "${!USERS[@]}"; do
  PASSWORD=${USERS[$USER]}
  ROLE="ROLE_USER"
  NAME="$USER"
  EMAIL="$USER@example.com"
  
  if [[ "$USER" == "admin1" ]]; then ROLE="ROLE_ADMIN"; NAME="Admin User"; fi
  if [[ "$USER" == "agent1" ]]; then ROLE="ROLE_AGENT"; NAME="Agent One"; fi
  if [[ "$USER" == "agent2" ]]; then ROLE="ROLE_AGENT"; NAME="Agent Two"; fi
  if [[ "$USER" == "user1" ]]; then NAME="Default User"; fi

  echo -e "\n💡 Registering $USER..."
  curl -s -X POST "$API_URL/register" \
    -H "Content-Type: application/json" \
    -d "{
      \"username\": \"$USER\",
      \"email\": \"$EMAIL\",
      \"password\": \"$PASSWORD\",
      \"name\": \"$NAME\",
      \"role\": \"$ROLE\"
    }" | jq
done

# -----------------------------------------------------------
# 2️⃣ LOGIN USERS
# -----------------------------------------------------------
echo -e "\n2️⃣ LOGIN USERS"

declare -A TOKENS

for USER in "${!USERS[@]}"; do
  PASSWORD=${USERS[$USER]}
  echo -e "\n🔑 Logging in $USER..."
  RESPONSE=$(curl -s -X POST "$API_URL/login" \
    -H "Content-Type: application/json" \
    -d "{
      \"username\": \"$USER\",
      \"password\": \"$PASSWORD\"
    }")

  TOKEN=$(echo $RESPONSE | jq -r '.token')
  if [[ "$TOKEN" == "null" || -z "$TOKEN" ]]; then
    echo "❌ Login failed for $USER. Response:"
    echo $RESPONSE | jq
  else
    TOKENS[$USER]=$TOKEN
    echo "✅ $USER JWT Token: $TOKEN"
  fi
done

# -----------------------------------------------------------
# 3️⃣ GET USERS
# -----------------------------------------------------------
echo -e "\n3️⃣ GET USERS"

for USER in "${!TOKENS[@]}"; do
  echo -e "\n👤 Fetching $USER info..."
  curl -s -X GET "$API_URL/$USER" \
    -H "Authorization: Bearer ${TOKENS[$USER]}" \
    -H "Content-Type: application/json" | jq
done

# -----------------------------------------------------------
# 4️⃣ UPDATE USER
# -----------------------------------------------------------
echo -e "\n4️⃣ UPDATE USER"
UPDATE_USER="user1"
echo -e "\n✏️ Updating $UPDATE_USER..."
curl -s -X PUT "$API_URL/4" \
  -H "Authorization: Bearer ${TOKENS[$UPDATE_USER]}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User One Updated",
    "email": "user1updated@example.com",
    "role": "ROLE_USER",
    "password": "User@123"
  }' | jq

# -----------------------------------------------------------
# 5️⃣ DELETE USER
# -----------------------------------------------------------
echo -e "\n5️⃣ DELETE USER"
DELETE_USER="agent2"
echo -e "\n🗑️ Deleting $DELETE_USER..."
curl -s -X DELETE "$API_URL/3" \
  -H "Authorization: Bearer ${TOKENS[$DELETE_USER]}" \
  -H "Content-Type: application/json" | jq

# -----------------------------------------------------------
# 6️⃣ MANUAL DATABASE CHECK
# -----------------------------------------------------------
echo -e "\n6️⃣ DATABASE CHECK (manual)"
echo "Check via MySQL client:"
echo "USE live_chat_db;"
echo "SELECT * FROM users;"
echo "SELECT * FROM roles;"
echo "SELECT * FROM user_roles;"

echo -e "\n==============================="
echo "PHASE 1+2+3 POSTMAN STYLE TEST COMPLETE"
echo "==============================="
