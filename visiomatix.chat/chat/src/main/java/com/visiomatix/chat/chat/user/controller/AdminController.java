/**
 * ===========================================================
 * File: AdminController.java
 * Location: com.visiomatix.chat.chat.user.controller
 * Author: Viral Prajapati
 * Date: 20-Oct-2025
 * Description:
 *   Combined REST controller for admin operations.
 *   Manages users, roles, permissions, and privileges.
 *   All endpoints require ROLE_ADMIN access.
 *
 * -------------------------------
 * Phase 6 Additions:
 * - Admin endpoints for user management (list, assign/remove roles)
 * - Role management (create, list, assign permissions)
 * - Permission management (create, list)
 * - Privilege matrix support
 * - Audit trail tracking with createdBy/modifiedBy
 * ===========================================================
 */

package com.visiomatix.chat.chat.user.controller;

// ============================
// Import Statements
// ============================
import com.visiomatix.chat.chat.chat.model.ChatSession;
import com.visiomatix.chat.chat.chat.model.Message;
import com.visiomatix.chat.chat.chat.service.ChatService;
import com.visiomatix.chat.chat.user.dto.RoleDTO;
import com.visiomatix.chat.chat.user.dto.RoleCreateDTO;
import java.util.HashSet;
import com.visiomatix.chat.chat.user.dto.UserDTO;
import com.visiomatix.chat.chat.user.model.Permission;
import com.visiomatix.chat.chat.user.model.Privilege;
import com.visiomatix.chat.chat.user.model.Role;
import com.visiomatix.chat.chat.user.model.User;
import com.visiomatix.chat.chat.user.service.PermissionService;
import com.visiomatix.chat.chat.user.service.PrivilegeService;
import com.visiomatix.chat.chat.user.service.RoleService;
import com.visiomatix.chat.chat.user.service.UserService;
import com.visiomatix.chat.chat.user.repository.PermissionRepository;
import com.visiomatix.chat.chat.user.repository.PrivilegeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.slf4j.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * ===========================================================
 * Class: AdminController
 * Purpose:
 *   Provides REST endpoints for administrative operations.
 *   Requires ROLE_ADMIN for all operations.
 * ===========================================================
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    // ===========================================================
    // Field Declarations
    // ===========================================================
    private final UserService userService;
    private final RoleService roleService;
    private final PermissionService permissionService;
    private final PrivilegeService privilegeService;
    private final PermissionRepository permissionRepository;
    private final PrivilegeRepository privilegeRepository;
    private final ChatService chatService;

    // ===========================================================
    // User Management Endpoints
    // ===========================================================

    /**
     * List all users in the system
     * @return List of all users
     */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        logger.info("Admin requesting list of all users");
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * Assign a role to a user
     * @param userId User ID
     * @param roleId Role ID to assign
     * @param authentication Current admin authentication
     * @return Updated user
     */
    @PostMapping("/users/{userId}/assign-role/{roleId}")
    public ResponseEntity<User> assignRoleToUser(@PathVariable Long userId,
                                                @PathVariable Long roleId,
                                                Authentication authentication) {
        logger.info("Admin {} assigning role {} to user {}", authentication.getName(), roleId, userId);
        User updatedUser = userService.assignRoleToUser(userId, roleId, authentication.getName());
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Remove a role from a user
     * @param userId User ID
     * @param roleId Role ID to remove
     * @param authentication Current admin authentication
     * @return Updated user
     */
    @PostMapping("/users/{userId}/remove-role/{roleId}")
    public ResponseEntity<User> removeRoleFromUser(@PathVariable Long userId,
                                                  @PathVariable Long roleId,
                                                  Authentication authentication) {
        logger.info("Admin {} removing role {} from user {}", authentication.getName(), roleId, userId);
        User updatedUser = userService.removeRoleFromUser(userId, roleId, authentication.getName());
        return ResponseEntity.ok(updatedUser);
    }

    // ===========================================================
    // Role Management Endpoints
    // ===========================================================

    /**
     * List all roles in the system
     * @return List of all roles
     */
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        logger.info("Admin requesting list of all roles");
        List<Role> roles = roleService.getAllRoles();
        return ResponseEntity.ok(roles);
    }

    /**
     * Create a new role
     * @param roleCreateDTO Role data with string-based permission/privilege names
     * @param authentication Current admin authentication
     * @return Created role
     */
    @PostMapping("/roles")
    public ResponseEntity<Role> createRole(@RequestBody RoleCreateDTO roleCreateDTO,
                                           Authentication authentication) {
        logger.info("Admin {} creating new role: {}", authentication.getName(), roleCreateDTO.getName());

        // Resolve permission names to Permission entities
        Set<Permission> permissions = new HashSet<>();
        if (roleCreateDTO.getPermissionNames() != null) {
            for (String permName : roleCreateDTO.getPermissionNames()) {
                permissionRepository.findByName(permName.trim())
                        .ifPresent(permissions::add);
            }
        }

        // Resolve privilege names to Privilege entities
        Set<Privilege> privileges = new HashSet<>();
        if (roleCreateDTO.getPrivilegeNames() != null) {
            for (String privName : roleCreateDTO.getPrivilegeNames()) {
                Privilege privilege = privilegeRepository.findByName(privName.trim());
                if (privilege != null) {
                    privileges.add(privilege);
                }
            }
        }

        // Create Role entity with resolved permissions and privileges
        Role role = new Role();
        role.setName(roleCreateDTO.getName());
        role.setPermissions(permissions);
        role.setPrivileges(privileges);

        Role createdRole = roleService.createRole(new RoleDTO(role.getName(), role.getPermissions()), authentication.getName());
        return ResponseEntity.ok(createdRole);
    }

    /**
     * Assign a permission to a role
     * @param roleId Role ID
     * @param permissionId Permission ID to assign
     * @param authentication Current admin authentication
     * @return Updated role
     */
    @PostMapping("/roles/{roleId}/assign-permission/{permissionId}")
    public ResponseEntity<Role> assignPermissionToRole(@PathVariable Long roleId,
                                                      @PathVariable Long permissionId,
                                                      Authentication authentication) {
        logger.info("Admin {} assigning permission {} to role {}", authentication.getName(), permissionId, roleId);
        Role updatedRole = roleService.assignPermissionToRole(roleId, permissionId, authentication.getName());
        return ResponseEntity.ok(updatedRole);
    }

    /**
     * Remove a permission from a role
     * @param roleId Role ID
     * @param permissionId Permission ID to remove
     * @param authentication Current admin authentication
     * @return Updated role
     */
    @PostMapping("/roles/{roleId}/remove-permission/{permissionId}")
    public ResponseEntity<Role> removePermissionFromRole(@PathVariable Long roleId,
                                                        @PathVariable Long permissionId,
                                                        Authentication authentication) {
        logger.info("Admin {} removing permission {} from role {}", authentication.getName(), permissionId, roleId);
        Role updatedRole = roleService.removePermissionFromRole(roleId, permissionId, authentication.getName());
        return ResponseEntity.ok(updatedRole);
    }

    /**
     * Update a role by ID
     * @param roleId Role ID to update
     * @param roleDTO Updated role data
     * @param authentication Current admin authentication
     * @return Updated role
     */
    @PutMapping("/roles/{roleId}")
    public ResponseEntity<Role> updateRole(@PathVariable Long roleId,
                                          @RequestBody RoleDTO roleDTO,
                                          Authentication authentication) {
        logger.info("Admin {} updating role {} with name: {}", authentication.getName(), roleId, roleDTO.getName());
        Role updatedRole = roleService.updateRole(roleId, roleDTO, authentication.getName());
        return ResponseEntity.ok(updatedRole);
    }

    /**
     * Delete a role by ID
     * @param roleId Role ID to delete
     * @param authentication Current admin authentication
     * @return Success message
     */
    @DeleteMapping("/roles/{roleId}")
    public ResponseEntity<String> deleteRole(@PathVariable Long roleId,
                                            Authentication authentication) {
        logger.info("Admin {} deleting role {}", authentication.getName(), roleId);
        roleService.deleteRole(roleId, authentication.getName());
        return ResponseEntity.ok("Role deleted successfully");
    }

    // ===========================================================
    // Permission Management Endpoints
    // ===========================================================

    /**
     * List all permissions in the system
     * @return List of all permissions
     */
    @GetMapping("/permissions")
    public ResponseEntity<List<Permission>> getAllPermissions() {
        logger.info("Admin requesting list of all permissions");
        List<Permission> permissions = permissionService.getAllPermissions();
        return ResponseEntity.ok(permissions);
    }

    /**
     * Create a new permission
     * @param permission Permission data
     * @param authentication Current admin authentication
     * @return Created permission
     */
    @PostMapping("/permissions")
    public ResponseEntity<Permission> createPermission(@RequestBody Permission permission,
                                                      Authentication authentication) {
        logger.info("Admin {} creating new permission: {}", authentication.getName(), permission.getName());
        Permission createdPermission = permissionService.createPermission(permission, authentication.getName());
        return ResponseEntity.ok(createdPermission);
    }

    /**
     * Delete a permission by ID
     * @param permissionId Permission ID to delete
     * @param authentication Current admin authentication
     * @return Success message
     */
    @DeleteMapping("/permissions/{permissionId}")
    public ResponseEntity<String> deletePermission(@PathVariable Long permissionId,
                                                  Authentication authentication) {
        logger.info("Admin {} deleting permission {}", authentication.getName(), permissionId);
        permissionService.deletePermission(permissionId, authentication.getName());
        return ResponseEntity.ok("Permission deleted successfully");
    }

    // ===========================================================
    // Privilege Matrix Endpoints
    // ===========================================================

    /**
     * Get privilege matrix for a role
     * @param roleId Role ID
     * @return Set of privileges for the role
     */
    @GetMapping("/roles/{roleId}/privileges")
    public ResponseEntity<Set<Privilege>> getRolePrivileges(@PathVariable Long roleId) {
        logger.info("Admin requesting privileges for role {}", roleId);
        Set<Privilege> privileges = roleService.getRolePrivileges(roleId);
        return ResponseEntity.ok(privileges);
    }

    /**
     * Assign privilege to role
     * @param roleId Role ID
     * @param privilegeId Privilege ID to assign
     * @param authentication Current admin authentication
     * @return Updated role
     */
    @PostMapping("/roles/{roleId}/assign-privilege/{privilegeId}")
    public ResponseEntity<Role> assignPrivilegeToRole(@PathVariable Long roleId,
                                                     @PathVariable Long privilegeId,
                                                     Authentication authentication) {
        logger.info("Admin {} assigning privilege {} to role {}", authentication.getName(), privilegeId, roleId);
        Role updatedRole = roleService.assignPrivilegeToRole(roleId, privilegeId, authentication.getName());
        return ResponseEntity.ok(updatedRole);
    }

    /**
     * Remove privilege from role
     * @param roleId Role ID
     * @param privilegeId Privilege ID to remove
     * @param authentication Current admin authentication
     * @return Updated role
     */
    @PostMapping("/roles/{roleId}/remove-privilege/{privilegeId}")
    public ResponseEntity<Role> removePrivilegeFromRole(@PathVariable Long roleId,
                                                       @PathVariable Long privilegeId,
                                                       Authentication authentication) {
        logger.info("Admin {} removing privilege {} from role {}", authentication.getName(), privilegeId, roleId);
        Role updatedRole = roleService.removePrivilegeFromRole(roleId, privilegeId, authentication.getName());
        return ResponseEntity.ok(updatedRole);
    }

    // ===========================================================
    // User Creation and Management
    // ===========================================================

    /**
     * Create a new user with role assignment
     * @param userDTO User data with roles
     * @param authentication Current admin authentication
     * @return Created user
     */
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody UserDTO userDTO,
                                           Authentication authentication) {
        logger.info("Admin {} creating new user: {}", authentication.getName(), userDTO.getUsername());
        User createdUser = userService.createUser(userDTO, authentication.getName());
        return ResponseEntity.ok(createdUser);
    }

    /**
     * Delete a user by ID
     * @param userId User ID to delete
     * @param authentication Current admin authentication
     * @return Success message
     */
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId,
                                           Authentication authentication) {
        logger.info("Admin {} deleting user {}", authentication.getName(), userId);
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    // ===========================================================
    // Chat Monitoring and Analytics
    // ===========================================================

    /**
     * Get all active chat sessions for monitoring
     * @return List of all active sessions
     */
    @GetMapping("/sessions/active")
    public ResponseEntity<List<ChatSession>> getAllActiveSessions() {
        logger.info("Admin requesting all active chat sessions");
        List<ChatSession> sessions = chatService.getAllActiveSessions();
        return ResponseEntity.ok(sessions);
    }

    /**
     * Get chat sessions for a specific agent
     * @param agentId Agent user ID
     * @return List of agent's sessions
     */
    @GetMapping("/agents/{agentId}/sessions")
    public ResponseEntity<List<ChatSession>> getAgentSessions(@PathVariable Long agentId) {
        logger.info("Admin requesting sessions for agent {}", agentId);
        List<ChatSession> sessions = chatService.getSessionsForAgent(agentId);
        return ResponseEntity.ok(sessions);
    }

    /**
     * Get all sessions for a specific user (for agent self-access)
     * @param userId User ID
     * @return List of user's sessions
     */
    @GetMapping("/users/{userId}/sessions")
    @PreAuthorize("hasRole('ADMIN') or @userService.isCurrentUser(#userId)")
    public ResponseEntity<List<ChatSession>> getUserAllSessions(@PathVariable Long userId) {
        logger.info("Requesting all sessions for user {}", userId);
        List<ChatSession> sessions = chatService.getSessionsByUser(userId);
        return ResponseEntity.ok(sessions);
    }


    /**
     * Get agent performance metrics
     * @param agentId Agent user ID
     * @return Performance statistics
     */
    @GetMapping("/agents/{agentId}/performance")
    public ResponseEntity<Map<String, Object>> getAgentPerformance(@PathVariable Long agentId) {
        logger.info("Admin requesting performance metrics for agent {}", agentId);
        Map<String, Object> metrics = chatService.getAgentPerformanceMetrics(agentId);
        return ResponseEntity.ok(metrics);
    }

    /**
     * Get system-wide chat statistics
     * @return System statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getSystemStatistics() {
        logger.info("Admin requesting system-wide chat statistics");
        Map<String, Object> stats = chatService.getSystemStatistics();
        return ResponseEntity.ok(stats);
    }

    /**
     * Get messages for a specific session (admin monitoring)
     * @param sessionId Session ID
     * @return List of messages
     */
    @GetMapping("/sessions/{sessionId}/messages")
    public ResponseEntity<List<Message>> getSessionMessages(@PathVariable Long sessionId) {
        logger.info("Admin monitoring messages for session {}", sessionId);
        List<Message> messages = chatService.getMessagesForSession(sessionId, 0, 1000); // Get all messages
        return ResponseEntity.ok(messages);
    }

    // ===========================================================
    // Real-time Supervision
    // ===========================================================

    /**
     * Join a chat session for supervision (read-only)
     * @param sessionId Session ID to supervise
     * @param authentication Current admin authentication
     * @return Success message
     */
    @PostMapping("/sessions/{sessionId}/supervise")
    public ResponseEntity<String> superviseSession(@PathVariable Long sessionId,
                                                  Authentication authentication) {
        logger.info("Admin {} starting supervision of session {}", authentication.getName(), sessionId);
        // This would typically set up a supervision channel
        return ResponseEntity.ok("Supervision started for session " + sessionId);
    }

    /**
     * Send a supervisory message to an agent
     * @param sessionId Session ID
     * @param message Supervisory message
     * @param authentication Current admin authentication
     * @return Success message
     */
    @PostMapping("/sessions/{sessionId}/supervise/message")
    public ResponseEntity<String> sendSupervisoryMessage(@PathVariable Long sessionId,
                                                        @RequestBody Map<String, String> message,
                                                        Authentication authentication) {
        logger.info("Admin {} sending supervisory message to session {}", authentication.getName(), sessionId);
        // This would send a message to the agent only, not the customer
        return ResponseEntity.ok("Supervisory message sent");
    }

    // ===========================================================
    // Reports and Analytics Endpoints
    // ===========================================================

    /**
     * Generate monthly chat handling report
     * @param year Year for the report
     * @param month Month for the report (1-12)
     * @return Monthly report data
     */
    @GetMapping("/reports/monthly/{year}/{month}")
    public ResponseEntity<Map<String, Object>> generateMonthlyReport(@PathVariable int year,
                                                                   @PathVariable int month) {
        logger.info("Generating monthly report for {}-{}", year, month);
        Map<String, Object> report = chatService.generateMonthlyChatReport(year, month);
        return ResponseEntity.ok(report);
    }

    /**
     * Generate agent-specific monthly report
     * @param agentId Agent ID
     * @param year Year for the report
     * @param month Month for the report (1-12)
     * @return Agent monthly report data
     */
    @GetMapping("/reports/agent/{agentId}/{year}/{month}")
    public ResponseEntity<Map<String, Object>> generateAgentMonthlyReport(@PathVariable Long agentId,
                                                                        @PathVariable int year,
                                                                        @PathVariable int month) {
        logger.info("Generating monthly report for agent {} for {}-{}", agentId, year, month);
        Map<String, Object> report = chatService.generateAgentMonthlyReport(agentId, year, month);
        return ResponseEntity.ok(report);
    }

    /**
     * Get available report months
     * @return List of available months with data
     */
    @GetMapping("/reports/available-months")
    public ResponseEntity<List<Map<String, Object>>> getAvailableReportMonths() {
        logger.info("Getting available report months");
        // This would typically query the database for available months
        // For now, return current and previous months
        List<Map<String, Object>> months = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        for (int i = 0; i < 12; i++) {
            LocalDateTime date = now.minusMonths(i);
            Map<String, Object> monthData = new HashMap<>();
            monthData.put("year", date.getYear());
            monthData.put("month", date.getMonthValue());
            monthData.put("monthName", date.getMonth().toString());
            months.add(monthData);
        }

        return ResponseEntity.ok(months);
    }

    // ===========================================================
    // Chat Statistics Endpoints
    // ===========================================================

    /**
     * Get user chat handling statistics for a specific month
     * @param userId User ID
     * @param year Year
     * @param month Month (1-12)
     * @return Chat handling statistics
     */
    @GetMapping("/users/{userId}/chat-stats/{year}/{month}")
    @PreAuthorize("hasRole('ADMIN') or @userService.isCurrentUser(#userId)")
    public ResponseEntity<Map<String, Object>> getUserMonthlyChatStats(@PathVariable Long userId,
                                                                     @PathVariable int year,
                                                                     @PathVariable int month) {
        logger.info("Getting monthly chat stats for user {} for {}-{}", userId, year, month);
        Map<String, Object> stats = chatService.getUserChatHandlingStatsMonthly(userId, year, month);
        return ResponseEntity.ok(stats);
    }

    /**
     * Get user chat handling statistics for a specific quarter
     * @param userId User ID
     * @param year Year
     * @param quarter Quarter (1-4)
     * @return Chat handling statistics
     */
    @GetMapping("/users/{userId}/chat-stats/{year}/quarter/{quarter}")
    @PreAuthorize("hasRole('ADMIN') or @userService.isCurrentUser(#userId)")
    public ResponseEntity<Map<String, Object>> getUserQuarterlyChatStats(@PathVariable Long userId,
                                                                        @PathVariable int year,
                                                                        @PathVariable int quarter) {
        logger.info("Getting quarterly chat stats for user {} for {}-Q{}", userId, year, quarter);
        Map<String, Object> stats = chatService.getUserChatHandlingStatsQuarterly(userId, year, quarter);
        return ResponseEntity.ok(stats);
    }

    /**
     * Get user chat handling statistics for a specific year
     * @param userId User ID
     * @param year Year
     * @return Chat handling statistics
     */
    @GetMapping("/users/{userId}/chat-stats/{year}")
    @PreAuthorize("hasRole('ADMIN') or @userService.isCurrentUser(#userId)")
    public ResponseEntity<Map<String, Object>> getUserYearlyChatStats(@PathVariable Long userId,
                                                                     @PathVariable int year) {
        logger.info("Getting yearly chat stats for user {} for {}", userId, year);
        Map<String, Object> stats = chatService.getUserChatHandlingStatsYearly(userId, year);
        return ResponseEntity.ok(stats);
    }

    /**
     * Generate quarterly chat report
     * @param year Year
     * @param quarter Quarter (1-4)
     * @return Quarterly report data
     */
    @GetMapping("/reports/quarterly/{year}/{quarter}")
    public ResponseEntity<Map<String, Object>> generateQuarterlyReport(@PathVariable int year,
                                                                     @PathVariable int quarter) {
        logger.info("Generating quarterly report for {}-Q{}", year, quarter);
        Map<String, Object> report = chatService.generateQuarterlyChatReport(year, quarter);
        return ResponseEntity.ok(report);
    }

    /**
     * Generate yearly chat report
     * @param year Year
     * @return Yearly report data
     */
    @GetMapping("/reports/yearly/{year}")
    public ResponseEntity<Map<String, Object>> generateYearlyReport(@PathVariable int year) {
        logger.info("Generating yearly report for {}", year);
        Map<String, Object> report = chatService.generateYearlyChatReport(year);
        return ResponseEntity.ok(report);
    }

    /**
     * Generate agent-specific quarterly report
     * @param agentId Agent ID
     * @param year Year
     * @param quarter Quarter (1-4)
     * @return Agent quarterly report data
     */
    @GetMapping("/reports/agent/{agentId}/quarterly/{year}/{quarter}")
    public ResponseEntity<Map<String, Object>> generateAgentQuarterlyReport(@PathVariable Long agentId,
                                                                          @PathVariable int year,
                                                                          @PathVariable int quarter) {
        logger.info("Generating quarterly report for agent {} for {}-Q{}", agentId, year, quarter);
        Map<String, Object> report = chatService.generateAgentQuarterlyReport(agentId, year, quarter);
        return ResponseEntity.ok(report);
    }

    /**
     * Generate agent-specific yearly report
     * @param agentId Agent ID
     * @param year Year
     * @return Agent yearly report data
     */
    @GetMapping("/reports/agent/{agentId}/yearly/{year}")
    public ResponseEntity<Map<String, Object>> generateAgentYearlyReport(@PathVariable Long agentId,
                                                                       @PathVariable int year) {
        logger.info("Generating yearly report for agent {} for {}", agentId, year);
        Map<String, Object> report = chatService.generateAgentYearlyReport(agentId, year);
        return ResponseEntity.ok(report);
    }


    // ===========================================================
    // Chat History and Session Management Endpoints
    // ===========================================================

    /**
     * Get all chat sessions for admin review (both active and completed)
     * @return List of all sessions
     */
    @GetMapping("/sessions/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ChatSession>> getAllSessionsForAdmin() {
        logger.info("Admin requesting all chat sessions for review");
        List<ChatSession> sessions = chatService.getAllSessionsForAdmin();
        return ResponseEntity.ok(sessions);
    }

    /**
     * Get all chat sessions for a specific agent
     * @param agentId Agent user ID
     * @return List of agent's sessions
     */
    @GetMapping("/agents/{agentId}/all-sessions")
    public ResponseEntity<List<ChatSession>> getAllAgentSessions(@PathVariable Long agentId) {
        logger.info("Admin requesting all sessions for agent {}", agentId);
        List<ChatSession> sessions = chatService.getAllSessionsForAgent(agentId);
        return ResponseEntity.ok(sessions);
    }

    /**
     * Get sessions within a specific date range
     * @param startDate Start date (ISO format)
     * @param endDate End date (ISO format)
     * @return List of sessions in date range
     */
    @GetMapping("/sessions/date-range")
    public ResponseEntity<List<ChatSession>> getSessionsByDateRange(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        logger.info("Admin requesting sessions between {} and {}", startDate, endDate);
        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);
        List<ChatSession> sessions = chatService.getSessionsByDateRange(start, end);
        return ResponseEntity.ok(sessions);
    }

    /**
     * Get all sessions for a specific user
     * @param userId User ID
     * @return List of user's sessions
     */
    @GetMapping("/users/{userId}/all-sessions")
    public ResponseEntity<List<ChatSession>> getUserSessions(@PathVariable Long userId) {
        logger.info("User {} requesting their sessions", userId);
        List<ChatSession> sessions = chatService.getSessionsByUser(userId);
        return ResponseEntity.ok(sessions);
    }


    /**
     * Get detailed session information including all messages
     * @param sessionId Session ID
     * @return Session details with messages
     */
    @GetMapping("/sessions/{sessionId}/details")
    @PreAuthorize("hasRole('ADMIN') or @chatService.canUserAccessSession(#sessionId, authentication.principal.username)")
    public ResponseEntity<Map<String, Object>> getSessionDetails(@PathVariable Long sessionId) {
        logger.info("User requesting detailed information for session {}", sessionId);
        Map<String, Object> details = chatService.getSessionDetailsWithMessages(sessionId);
        return ResponseEntity.ok(details);
    }

    /**
     * Search sessions by participant name or session name
     * @param searchTerm Search term
     * @return List of matching sessions
     */
    @GetMapping("/sessions/search")
    public ResponseEntity<List<ChatSession>> searchSessions(@RequestParam String searchTerm) {
        logger.info("Admin searching sessions with term: {}", searchTerm);
        // This would need implementation in the service layer
        List<ChatSession> sessions = chatService.getAllSessionsForAdmin().stream()
            .filter(session ->
                session.getSessionName().toLowerCase().contains(searchTerm.toLowerCase()) ||
                session.getParticipants().stream()
                    .anyMatch(user -> user.getName().toLowerCase().contains(searchTerm.toLowerCase()) ||
                                    user.getUsername().toLowerCase().contains(searchTerm.toLowerCase()))
            )
            .collect(Collectors.toList());
        return ResponseEntity.ok(sessions);
    }

    // ===========================================================
    // Privilege Management Endpoints
    // ===========================================================

    /**
     * List all privileges in the system
     * @return List of all privileges
     */
    @GetMapping("/privileges")
    public ResponseEntity<List<Privilege>> getAllPrivileges() {
        logger.info("Admin requesting list of all privileges");
        List<Privilege> privileges = privilegeService.getAllPrivileges();
        return ResponseEntity.ok(privileges);
    }

    /**
     * Create a new privilege
     * @param privilege Privilege data
     * @param authentication Current admin authentication
     * @return Created privilege
     */
    @PostMapping("/privileges")
    public ResponseEntity<Privilege> createPrivilege(@RequestBody Privilege privilege,
                                                   Authentication authentication) {
        logger.info("Admin {} creating new privilege: {}", authentication.getName(), privilege.getName());
        Privilege createdPrivilege = privilegeService.createPrivilege(privilege, authentication.getName());
        return ResponseEntity.ok(createdPrivilege);
    }

    /**
     * Delete a privilege by ID
     * @param privilegeId Privilege ID to delete
     * @param authentication Current admin authentication
     * @return Success message
     */
    @DeleteMapping("/privileges/{privilegeId}")
    public ResponseEntity<String> deletePrivilege(@PathVariable Long privilegeId,
                                                Authentication authentication) {
        logger.info("Admin {} deleting privilege {}", authentication.getName(), privilegeId);
        privilegeService.deletePrivilege(privilegeId, authentication.getName());
        return ResponseEntity.ok("Privilege deleted successfully");
    }

    /**
     * Assign a privilege to a permission
     * @param privilegeId Privilege ID
     * @param permissionId Permission ID to assign
     * @param authentication Current admin authentication
     * @return Updated privilege
     */
    @PostMapping("/privileges/{privilegeId}/assign-permission/{permissionId}")
    public ResponseEntity<Privilege> assignPrivilegeToPermission(@PathVariable Long privilegeId,
                                                               @PathVariable Long permissionId,
                                                               Authentication authentication) {
        logger.info("Admin {} assigning permission {} to privilege {}", authentication.getName(), permissionId, privilegeId);
        Privilege updatedPrivilege = privilegeService.assignPrivilegeToPermission(privilegeId, permissionId, authentication.getName());
        return ResponseEntity.ok(updatedPrivilege);
    }

    /**
     * Remove a privilege from a permission
     * @param privilegeId Privilege ID
     * @param permissionId Permission ID to remove
     * @param authentication Current admin authentication
     * @return Updated privilege
     */
    @PostMapping("/privileges/{privilegeId}/remove-permission/{permissionId}")
    public ResponseEntity<Privilege> removePrivilegeFromPermission(@PathVariable Long privilegeId,
                                                                 @PathVariable Long permissionId,
                                                                 Authentication authentication) {
        logger.info("Admin {} removing permission {} from privilege {}", authentication.getName(), permissionId, privilegeId);
        Privilege updatedPrivilege = privilegeService.removePrivilegeFromPermission(privilegeId, permissionId, authentication.getName());
        return ResponseEntity.ok(updatedPrivilege);
    }
}