import React from 'react';
import { 
  Building2, 
  History, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Wallet,
  Receipt
} from 'lucide-react';
import { useBank } from '../context/BankContext';
import TransactionList from '../components/TransactionList';

export default function Transactions() {
  const { account, balance, totalDeposited, totalWithdrawn, transactions, formatBDT } = useBank();

  const depositCount = transactions.filter((t) => t.type === 'Deposit').length;
  const withdrawCount = transactions.filter((t) => t.type === 'Withdrawal').length;

  return (
    <div className="page-container transactions-page">
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div className="page-category-tag">
            <Building2 size={15} />
            <span>{account.bankName} • Account Statement</span>
          </div>
          <h1 className="page-heading">Transaction History</h1>
          <p className="page-subheading">
            Comprehensive audit log of all deposits and withdrawals in BDT with date, amount, and reference details.
          </p>
        </div>

        {/* Balance Snapshot */}
        <div className="header-balance-card">
          <div className="header-balance-top">
            <span className="balance-badge">Current Balance</span>
            <Wallet size={18} className="text-success" />
          </div>
          <div className="header-balance-val">{formatBDT(balance)}</div>
          <div className="header-balance-sub">
            <span>Account:</span> <span className="mono">{account.accountNumber}</span>
          </div>
        </div>
      </div>

      {/* Transaction Statement Summary Metrics */}
      <div className="transactions-summary-strip">
        <div className="summary-strip-card">
          <div className="summary-strip-icon bg-emerald-soft">
            <ArrowDownLeft size={20} className="text-success" />
          </div>
          <div className="summary-strip-info">
            <span className="summary-strip-label">Total Deposits</span>
            <span className="summary-strip-amount text-success">{formatBDT(totalDeposited)}</span>
            <span className="summary-strip-meta">{depositCount} completed deposits</span>
          </div>
        </div>

        <div className="summary-strip-card">
          <div className="summary-strip-icon bg-rose-soft">
            <ArrowUpRight size={20} className="text-danger" />
          </div>
          <div className="summary-strip-info">
            <span className="summary-strip-label">Total Withdrawals</span>
            <span className="summary-strip-amount text-danger">{formatBDT(totalWithdrawn)}</span>
            <span className="summary-strip-meta">{withdrawCount} completed withdrawals</span>
          </div>
        </div>

        <div className="summary-strip-card">
          <div className="summary-strip-icon bg-blue-soft">
            <Receipt size={20} className="text-primary" />
          </div>
          <div className="summary-strip-info">
            <span className="summary-strip-label">Total Transactions</span>
            <span className="summary-strip-amount">{transactions.length} Records</span>
            <span className="summary-strip-meta">Recorded in persistent storage</span>
          </div>
        </div>
      </div>

      {/* Transaction List with Search and Filter */}
      <div className="transactions-table-section">
        <TransactionList 
          showControls={true} 
          title="Account Statement Ledger" 
        />
      </div>
    </div>
  );
}
