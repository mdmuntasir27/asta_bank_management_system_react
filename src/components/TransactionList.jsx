import React, { useState } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  ArrowDownLeft, 
  ArrowUpRight,
  SlidersHorizontal 
} from 'lucide-react';
import TransactionItem from './TransactionItem';
import { useBank } from '../context/BankContext';

export default function TransactionList({ 
  transactions: propTransactions, 
  limit, 
  showControls = true,
  title = 'Recent Transactions'
}) {
  const { transactions: contextTransactions } = useBank();
  const transactionsToUse = propTransactions || contextTransactions;

  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'Deposit' | 'Withdrawal'
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items
  const filteredTransactions = transactionsToUse.filter((t) => {
    const matchesType =
      filterType === 'ALL' ? true : t.type.toLowerCase() === filterType.toLowerCase();

    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.note && t.note.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.amount.toString().includes(searchQuery) ||
      t.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  // Apply limit if specified
  const displayedTransactions = limit 
    ? filteredTransactions.slice(0, limit) 
    : filteredTransactions;

  return (
    <div className="transaction-list-card">
      <div className="transaction-list-header">
        <div className="header-title-group">
          <h2 className="section-title">{title}</h2>
          <span className="count-pill">
            {filteredTransactions.length} {filteredTransactions.length === 1 ? 'record' : 'records'}
          </span>
        </div>

        {/* Filter controls if enabled */}
        {showControls && (
          <div className="transaction-controls">
            {/* Search Input */}
            <div className="search-input-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search reference or note..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  className="clear-search-btn" 
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="filter-button-group">
              <button
                type="button"
                className={`filter-btn ${filterType === 'ALL' ? 'active' : ''}`}
                onClick={() => setFilterType('ALL')}
              >
                All
              </button>
              <button
                type="button"
                className={`filter-btn ${filterType === 'Deposit' ? 'active' : ''}`}
                onClick={() => setFilterType('Deposit')}
              >
                <ArrowDownLeft size={14} />
                <span>Deposits</span>
              </button>
              <button
                type="button"
                className={`filter-btn ${filterType === 'Withdrawal' ? 'active' : ''}`}
                onClick={() => setFilterType('Withdrawal')}
              >
                <ArrowUpRight size={14} />
                <span>Withdrawals</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Items using map() and conditional rendering */}
      <div className="transactions-container">
        {displayedTransactions.length > 0 ? (
          <div className="transaction-items-list">
            {displayedTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        ) : (
          /* Conditional rendering for empty state */
          <div className="empty-state" id="no-transactions-message">
            <div className="empty-icon-box">
              <Inbox size={42} className="empty-icon" />
            </div>
            <h3 className="empty-title">No Transactions Found</h3>
            <p className="empty-subtitle">
              {searchQuery || filterType !== 'ALL'
                ? 'No transaction records match your selected filters. Try resetting the search or filter.'
                : 'There are currently no transaction records in your ASTA Bank account. Deposits or withdrawals will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
