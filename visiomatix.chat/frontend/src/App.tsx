/**
 * =====================================================
 * File: App.tsx
 * Author: Viral Prajapati
 * Date: 14-Oct-2025
 * Description:
 *  Main App component with routing, authentication,
 *  and dashboard management for Visiomatix Chat.
 * =====================================================
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AgentDashboard from './components/dashboard/AgentDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import PrivateRoute from './components/common/PrivateRoute';
import NavbarComponent from './components/common/NavbarComponent';

// Services
import { apiService } from './services/ApiService';

// Styles
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <Container fluid>
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                apiService.isAuthenticated() ? 
                <Navigate to="/dashboard" replace /> : 
                <Login />
              } 
            />
            <Route 
              path="/register" 
              element={
                apiService.isAuthenticated() ? 
                <Navigate to="/dashboard" replace /> : 
                <Register />
              } 
            />

            {/* Private Routes */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <AgentDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />

            {/* Default Routes */}
            <Route 
              path="/" 
              element={
                <Navigate to={
                  apiService.isAuthenticated() ? "/dashboard" : "/login"
                } replace />
              } 
            />
            
            {/* Catch all route */}
            <Route 
              path="*" 
              element={
                <Navigate to={
                  apiService.isAuthenticated() ? "/dashboard" : "/login"
                } replace />
              } 
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
