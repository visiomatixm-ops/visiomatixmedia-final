import React, { useState } from "react";

const UsersTab = ({
  users,
  roles,
  loading,
  onAssignRole,
  onRemoveRole,
  onCreateUser,
  onRefreshUsers
}) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    role: "ROLE_AGENT"
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await onCreateUser(newUser);
    setShowUserForm(false);
    setNewUser({
      username: "",
      email: "",
      name: "",
      password: "",
      role: "ROLE_AGENT"
    });
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
                <label className="form-label">Role</label>
                <select
                  className="form-control"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="ROLE_AGENT">Agent</option>
                  <option value="ROLE_ADMIN">Admin</option>
                  <option value="ROLE_USER">User</option>
                </select>
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