import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CreditCard,
  KeyRound,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function FirstTimeSetup() {
  const { verifyFirstTimeUser, setFirstTimePassword } = useAuth();
  const navigate = useNavigate();

  // Step 1: Verify identity  |  Step 2: Create password
  const [step, setStep] = useState(1);
  const [verifiedUser, setVerifiedUser] = useState(null);

  // Step 1 fields
  const [accountNumber, setAccountNumber] = useState('');
  const [email, setEmail] = useState('');

  // Step 2 fields
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Password criteria check
  const criteria = [
    { id: 'length', label: 'At least 8 characters long', met: password.length >= 8 },
    { id: 'upper', label: 'At least one uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
    { id: 'lower', label: 'At least one lowercase letter (a-z)', met: /[a-z]/.test(password) },
    { id: 'number', label: 'At least one numeric digit (0-9)', met: /[0-9]/.test(password) },
    {
      id: 'special',
      label: 'At least one special character (!@#$%^&*...)',
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password),
    },
  ];

  const metCount = criteria.filter((c) => c.met).length;

  // Calculate password strength level
  const getStrength = () => {
    if (!password) {
      return { score: 0, label: 'None', class: 'none', isAcceptable: false };
    }
    if (password.length < 8 || metCount <= 2) {
      return { score: 1, label: 'Low', class: 'low', isAcceptable: false };
    }
    if (metCount === 3) {
      return { score: 2, label: 'Medium', class: 'medium', isAcceptable: false };
    }
    if (metCount === 4) {
      return { score: 3, label: 'Strong', class: 'strong', isAcceptable: true };
    }
    return { score: 4, label: 'Very Strong', class: 'very-strong', isAcceptable: true };
  };

  const strength = getStrength();

  // Step 1: Verify account number + email
  const handleVerify = (e) => {
    e.preventDefault();
    setError('');

    if (!accountNumber.trim() || !email.trim()) {
      setError('Please fill in both fields.');
      return;
    }

    setLoading(true);
    const result = verifyFirstTimeUser(accountNumber.trim(), email.trim());
    setLoading(false);

    if (result.success) {
      setVerifiedUser(result.user);
      setStep(2);
    } else {
      setError(result.message);
    }
  };

  // Step 2: Set password with strength enforcement
  const handleSetPassword = (e) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Please fill in both password fields.');
      return;
    }

    // Enforce Strong or Very Strong password policy
    if (!strength.isAcceptable) {
      setError(
        'Password strength is insufficient! For your privacy and account security, ASTA Bank requires your password to be at least "Strong" or "Very Strong". Please fulfill more criteria below before proceeding.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please ensure both passwords match exactly.');
      return;
    }

    setLoading(true);
    const result = setFirstTimePassword(verifiedUser.id, password);
    setLoading(false);

    if (result.success) {
      setSuccess('Password created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError('Something went wrong. Please try again.');
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
            <p className="auth-brand-tagline">First-Time Account Setup</p>
            <div className="auth-brand-features">
              <div className="brand-feature-item">
                <ShieldCheck size={18} />
                <span>Verify your bank profile</span>
              </div>
              <div className="brand-feature-item">
                <ShieldCheck size={18} />
                <span>Create a high-security password</span>
              </div>
              <div className="brand-feature-item">
                <ShieldCheck size={18} />
                <span>Start banking online with privacy</span>
              </div>
            </div>
          </div>
          <p className="auth-brand-footer">© {new Date().getFullYear()} ASTA Bank Ltd.</p>
        </div>

        {/* Right: Setup Form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            {/* Step Indicator */}
            <div className="setup-steps">
              <div className={`setup-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <div className="step-circle">
                  {step > 1 ? <CheckCircle2 size={18} /> : '1'}
                </div>
                <span className="step-label">Verify Identity</span>
              </div>
              <div className="step-connector" />
              <div className={`setup-step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-circle">2</div>
                <span className="step-label">Create Password</span>
              </div>
            </div>

            {/* Step 1: Verification */}
            {step === 1 && (
              <>
                <div className="auth-form-header">
                  <h2 className="auth-form-title">Verify Your Account</h2>
                  <p className="auth-form-subtitle">
                    Enter the account number and email provided by the bank administrator to verify your identity.
                  </p>
                </div>

                {error && (
                  <div className="auth-alert auth-alert-error">
                    <ShieldAlert size={18} />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleVerify} className="auth-form">
                  <div className="auth-field">
                    <label className="auth-label">Account Number</label>
                    <div className="auth-input-wrapper">
                      <CreditCard size={18} className="auth-input-icon" />
                      <input
                        type="text"
                        className="auth-input"
                        placeholder="e.g. ASTA-2026-0001"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Email Address</label>
                    <div className="auth-input-wrapper">
                      <Mail size={18} className="auth-input-icon" />
                      <input
                        type="email"
                        className="auth-input"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={loading}
                  >
                    <KeyRound size={18} />
                    <span>{loading ? 'Verifying...' : 'Verify & Continue'}</span>
                  </button>
                </form>
              </>
            )}

            {/* Step 2: Password Creation with Strength Test */}
            {step === 2 && (
              <>
                <div className="auth-form-header">
                  <h2 className="auth-form-title">Create Your Password</h2>
                  <p className="auth-form-subtitle">
                    Welcome, <strong>{verifiedUser?.name}</strong>! Set a strong password for your online banking access.
                  </p>
                </div>

                {error && (
                  <div className="auth-alert auth-alert-error">
                    <AlertTriangle size={18} className="alert-icon-flex" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="auth-alert auth-alert-success">
                    <CheckCircle2 size={18} />
                    <span>{success}</span>
                  </div>
                )}

                <div className="verified-info-card">
                  <div className="verified-row">
                    <span className="verified-label">Account No</span>
                    <span className="verified-value mono">{verifiedUser?.accountNumber}</span>
                  </div>
                  <div className="verified-row">
                    <span className="verified-label">Account Holder</span>
                    <span className="verified-value">{verifiedUser?.name}</span>
                  </div>
                  <div className="verified-row">
                    <span className="verified-label">Email</span>
                    <span className="verified-value">{verifiedUser?.email}</span>
                  </div>
                </div>

                <form onSubmit={handleSetPassword} className="auth-form">
                  {/* Password Input */}
                  <div className="auth-field">
                    <label className="auth-label">New Password</label>
                    <div className="auth-input-wrapper">
                      <Lock size={18} className="auth-input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="auth-input"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (error) setError('');
                        }}
                        autoComplete="new-password"
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

                    {/* Password Strength Meter */}
                    <div className="password-strength-box">
                      <div className="strength-header">
                        <span className="strength-title">Password Strength:</span>
                        <span className={`strength-badge strength-badge-${strength.class}`}>
                          {strength.label}
                        </span>
                      </div>

                      {/* 4-segment Strength Bar */}
                      <div className="strength-bar-track">
                        <div
                          className={`strength-bar-segment ${
                            strength.score >= 1 ? `filled fill-${strength.class}` : ''
                          }`}
                        />
                        <div
                          className={`strength-bar-segment ${
                            strength.score >= 2 ? `filled fill-${strength.class}` : ''
                          }`}
                        />
                        <div
                          className={`strength-bar-segment ${
                            strength.score >= 3 ? `filled fill-${strength.class}` : ''
                          }`}
                        />
                        <div
                          className={`strength-bar-segment ${
                            strength.score >= 4 ? `filled fill-${strength.class}` : ''
                          }`}
                        />
                      </div>

                      {/* Warning notice when strength is below Strong */}
                      {password && !strength.isAcceptable && (
                        <div className="strength-warning-inline">
                          <AlertTriangle size={14} className="warning-icon" />
                          <span>
                            Must be <strong>Strong</strong> or <strong>Very Strong</strong> for privacy & security reasons.
                          </span>
                        </div>
                      )}

                      {/* Criteria Checklist */}
                      <div className="password-criteria-list">
                        <span className="criteria-header-label">Password Requirements:</span>
                        {criteria.map((c) => (
                          <div
                            key={c.id}
                            className={`criteria-item ${c.met ? 'criteria-met' : 'criteria-unmet'}`}
                          >
                            {c.met ? (
                              <CheckCircle2 size={14} className="criteria-icon-check" />
                            ) : (
                              <XCircle size={14} className="criteria-icon-unmet" />
                            )}
                            <span className="criteria-text">{c.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password Input */}
                  <div className="auth-field">
                    <label className="auth-label">Confirm Password</label>
                    <div className="auth-input-wrapper">
                      <Lock size={18} className="auth-input-icon" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="auth-input"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (error) setError('');
                        }}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="auth-toggle-password"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={loading || Boolean(success)}
                  >
                    <Lock size={18} />
                    <span>{loading ? 'Setting password...' : 'Set Password & Continue'}</span>
                  </button>
                </form>
              </>
            )}

            <div className="auth-links">
              <p className="auth-link-text">
                Already have a password?{' '}
                <Link to="/login" className="auth-link">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
