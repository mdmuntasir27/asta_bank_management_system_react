import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  User, 
  CreditCard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  History,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useBank } from '../context/BankContext';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';

export default function Dashboard() {
  const { account, balance, totalDeposited, totalWithdrawn, formatBDT, transactions } = useBank();

  return (
    <div className="page-container dashboard-page">
      {/* Top Welcome / Header Banner */}
      <section className="dashboard-hero">
        <div className="hero-text-content">
          <div className="bank-pill-badge">
            <Building2 size={16} />
            <span>{account.bankName}</span>
            <span className="dot-separator">•</span>
            <span>Online Portal</span>
          </div>

          <h1 className="hero-title">
            Welcome back, <span className="highlight-name">{account.accountHolder}</span>
          </h1>

          <p className="hero-description">
            Manage your ASTA Bank Ltd. account, view real-time balance in BDT, execute instant deposits and secure withdrawals.
          </p>

          <div className="account-meta-pills">
            <div className="meta-pill">
              <span className="meta-label">Account No:</span>
              <span className="meta-val mono">{account.accountNumber}</span>
            </div>
            <div className="meta-pill">
              <span className="meta-label">Account Type:</span>
              <span className="meta-val">{account.accountType}</span>
            </div>
            <div className="meta-pill">
              <span className="meta-label">Branch:</span>
              <span className="meta-val">{account.branch}</span>
            </div>
            <div className="meta-pill">
              <span className="meta-label">Status:</span>
              <span className="meta-val status-active">
                <span className="status-dot"></span> Active & Verified
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="hero-quick-actions">
          <Link to="/deposit" className="quick-action-card deposit-action">
            <div className="action-icon-circle">
              <ArrowDownCircle size={24} />
            </div>
            <div className="action-text">
              <span className="action-title">Deposit Funds</span>
              <span className="action-desc">Add BDT to account</span>
            </div>
          </Link>

          <Link to="/withdraw" className="quick-action-card withdraw-action">
            <div className="action-icon-circle">
              <ArrowUpCircle size={24} />
            </div>
            <div className="action-text">
              <span className="action-title">Withdraw Funds</span>
              <span className="action-desc">Fast payout in BDT</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Account Balance & Metrics Cards (Task 1: Reusable BalanceCard components) */}
      <section className="stats-section">
        {/* Luxury Primary Card for Account Balance */}
        <BalanceCard
          variant="primary"
          title="Current Account Balance"
          amount={formatBDT(balance)}
          accountInfo={account}
        />

        {/* Summary Stat Grid */}
        <div className="stats-cards-grid">
          {/* Total Deposited Amount */}
          <BalanceCard
            title="Total Deposited Amount"
            amount={formatBDT(totalDeposited)}
            subtitle="Cumulative incoming deposits to ASTA Bank"
            iconType="deposit"
            variant="deposit"
            badge="Incoming"
            actionLink="/deposit"
            actionText="Make a Deposit"
          />

          {/* Total Withdrawn Amount */}
          <BalanceCard
            title="Total Withdrawn Amount"
            amount={formatBDT(totalWithdrawn)}
            subtitle="Cumulative withdrawals debited in BDT"
            iconType="withdraw"
            variant="withdraw"
            badge="Outgoing"
            actionLink="/withdraw"
            actionText="Request Withdrawal"
          />

          {/* Account Activity Overview */}
          <BalanceCard
            title="Total Activity"
            amount={`${transactions.length} Transactions`}
            subtitle="All recorded deposits & withdrawals"
            iconType="card"
            variant="neutral"
            badge="Activity"
            actionLink="/transactions"
            actionText="Full Statement"
          />
        </div>
      </section>

      {/* Recent Transactions Section */}
      <section className="dashboard-recent-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Latest Transactions</h2>
            <p className="section-subtitle">Real-time ledger of your recent deposits and withdrawals.</p>
          </div>
          <Link to="/transactions" className="view-all-link">
            <span>View All Statement</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <TransactionList 
          limit={4} 
          showControls={false} 
          title="Recent Activity"
        />
      </section>
    </div>
  );
}
