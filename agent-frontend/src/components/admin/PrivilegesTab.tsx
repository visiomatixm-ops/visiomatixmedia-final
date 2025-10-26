import React, { useState } from "react";

interface Privilege {
  id: number;
  name: string;
  mappedPermissions?: { id: number; name: string }[];
}

interface Permission {
  id: number;
  name: string;
  description?: string;
}

interface PrivilegesTabProps {
  privileges: Privilege[];
  permissions: Permission[];
  loading: boolean;
  onCreatePrivilege: (privilegeData: { name: string }) => void;
  onDeletePrivilege: (privilegeId: number) => void;
  onAssignPrivilegeToPermission: (privilegeId: number, permissionId: number) => void;
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
          <li><strong>ACCESS_CHAT_HISTORY_TAB</strong> - Access to Chat History tab in Admin Panel</li>
          <li><strong>ACCESS_STATISTICS_TAB</strong> - Access to Statistics tab in Admin Panel</li>
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