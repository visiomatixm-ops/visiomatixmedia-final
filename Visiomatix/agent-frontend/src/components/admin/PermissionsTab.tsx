/**
 * ===========================================================
 * Permissions Tab Component
 * ===========================================================
 *
 * This component provides comprehensive permission management functionality for the
 * Role-Based Access Control (RBAC) system. It allows administrators to create, view,
 * and delete system permissions that control access to various features and resources.
 *
 * Key Features:
 * - Create new permissions with detailed configuration
 * - View all existing permissions in a structured table
 * - Delete permissions with confirmation dialogs
 * - Permission type categorization and mapping
 * - Resource pattern specification for fine-grained access control
 * - Real-time form validation and user feedback
 *
 * Permission Types Supported:
 * - CHAT_ACCESS: General access to chat functionality
 * - CHAT_WITH_AGENT: Permission to chat with agents
 * - CHAT_WITH_USER: Permission to chat with regular users
 * - CHAT_WITH_DEFAULT: Default chat access permissions
 * - ADMIN_ACCESS: Administrative system access
 * - USER_MANAGEMENT: User CRUD operation permissions
 * - ROLE_MANAGEMENT: Role management permissions
 * - SYSTEM_MONITORING: System monitoring and analytics access
 *
 * Permission Structure:
 * - Name: Unique identifier (e.g., "ACCESS_CHAT_HISTORY")
 * - Type: Categorization for logical grouping
 * - Description: Human-readable explanation of the permission
 * - Resource Pattern: Specific resource access patterns (e.g., "admin:history:*")
 *
 * Use Cases:
 * - Defining granular access controls for different user roles
 * - Managing feature access based on organizational requirements
 * - Implementing security policies and compliance requirements
 * - Supporting complex permission hierarchies
 *
 * Security Considerations:
 * - Requires administrative privileges to access
 * - Changes affect system-wide access control
 * - Deletion operations require explicit confirmation
 * - Audit trail should be maintained for permission changes
 *
 * User Experience:
 * - Intuitive form-based permission creation
 * - Clear categorization of permission types
 * - Visual indicators for different permission categories
 * - Responsive design for various screen sizes
 * - Loading states and error handling
 *
 * Integration Points:
 * - Backend permission service for CRUD operations
 * - Role management system for permission assignment
 * - User authentication system for access validation
 * - Audit logging system for change tracking
 *
 * @author Visiomatix Development Team
 * @version 1.0
 * @since 2025
 * ===========================================================
 */

import React, { useState } from "react";

/**
 * Interface defining the structure of a system permission
 * Contains all necessary fields for permission configuration and management
 */
interface Permission {
  /** Unique identifier for the permission */
  id: number;

  /** Permission name, typically in UPPER_CASE format (e.g., "ACCESS_CHAT_HISTORY") */
  name: string;

  /** Type of permission for categorization (e.g., "CHAT_ACCESS", "ADMIN_ACCESS") */
  permissionType: string;

  /** Human-readable description explaining what the permission allows */
  description: string;

  /** Resource pattern for fine-grained access control (e.g., "admin:history:*") */
  resourcePattern: string;
}

/**
 * Props interface for the PermissionsTab component
 * Defines all required properties and callback functions
 */
interface PermissionsTabProps {
  /** Array of all permissions in the system */
  permissions: Permission[];

  /** Loading state indicator for async operations */
  loading: boolean;

  /** Callback function to create a new permission */
  onCreatePermission: (permissionData: {
    name: string;
    permissionType: string;
    description: string;
    resourcePattern: string;
  }) => void;

  /** Callback function to delete a permission by ID */
  onDeletePermission: (permissionId: number) => void;
}

const PermissionsTab: React.FC<PermissionsTabProps> = ({
  permissions,
  loading,
  onCreatePermission,
  onDeletePermission
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPermission, setNewPermission] = useState({
    name: "",
    permissionType: "CHAT_ACCESS",
    description: "",
    resourcePattern: ""
  });

  const handleCreatePermission = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPermission.name.trim() && newPermission.description.trim()) {
      onCreatePermission(newPermission);
      setNewPermission({
        name: "",
        permissionType: "CHAT_ACCESS",
        description: "",
        resourcePattern: ""
      });
      setShowCreateForm(false);
    }
  };

  const handleDeletePermission = (permissionId: number) => {
    if (window.confirm("Are you sure you want to delete this permission?")) {
      onDeletePermission(permissionId);
    }
  };

  const getPermissionMapping = (permissionName: string) => {
    const mappings: { [key: string]: string } = {
      'CHAT_ACCESS': 'General Chat Access',
      'CHAT_WITH_AGENT': 'Chat with Agents',
      'CHAT_WITH_USER': 'Chat with Users',
      'CHAT_WITH_DEFAULT': 'Default Chat Access',
      'ADMIN_ACCESS': 'Administrative Access',
      'USER_MANAGEMENT': 'User CRUD Operations',
      'ROLE_MANAGEMENT': 'Role Management',
      'SYSTEM_MONITORING': 'System Monitoring'
    };
    return mappings[permissionName] || 'General Access';
  };

  return (
    <div>
      <h5>Permission Management</h5>

      {/* Create Permission Button */}
      <div className="mb-3">
        <button
          className="btn btn-success"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Cancel" : "Create New Permission"}
        </button>
      </div>

      {/* Create Permission Form */}
      {showCreateForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h6>Create New Permission</h6>
            <form onSubmit={handleCreatePermission}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Permission Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., ACCESS_CHAT_HISTORY"
                      value={newPermission.name}
                      onChange={(e) => setNewPermission({...newPermission, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Permission Type</label>
                    <select
                      className="form-control"
                      value={newPermission.permissionType}
                      onChange={(e) => setNewPermission({...newPermission, permissionType: e.target.value})}
                    >
                      <option value="CHAT_ACCESS">CHAT_ACCESS - General chat access</option>
                      <option value="CHAT_WITH_AGENT">CHAT_WITH_AGENT - Chat with agents</option>
                      <option value="CHAT_WITH_USER">CHAT_WITH_USER - Chat with users</option>
                      <option value="CHAT_WITH_DEFAULT">CHAT_WITH_DEFAULT - Default chat access</option>
                      <option value="ADMIN_ACCESS">ADMIN_ACCESS - Administrative access</option>
                      <option value="USER_MANAGEMENT">USER_MANAGEMENT - User CRUD operations</option>
                      <option value="ROLE_MANAGEMENT">ROLE_MANAGEMENT - Role management</option>
                      <option value="SYSTEM_MONITORING">SYSTEM_MONITORING - System monitoring</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Permission description"
                      value={newPermission.description}
                      onChange={(e) => setNewPermission({...newPermission, description: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Resource Pattern</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., admin:history:*"
                      value={newPermission.resourcePattern}
                      onChange={(e) => setNewPermission({...newPermission, resourcePattern: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || !newPermission.name.trim() || !newPermission.description.trim()}
                >
                  Create Permission
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewPermission({
                      name: "",
                      permissionType: "CHAT_ACCESS",
                      description: "",
                      resourcePattern: ""
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Permission Mapping Info */}
      <div className="alert alert-info mb-4">
        <h6>Available Permission Types:</h6>
        <div className="row">
          <div className="col-md-6">
            <h6>Admin & Management:</h6>
            <ul className="mb-2">
              <li><strong>ADMIN_ACCESS</strong> - Administrative access</li>
              <li><strong>USER_MANAGEMENT</strong> - User CRUD operations</li>
              <li><strong>ROLE_MANAGEMENT</strong> - Role management</li>
              <li><strong>SYSTEM_MONITORING</strong> - System monitoring features</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h6>Chat Access:</h6>
            <ul className="mb-0">
              <li><strong>CHAT_ACCESS</strong> - General chat access</li>
              <li><strong>CHAT_WITH_AGENT</strong> - Chat with agents</li>
              <li><strong>CHAT_WITH_USER</strong> - Chat with users</li>
              <li><strong>CHAT_WITH_DEFAULT</strong> - Default chat access</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Resource Pattern</th>
              <th>Mapped To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm) => (
              <tr key={perm.id}>
                <td>{perm.id}</td>
                <td>{perm.name}</td>
                <td>
                  <span className={`badge ${
                    perm.permissionType === 'CHAT_WITH_DEFAULT' ? 'bg-warning' :
                    perm.permissionType === 'CHAT_ACCESS' ? 'bg-success' :
                    perm.permissionType === 'ADMIN_ACCESS' ? 'bg-danger' :
                    'bg-secondary'
                  }`}>
                    {perm.permissionType}
                  </span>
                </td>
                <td>{perm.description}</td>
                 <td><code>{perm.resourcePattern}</code></td>
                 <td>
                   <span className="badge bg-light text-dark">
                     {getPermissionMapping(perm.name)}
                   </span>
                 </td>
                 <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeletePermission(perm.id)}
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

export default PermissionsTab;