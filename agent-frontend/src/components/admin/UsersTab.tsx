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