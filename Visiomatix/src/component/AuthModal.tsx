/**
 * ===========================================================
 * File: src/components/AuthModal.tsx
 * Author: Viral Prajapati
 * Date: 2025-10-16
 * Description:
 *   Simplified Bootstrap Sign-in modal (username + password only).
 *   Integrated with Menu.tsx "Agent Login" button.
 * ===========================================================
 */

import React, { useState } from "react";

const AuthModal: React.FC = () => {
  // --- Login state ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Programmatically hides the modal using Bootstrap's JS API.
   */
  const hideModal = () => {
    const modalEl = document.getElementById("authModal");
    if (!modalEl) return;
    const bootstrap = (window as any).bootstrap;
    const instance =
      bootstrap?.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    instance.hide();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in:", { username, password });
    // TODO: Call your backend login API here.
    hideModal();
  };

  return (
    <div
      className="modal fade"
      id="authModal"
      tabIndex={-1}
      aria-labelledby="authModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title" id="authModalLabel">
              Agent Sign In
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4">
            <form onSubmit={handleLoginSubmit}>
              {/* Username */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Custom Modal Styling */}
      <style>{`
        .modal-content {
          border-radius: 12px;
        }

        .modal-header {
          border-bottom: none;
        }

        .form-control:focus {
          box-shadow: 0 0 0 0.2rem rgba(0, 120, 255, 0.25);
          border-color: #0078ff;
        }

        .btn-primary {
          background: linear-gradient(90deg, #0078ff, #00aaff);
          border: none;
          font-weight: 600;
        }

        .btn-primary:hover {
          background: linear-gradient(90deg, #0068e0, #0095dd);
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
