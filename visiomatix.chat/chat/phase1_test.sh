#!/bin/bash
# ===========================================================
# File: phase1_test.sh
# Author: Viral Prajapati
# Date: 13-Oct-2025
# Description:
#   Phase 1 test for live_chat_db:
#   - Registers admin, agent, and default users
#   - Assigns correct roles (ROLE_ADMIN, ROLE_AGENT, ROLE_USER)
#   - Prints JWT tokens for login validation
# ===========================================================

API_URL="http://localhost:8080/api/users"

echo "========================"
echo "PHASE 1 TEST START"
echo "========================"

# -----------------------------------------------------------
# 1️⃣ Register Admin User (ROLE_ADMIN)
# -----------------------------------------------------------
echo "1️⃣ Registering Admin User..."
curl -s -X POST $API_URL/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin1",
    "email": "admin1@example.com",
    "password": "Admin@123",
    "name": "Admin User",
    "role": "ROLE_ADMIN"
  }'
echo -e "\n"

# -----------------------------------------------------------
# 2️⃣ Register Agent Users (ROLE_AGENT)
# -----------------------------------------------------------
echo "2️⃣ Registering Agent User..."
curl -s -X POST $API_URL/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "agent1",
    "email": "agent1@example.com",
    "password": "Agent@123",
    "name": "Agent One",
    "role": "ROLE_AGENT"
  }'
echo -e "\n"

echo "2️⃣ Registering Agent User 2..."
curl -s -X POST $API_URL/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "agent2",
    "email": "agent2@example.com",
    "password": "Agent@456",
    "name": "Agent Two",
    "role": "ROLE_AGENT"
  }'
echo -e "\n"

# -----------------------------------------------------------
# 3️⃣ Register Default User (ROLE_USER)
# -----------------------------------------------------------
echo "3️⃣ Registering Default User..."
curl -s -X POST $API_URL/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user1",
    "email": "user1@example.com",
    "password": "User@123",
    "name": "Default User"
  }'
echo -e "\n"

# -----------------------------------------------------------
# 4️⃣ Login & print JWT token for each user
# -----------------------------------------------------------
echo "4️⃣ Logging in users and printing JWT tokens..."

for USER in admin1 agent1 agent2 user1
do
  TOKEN=$(curl -s -X POST $API_URL/login \
    -H "Content-Type: application/json" \
    -d "{\"username\": \"$USER\", \"password\": \"$(if [ "$USER" == "admin1" ]; then echo "Admin@123"; elif [[ "$USER" == agent* ]]; then echo "Agent@123"; else echo "User@123"; fi)\"}")
  echo "$USER JWT Token: $TOKEN"
done
echo -e "\n"

# -----------------------------------------------------------
# 5️⃣ Database Check
# -----------------------------------------------------------
echo "5️⃣ Database Check:"
echo "Check manually via MySQL client:"
echo "USE live_chat_db;"
echo "SELECT * FROM users;"
echo "SELECT * FROM roles;"
echo "SELECT * FROM user_roles;"

echo "========================"
echo "PHASE 1 TEST COMPLETE"
echo "========================"
