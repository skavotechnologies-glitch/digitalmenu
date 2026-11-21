import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CustomerMenu } from './pages/CustomerMenu';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { LandingPage } from './pages/LandingPage';

export const App = () => {
  return (
    <Routes>
      {/* Route 1: Landing / Portal selector */}
      <Route path="/" element={<LandingPage />} />

      {/* Route 2: Public Customer Menu (Scanned via QR) */}
      <Route path="/menu" element={<CustomerMenu />} />

      {/* Route 3: Owner Menu Update Page */}
      <Route path="/manage" element={<OwnerDashboard />} />

      {/* Fallback to Menu */}
      <Route path="*" element={<Navigate to="/menu" replace />} />
    </Routes>
  );
};
