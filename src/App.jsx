import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BankProvider } from './context/BankContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transactions from './pages/Transactions';
import { Building2, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  return (
    <BankProvider>
      <BrowserRouter>
        <div className="app-shell">
          {/* Persistent Navbar across all pages */}
          <Navbar />

          {/* Main Application Routes */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/transactions" element={<Transactions />} />
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Consistent Application Footer */}
          <footer className="app-footer">
            <div className="footer-container">
              <div className="footer-left">
                <div className="footer-brand">
                  <Building2 size={18} className="text-emerald" />
                  <span className="footer-brand-title">ASTA Bank Ltd.</span>
                </div>
                <p className="footer-tagline">
                  Smart Digital Banking Portal • All currency values in Bangladeshi Taka (BDT / ৳).
                </p>
              </div>

              <div className="footer-center">
                <span className="simulation-badge">
                  <ShieldCheck size={14} /> Practice Project Simulation
                </span>
              </div>

              <div className="footer-right">
                <p className="footer-copyright">
                  &copy; {new Date().getFullYear()} ASTA Bank Ltd. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </BankProvider>
  );
}
