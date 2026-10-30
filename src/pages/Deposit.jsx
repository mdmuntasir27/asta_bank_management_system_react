import React from 'react';
import { 
  Building2, 
  Wallet, 
  ShieldCheck, 
  Zap, 
  Clock, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { useBank } from '../context/BankContext';
import DepositForm from '../components/DepositForm';

export default function Deposit() {
  const { account, balance, formatBDT } = useBank();

  return (
    <div className="page-container action-page">
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div className="page-category-tag">
            <Building2 size={15} />
            <span>{account.bankName} • Fund Transfer</span>
          </div>
          <h1 className="page-heading">Deposit Funds</h1>
          <p className="page-subheading">
            Enter your desired amount in BDT to credit your account immediately with zero transaction fees.
          </p>
        </div>

        {/* Current Balance Snapshot Card */}
        <div className="header-balance-card">
          <div className="header-balance-top">
            <span className="balance-badge">Current Available</span>
            <Wallet size={18} className="text-success" />
          </div>
          <div className="header-balance-val">{formatBDT(balance)}</div>
          <div className="header-balance-sub">
            <span>Account:</span> <span className="mono">{account.accountNumber}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form and Guidelines */}
      <div className="page-grid-layout">
        <div className="main-form-column">
          <DepositForm />
        </div>

        <div className="side-info-column">
          {/* Benefit Card */}
          <div className="info-card">
            <h3 className="info-card-title">
              <Zap size={18} className="text-warning" />
              <span>Instant Credit & Settlement</span>
            </h3>
            <p className="info-card-text">
              All deposits into ASTA Bank Ltd. are processed in real-time. Your ledger and available balance reflect the updated funds immediately.
            </p>
            <ul className="info-checklist">
              <li>
                <CheckCircle2 size={16} className="text-success" />
                <span>Zero processing fee on all BDT deposits</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-success" />
                <span>Instant ledger timestamp and receipt ID</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-success" />
                <span>Auto-saved to your persistent browser storage</span>
              </li>
            </ul>
          </div>

          {/* Security & Branch Card */}
          <div className="info-card secondary-card">
            <h3 className="info-card-title">
              <ShieldCheck size={18} className="text-primary" />
              <span>Bank Security & Compliance</span>
            </h3>
            <p className="info-card-text">
              Operated under standard Bangladesh banking compliance simulation guidelines. All simulated transactions are safely tracked.
            </p>
            <div className="info-branch-box">
              <div className="branch-line">
                <span className="branch-label">Account Holder:</span>
                <span className="branch-value">{account.accountHolder}</span>
              </div>
              <div className="branch-line">
                <span className="branch-label">Branch:</span>
                <span className="branch-value">{account.branch}</span>
              </div>
              <div className="branch-line">
                <span className="branch-label">Currency:</span>
                <span className="branch-value">Bangladeshi Taka (BDT / ৳)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
