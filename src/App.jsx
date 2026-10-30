import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BankProvider } from './context/BankContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import FirstTimeSetup from './pages/FirstTimeSetup';
import AdminDashboard from './pages/AdminDashboard';
import { Building2, ShieldCheck, Heart } from 'lucide-react';

// Protected route wrapper for regular users
function UserRoute({ children }) {
  const { isAuthenticated, isUser } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isUser) return <Navigate to="/admin" replace />;
  return children;
}

// Protected route wrapper for admin
function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin-login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}

// Redirect authenticated users away from auth pages
function GuestRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? '/admin' : '/'} replace />;
  }
  return children;
}

// User-facing banking app layout (with Navbar + Footer)
function BankLayout() {
  return (
    <BankProvider>
      <div className="app-shell">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
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
    </BankProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public auth pages */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/admin-login"
            element={
              <GuestRoute>
                <AdminLogin />
              </GuestRoute>
            }
          />
          <Route
            path="/first-time-setup"
            element={
              <GuestRoute>
                <FirstTimeSetup />
              </GuestRoute>
            }
          />

          {/* Admin protected routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* User protected routes — all nested under BankLayout */}
          <Route
            path="/*"
            element={
              <UserRoute>
                <BankLayout />
              </UserRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
