import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, LogIn, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { loginUser } = useAuth();
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
    const result = loginUser(email.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      if (result.needsSetup) {
        setError(result.message + ' Redirecting...');
        setTimeout(() => navigate('/first-time-setup'), 1500);
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left: Branding */}
        <div className="auth-branding-panel">
          <div className="auth-brand-content">
            <div className="auth-brand-logo">
              <Building2 size={36} />
            </div>
            <h1 className="auth-brand-title">ASTA Bank Ltd.</h1>
            <p className="auth-brand-tagline">Smart Digital Banking Portal</p>
            <div className="auth-brand-features">
              <div className="brand-feature-item">
                <ShieldCheck size={18} />
                <span>Secure & Trusted Banking</span>
              </div>
              <div className="brand-feature-item">
                <ShieldCheck size={18} />
                <span>Real-time Transactions in BDT</span>
              </div>
              <div className="brand-feature-item">
                <ShieldCheck size={18} />
                <span>24/7 Online Access</span>
              </div>
            </div>
          </div>
          <p className="auth-brand-footer">© {new Date().getFullYear()} ASTA Bank Ltd. All rights reserved.</p>
        </div>

        {/* Right: Login Form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h2 className="auth-form-title">Welcome Back</h2>
              <p className="auth-form-subtitle">Sign in to your banking account</p>
            </div>

            {error && (
              <div className="auth-alert auth-alert-error">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrapper">
                  <Mail size={18} className="auth-input-icon" />
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={18} className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="Enter your password"
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
                className="auth-submit-btn"
                disabled={loading}
              >
                <LogIn size={18} />
                <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              </button>
            </form>

            <div className="auth-links">
              <p className="auth-link-text">
                First time logging in?{' '}
                <Link to="/first-time-setup" className="auth-link">
                  Set up your password
                </Link>
              </p>
              <p className="auth-link-text">
                <Link to="/admin-login" className="auth-link auth-link-muted">
                  Admin Login →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

