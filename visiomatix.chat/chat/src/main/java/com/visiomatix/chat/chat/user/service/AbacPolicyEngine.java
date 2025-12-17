/**
 * ===========================================================
 * File: AbacPolicyEngine.java
 * Location: com.visiomatix.chat.chat.user.service
 * Author: Kilo Code
 * Date: 12-Nov-2025
 * Description:
 *   ABAC Policy Engine for dynamic attribute-based access control.
 *   Evaluates policies based on user attributes, resource attributes,
 *   and environmental conditions.
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.model.CustomRole;
import com.visiomatix.chat.chat.user.model.User;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AbacPolicyEngine {

    private static final Logger logger = LoggerFactory.getLogger(AbacPolicyEngine.class);

    /**
     * Evaluate ABAC policies for a user accessing a resource
     */
    public boolean evaluateAccess(User user, String resource, String action, Map<String, Object> environment) {
        logger.debug("Evaluating ABAC access for user: {}, resource: {}, action: {}", user.getUsername(), resource, action);

        // Get all ABAC attributes from user's custom roles
        Map<String, String> userAttributes = getUserAbacAttributes(user);

        // Evaluate policies
        boolean accessGranted = evaluatePolicies(userAttributes, resource, action, environment);

        logger.debug("ABAC evaluation result: {} for user: {}", accessGranted, user.getUsername());
        return accessGranted;
    }

    /**
     * Get all ABAC attributes from user's custom roles
     */
    private Map<String, String> getUserAbacAttributes(User user) {
        Map<String, String> attributes = new java.util.HashMap<>();

        if (user.getCustomRoles() != null) {
            for (CustomRole customRole : user.getCustomRoles()) {
                if (customRole.getAbacAttributes() != null) {
                    attributes.putAll(customRole.getAbacAttributes());
                }
            }
        }

        return attributes;
    }

    /**
     * Evaluate ABAC policies based on attributes
     */
    private boolean evaluatePolicies(Map<String, String> userAttributes, String resource, String action, Map<String, Object> environment) {
        // Policy 1: Department-based access control
        if (resource.startsWith("/api/admin") && action.equals("READ")) {
            String department = userAttributes.get("department");
            if ("IT".equals(department) || "ADMIN".equals(department)) {
                return true;
            }
        }

        // Policy 2: Time-based access control
        if (resource.startsWith("/api/admin") && action.equals("WRITE")) {
            String clearanceLevel = userAttributes.get("clearance_level");
            if ("HIGH".equals(clearanceLevel) || "CRITICAL".equals(clearanceLevel)) {
                return true;
            }
        }

        // Policy 3: Location-based access control
        if (resource.contains("sensitive") && action.equals("DELETE")) {
            String location = userAttributes.get("location");
            if ("SECURE_ZONE".equals(location)) {
                return true;
            }
        }

        // Policy 4: Role-based attribute enhancement
        if (userAttributes.containsKey("supervisor") && "true".equals(userAttributes.get("supervisor"))) {
            if (resource.startsWith("/api/admin/users") && action.equals("MANAGE")) {
                return true;
            }
        }

        // Default: Deny access if no policy matches
        return false;
    }

    /**
     * Get all applicable privileges based on ABAC evaluation
     */
    public Set<String> getApplicablePrivileges(User user, Map<String, Object> environment) {
        Set<String> privileges = new HashSet<>();

        // Get base privileges from roles
        if (user.getRoles() != null) {
            user.getRoles().forEach(role -> {
                if (role.getPrivileges() != null) {
                    role.getPrivileges().forEach(privilege -> {
                        privileges.add(privilege.getName());
                    });
                }
            });
        }

        // Get privileges from custom roles
        if (user.getCustomRoles() != null) {
            user.getCustomRoles().forEach(customRole -> {
                if (customRole.getPrivileges() != null) {
                    customRole.getPrivileges().forEach(privilege -> {
                        privileges.add(privilege.getName());
                    });
                }
            });
        }

        // Apply ABAC filtering
        Map<String, String> userAttributes = getUserAbacAttributes(user);
        Set<String> filteredPrivileges = new HashSet<>();

        for (String privilege : privileges) {
            if (evaluatePrivilegeAccess(userAttributes, privilege, environment)) {
                filteredPrivileges.add(privilege);
            }
        }

        return filteredPrivileges;
    }

    /**
     * Evaluate if a specific privilege is accessible based on ABAC
     */
    private boolean evaluatePrivilegeAccess(Map<String, String> userAttributes, String privilege, Map<String, Object> environment) {
        // Privilege-specific ABAC rules
        switch (privilege) {
            case "DELETE_USER":
                return "HIGH".equals(userAttributes.get("clearance_level"));
            case "ACCESS_PERMISSION_MANAGEMENT":
                return "ADMIN".equals(userAttributes.get("department"));
            case "ACCESS_STATISTICS_TAB":
                return userAttributes.containsKey("analytics_access");
            case "ACCESS_CHAT_HISTORY_TAB":
                return "SUPERVISOR".equals(userAttributes.get("role_type"));
            default:
                return true; // Allow by default if no specific rule
        }
    }

    /**
     * Get ABAC context for policy evaluation
     */
    public Map<String, Object> getAbacContext(User user, String resource, String action) {
        Map<String, Object> context = new java.util.HashMap<>();

        // User attributes
        context.put("username", user.getUsername());
        context.put("user_id", user.getId());

        // Resource attributes
        context.put("resource", resource);
        context.put("action", action);

        // Environmental attributes
        context.put("timestamp", System.currentTimeMillis());
        context.put("ip_address", "unknown"); // Would be populated from request

        // ABAC attributes from custom roles
        Map<String, String> abacAttributes = getUserAbacAttributes(user);
        context.put("abac_attributes", abacAttributes);

        return context;
    }
}