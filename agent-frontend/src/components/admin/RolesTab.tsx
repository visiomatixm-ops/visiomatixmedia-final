/**
 * ===========================================================
 * Roles Tab Component - Comprehensive Role-Based Access Control
 * ===========================================================
 *
 * This component provides complete role management functionality within the
 * Role-Based Access Control (RBAC) system. It allows administrators to create,
 * modify, and manage user roles with associated permissions and privileges.
 *
 * Key Features:
 * - Create new roles with automatic permission assignment
 * - Create/override roles with custom permission and privilege selection
 * - Edit existing role names inline
 * - Delete roles with confirmation dialogs
 * - Assign/unassign permissions directly to roles
 * - Assign/unassign privileges to roles (with inherited permissions)
 * - Visual distinction between direct and inherited permissions
 * - Interactive dropdown menus for bulk permission/privilege management
 * - Real-time role-permission-privilege relationship management
 *
 * Role Types and Auto-Assignment:
 * - ADMIN roles: Automatic assignment of all permissions and privileges
 * - CUSTOMER_SUCCESS roles: Comprehensive access including management privileges
 * - AGENT roles: Chat handling and basic user management permissions
 * - USER roles: Basic chat access permissions
 * - Dynamic patterns: Custom assignments based on role naming conventions
 *
 * Permission vs Privilege Relationship:
 * - Direct Permissions: Low-level access controls assigned directly to roles
 * - Inherited Permissions: Permissions that come from assigned privileges (marked with *)
 * - Privileges: High-level feature access that grant multiple related permissions
 *
 * Visual Indicators:
 * - Blue badges: Direct permission assignments
 * - Gray badges with *: Inherited permissions from privileges
 * - Yellow badges: Assigned privileges with tooltip showing granted permissions
 *
 * Use Cases:
 * - Defining organizational roles and responsibilities
 * - Managing user access levels across the system
 * - Implementing security policies and access hierarchies
 * - Supporting complex business rule-based access control
 * - Auditing and compliance with access management requirements
 *
 * Security Considerations:
 * - Requires administrative privileges to access and modify
 * - Changes affect system-wide user access and permissions
 * - Role deletion requires explicit confirmation to prevent accidents
 * - Audit trail should track all role and permission changes
 * - Override functionality allows careful management of existing roles
 *
 * User Experience:
 * - Intuitive role creation with guided permission selection
 * - Inline editing for quick role name changes
 * - Visual feedback for permission inheritance and relationships
 * - Responsive design supporting various screen sizes
 * - Loading states and error handling for all operations
 * - Comprehensive help text explaining permission concepts
 *
 * Technical Implementation:
 * - Complex state management for form controls and selections
 * - Interactive checkbox-based permission assignment
 * - Dropdown menus with scrollable content for large permission lists
 * - Real-time updates to role-permission-privilege relationships
 * - Form validation and user input sanitization
 * - Bootstrap-based responsive UI components
 *
 * Integration Points:
 * - Backend role service for CRUD operations and auto-assignment
 * - Permission and privilege management systems
 * - User role assignment functionality
 * - Authentication and authorization systems
 * - Audit logging and compliance tracking
 *
 * Business Logic:
 * - Auto-assignment based on role naming patterns for consistency
 * - Support for both simple and advanced role creation methods
 * - Flexible permission model supporting direct and inherited access
 * - Override capability for careful management of existing roles
 * - Comprehensive validation and error handling
 *
 * @author Visiomatix Development Team
 * @version 2.0
 * @since 2025
 * ===========================================================
 */

import React, { useState } from "react";

/**
 * Interface defining the structure of a user role
 * Roles contain both direct permissions and assigned privileges
 */
interface Role {
  /** Unique identifier for the role */
  id: number;

  /** Role name, typically in descriptive format (e.g., "CUSTOMER_SUCCESS_MANAGER") */
  name: string;

  /** Array of permissions directly assigned to this role */
  permissions?: { id: number; name: string }[];

  /** Array of privileges assigned to this role, each with their mapped permissions */
  privileges?: { id: number; name: string; mappedPermissions?: { id: number; name: string }[] }[];
}

/**
 * Interface defining the structure of a system permission
 * Used for direct assignment to roles
 */
interface Permission {
  /** Unique identifier for the permission */
  id: number;

  /** Permission name for identification */
  name: string;

  /** Optional description explaining the permission's purpose */
  description?: string;
}

/**
 * Interface defining the structure of a system privilege
 * Privileges are higher-level access controls that grant multiple permissions
 */
interface Privilege {
  /** Unique identifier for the privilege */
  id: number;

  /** Privilege name for identification */
  name: string;

  /** Array of permissions that this privilege grants */
  mappedPermissions?: { id: number; name: string }[];
}

/**
 * Props interface for the RolesTab component
 * Defines all required properties and callback functions for role management
 */
interface RolesTabProps {
  /** Array of all roles in the system */
  roles: Role[];

  /** Array of all permissions available for assignment */
  permissions: Permission[];

  /** Array of all privileges available for assignment */
  privileges: Privilege[];

  /** Loading state indicator for async operations */
  loading: boolean;

  /** Callback function to assign a permission directly to a role */
  onAssignPermission: (roleId: number, permissionId: number) => void;

  /** Callback function to remove a permission from a role */
  onRemovePermission: (roleId: number, permissionId: number) => void;

  /** Callback function to assign a privilege to a role */
  onAssignPrivilege: (roleId: number, privilegeId: number) => void;

  /** Callback function to remove a privilege from a role */
  onRemovePrivilege: (roleId: number, privilegeId: number) => void;

  /** Callback function to create a new role (legacy method) */
  onCreateRole: (roleData: { name: string }) => void;

  /** Callback function to create or override a role with full configuration */
  onCreateOrOverrideRole: (roleData: {
    name: string;
    permissionNames: string[];
    privilegeNames: string[];
    override: boolean;
    createdBy: string
  }) => void;

  /** Callback function to update a role's name */
  onUpdateRole: (roleId: number, roleData: { name: string }) => void;

  /** Callback function to delete a role by ID */
  onDeleteRole: (roleId: number) => void;
}

const RolesTab: React.FC<RolesTabProps> = ({
  roles,
  permissions,
  privileges,
  loading,
  onAssignPermission,
  onRemovePermission,
  onAssignPrivilege,
  onRemovePrivilege,
  onCreateRole,
  onCreateOrOverrideRole,
  onUpdateRole,
  onDeleteRole
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRole, setEditingRole] = useState<number | null>(null);
  const [newRoleName, setNewRoleName] = useState("");
  const [editRoleName, setEditRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [selectedPrivileges, setSelectedPrivileges] = useState<number[]>([]);
  const [overrideChecked, setOverrideChecked] = useState(false);

  const handleCreateRole = () => {
    if (newRoleName.trim()) {
      onCreateRole({ name: newRoleName.trim() });
      setNewRoleName("");
      setShowCreateForm(false);
    }
  };

  const handleCreateOrOverrideRole = () => {
    if (newRoleName.trim()) {
      const permissionNames = selectedPermissions.map(id => permissions.find(p => p.id === id)?.name).filter(Boolean) as string[];
      const privilegeNames = selectedPrivileges.map(id => privileges.find(p => p.id === id)?.name).filter(Boolean) as string[];
      onCreateOrOverrideRole({
        name: newRoleName.trim(),
        permissionNames,
        privilegeNames,
        override: overrideChecked,
        createdBy: "admin" // TODO: get from current user context
      });
      setNewRoleName("");
      setSelectedPermissions([]);
      setSelectedPrivileges([]);
      setOverrideChecked(false);
      setShowCreateForm(false);
    }
  };

  const handleUpdateRole = (roleId: number) => {
    if (editRoleName.trim()) {
      onUpdateRole(roleId, { name: editRoleName.trim() });
      setEditingRole(null);
      setEditRoleName("");
    }
  };

  const handleDeleteRole = (roleId: number) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      onDeleteRole(roleId);
    }
  };

  return (
    <div>
      <h5>Role Management</h5>

      {/* Permission Mapping Info */}
      <div className="alert alert-info mb-4">
        <h6>Role Management with Permissions & Privileges:</h6>
        <div className="row">
          <div className="col-md-6">
            <h6>Available Permissions:</h6>
            <ul className="mb-2">
              <li><strong>CHAT_ACCESS</strong> - General chat access</li>
              <li><strong>CHAT_WITH_AGENT</strong> - Chat with agents</li>
              <li><strong>CHAT_WITH_USER</strong> - Chat with users</li>
              <li><strong>CHAT_WITH_DEFAULT</strong> - Default chat access</li>
              <li><strong>ADMIN_ACCESS</strong> - Administrative access</li>
              <li><strong>USER_MANAGEMENT</strong> - User CRUD operations</li>
              <li><strong>ROLE_MANAGEMENT</strong> - Role management</li>
              <li><strong>SYSTEM_MONITORING</strong> - System monitoring</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h6>Privilege-Based Access:</h6>
            <ul className="mb-0">
              <li><strong>ACCESS_CHAT_HISTORY_TAB</strong> - Chat History tab</li>
              <li><strong>ACCESS_STATISTICS_TAB</strong> - Statistics tab</li>
              <li><strong>ACCESS_USER_MANAGEMENT</strong> - Users tab</li>
              <li><strong>ACCESS_ROLE_MANAGEMENT</strong> - Roles tab</li>
              <li><strong>ACCESS_PERMISSION_MANAGEMENT</strong> - Permissions tab</li>
              <li><strong>ACCESS_PRIVILEGE_MANAGEMENT</strong> - Privileges tab</li>
              <li><strong>ACCESS_AGENT_DASHBOARD</strong> - Agent Dashboard</li>
              <li><strong>CHAT_WITH_DEFAULT_USER</strong> - Chat with default user</li>
              <li><strong>CREATE_USER</strong> - Create new users</li>
              <li><strong>DELETE_USER</strong> - Delete users</li>
              <li><strong>MANAGE_CHAT</strong> - Full chat management</li>
            </ul>
          </div>
        </div>
        <p className="mb-0 mt-2"><small className="text-muted">
          <strong>Auto-Assignment:</strong> New roles are automatically assigned permissions and privileges based on naming patterns.
          <br />
          <strong>CUSTOMER_SUCCESS</strong> roles get comprehensive access including all management privileges.
          <br />
          Use the "Permissions" and "Privileges" dropdowns to assign additional permissions and privileges to roles.
          <br />
          <strong>Direct permissions</strong> (blue badges) are assigned directly to roles.
          <strong>Inherited permissions</strong> (gray badges with *) come from assigned privileges.
          <strong>Privileges</strong> (yellow badges) grant access to specific features and their associated permissions.
        </small></p>
      </div>

      {/* Create Role Button */}
      <div className="mb-3">
        <button
          className="btn btn-success"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Cancel" : "Create New Role"}
        </button>
      </div>

      {/* Create Role Form */}
      {showCreateForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h6>Create New Role</h6>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Role Name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <button
                  className="btn btn-primary me-2"
                  onClick={handleCreateRole}
                  disabled={loading || !newRoleName.trim()}
                >
                  Create Role (Legacy)
                </button>
                <button
                  className="btn btn-success me-2"
                  onClick={handleCreateOrOverrideRole}
                  disabled={loading || !newRoleName.trim()}
                >
                  Create/Override Role
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewRoleName("");
                    setSelectedPermissions([]);
                    setSelectedPrivileges([]);
                    setOverrideChecked(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <h6>Permissions</h6>
                <div style={{maxHeight: '200px', overflowY: 'auto'}}>
                  {permissions.map((perm) => (
                    <div key={perm.id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`create-perm-${perm.id}`}
                        checked={selectedPermissions.includes(perm.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPermissions([...selectedPermissions, perm.id]);
                          } else {
                            setSelectedPermissions(selectedPermissions.filter(id => id !== perm.id));
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor={`create-perm-${perm.id}`}>
                        {perm.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <h6>Privileges</h6>
                <div style={{maxHeight: '200px', overflowY: 'auto'}}>
                  {privileges.map((priv) => (
                    <div key={priv.id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`create-priv-${priv.id}`}
                        checked={selectedPrivileges.includes(priv.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPrivileges([...selectedPrivileges, priv.id]);
                          } else {
                            setSelectedPrivileges(selectedPrivileges.filter(id => id !== priv.id));
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor={`create-priv-${priv.id}`}>
                        {priv.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="override-checkbox"
                checked={overrideChecked}
                onChange={(e) => setOverrideChecked(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="override-checkbox">
                Override existing role (if it exists)
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Permissions</th>
              <th>Privileges</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>
                  {editingRole === role.id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={editRoleName}
                        onChange={(e) => setEditRoleName(e.target.value)}
                      />
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleUpdateRole(role.id)}
                        disabled={loading || !editRoleName.trim()}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setEditingRole(null);
                          setEditRoleName("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    role.name
                  )}
                </td>
                <td>
                  {role.permissions?.map((perm) => (
                    <span key={perm.id} className="badge bg-info me-1" title="Direct permission assignment">
                      {perm.name}
                    </span>
                  ))}
                  {role.privileges?.map(priv =>
                    priv.mappedPermissions?.map(perm => (
                      <span key={`priv-${priv.id}-perm-${perm.id}`} className="badge bg-light text-dark me-1" title={`Inherited from privilege: ${priv.name}`}>
                        {perm.name}*
                      </span>
                    ))
                  )}
                </td>
                <td>
                  {role.privileges?.map((priv) => (
                    <span key={priv.id} className="badge bg-warning me-1" title={`Grants: ${priv.mappedPermissions?.map(p => p.name).join(', ')}`}>
                      {priv.name}
                    </span>
                  ))}
                </td>
                <td>
                  <div className="btn-group" role="group">
                    {/* Edit Role Button */}
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => {
                        setEditingRole(role.id);
                        setEditRoleName(role.name);
                      }}
                      disabled={loading}
                    >
                      Edit
                    </button>

                    {/* Delete Role Button */}
                    <button
                      className="btn btn-sm btn-danger me-1"
                      onClick={() => handleDeleteRole(role.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>

                    {/* Manage Permissions Dropdown */}
                    <div className="dropdown me-1">
                      <button
                        className="btn btn-sm btn-outline-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        Permissions ({role.permissions?.length || 0})
                      </button>
                      <ul className="dropdown-menu" style={{maxHeight: '300px', overflowY: 'auto'}}>
                        {permissions.map((perm) => {
                          const isAssigned = role.permissions?.some((p) => p.id === perm.id);
                          return (
                            <li key={perm.id}>
                              <div className="dropdown-item">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`perm-${role.id}-${perm.id}`}
                                    checked={isAssigned}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        onAssignPermission(role.id, perm.id);
                                      } else {
                                        onRemovePermission(role.id, perm.id);
                                      }
                                    }}
                                    disabled={loading}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`perm-${role.id}-${perm.id}`}
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

                    {/* Manage Privileges Dropdown */}
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-outline-warning dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        Privileges ({role.privileges?.length || 0})
                      </button>
                      <ul className="dropdown-menu" style={{maxHeight: '300px', overflowY: 'auto'}}>
                        {privileges.map((priv) => {
                          const isAssigned = role.privileges?.some((p) => p.id === priv.id);
                          return (
                            <li key={priv.id}>
                              <div className="dropdown-item">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`priv-${role.id}-${priv.id}`}
                                    checked={isAssigned}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        onAssignPrivilege(role.id, priv.id);
                                      } else {
                                        onRemovePrivilege(role.id, priv.id);
                                      }
                                    }}
                                    disabled={loading}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`priv-${role.id}-${priv.id}`}
                                  >
                                    {priv.name}
                                  </label>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesTab;