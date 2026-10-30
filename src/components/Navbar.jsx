import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Building2, 
  LayoutDashboard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  History, 
  Menu, 
  X,
  Wallet,
  RotateCcw
} from 'lucide-react';
import { useBank } from '../context/BankContext';

export default function Navbar() {
  const { account, balance, formatBDT, resetToDefault } = useBank();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleReset = () => {
    if (window.confirm('Reset account balance and transactions to default demo state?')) {
      resetToDefault();
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-logo-icon">
            <Building2 size={24} />
          </div>
          <div className="brand-text">
            <span className="bank-name">{account.bankName || 'ASTA Bank Ltd.'}</span>
            <span className="bank-tagline">Online Banking Portal</span>
          </div>
        </Link>

        {/* Live Balance Pill (Desktop) */}
        <div className="navbar-balance-pill">
          <Wallet size={16} className="pill-icon" />
          <div className="pill-text">
            <span className="pill-label">Available Balance</span>
            <span className="pill-amount">{formatBDT(balance)}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink 
            to="/deposit" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <ArrowDownCircle size={18} />
            <span>Deposit</span>
          </NavLink>
          <NavLink 
            to="/withdraw" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <ArrowUpCircle size={18} />
            <span>Withdraw</span>
          </NavLink>
          <NavLink 
            to="/transactions" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <History size={18} />
            <span>Transactions</span>
          </NavLink>

          <button 
            type="button" 
            onClick={handleReset} 
            className="btn-reset-demo" 
            title="Reset to default demo data"
            aria-label="Reset account data"
          >
            <RotateCcw size={16} />
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-balance-card">
            <div className="mobile-balance-header">
              <span className="text-muted">Account Balance (BDT)</span>
              <span className="badge-currency">BDT</span>
            </div>
            <div className="mobile-balance-value">{formatBDT(balance)}</div>
            <div className="mobile-account-info">
              <span>{account.accountHolder}</span>
              <span className="mono">{account.accountNumber}</span>
            </div>
          </div>

          <nav className="mobile-nav-links">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink 
              to="/deposit" 
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <ArrowDownCircle size={20} />
              <span>Deposit Money</span>
            </NavLink>
            <NavLink 
              to="/withdraw" 
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <ArrowUpCircle size={20} />
              <span>Withdraw Money</span>
            </NavLink>
            <NavLink 
              to="/transactions" 
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <History size={20} />
              <span>Transaction History</span>
            </NavLink>
            <button 
              type="button"
              className="mobile-reset-button"
              onClick={() => {
                handleReset();
                closeMenu();
              }}
            >
              <RotateCcw size={18} />
              <span>Reset Demo Account</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
