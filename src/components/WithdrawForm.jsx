import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowUpCircle, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle,
  FileText,
  ShieldAlert,
  X
} from 'lucide-react';
import { useBank } from '../context/BankContext';

export default function WithdrawForm({ onWithdrawSuccess }) {
  const { withdrawMoney, balance, account, formatBDT, formatBDTSimple } = useBank();

  // Form states
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Bonus Task 4: Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingWithdrawal, setPendingWithdrawal] = useState(null);

  // Bonus Task 1: useRef for amount input focus
  const amountInputRef = useRef(null);

  useEffect(() => {
    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, []);

  // Quick percent buttons
  const percentButtons = [
    { label: '25%', percent: 0.25 },
    { label: '50%', percent: 0.50 },
    { label: '75%', percent: 0.75 },
    { label: 'Max (100%)', percent: 1.0 },
  ];

  const handlePercentSelect = (percent) => {
    const calculated = Math.floor(balance * percent);
    setAmount(calculated.toString());
    setMessage(null);
    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  };

  // Validate inputs before triggering confirmation
  const validateForm = () => {
    const trimmed = amount.toString().trim();
    if (!trimmed) {
      setMessage({
        type: 'error',
        text: 'Withdrawal amount cannot be empty. Please enter an amount.',
      });
      amountInputRef.current?.focus();
      return false;
    }

    const numericAmount = parseFloat(trimmed);

    if (isNaN(numericAmount)) {
      setMessage({
        type: 'error',
        text: 'Invalid amount entered. Please provide a valid number.',
      });
      amountInputRef.current?.focus();
      return false;
    }

    if (numericAmount <= 0) {
      setMessage({
        type: 'error',
        text: 'Withdrawal amount must be greater than zero. Negative or zero amounts are not permitted.',
      });
      amountInputRef.current?.focus();
      return false;
    }

    if (numericAmount > balance) {
      setMessage({
        type: 'error',
        text: `Insufficient funds! You cannot withdraw more than your available balance (${formatBDT(balance)}).`,
      });
      amountInputRef.current?.focus();
      return false;
    }

    return numericAmount;
  };

  // Initial submission opens the confirmation modal (Bonus Task 4)
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    const validAmount = validateForm();
    if (!validAmount) return;

    // Set pending withdrawal details and open modal
    setPendingWithdrawal({
      amount: validAmount,
      note: note.trim() || 'Online Cash Withdrawal',
    });
    setShowConfirmModal(true);
  };

  // Confirmation modal confirmed action
  const handleConfirmWithdrawal = () => {
    if (!pendingWithdrawal) return;

    setIsSubmitting(true);
    setShowConfirmModal(false);

    setTimeout(() => {
      const result = withdrawMoney(pendingWithdrawal.amount, pendingWithdrawal.note);

      if (result.success) {
        setMessage({
          type: 'success',
          text: result.message,
        });
        setAmount('');
        setNote('');
        if (onWithdrawSuccess) {
          onWithdrawSuccess(result.transaction);
        }
      } else {
        setMessage({
          type: 'error',
          text: result.message,
        });
      }

      setIsSubmitting(false);
      setPendingWithdrawal(null);

      setTimeout(() => {
        amountInputRef.current?.focus();
      }, 50);
    }, 300);
  };

  const previewAmount = parseFloat(amount) || 0;
  const newProjectedBalance = balance - previewAmount;
  const isOverdraft = previewAmount > balance;

  return (
    <>
      <div className="form-card">
        <div className="form-card-header">
          <div className="form-icon-badge withdraw-badge">
            <ArrowUpCircle size={24} />
          </div>
          <div>
            <h2 className="form-title">Withdraw Money (BDT)</h2>
            <p className="form-subtitle">Withdraw funds securely from your ASTA Bank Ltd. account.</p>
          </div>
        </div>

        {/* Status Alerts */}
        {message && (
          <div
            className={`status-alert alert-${message.type}`}
            role="alert"
            id="withdraw-status-message"
          >
            {message.type === 'success' ? (
              <CheckCircle2 size={20} className="alert-icon" />
            ) : (
              <AlertCircle size={20} className="alert-icon" />
            )}
            <div className="alert-content">
              <span className="alert-title">{message.type === 'success' ? 'Withdrawal Completed' : 'Transaction Denied'}</span>
              <p className="alert-text">{message.text}</p>
            </div>
            <button
              type="button"
              className="alert-close"
              onClick={() => setMessage(null)}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        {/* Withdrawal Form */}
        <form onSubmit={handleSubmit} className="bank-form" noValidate>
          {/* Amount input */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="withdraw-amount" className="form-label">
                Withdrawal Amount <span className="required-star">*</span>
              </label>
              <span className="available-label">
                Available: <strong>{formatBDTSimple(balance)} BDT</strong>
              </span>
            </div>

            <div className={`input-with-currency ${isOverdraft ? 'input-error-border' : ''}`}>
              <span className="currency-prefix">৳ BDT</span>
              <input
                id="withdraw-amount"
                ref={amountInputRef}
                type="number"
                step="any"
                min="1"
                max={balance}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (message) setMessage(null);
                }}
                placeholder="e.g. 2500"
                className="form-input amount-input"
                required
              />
            </div>

            {isOverdraft ? (
              <span className="input-error-text">
                Amount exceeds current balance of {formatBDT(balance)}!
              </span>
            ) : (
              <span className="input-hint">Maximum per online request: {formatBDTSimple(balance)} BDT</span>
            )}
          </div>

          {/* Quick Percent Pills */}
          <div className="quick-amount-section">
            <span className="quick-label">Select Percentage:</span>
            <div className="quick-amount-buttons">
              {percentButtons.map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => handlePercentSelect(btn.percent)}
                  disabled={balance <= 0}
                  className="quick-btn percent-btn"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Note / Purpose */}
          <div className="form-group">
            <label htmlFor="withdraw-note" className="form-label">
              Withdrawal Reason / Remark <span className="text-muted">(Optional)</span>
            </label>
            <div className="input-with-icon">
              <FileText size={18} className="field-icon" />
              <input
                id="withdraw-note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g., Grocery shopping, Utility bill payment"
                maxLength={60}
                className="form-input"
              />
            </div>
          </div>

          {/* Real-time Calculation Summary */}
          <div className="calculation-preview">
            <div className="preview-row">
              <span>Current Available Balance:</span>
              <span className="preview-val">{formatBDTSimple(balance)} BDT</span>
            </div>
            <div className="preview-row highlight">
              <span>Withdrawal Deduction:</span>
              <span className="preview-val text-danger">
                - {formatBDTSimple(previewAmount)} BDT
              </span>
            </div>
            <div className="preview-divider"></div>
            <div className="preview-row total">
              <span>Projected Balance After Withdrawal:</span>
              <span className={`preview-val ${isOverdraft ? 'text-danger' : 'projected'}`}>
                {isOverdraft ? 'Insufficient Funds' : `${formatBDTSimple(newProjectedBalance)} BDT`}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="btn-submit-withdraw"
            disabled={isSubmitting || isOverdraft || balance <= 0}
            className="btn-submit btn-withdraw"
          >
            {isSubmitting ? (
              <span className="spinner-loader">Verifying Request...</span>
            ) : (
              <>
                <ArrowUpCircle size={20} />
                <span>Review & Withdraw Funds</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Bonus Task 4: Interactive Confirmation Modal */}
      {showConfirmModal && pendingWithdrawal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-header">
              <div className="modal-icon-badge">
                <AlertTriangle size={24} className="text-warning" />
              </div>
              <div>
                <h3 className="modal-title">Confirm Withdrawal</h3>
                <p className="modal-subtitle">Please verify your transaction details carefully.</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowConfirmModal(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-info-card">
                <div className="modal-row">
                  <span className="modal-label">Bank:</span>
                  <span className="modal-value bold">{account.bankName}</span>
                </div>
                <div className="modal-row">
                  <span className="modal-label">Account Holder:</span>
                  <span className="modal-value">{account.accountHolder}</span>
                </div>
                <div className="modal-row">
                  <span className="modal-label">Account Number:</span>
                  <span className="modal-value mono">{account.accountNumber}</span>
                </div>
                <div className="modal-row">
                  <span className="modal-label">Remark:</span>
                  <span className="modal-value">{pendingWithdrawal.note}</span>
                </div>
                <div className="modal-divider"></div>
                <div className="modal-row highlight-row">
                  <span className="modal-label">Withdrawal Amount:</span>
                  <span className="modal-value amount-danger">
                    - {formatBDT(pendingWithdrawal.amount)}
                  </span>
                </div>
                <div className="modal-row">
                  <span className="modal-label">Remaining Balance:</span>
                  <span className="modal-value text-success bold">
                    {formatBDT(balance - pendingWithdrawal.amount)}
                  </span>
                </div>
              </div>

              <div className="security-notice">
                <ShieldAlert size={16} />
                <span>
                  This action is final. Your account balance will be debited immediately.
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-modal-confirm"
                onClick={handleConfirmWithdrawal}
              >
                Confirm & Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
