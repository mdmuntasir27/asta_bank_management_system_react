import React from 'react';
import { 
  Building2, 
  Wallet, 
  ShieldAlert, 
  AlertTriangle, 
  Clock, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useBank } from '../context/BankContext';
import WithdrawForm from '../components/WithdrawForm';

export default function Withdraw() {
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
          <h1 className="page-heading">Withdraw Funds</h1>
          <p className="page-subheading">
            Request an immediate debit from your ASTA Bank Ltd. account. Withdrawals are subject to available balance verification.
          </p>
        </div>

        {/* Current Available Balance Snapshot */}
        <div className="header-balance-card">
          <div className="header-balance-top">
            <span className="balance-badge badge-withdraw">Available to Withdraw</span>
            <Wallet size={18} className="text-warning" />
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
          <WithdrawForm />
        </div>

        <div className="side-info-column">
          {/* Withdrawal Guidelines */}
          <div className="info-card">
            <h3 className="info-card-title">
              <Lock size={18} className="text-primary" />
              <span>Withdrawal Protection & Policy</span>
            </h3>
            <p className="info-card-text">
              To protect your assets, withdrawals require transaction confirmation and cannot exceed your current cleared balance.
            </p>
            <ul className="info-checklist">
              <li>
                <CheckCircle2 size={16} className="text-success" />
                <span>Overdraft prevention ensures balance cannot go negative</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-success" />
                <span>Two-step interactive confirmation dialog for safety</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-success" />
                <span>Instant ledger deduction with unique transaction receipt</span>
              </li>
            </ul>
          </div>

          {/* Quick Notice Card */}
          <div className="info-card alert-notice-card">
            <h3 className="info-card-title">
              <ShieldAlert size={18} className="text-warning" />
              <span>Security Reminder</span>
            </h3>
            <p className="info-card-text">
              Please double check the withdrawal amount before confirming. Once approved, the funds are immediately deducted from your ASTA Bank Ltd. account.
            </p>
            <div className="info-branch-box">
              <div className="branch-line">
                <span className="branch-label">Max Allowed:</span>
                <span className="branch-value text-danger bold">{formatBDT(balance)}</span>
              </div>
              <div className="branch-line">
                <span className="branch-label">Fee:</span>
                <span className="branch-value text-success bold">৳ 0.00 BDT (Free)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
