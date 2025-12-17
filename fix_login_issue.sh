#!/bin/bash

echo "=== Visiomatix Login Issue Resolution ==="
echo ""

# Check if port 8080 is in use (backend)
echo "1. Checking if backend service is running on port 8080..."
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Backend service is running on port 8080"
else
    echo "❌ Backend service is NOT running on port 8080"
    echo "   You need to start the backend service"
fi

echo ""

# Check if port 5174 is in use (frontend)
echo "2. Checking if frontend service is running on port 5174..."
if lsof -Pi :5174 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Frontend service is running on port 5174"
else
    echo "❌ Frontend service is NOT running on port 5174"
    echo "   You need to start the frontend service"
fi

echo ""

# Test backend connectivity
echo "3. Testing backend connectivity..."
if curl -s --connect-timeout 3 http://localhost:8080/api/users/login >/dev/null 2>&1; then
    echo "✅ Backend API is accessible"
else
    echo "❌ Backend API is NOT accessible"
    echo "   This suggests the backend service is not running"
fi

echo ""

# Provide solutions
echo "=== SOLUTION STEPS ==="
echo ""

echo "STEP 1: Start Backend Service"
echo "   Open a new terminal and run:"
echo "   cd visiomatix.chat/chat"
echo "   ./mvnw spring-boot:run"
echo ""
echo "   OR if you have Maven installed:"
echo "   cd visiomatix.chat/chat"
echo "   mvn spring-boot:run"
echo ""

echo "STEP 2: Start Frontend Service (in another terminal)"
echo "   Open a new terminal and run:"
echo "   cd agent-frontend"
echo "   npm run dev"
echo ""

echo "STEP 3: Test Login Endpoint"
echo "   Once both services are running, test with curl:"
echo "   curl -X POST http://localhost:8080/api/users/login \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"username\":\"admin\",\"password\":\"Admin@123\"}'"
echo ""

echo "STEP 4: Access Frontend"
echo "   Open browser and go to:"
echo "   http://localhost:5174"
echo ""

echo "=== TROUBLESHOOTING ==="
echo ""

echo "If backend fails to start:"
echo "1. Check if MySQL database is running"
echo "2. Check if port 8080 is available"
echo "3. Check backend logs for errors"
echo ""

echo "If frontend fails to start:"
echo "1. Check if port 5174 is available"
echo "2. Run 'npm install' to install dependencies"
echo "3. Check frontend logs for errors"
echo ""

echo "=== ADMIN CREDENTIALS ==="
echo "Try these if the first one doesn't work:"
echo "- Username: admin, Password: Admin@123"
echo "- Username: admin, Password: admin123"
echo "- Username: system, Password: system"
echo "- Username: agent, Password: agent123"
echo ""

echo "=== CURRENT SERVICES STATUS ==="
echo "Backend (8080): $(lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1 && echo 'RUNNING' || echo 'STOPPED')"
echo "Frontend (5174): $(lsof -Pi :5174 -sTCP:LISTEN -t >/dev/null 2>&1 && echo 'RUNNING' || echo 'STOPPED')"