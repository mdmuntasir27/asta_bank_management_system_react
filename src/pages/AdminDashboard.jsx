import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  UserPlus,
  Users,
  User,
  Mail,
  Phone,
  CreditCard,
  Building2,
  MapPin,
  Wallet,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  LogOut,
  Eye,
  EyeOff,
  KeyRound,
  BadgeCheck,
  BadgeX,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { currentUser, getAllUsers, createUserAccount, deleteUserAccount, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'manage'

  // Create account form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    accountNumber: '',
    accountType: 'Savings Account',
    branch: '',
    initialBalance: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.accountNumber.trim()) {
      setFormError('Please fill in all required fields (Name, Email, Phone, Account Number).');
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    const result = createUserAccount({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      accountNumber: formData.accountNumber.trim(),
      accountType: formData.accountType,
      branch: formData.branch.trim() || 'Main Branch, Dhaka',
      initialBalance: formData.initialBalance || 0,
    });

    if (result.success) {
      setFormSuccess(result.message);
      setFormData({
        name: '',
        email: '',
        phone: '',
        accountNumber: '',
        accountType: 'Savings Account',
        branch: '',
        initialBalance: '',
      });
    } else {
      setFormError(result.message);
    }
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete the account for "${userName}"? This action cannot be undone.`)) {
      deleteUserAccount(userId);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const allUsers = getAllUsers();

  return (
    <div className="admin-page">
      {/* Admin Header */}
      <header className="admin-header">
        <div className="admin-header-container">
          <div className="admin-header-left">
            <div className="admin-header-logo">
              <Shield size={24} />
            </div>
            <div className="admin-header-text">
              <span className="admin-header-title">ASTA Bank Admin Panel</span>
              <span className="admin-header-subtitle">
                Logged in as <strong>{currentUser?.name}</strong>
              </span>
            </div>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="admin-main">
        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            <UserPlus size={18} />
            <span>Create Account</span>
          </button>
          <button
            className={`admin-tab ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            <Users size={18} />
            <span>Manage Users ({allUsers.length})</span>
          </button>
        </div>

        {/* Create Account Tab */}
        {activeTab === 'create' && (
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="admin-card-icon">
                <UserPlus size={24} />
              </div>
              <div>
                <h2 className="admin-card-title">Create New Bank Account</h2>
                <p className="admin-card-subtitle">
                  Fill in the customer details below. The user will set their own password during first-time login.
                </p>
              </div>
            </div>

            {formError && (
              <div className="auth-alert auth-alert-error">
                <AlertTriangle size={18} />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="auth-alert auth-alert-success">
                <CheckCircle2 size={18} />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateAccount} className="admin-create-form">
              <div className="admin-form-grid">
                {/* Full Name */}
                <div className="auth-field">
                  <label className="auth-label">
                    Full Name <span className="required-star">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <User size={18} className="auth-input-icon" />
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="e.g. Md. Tanvir Hasan"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="auth-field">
                  <label className="auth-label">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <Mail size={18} className="auth-input-icon" />
                    <input
                      type="email"
                      className="auth-input"
                      placeholder="e.g. tanvir@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="auth-field">
                  <label className="auth-label">
                    Phone Number <span className="required-star">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <Phone size={18} className="auth-input-icon" />
                    <input
                      type="tel"
                      className="auth-input"
                      placeholder="e.g. 01712345678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                {/* Account Number */}
                <div className="auth-field">
                  <label className="auth-label">
                    Account Number <span className="required-star">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <CreditCard size={18} className="auth-input-icon" />
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="e.g. ASTA-2026-0001"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    />
                  </div>
                </div>

                {/* Account Type */}
                <div className="auth-field">
                  <label className="auth-label">Account Type</label>
                  <div className="auth-input-wrapper">
                    <Building2 size={18} className="auth-input-icon" />
                    <select
                      className="auth-input auth-select"
                      value={formData.accountType}
                      onChange={(e) => handleInputChange('accountType', e.target.value)}
                    >
                      <option value="Savings Account">Savings Account</option>
                      <option value="Current Account">Current Account</option>
                      <option value="Premium Savings Account">Premium Savings Account</option>
                      <option value="Student Account">Student Account</option>
                      <option value="Fixed Deposit Account">Fixed Deposit Account</option>
                    </select>
                  </div>
                </div>

                {/* Branch */}
                <div className="auth-field">
                  <label className="auth-label">Branch</label>
                  <div className="auth-input-wrapper">
                    <MapPin size={18} className="auth-input-icon" />
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="e.g. Gulshan Corporate Branch, Dhaka"
                      value={formData.branch}
                      onChange={(e) => handleInputChange('branch', e.target.value)}
                    />
                  </div>
                </div>

                {/* Initial Balance */}
                <div className="auth-field admin-field-full">
                  <label className="auth-label">Initial Deposit Amount (BDT)</label>
                  <div className="auth-input-wrapper">
                    <Wallet size={18} className="auth-input-icon" />
                    <input
                      type="number"
                      className="auth-input"
                      placeholder="e.g. 50000"
                      min="0"
                      value={formData.initialBalance}
                      onChange={(e) => handleInputChange('initialBalance', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn admin-create-btn">
                <UserPlus size={18} />
                <span>Create Bank Account</span>
              </button>
            </form>
          </div>
        )}

        {/* Manage Users Tab */}
        {activeTab === 'manage' && (
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="admin-card-icon">
                <Users size={24} />
              </div>
              <div>
                <h2 className="admin-card-title">Registered Accounts</h2>
                <p className="admin-card-subtitle">
                  {allUsers.length} user account{allUsers.length !== 1 ? 's' : ''} registered in the system.
                </p>
              </div>
            </div>

            {allUsers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon-box">
                  <Users size={32} />
                </div>
                <p className="empty-title">No Accounts Yet</p>
                <p className="empty-subtitle">
                  Create a new bank account from the "Create Account" tab to get started.
                </p>
              </div>
            ) : (
              <div className="admin-users-list">
                {allUsers.map((user) => (
                  <div key={user.id} className="admin-user-card">
                    <div className="admin-user-left">
                      <div className="admin-user-avatar">
                        <User size={22} />
                      </div>
                      <div className="admin-user-info">
                        <div className="admin-user-name-row">
                          <span className="admin-user-name">{user.name}</span>
                          {user.isPasswordSet ? (
                            <span className="admin-user-status-badge status-active-badge">
                              <BadgeCheck size={13} /> Active
                            </span>
                          ) : (
                            <span className="admin-user-status-badge status-pending-badge">
                              <BadgeX size={13} /> Pending Setup
                            </span>
                          )}
                        </div>
                        <div className="admin-user-meta">
                          <span className="mono">{user.accountNumber}</span>
                          <span>•</span>
                          <span>{user.email}</span>
                          <span>•</span>
                          <span>{user.phone}</span>
                        </div>
                        <div className="admin-user-meta">
                          <span>{user.accountType}</span>
                          <span>•</span>
                          <span>{user.branch}</span>
                          <span>•</span>
                          <span className="text-success bold">
                            ৳ {Number(user.balance).toLocaleString('en-BD', { minimumFractionDigits: 2 })} BDT
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDeleteUser(user.id, user.name)}
                      title="Delete this account"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

