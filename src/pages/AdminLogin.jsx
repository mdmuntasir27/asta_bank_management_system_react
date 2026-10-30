import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, Shield, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    const result = loginAdmin(email.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left: Branding */}
        <div className="auth-branding-panel admin-branding">
          <div className="auth-brand-content">
            <div className="auth-brand-logo admin-logo">
              <Shield size={36} />
            </div>
            <h1 className="auth-brand-title">Admin Portal</h1>
            <p className="auth-brand-tagline">ASTA Bank Management System</p>
            <div className="auth-brand-features">
              <div className="brand-feature-item">
                <Shield size={18} />
                <span>Account Management</span>
              </div>
              <div className="brand-feature-item">
                <Shield size={18} />
                <span>User Administration</span>
              </div>
              <div className="brand-feature-item">
                <Shield size={18} />
                <span>Restricted Access Control</span>
              </div>
            </div>
          </div>
          <p className="auth-brand-footer">Authorized Personnel Only</p>
        </div>

        {/* Right: Admin Login Form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <div className="admin-badge">
                <Shield size={14} />
                <span>ADMIN ACCESS</span>
              </div>
              <h2 className="auth-form-title">Admin Sign In</h2>
              <p className="auth-form-subtitle">Enter your administrator credentials</p>
            </div>

            {error && (
              <div className="auth-alert auth-alert-error">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label className="auth-label">Admin Email</label>
                <div className="auth-input-wrapper">
                  <Mail size={18} className="auth-input-icon" />
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="admin@astabank.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label">Admin Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={18} className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="auth-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-btn admin-submit-btn"
                disabled={loading}
              >
                <LogIn size={18} />
                <span>{loading ? 'Authenticating...' : 'Access Admin Panel'}</span>
              </button>
            </form>

            <div className="auth-links">
              <p className="auth-link-text">
                <Link to="/login" className="auth-link">
                  ← Back to User Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

