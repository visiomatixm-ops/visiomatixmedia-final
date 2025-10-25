import React, { useState } from "react";

interface Role {
  id: number;
  name: string;
  permissions?: { id: number; name: string }[];
}

interface Permission {
  id: number;
  name: string;
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
                        Permissions
                      </button>
                      <ul className="dropdown-menu">
                        {permissions.map((perm) => (
                          <li key={perm.id}>
                            <button
                              className="dropdown-item"
                              onClick={() => onAssignPermission(role.id, perm.id)}
                              disabled={loading || role.permissions?.some((p) => p.id === perm.id)}
                            >
                              Assign {perm.name}
                            </button>
                            {role.permissions?.some((p) => p.id === perm.id) && (
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => onRemovePermission(role.id, perm.id)}
                                disabled={loading}
                              >
                                Remove {perm.name}
                              </button>
                            )}
                          </li>
                        ))}
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