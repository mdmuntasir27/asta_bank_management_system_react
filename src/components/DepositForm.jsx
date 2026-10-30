import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowDownCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Banknote,
  FileText
} from 'lucide-react';
import { useBank } from '../context/BankContext';

export default function DepositForm({ onDepositSuccess }) {
  const { depositMoney, balance, formatBDT, formatBDTSimple } = useBank();
  
  // useState for form inputs
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useRef to focus on the amount input (Bonus Task 1)
  const amountInputRef = useRef(null);

  useEffect(() => {
    // Focus the amount input on component mount
    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, []);

  // Quick preset amount buttons
  const quickAmounts = [500, 1000, 5000, 10000, 25000];

  const handleQuickSelect = (val) => {
    setAmount(val.toString());
    setMessage(null);
    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    // Validation checks
    const trimmed = amount.toString().trim();
    if (!trimmed) {
      setMessage({
        type: 'error',
        text: 'Amount cannot be empty. Please enter an amount to deposit.',
      });
      amountInputRef.current?.focus();
      return;
    }

    const numericAmount = parseFloat(trimmed);

    if (isNaN(numericAmount)) {
      setMessage({
        type: 'error',
        text: 'Invalid amount entered. Please enter a valid numerical value.',
      });
      amountInputRef.current?.focus();
      return;
    }

    if (numericAmount <= 0) {
      setMessage({
        type: 'error',
        text: 'Deposit amount must be greater than zero. Negative or zero values are not permitted.',
      });
      amountInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    // Simulate minor processing delay for realistic banking feel
    setTimeout(() => {
      const result = depositMoney(numericAmount, note);

      if (result.success) {
        setMessage({
          type: 'success',
          text: result.message,
        });
        setAmount('');
        setNote('');
        if (onDepositSuccess) {
          onDepositSuccess(result.transaction);
        }
      } else {
        setMessage({
          type: 'error',
          text: result.message,
        });
      }

      setIsSubmitting(false);

      // Re-focus input for next action
      setTimeout(() => {
        amountInputRef.current?.focus();
      }, 50);
    }, 300);
  };

  const previewAmount = parseFloat(amount) || 0;
  const newProjectedBalance = previewAmount > 0 ? balance + previewAmount : balance;

  return (
    <div className="form-card">
      <div className="form-card-header">
        <div className="form-icon-badge deposit-badge">
          <ArrowDownCircle size={24} />
        </div>
        <div>
          <h2 className="form-title">Deposit Money (BDT)</h2>
          <p className="form-subtitle">Add funds to your ASTA Bank Ltd. account instantly.</p>
        </div>
      </div>

      {/* Status Messages */}
      {message && (
        <div
          className={`status-alert alert-${message.type}`}
          role="alert"
          id="deposit-status-message"
        >
          {message.type === 'success' ? (
            <CheckCircle2 size={20} className="alert-icon" />
          ) : (
            <AlertCircle size={20} className="alert-icon" />
          )}
          <div className="alert-content">
            <span className="alert-title">{message.type === 'success' ? 'Deposit Approved' : 'Validation Error'}</span>
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

      {/* Deposit Form */}
      <form onSubmit={handleSubmit} className="bank-form" noValidate>
        {/* Amount Input */}
        <div className="form-group">
          <label htmlFor="deposit-amount" className="form-label">
            Deposit Amount <span className="required-star">*</span>
          </label>
          <div className="input-with-currency">
            <span className="currency-prefix">৳ BDT</span>
            <input
              id="deposit-amount"
              ref={amountInputRef}
              type="number"
              step="any"
              min="1"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (message) setMessage(null);
              }}
              placeholder="e.g. 5000"
              className="form-input amount-input"
              required
            />
          </div>
          <span className="input-hint">Minimum deposit: ৳ 1.00 BDT. No upper limit on verified accounts.</span>
        </div>

        {/* Quick Amount Pills */}
        <div className="quick-amount-section">
          <span className="quick-label">Quick Select:</span>
          <div className="quick-amount-buttons">
            {quickAmounts.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleQuickSelect(val)}
                className={`quick-btn ${parseFloat(amount) === val ? 'active' : ''}`}
              >
                +৳{val.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Note / Remarks */}
        <div className="form-group">
          <label htmlFor="deposit-note" className="form-label">
            Transaction Remark / Reference <span className="text-muted">(Optional)</span>
          </label>
          <div className="input-with-icon">
            <FileText size={18} className="field-icon" />
            <input
              id="deposit-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., Freelance payment, Personal savings"
              maxLength={60}
              className="form-input"
            />
          </div>
        </div>

        {/* Real-time Calculation Summary */}
        <div className="calculation-preview">
          <div className="preview-row">
            <span>Current Balance:</span>
            <span className="preview-val">{formatBDTSimple(balance)} BDT</span>
          </div>
          <div className="preview-row highlight">
            <span>Deposit Addition:</span>
            <span className="preview-val text-success">
              + {formatBDTSimple(previewAmount)} BDT
            </span>
          </div>
          <div className="preview-divider"></div>
          <div className="preview-row total">
            <span>Projected New Balance:</span>
            <span className="preview-val projected">{formatBDTSimple(newProjectedBalance)} BDT</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="btn-submit-deposit"
          disabled={isSubmitting}
          className="btn-submit btn-deposit"
        >
          {isSubmitting ? (
            <span className="spinner-loader">Processing Deposit...</span>
          ) : (
            <>
              <ArrowDownCircle size={20} />
              <span>Confirm & Deposit Funds</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
