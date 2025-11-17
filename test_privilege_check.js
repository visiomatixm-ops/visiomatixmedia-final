/**
 * Test script to verify privilege checking for CUSTOMER SUCCESS MANAGER role
 * This simulates the JWT token parsing and privilege checking logic
 */

// Simulate JWT token payload for user "Kaal" with CUSTOMER SUCCESS MANAGER role
const mockJwtPayload = {
  sub: "kaal",
  username: "kaal",
  roles: ["ROLE_CUSTOMER_SUCCESS_MANAGER"],
  privileges: [
    "ACCESS_USER_MANAGEMENT",
    "ACCESS_ROLE_MANAGEMENT", 
    "ACCESS_PERMISSION_MANAGEMENT",
    "ACCESS_STATISTICS_TAB",
    "ACCESS_CHAT_HISTORY_TAB",
    "CREATE_USER",
    "DELETE_USER", 
    "MANAGE_CHAT",
    "ACCESS_AGENT_DASHBOARD",
    "CHAT_WITH_DEFAULT_USER"
  ],
  abac_context: {
    user_id: "kaal",
    roles: ["ROLE_CUSTOMER_SUCCESS_MANAGER"],
    privileges: [
      "ACCESS_USER_MANAGEMENT",
      "ACCESS_ROLE_MANAGEMENT",
      "ACCESS_PERMISSION_MANAGEMENT", 
      "ACCESS_STATISTICS_TAB",
      "ACCESS_CHAT_HISTORY_TAB",
      "CREATE_USER",
      "DELETE_USER",
      "MANAGE_CHAT", 
      "ACCESS_AGENT_DASHBOARD",
      "CHAT_WITH_DEFAULT_USER"
    ]
  }
};

// Simulate the privilege extraction function from AdminPanel
function extractPrivilegesFromToken(token) {
  try {
    // Simulate parsing JWT token
    console.log('Mock JWT payload:', token);
    
    // Check for privileges in different possible claim names
    const privileges = token.privileges || token.authorities || [];
    
    if (Array.isArray(privileges) && privileges.length > 0) {
      console.log('Extracted privileges from JWT:', privileges);
      return privileges;
    }
    
    // Also check abac_context if available
    if (token.abac_context && token.abac_context.privileges) {
      console.log('Extracted privileges from ABAC context:', token.abac_context.privileges);
      return token.abac_context.privileges;
    }
    
    return [];
  } catch (error) {
    console.error('Failed to parse JWT token:', error);
    return [];
  }
}

// Simulate the privilege checking function
function hasPrivilege(privilegeName, userPrivileges) {
  console.log(`Checking privilege "${privilegeName}" for user with privileges:`, userPrivileges);
  
  // Check if user has the required privilege
  const hasAccess = userPrivileges.includes(privilegeName);
  console.log(`Privilege check result for "${privilegeName}": ${hasAccess}`);
  
  return hasAccess;
}

// Test the privilege checking
console.log("=== Testing Privilege Checking for CUSTOMER SUCCESS MANAGER Role ===\n");

const extractedPrivileges = extractPrivilegesFromToken(mockJwtPayload);

// Test each privilege that should be visible in AdminPanel
const adminPanelPrivileges = [
  "ACCESS_USER_MANAGEMENT",
  "ACCESS_ROLE_MANAGEMENT",
  "ACCESS_PERMISSION_MANAGEMENT", 
  "ACCESS_STATISTICS_TAB",
  "ACCESS_CHAT_HISTORY_TAB"
];

console.log("\n=== Testing Admin Panel Tab Visibility ===");
adminPanelPrivileges.forEach(privilege => {
  const hasAccess = hasPrivilege(privilege, extractedPrivileges);
  console.log(`✅ ${privilege}: ${hasAccess ? 'VISIBLE' : 'HIDDEN'}`);
});

// Test additional privileges
console.log("\n=== Testing Additional Privileges ===");
const additionalPrivileges = ["CREATE_USER", "DELETE_USER", "MANAGE_CHAT"];
additionalPrivileges.forEach(privilege => {
  const hasAccess = hasPrivilege(privilege, extractedPrivileges);
  console.log(`🔧 ${privilege}: ${hasAccess ? 'ENABLED' : 'DISABLED'}`);
});

console.log("\n=== Summary ===");
console.log(`Total privileges found: ${extractedPrivileges.length}`);
console.log(`Expected tabs visible in AdminPanel: ${adminPanelPrivileges.filter(p => extractedPrivileges.includes(p)).length}/5`);

if (extractedPrivileges.includes("ACCESS_USER_MANAGEMENT") && 
    extractedPrivileges.includes("ACCESS_ROLE_MANAGEMENT") &&
    extractedPrivileges.includes("ACCESS_PERMISSION_MANAGEMENT") &&
    extractedPrivileges.includes("ACCESS_STATISTICS_TAB") &&
    extractedPrivileges.includes("ACCESS_CHAT_HISTORY_TAB")) {
  console.log("✅ SUCCESS: All required AdminPanel tabs should be visible for CUSTOMER SUCCESS MANAGER role");
} else {
  console.log("❌ FAILURE: Some AdminPanel tabs may not be visible");
}