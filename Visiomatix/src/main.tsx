// File: src/main.tsx
/*
  File    : src/main.tsx
  Author  : Viral Prajapati
  Date    : 2025-10-10
  Description:
    Entry point for Visiomatix React app using Vite.
    It renders <App /> wrapped in BrowserRouter and Suspense.
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ For routing
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> {/* ✅ App is rendered within a single Router */}
    </BrowserRouter>
  </React.StrictMode>
);
