import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Wallet, 
  ShieldCheck, 
  CreditCard,
  ChevronRight
} from 'lucide-react';

export default function BalanceCard({
  title,
  amount,
  subtitle,
  iconType = 'wallet',
  variant = 'neutral', // 'primary' | 'deposit' | 'withdraw' | 'neutral'
  badge,
  actionLink,
  actionText,
  accountInfo,
}) {
  // If variant is 'primary', render the luxury Bank Debit/Savings Card
  if (variant === 'primary' && accountInfo) {
    return (
      <div className="bank-card-container">
        <div className="bank-card">
          <div className="bank-card-header">
            <div className="bank-brand">
              <div className="bank-chip"></div>
              <span className="bank-brand-name">{accountInfo.bankName || 'ASTA Bank Ltd.'}</span>
            </div>
            <span className="bank-card-type">{accountInfo.accountType || 'Premium Savings'}</span>
          </div>

          <div className="bank-card-balance-block">
            <span className="bank-card-label">{title || 'Current Available Balance'}</span>
            <div className="bank-card-balance">{amount}</div>
          </div>

          <div className="bank-card-footer">
            <div className="bank-card-field">
              <span className="field-label">ACCOUNT HOLDER</span>
              <span className="field-value">{accountInfo.accountHolder}</span>
            </div>
            <div className="bank-card-field">
              <span className="field-label">ACCOUNT NUMBER</span>
              <span className="field-value mono">{accountInfo.accountNumber}</span>
            </div>
            <div className="bank-card-field">
              <span className="field-label">CURRENCY</span>
              <span className="field-value currency-badge">BDT</span>
            </div>
          </div>

          {/* Decorative background glow */}
          <div className="card-shine"></div>
        </div>
      </div>
    );
  }

  // Choose icon based on iconType
  const renderIcon = () => {
    switch (iconType) {
      case 'deposit':
        return <ArrowDownLeft className="stat-icon-svg deposit-icon" size={24} />;
      case 'withdraw':
        return <ArrowUpRight className="stat-icon-svg withdraw-icon" size={24} />;
      case 'card':
        return <CreditCard className="stat-icon-svg card-icon" size={24} />;
      default:
        return <Wallet className="stat-icon-svg wallet-icon" size={24} />;
    }
  };

  return (
    <div className={`stat-card stat-card-${variant}`}>
      <div className="stat-card-top">
        <div className="stat-icon-wrapper">
          {renderIcon()}
        </div>
        {badge && <span className={`stat-badge badge-${variant}`}>{badge}</span>}
      </div>

      <div className="stat-card-body">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-amount">{amount}</p>
        {subtitle && <p className="stat-subtitle">{subtitle}</p>}
      </div>

      {actionLink && (
        <div className="stat-card-footer">
          <Link to={actionLink} className="stat-action-link">
            <span>{actionText || 'Manage'}</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
