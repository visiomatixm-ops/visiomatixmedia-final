import React, { useState } from "react";

const UsersTab = ({
  users,
  roles,
  loading,
  onAssignRole,
  onRemoveRole,
  onCreateUser,
  onRefreshUsers,
  onDeleteUser
}) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    roles: ["ROLE_AGENT"]
  });

  const [selectedRoles, setSelectedRoles] = useState<string[]>(["ROLE_AGENT"]);
  const [showCustomRoleForm, setShowCustomRoleForm] = useState(false);
  const [customRoleName, setCustomRoleName] = useState("");
  const [selectedPrivileges, setSelectedPrivileges] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    // Pass the newUser object with selected roles to the parent handler
    await onCreateUser({
      ...newUser,
      roles: selectedRoles.map(roleName => ({ name: roleName }))
    });
    setShowUserForm(false);
    setNewUser({
      username: "",
      email: "",
      name: "",
      password: "",
      roles: ["ROLE_AGENT"]
    });
    setSelectedRoles(["ROLE_AGENT"]);
  };

  const handleCreateCustomRole = async () => {
    if (!customRoleName.trim() || (selectedPrivileges.length === 0 && selectedPermissions.length === 0)) {
      alert("Please provide a role name and select at least one privilege or permission.");
      return;
    }

    try {
      // Call API to create the custom role with selected privileges/permissions
      const customRoleData = {
        name: `ROLE_${customRoleName.toUpperCase().replace(/\s+/g, '_')}`,
        description: `Custom role created with ${selectedPrivileges.length} privileges and ${selectedPermissions.length} permissions`,
        privileges: selectedPrivileges,
        permissions: selectedPermissions
      };

      // This would be replaced with actual API call
      // await adminAPI.createCustomRole(customRoleData);

      // For now, we'll just add it to the selected roles
      const customRoleNameFormatted = customRoleData.name;
      setSelectedRoles(prev => [...prev, customRoleNameFormatted]);

      alert(`Custom role "${customRoleNameFormatted}" created successfully!`);

      // Reset form
      setCustomRoleName("");
      setSelectedPrivileges([]);
      setSelectedPermissions([]);
      setShowCustomRoleForm(false);
    } catch (error) {
      console.error("Failed to create custom role:", error);
      alert("Failed to create custom role. Please try again.");
    }
  };

  const handleRoleToggle = (roleName: string) => {
    setSelectedRoles(prev =>
      prev.includes(roleName)
        ? prev.filter(r => r !== roleName)
        : [...prev, roleName]
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>User Management</h5>
        <button
          className="btn btn-primary"
          onClick={() => setShowUserForm(true)}
        >
          Create New User
        </button>
      </div>

      {/* Custom Role Creation Modal */}
      {showCustomRoleForm && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Custom Role (Admin Role Subset)</h5>
                <button type="button" className="btn-close" onClick={() => setShowCustomRoleForm(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Role Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customRoleName}
                    onChange={(e) => setCustomRoleName(e.target.value)}
                    placeholder="Enter role name (e.g., Support Manager)"
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Select Privileges (from Admin Role)</h6>
                    <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {[
                        'SYSTEM_MONITORING',
                        'CHAT_WITH_AGENT',
                        'CHAT_ACCESS',
                        'CHAT_WITH_DEFAULT',
                        'CHAT_WITH_USER',
                        'USER_MANAGEMENT',
                        'ROLE_MANAGEMENT',
                        'PERMISSION_MANAGEMENT',
                        'PRIVILEGE_MANAGEMENT',
                        'STATISTICS_ACCESS',
                        'CHAT_HISTORY_ACCESS'
                      ].map(privilege => (
                        <div key={privilege} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`privilege-${privilege}`}
                            checked={selectedPrivileges.includes(privilege)}
                            onChange={() => setSelectedPrivileges(prev =>
                              prev.includes(privilege)
                                ? prev.filter(p => p !== privilege)
                                : [...prev, privilege]
                            )}
                          />
                          <label className="form-check-label" htmlFor={`privilege-${privilege}`}>
                            {privilege.replace(/_/g, ' ')}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6>Select Permissions (from Admin Role)</h6>
                    <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {[
                        'READ_USERS',
                        'WRITE_USERS',
                        'DELETE_USERS',
                        'READ_ROLES',
                        'WRITE_ROLES',
                        'DELETE_ROLES',
                        'READ_PERMISSIONS',
                        'WRITE_PERMISSIONS',
                        'DELETE_PERMISSIONS',
                        'READ_PRIVILEGES',
                        'WRITE_PRIVILEGES',
                        'DELETE_PRIVILEGES',
                        'READ_STATISTICS',
                        'READ_CHAT_HISTORY'
                      ].map(permission => (
                        <div key={permission} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`permission-${permission}`}
                            checked={selectedPermissions.includes(permission)}
                            onChange={() => setSelectedPermissions(prev =>
                              prev.includes(permission)
                                ? prev.filter(p => p !== permission)
                                : [...prev, permission]
                            )}
                          />
                          <label className="form-check-label" htmlFor={`permission-${permission}`}>
                            {permission.replace(/_/g, ' ')}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCustomRoleForm(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleCreateCustomRole}>
                  Create Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Creation Form */}
      {showUserForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h6 className="mb-0">Create New User</h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleCreateUser}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Roles (Select multiple)</label>
                <div className="border rounded p-3">
                  {roles.map((role) => (
                    <div key={role.id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`role-${role.id}`}
                        checked={selectedRoles.includes(role.name)}
                        onChange={() => handleRoleToggle(role.name)}
                      />
                      <label className="form-check-label" htmlFor={`role-${role.id}`}>
                        {role.name}
                        {role.name.includes('CUSTOMER_SUCCESS') && (
                          <small className="text-info ms-2">(Auto-assigns comprehensive permissions & privileges)</small>
                        )}
                        {role.name === 'CUSTOMER_SUCCESS_LEAD' && (
                          <small className="text-success ms-2">(SYSTEM_MONITORING, CHAT_WITH_AGENT, CHAT_ACCESS, CHAT_WITH_DEFAULT, CHAT_WITH_USER, USER_MANAGEMENT + 10 privileges)</small>
                        )}
                      </label>
                    </div>
                  ))}
                  {/* Custom Role Creation Option */}
                  <div className="mt-3 pt-3 border-top">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setShowCustomRoleForm(true)}
                    >
                      + Create Custom Role
                    </button>
                    <small className="text-muted d-block mt-1">
                      Create a new role with specific privileges and permissions from admin role subsets
                    </small>
                    {/* Show selected custom roles */}
                    {selectedRoles.filter(role => role.startsWith('ROLE_') && !roles.some(r => r.name === role)).map(customRole => (
                      <div key={customRole} className="badge bg-warning text-dark me-1 mt-1">
                        {customRole} (Custom)
                      </div>
                    ))}
                  </div>
                </div>
                <small className="text-muted">
                  Users will automatically inherit all permissions and privileges from their assigned roles.
                  Multiple roles combine their access levels.
                </small>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? "Creating..." : "Create User"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowUserForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Name</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>
                  {user.roles?.map((role) => (
                    <span key={role.id} className="badge bg-secondary me-1">
                      {role.name}
                    </span>
                  ))}
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-outline-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        Manage Roles
                      </button>
                      <ul className="dropdown-menu">
                        {roles.map((role) => (
                          <li key={role.id}>
                            <button
                              className="dropdown-item"
                              onClick={() => onAssignRole(user.id, role.id)}
                              disabled={loading || user.roles?.some((r) => r.id === role.id)}
                            >
                              Assign {role.name}
                            </button>
                            {user.roles?.some((r) => r.id === role.id) && (
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => onRemoveRole(user.id, role.id)}
                                disabled={loading}
                              >
                                Remove {role.name}
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete user "${user.username}"? This action cannot be undone.`)) {
                          onDeleteUser(user.id);
                        }
                      }}
                      disabled={loading}
                      title="Delete User"
                    >
                      🗑️
                    </button>
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

export default UsersTab;