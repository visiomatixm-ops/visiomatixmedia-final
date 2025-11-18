/**
 * Left Navigation Pane Component
 *
 * Provides the main navigation sidebar for the Visiomatix Chat dashboard.
 * Displays different navigation options based on user roles and privileges.
 * Supports collapsible/expandable sidebar functionality for better UX.
 *
 * Features:
 * - Role-based navigation visibility
 * - Privilege-based access control
 * - Collapsible sidebar design
 * - Responsive layout for mobile devices
 * - User action buttons (password change, logout)
 */

import React from "react";

/**
 * Props interface for the LeftNavigationPane component
 */
interface LeftNavigationPaneProps {
  /** Currently active navigation tab */
  activeTab: string;
  /** Function to set the active navigation tab */
  setActiveTab: (tab: string) => void;
  /** Whether the sidebar is collapsed */
  sidebarCollapsed: boolean;
  /** Function to toggle sidebar collapse state */
  setSidebarCollapsed: (collapsed: boolean) => void;
  /** Function to check if user can access statistics */
  canAccessStatistics: () => boolean;
  /** Function to check if user can manage users */
  canManageUsers: () => boolean;
  /** Function to check if user can manage roles */
  canManageRoles: () => boolean;
  /** Function to handle user logout */
  onLogout: () => void;
  /** Function to show password change modal */
  onShowPasswordChange: () => void;
  /** Current user's role */
  userRole: string;
}

const LeftNavigationPane: React.FC<LeftNavigationPaneProps> = ({
  activeTab,
  setActiveTab,
  sidebarCollapsed,
  setSidebarCollapsed,
  canAccessStatistics,
  canManageUsers,
  canManageRoles,
  onLogout,
  onShowPasswordChange,
  userRole
}) => {
  return (
    <>
      {/* Collapsible Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="sidebar-header">
          <h5>Visiomatix Media</h5>
        </div>
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? '☰' : '◁'}
        </button>
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item">
            <a
              href="#"
              className={`sidebar-nav-link ${activeTab === "chats" ? "active" : ""}`}
              onClick={(e) => { e.preventDefault(); setActiveTab("chats"); }}
            >
              💬 <span>Chats</span>
            </a>
          </li>
          {/* Show admin tabs for admin users and privileged roles */}
          {/* Includes hardcoded admin roles and roles with specific privileges */}
          {(userRole === "ADMIN" || userRole === "ROLE_ADMIN" || userRole === "CUSTOMER_SUCCESS_MANAGER" ||
            userRole === "CUSTOMER_SUCCESS_LEAD" || canManageUsers() || canManageRoles() || canAccessStatistics()) && (
            <>
              <li className="sidebar-nav-item">
                <a
                  href="#"
                  className={`sidebar-nav-link ${activeTab === "dashboard" ? "active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab("dashboard"); }}
                >
                  📊 <span>Dashboard</span>
                </a>
              </li>
              <li className="sidebar-nav-item">
                <a
                  href="#"
                  className={`sidebar-nav-link ${activeTab === "users" ? "active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab("users"); }}
                >
                  👥 <span>Users</span>
                </a>
              </li>
              <li className="sidebar-nav-item">
                <a
                  href="#"
                  className={`sidebar-nav-link ${activeTab === "roles" ? "active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab("roles"); }}
                >
                  🔑 <span>Roles</span>
                </a>
              </li>
              <li className="sidebar-nav-item">
                <a
                  href="#"
                  className={`sidebar-nav-link ${activeTab === "permissions" ? "active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab("permissions"); }}
                >
                  🛡️ <span>Permissions</span>
                </a>
              </li>
              <li className="sidebar-nav-item">
                <a
                  href="#"
                  className={`sidebar-nav-link ${activeTab === "privileges" ? "active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab("privileges"); }}
                >
                  ⚡ <span>Privileges</span>
                </a>
              </li>
              <li className="sidebar-nav-item">
                <a
                  href="#"
                  className={`sidebar-nav-link ${activeTab === "admin-history" ? "active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab("admin-history"); }}
                >
                  📚 <span>Chat History</span>
                </a>
              </li>
            </>
          )}

          {/* Show agent-accessible tabs based on privileges */}
          {userRole !== "ADMIN" && userRole !== "ROLE_ADMIN" && (
            <>
              {canManageUsers() && (
                <li className="sidebar-nav-item">
                  <a
                    href="#"
                    className={`sidebar-nav-link ${activeTab === "users" ? "active" : ""}`}
                    onClick={(e) => { e.preventDefault(); setActiveTab("users"); }}
                  >
                    👥 <span>Users</span>
                  </a>
                </li>
              )}
              {canManageRoles() && (
                <li className="sidebar-nav-item">
                  <a
                    href="#"
                    className={`sidebar-nav-link ${activeTab === "roles" ? "active" : ""}`}
                    onClick={(e) => { e.preventDefault(); setActiveTab("roles"); }}
                  >
                    🔑 <span>Roles</span>
                  </a>
                </li>
              )}
            </>
          )}
          {canAccessStatistics() && (
            <li className="sidebar-nav-item">
              <a
                href="#"
                className={`sidebar-nav-link ${activeTab === "statistics" ? "active" : ""}`}
                onClick={(e) => { e.preventDefault(); setActiveTab("statistics"); }}
              >
                📈 <span>Statistics</span>
              </a>
            </li>
          )}
        </ul>

        {/* Bottom section with user actions */}
        <div className="sidebar-footer">
          <button
            className="sidebar-action-btn"
            onClick={onShowPasswordChange}
            title="Change Password"
          >
            🔑 {!sidebarCollapsed && <span>Change Password</span>}
          </button>
          <button
            className="sidebar-action-btn logout-btn"
            onClick={onLogout}
            title="Logout"
          >
            🚪 {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Sidebar Styles */}
      <style>
        {`
          /* Sidebar Styles */
          .sidebar {
            background-color: rgb(23, 50, 85);
            color: white;
            min-height: 100vh;
            transition: width 0.3s ease;
            overflow-y: auto;
            position: fixed;
            left: 0;
            top: 0;
            margin-top:6.5em;
            z-index: 1000;
          }

          .sidebar.collapsed {
            width: 60px;
          }

          .sidebar.expanded {
            width: 250px;
          }

          .sidebar-toggle {
            background-color: rgb(23, 50, 85);
            border: none;
            color: white;
            padding: 10px;
            cursor: pointer;
            width: 100%;
            text-align: center;
            font-size: 18px;
          }

          .sidebar-toggle:hover {
            background-color: rgb(18, 40, 68);
          }

          .sidebar-nav {
            padding: 0;
            margin: 0;
            list-style: none;
          }

          .sidebar-nav-item {
            margin: 0;
          }

          .sidebar-nav-link {
            display: block;
            padding: 15px 20px;
            color: white;
            text-decoration: none;
            border-bottom: 1px solid rgb(18, 40, 68);
            transition: background-color 0.3s ease;
          }

          .sidebar-nav-link:hover,
          .sidebar-nav-link.active {
            background-color: rgb(18, 40, 68);
          }

          .sidebar.collapsed .sidebar-nav-link {
            padding: 15px 10px;
            text-align: center;
          }

          .sidebar.collapsed .sidebar-nav-link span {
            display: none;
          }

          .sidebar-header {
            padding: 20px;
            border-bottom: 1px solid rgb(18, 40, 68);
            text-align: center;
          }

          .sidebar.collapsed .sidebar-header {
            padding: 10px;
          }

          .sidebar.collapsed .sidebar-header h5 {
            display: none;
          }

          @media (max-width: 768px) {
            .sidebar {
              transform: translateX(-100%);
            }
            .sidebar.show {
              transform: translateX(0);
            }
          }

          /* Footer styles */
          .sidebar-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 10px;
            border-top: 1px solid rgb(18, 40, 68);
            margin-bottom: 10rem;
          }

          .sidebar-action-btn {
            display: block;
            width: 100%;
            padding: 12px 20px;
            background-color: transparent;
            border: none;
            color: white;
            text-align: left;
            cursor: pointer;
            transition: background-color 0.3s ease;
            font-size: 14px;
            margin-bottom: 5px;
          }

          .sidebar-action-btn:hover {
            background-color: rgb(18, 40, 68);
          }

          .sidebar-action-btn:last-child {
            margin-bottom: 0;
          }

          .logout-btn {
            border-top: 1px solid rgb(18, 40, 68);
            margin-top: 10px;
            padding-top: 15px;
          }

          .sidebar.collapsed .sidebar-action-btn {
            padding: 12px 10px;
            text-align: center;
          }

          .sidebar.collapsed .sidebar-action-btn span {
            display: none;
          }
        `}
      </style>
    </>
  );
};

export default LeftNavigationPane;