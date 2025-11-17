/**
 * Script to reset Kaal user password and verify admin panel access
 * This script will:
 * 1. Reset Kaal password to a known value
 * 2. Test the login with new credentials
 * 3. Verify admin panel access
 */

const axios = require('axios');
const crypto = require('crypto');

const BASE_URL = 'http://localhost:8080/api';

// BCrypt hash for 'kaal123' password
const BCrypt = require('bcryptjs');
const NEW_PASSWORD = 'kaal123';
const HASHED_PASSWORD = BCrypt.hashSync(NEW_PASSWORD, 10);

async function resetKaalPassword() {
    console.log('🔧 Resetting Kaal user password...');
    
    try {
        // First login as admin to get token
        const adminResponse = await axios.post(`${BASE_URL}/users/login`, {
            username: 'admin',
            password: 'Admin@123'
        });
        
        const adminToken = adminResponse.data.token;
        console.log('✅ Admin login successful');
        
        // Update Kaal password
        const updateResponse = await axios.put(`${BASE_URL}/users/23`, {
            username: 'kaal',
            email: 'kaal@kaal.co',
            name: 'KAAL',
            password: NEW_PASSWORD  // Using plain text, backend will hash it
        }, {
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Kaal password updated successfully');
        return true;
        
    } catch (error) {
        console.error('❌ Failed to update Kaal password:', error.response?.data || error.message);
        return false;
    }
}

async function testKaalLogin() {
    console.log('\n🔐 Testing Kaal login with new password...');
    
    try {
        const response = await axios.post(`${BASE_URL}/users/login`, {
            username: 'kaal',
            password: NEW_PASSWORD
        });
        
        console.log('✅ Kaal login successful!');
        console.log('📋 Response:', {
            token: response.data.token.substring(0, 50) + '...',
            username: response.data.username,
            role: response.data.role,
            privileges: response.data.privileges
        });
        
        return response.data;
        
    } catch (error) {
        console.error('❌ Kaal login failed:', error.response?.data || error.message);
        return null;
    }
}

async function testAdminAccess(token) {
    console.log('\n🧪 Testing Kaal admin access...');
    
    const endpoints = [
        '/admin/users',
        '/admin/roles', 
        '/admin/privileges'
    ];
    
    for (const endpoint of endpoints) {
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(`✅ ${endpoint} - Access granted (${response.data.length} items)`);
        } catch (error) {
            console.log(`❌ ${endpoint} - ${error.response?.status}: ${error.response?.data?.message || error.message}`);
        }
    }
}

async function parseJWTToken(token) {
    console.log('\n🔍 Parsing JWT Token...');
    
    try {
        const base64Payload = token.split('.')[1];
        const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());
        
        console.log('📋 JWT Payload:');
        console.log('- Subject:', payload.sub);
        console.log('- Authorities:', payload.authorities);
        console.log('- ABAC Context:', payload.abac_context);
        
        return payload;
    } catch (error) {
        console.error('❌ Failed to parse JWT:', error.message);
        return null;
    }
}

async function main() {
    console.log('=== KAAL ADMIN ACCESS FIX ===\n');
    
    // Step 1: Reset password
    const passwordReset = await resetKaalPassword();
    if (!passwordReset) {
        console.log('❌ Cannot proceed without password reset');
        return;
    }
    
    // Step 2: Test login
    const kaalData = await testKaalLogin();
    if (!kaalData) {
        console.log('❌ Cannot proceed without successful login');
        return;
    }
    
    // Step 3: Parse JWT
    await parseJWTToken(kaalData.token);
    
    // Step 4: Test admin access
    await testAdminAccess(kaalData.token);
    
    console.log('\n=== SUMMARY ===');
    console.log('✅ Kaal user can now login with:');
    console.log('   Username: kaal');
    console.log('   Password: kaal123');
    console.log('\n🌐 Frontend URL: http://localhost:5174');
    console.log('🔧 Backend URL: http://localhost:8080/api');
    console.log('\n🚀 Next Steps:');
    console.log('1. Open frontend in browser');
    console.log('2. Login with kaal / kaal123');
    console.log('3. Check if Admin Panel tabs are visible');
    console.log('4. If still not visible, check browser console for errors');
}

main().catch(console.error);