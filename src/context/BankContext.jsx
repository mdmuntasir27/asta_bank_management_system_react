import { createContext, useContext, useState, useEffect } from 'react';

const BankContext = createContext();

const STORAGE_KEY_BALANCE = 'asta_bank_balance';
const STORAGE_KEY_TRANSACTIONS = 'asta_bank_transactions';
const STORAGE_KEY_USER = 'asta_bank_user';

const INITIAL_ACCOUNT = {
  bankName: 'ASTA Bank Ltd.',
  appTitle: 'Online Banking & Account Management Portal',
  accountHolder: 'Md. Tanvir Hasan',
  accountNumber: 'ASTA-2026-9812401',
  accountType: 'Premium Savings Account',
  branch: 'Gulshan Corporate Branch, Dhaka',
  currency: 'BDT',
};

const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-90214',
    type: 'Deposit',
    amount: 50000,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    note: 'Initial Account Opening Deposit',
  },
  {
    id: 'TXN-90215',
    type: 'Deposit',
    amount: 25000,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    note: 'Monthly Salary Credit',
  },
  {
    id: 'TXN-90216',
    type: 'Withdrawal',
    amount: 10000,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    note: 'ATM Cash Withdrawal (Gulshan ATM)',
  },
];

export function BankProvider({ children }) {
  // Load account info from localStorage or initial state
  const [account, setAccount] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : INITIAL_ACCOUNT;
    } catch {
      return INITIAL_ACCOUNT;
    }
  });

  // Load balance from localStorage or calculate from initial transactions
  const [balance, setBalance] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BALANCE);
      if (saved !== null) return Number(saved);
      return 65000; // 50000 + 25000 - 10000
    } catch {
      return 65000;
    }
  });

  // Load transactions from localStorage or initial transactions
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  // Save to localStorage whenever balance or transactions change (Bonus Task 3)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BALANCE, balance.toString());
    } catch (e) {
      console.error('Failed to save balance to localStorage', e);
    }
  }, [balance]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to save transactions to localStorage', e);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(account));
    } catch (e) {
      console.error('Failed to save account to localStorage', e);
    }
  }, [account]);

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

  // Reset to initial demo data
  const resetToDefault = () => {
    setBalance(65000);
    setTransactions(INITIAL_TRANSACTIONS);
    setAccount(INITIAL_ACCOUNT);
    localStorage.removeItem(STORAGE_KEY_BALANCE);
    localStorage.removeItem(STORAGE_KEY_TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  return (
    <BankContext.Provider
      value={{
        account,
        setAccount,
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
