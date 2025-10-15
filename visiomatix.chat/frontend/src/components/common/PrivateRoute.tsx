/**
 * =====================================================
 * File: PrivateRoute.tsx
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  Private route wrapper component that handles
 *  authentication and role-based access control.
 * =====================================================
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { apiService } from '../../services/ApiService';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const isAuthenticated = apiService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required, check if user has it
  if (requiredRole) {
    const currentUser = apiService.getCurrentUser();
    
    if (!currentUser || !currentUser.roles || !currentUser.roles.includes(requiredRole)) {
      // User doesn't have required role, redirect to dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;