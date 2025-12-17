#!/bin/bash

# Debug script for login issues
echo "=== Debugging Login Issues ==="

echo "1. Checking if backend service is running..."
echo "   Backend should be running on http://localhost:8080"
echo "   You can check by running: curl http://localhost:8080/api/users/test"
echo ""

echo "2. If backend is not running, start it with:"
echo "   cd visiomatix.chat/chat"
echo "   ./mvnw spring-boot:run"
echo ""

echo "3. If backend is running, test the login endpoint directly:"
echo "   curl -X POST http://localhost:8080/api/users/login \\"
echo "   -H 'Content-Type: application/json' \\"
echo "   -d '{\"username\":\"admin\",\"password\":\"Admin@123\"}'"
echo ""

echo "4. If that fails, check if the admin user exists in database:"
echo "   - Verify the database is running"
echo "   - Check if the data seeder ran successfully"
echo ""

echo "5. Common admin credentials to try:"
echo "   - Username: admin, Password: Admin@123"
echo "   - Username: admin, Password: admin123"
echo "   - Username: admin, Password: password"
echo ""

echo "6. Check frontend API configuration:"
echo "   - Frontend should be running on http://localhost:5174"
echo "   - API base URL should be http://localhost:8080/api"
echo ""

echo "=== Next Steps ==="
echo "1. Make sure backend is running on port 8080"
echo "2. Make sure frontend is running on port 5174"
echo "3. Try testing the login endpoint with curl"
echo "4. Check browser console for detailed error messages"