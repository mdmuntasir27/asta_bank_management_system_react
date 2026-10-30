import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Calendar, Tag } from 'lucide-react';
import { useBank } from '../context/BankContext';

export default function TransactionItem({ transaction }) {
  const { formatBDTSimple } = useBank();
  const isDeposit = transaction.type === 'Deposit';

  return (
    <div className={`transaction-item ${isDeposit ? 'item-deposit' : 'item-withdrawal'}`}>
      <div className="transaction-left">
        {/* Type Icon */}
        <div className={`transaction-icon-box ${isDeposit ? 'icon-deposit' : 'icon-withdrawal'}`}>
          {isDeposit ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
        </div>

        {/* Transaction Details */}
        <div className="transaction-details">
          <div className="transaction-primary-row">
            <span className="transaction-type-label">
              {isDeposit ? 'Deposit' : 'Withdrawal'}
            </span>
            <span className="transaction-id-badge">{transaction.id}</span>
          </div>

          <div className="transaction-secondary-row">
            <span className="transaction-date">
              <Calendar size={13} className="inline-icon" />
              {transaction.date}
            </span>
            {transaction.note && (
              <span className="transaction-note">
                <Tag size={12} className="inline-icon" />
                {transaction.note}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Amount column */}
      <div className="transaction-right">
        <span className={`transaction-amount ${isDeposit ? 'amount-deposit' : 'amount-withdrawal'}`}>
          {isDeposit ? '+' : '-'} {formatBDTSimple(transaction.amount)} BDT
        </span>
        <span className="transaction-status-tag">Completed</span>
      </div>
    </div>
  );
}
