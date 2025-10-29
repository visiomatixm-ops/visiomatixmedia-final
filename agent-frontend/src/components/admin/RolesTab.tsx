import React, { useState } from "react";

interface Role {
  id: number;
  name: string;
  permissions?: { id: number; name: string }[];
  privileges?: { id: number; name: string; mappedPermissions?: { id: number; name: string }[] }[];
}

interface Permission {
  id: number;
  name: string;
  description?: string;
}

interface Privilege {
  id: number;
  name: string;
  mappedPermissions?: { id: number; name: string }[];
}

interface RolesTabProps {
  roles: Role[];
  permissions: Permission[];
  privileges: Privilege[];
  loading: boolean;
  onAssignPermission: (roleId: number, permissionId: number) => void;
  onRemovePermission: (roleId: number, permissionId: number) => void;
  onAssignPrivilege: (roleId: number, privilegeId: number) => void;
  onRemovePrivilege: (roleId: number, privilegeId: number) => void;
  onCreateRole: (roleData: { name: string }) => void;
  onCreateOrOverrideRole: (roleData: { name: string; permissionNames: string[]; privilegeNames: string[]; override: boolean; createdBy: string }) => void;
  onUpdateRole: (roleId: number, roleData: { name: string }) => void;
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