/**
 * ===========================================================
 * Privileges Tab Component
 * ===========================================================
 *
 * This component provides comprehensive privilege management functionality within the
 * Role-Based Access Control (RBAC) system. Privileges are higher-level access controls
 * that can be mapped to multiple permissions, allowing for flexible and granular
 * access management.
 *
 * Key Features:
 * - Create new privileges with unique naming
 * - View all existing privileges in a structured table
 * - Delete privileges with confirmation dialogs
 * - Map/unmap privileges to specific permissions
 * - Interactive permission assignment via dropdown menus
 * - Real-time privilege-permission relationship management
 *
 * Privilege Types Supported:
 * - ACCESS_CHAT_HISTORY_TAB: Access to chat history review functionality
 * - ACCESS_STATISTICS_TAB: Access to system statistics and analytics
 * - ACCESS_USER_MANAGEMENT: User CRUD operations in admin panel
 * - ACCESS_ROLE_MANAGEMENT: Role management and assignment capabilities
 * - ACCESS_PERMISSION_MANAGEMENT: Permission management access
 * - ACCESS_PRIVILEGE_MANAGEMENT: Privilege management access
 * - ACCESS_AGENT_DASHBOARD: Agent dashboard access
 * - CHAT_WITH_DEFAULT_USER: Permission to interact with system default user
 *
 * Privilege vs Permission Relationship:
 * - Permissions: Low-level access controls (e.g., "can read user data")
 * - Privileges: High-level feature access (e.g., "can access user management tab")
 * - One privilege can map to multiple permissions
 * - Privileges provide logical grouping of related permissions
 *
 * Use Cases:
 * - Defining feature-level access controls
 * - Grouping related permissions under logical privileges
 * - Implementing business rule-based access control
 * - Supporting complex organizational hierarchies
 * - Managing UI component visibility and feature access
 *
 * Security Considerations:
 * - Requires administrative privileges to modify
 * - Changes affect system-wide access control policies
 * - Privilege deletion requires explicit confirmation
 * - Audit trail should track privilege-permission mappings
 *
 * User Experience:
 * - Intuitive privilege creation with validation
 * - Visual mapping interface using dropdown menus
 * - Clear privilege descriptions and usage guidelines
 * - Responsive design for various screen sizes
 * - Loading states and error handling for async operations
 *
 * Technical Implementation:
 * - Interactive checkbox-based permission mapping
 * - Real-time updates to privilege-permission relationships
 * - Efficient table rendering with dropdown menus
 * - Form validation and user input sanitization
 * - Bootstrap-based responsive UI components
 *
 * Integration Points:
 * - Backend privilege service for CRUD operations
 * - Permission management system for mapping operations
 * - Role assignment system for privilege distribution
 * - User interface components for access control
 *
 * @author Visiomatix Development Team
 * @version 1.0
 * @since 2025
 * ===========================================================
 */

import React, { useState } from "react";

/**
 * Interface defining the structure of a system privilege
 * Privileges are higher-level access controls that can be mapped to permissions
 */
interface Privilege {
  /** Unique identifier for the privilege */
  id: number;

  /** Privilege name, typically descriptive (e.g., "ACCESS_CHAT_HISTORY_TAB") */
  name: string;

  /** Array of permissions currently mapped to this privilege */
  mappedPermissions?: { id: number; name: string }[];
}

/**
 * Interface defining the structure of a system permission
 * Used for mapping privileges to specific permissions
 */
interface Permission {
  /** Unique identifier for the permission */
  id: number;

  /** Permission name for identification */
  name: string;

  /** Optional description of what the permission allows */
  description?: string;
}

/**
 * Props interface for the PrivilegesTab component
 * Defines all required properties and callback functions
 */
interface PrivilegesTabProps {
  /** Array of all privileges in the system */
  privileges: Privilege[];

  /** Array of all permissions available for mapping */
  permissions: Permission[];

  /** Loading state indicator for async operations */
  loading: boolean;

  /** Callback function to create a new privilege */
  onCreatePrivilege: (privilegeData: { name: string }) => void;

  /** Callback function to delete a privilege by ID */
  onDeletePrivilege: (privilegeId: number) => void;

  /** Callback function to assign a permission to a privilege */
  onAssignPrivilegeToPermission: (privilegeId: number, permissionId: number) => void;

  /** Callback function to remove a permission from a privilege */
  onRemovePrivilegeFromPermission: (privilegeId: number, permissionId: number) => void;
}

const PrivilegesTab: React.FC<PrivilegesTabProps> = ({
  privileges,
  permissions,
  loading,
  onCreatePrivilege,
  onDeletePrivilege,
  onAssignPrivilegeToPermission,
  onRemovePrivilegeFromPermission
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPrivilegeName, setNewPrivilegeName] = useState("");

  const handleCreatePrivilege = () => {
    if (newPrivilegeName.trim()) {
      onCreatePrivilege({ name: newPrivilegeName.trim() });
      setNewPrivilegeName("");
      setShowCreateForm(false);
    }
  };

  const handleDeletePrivilege = (privilegeId: number) => {
    if (window.confirm("Are you sure you want to delete this privilege?")) {
      onDeletePrivilege(privilegeId);
    }
  };

  return (
    <div>
      <h5>Privilege Management</h5>

      {/* Create Privilege Button */}
      <div className="mb-3">
        <button
          className="btn btn-success"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Cancel" : "Create New Privilege"}
        </button>
      </div>

      {/* Create Privilege Form */}
      {showCreateForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h6>Create New Privilege</h6>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., ACCESS_CHAT_HISTORY_TAB"
                  value={newPrivilegeName}
                  onChange={(e) => setNewPrivilegeName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <button
                  className="btn btn-primary me-2"
                  onClick={handleCreatePrivilege}
                  disabled={loading || !newPrivilegeName.trim()}
                >
                  Create Privilege
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewPrivilegeName("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privilege Mapping Info */}
      <div className="alert alert-info mb-4">
        <h6>Privilege Mapping Guide:</h6>
        <ul className="mb-0">
          <li><strong>ACCESS_CHAT_HISTORY_TAB</strong> - Access to Chat History tab</li>
          <li><strong>ACCESS_STATISTICS_TAB</strong> - Access to Statistics tab</li>
          <li><strong>ACCESS_USER_MANAGEMENT</strong> - Access to Users tab for CRUD operations</li>
          <li><strong>ACCESS_ROLE_MANAGEMENT</strong> - Access to Roles tab for CRUD operations</li>
          <li><strong>ACCESS_PERMISSION_MANAGEMENT</strong> - Access to Permissions tab for CRUD operations</li>
          <li><strong>ACCESS_PRIVILEGE_MANAGEMENT</strong> - Access to Privileges tab for CRUD operations</li>
          <li><strong>ACCESS_AGENT_DASHBOARD</strong> - Access to Agent Dashboard</li>
          <li><strong>CHAT_WITH_DEFAULT_USER</strong> - Permission to chat with default system user</li>
        </ul>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Privilege Name</th>
              <th>Mapped Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {privileges.map((privilege) => (
              <tr key={privilege.id}>
                <td>{privilege.id}</td>
                <td>{privilege.name}</td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-sm btn-outline-info dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      Map Permissions ({privilege.mappedPermissions?.length || 0})
                    </button>
                    <ul className="dropdown-menu" style={{maxHeight: '300px', overflowY: 'auto'}}>
                      {permissions.map((perm) => {
                        const isMapped = privilege.mappedPermissions?.some((p) => p.id === perm.id);
                        return (
                          <li key={perm.id}>
                            <div className="dropdown-item">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`priv-perm-${privilege.id}-${perm.id}`}
                                  checked={isMapped}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      onAssignPrivilegeToPermission(privilege.id, perm.id);
                                    } else {
                                      onRemovePrivilegeFromPermission(privilege.id, perm.id);
                                    }
                                  }}
                                  disabled={loading}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`priv-perm-${privilege.id}-${perm.id}`}
                                >
                                  {perm.name}
                                  <br />
                                  <small className="text-muted">{perm.description}</small>
                                </label>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeletePrivilege(privilege.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrivilegesTab;