import React, { useState } from "react";

interface Role {
  id: number;
  name: string;
  permissions?: { id: number; name: string }[];
}

interface Permission {
  id: number;
  name: string;
  description?: string;
}

interface RolesTabProps {
  roles: Role[];
  permissions: Permission[];
  loading: boolean;
  onAssignPermission: (roleId: number, permissionId: number) => void;
  onRemovePermission: (roleId: number, permissionId: number) => void;
  onCreateRole: (roleData: { name: string }) => void;
  onUpdateRole: (roleId: number, roleData: { name: string }) => void;
  onDeleteRole: (roleId: number) => void;
}

const RolesTab: React.FC<RolesTabProps> = ({
  roles,
  permissions,
  loading,
  onAssignPermission,
  onRemovePermission,
  onCreateRole,
  onUpdateRole,
  onDeleteRole
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRole, setEditingRole] = useState<number | null>(null);
  const [newRoleName, setNewRoleName] = useState("");
  const [editRoleName, setEditRoleName] = useState("");

  const handleCreateRole = () => {
    if (newRoleName.trim()) {
      onCreateRole({ name: newRoleName.trim() });
      setNewRoleName("");
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
            </ul>
          </div>
        </div>
        <p className="mb-0 mt-2"><small className="text-muted">
          Use the "Permissions" dropdown to assign multiple permissions to roles.
          Privileges provide granular access control for specific admin panel tabs.
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
                  Create Role
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewRoleName("");
                  }}
                >
                  Cancel
                </button>
              </div>
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
                    <span key={perm.id} className="badge bg-info me-1">
                      {perm.name}
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
                    <div className="dropdown">
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