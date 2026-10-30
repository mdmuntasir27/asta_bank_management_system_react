import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BankContext = createContext();

export function BankProvider({ children }) {
  const { currentUser, getUserBankData, updateUserBankData } = useAuth();

  // Load user-specific data from the auth store
  const userData = currentUser ? getUserBankData(currentUser.id) : null;

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Sync state with authenticated user's data whenever user changes
  useEffect(() => {
    if (userData) {
      setBalance(Number(userData.balance) || 0);
      setTransactions(userData.transactions || []);
    }
  }, [currentUser?.id]);

  // Persist changes back to the auth store whenever balance or transactions change
  useEffect(() => {
    if (currentUser?.id && currentUser?.role === 'user') {
      updateUserBankData(currentUser.id, { balance, transactions });
    }
  }, [balance, transactions]);

  // Build account object from the current user session
  const account = currentUser
    ? {
        bankName: 'ASTA Bank Ltd.',
        appTitle: 'Online Banking & Account Management Portal',
        accountHolder: currentUser.name,
        accountNumber: currentUser.accountNumber,
        accountType: currentUser.accountType || 'Savings Account',
        branch: currentUser.branch || 'Main Branch, Dhaka',
        currency: 'BDT',
      }
    : {
        bankName: 'ASTA Bank Ltd.',
        appTitle: 'Online Banking & Account Management Portal',
        accountHolder: 'Guest',
        accountNumber: '—',
        accountType: '—',
        branch: '—',
        currency: 'BDT',
      };

  // Derived totals
  const totalDeposited = transactions
    .filter((t) => t.type === 'Deposit')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalWithdrawn = transactions
    .filter((t) => t.type === 'Withdrawal')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  // Deposit handler
  const depositMoney = (amount, note = 'Cash Deposit') => {
    const numAmount = Number(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      return { success: false, message: 'Please enter a valid deposit amount greater than 0 BDT.' };
    }

    const newTxn = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'Deposit',
      amount: numAmount,
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      note: note.trim() || 'Online Deposit',
    };

    setBalance((prev) => prev + numAmount);
    setTransactions((prev) => [newTxn, ...prev]);

    return {
      success: true,
      message: `Successfully deposited ৳ ${numAmount.toLocaleString('en-BD', { minimumFractionDigits: 2 })} BDT into ${account.bankName}!`,
      transaction: newTxn,
    };
  };

  // Withdraw handler
  const withdrawMoney = (amount, note = 'Cash Withdrawal') => {
    const numAmount = Number(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      return { success: false, message: 'Please enter a valid withdrawal amount greater than 0 BDT.' };
    }

    if (numAmount > balance) {
      return {
        success: false,
        message: `Insufficient funds! Requested ৳ ${numAmount.toLocaleString('en-BD', { minimumFractionDigits: 2 })} BDT exceeds available balance of ৳ ${balance.toLocaleString('en-BD', { minimumFractionDigits: 2 })} BDT.`,
      };
    }

    const newTxn = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'Withdrawal',
      amount: numAmount,
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      note: note.trim() || 'Online Withdrawal',
    };

    setBalance((prev) => prev - numAmount);
    setTransactions((prev) => [newTxn, ...prev]);

    return {
      success: true,
      message: `Successfully withdrawn ৳ ${numAmount.toLocaleString('en-BD', { minimumFractionDigits: 2 })} BDT from ${account.bankName}.`,
      transaction: newTxn,
    };
  };

  // Helper to format currency
  const formatBDT = (val) => {
    const n = Number(val) || 0;
    return `৳ ${n.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BDT`;
  };

  const formatBDTSimple = (val) => {
    const n = Number(val) || 0;
    return `৳ ${n.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Reset is no longer needed with per-user data, but keep for compatibility
  const resetToDefault = () => {
    setBalance(0);
    setTransactions([]);
    if (currentUser?.id) {
      updateUserBankData(currentUser.id, { balance: 0, transactions: [] });
    }
  };

  return (
    <BankContext.Provider
      value={{
        account,
        setAccount: () => {}, // No-op for compatibility; account comes from auth
        balance,
        transactions,
        totalDeposited,
        totalWithdrawn,
        depositMoney,
        withdrawMoney,
        formatBDT,
        formatBDTSimple,
        resetToDefault,
      }}
    >
      {children}
    </BankContext.Provider>
  );
}

export function useBank() {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error('useBank must be used within a BankProvider');
  }
  return context;
}
