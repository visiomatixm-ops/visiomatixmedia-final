/**
 * ===========================================================
 * File: PasswordChange.tsx
 * Author: Viral Prajapati
 * Date: 03-Nov-2025
 * Description:
 *  Password change component for agent dashboard.
 *  Allows users to change their password with validation.
 * ===========================================================
 */

import React, { useState } from "react";
import { userAPI } from "../api/api";

interface PasswordChangeProps {
  token: string;
  onClose: () => void;
}

const PasswordChange: React.FC<PasswordChangeProps> = ({ token, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, type: string} | null>(null);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.currentPassword.trim()) {
      setMessage({ text: "Current password is required", type: "error" });
      return false;
    }
    if (!formData.newPassword.trim()) {
      setMessage({ text: "New password is required", type: "error" });
      return false;
    }
    if (formData.newPassword.length < 6) {
      setMessage({ text: "New password must be at least 6 characters long", type: "error" });
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: "New passwords do not match", type: "error" });
      return false;
    }
    if (formData.currentPassword === formData.newPassword) {
      setMessage({ text: "New password must be different from current password", type: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await userAPI.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      setMessage({ text: "Password changed successfully!", type: "success" });
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error("Password change failed:", error);
      if (error.response?.status === 400) {
        setMessage({ text: "Current password is incorrect", type: "error" });
      } else if (error.response?.status === 401) {
        setMessage({ text: "Authentication failed. Please login again.", type: "error" });
      } else {
        setMessage({ text: "Failed to change password. Please try again.", type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Change Password</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {message && (
                <div className={`alert ${message.type === "error" ? "alert-danger" : "alert-success"}`}>
                  {message.text}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">
                  Current Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  minLength={6}
                />
                <div className="form-text">
                  Password must be at least 6 characters long
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm New Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Changing...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;