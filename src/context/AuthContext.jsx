import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY_USERS = 'asta_bank_users';
const STORAGE_KEY_AUTH = 'asta_bank_auth_session';

// Default admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@astabank.com',
  password: 'admin123',
  name: 'System Administrator',
  role: 'admin',
};

export function AuthProvider({ children }) {
  // Load registered users from localStorage
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load current session from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persist users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users to localStorage', e);
    }
  }, [users]);

  // Persist session to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_AUTH);
      }
    } catch (e) {
      console.error('Failed to save session to localStorage', e);
    }
  }, [currentUser]);

  // Admin creates a new user account (no password yet)
  const createUserAccount = ({
    name,
    email,
    phone,
    accountNumber,
    accountType,
    branch,
    initialBalance,
  }) => {
    // Check for duplicate email or account number
    const existingEmail = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (existingEmail) {
      return { success: false, message: 'A user with this email already exists.' };
    }

    const existingAccount = users.find(
      (u) => u.accountNumber.toLowerCase() === accountNumber.toLowerCase()
    );
    if (existingAccount) {
      return { success: false, message: 'This account number is already in use.' };
    }

    const newUser = {
      id: `USR-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      name,
      email: email.toLowerCase(),
      phone,
      accountNumber,
      accountType: accountType || 'Savings Account',
      branch: branch || 'Main Branch, Dhaka',
      balance: Number(initialBalance) || 0,
      password: null, // Not set yet — first login will set it
      isPasswordSet: false,
      createdAt: new Date().toISOString(),
      transactions: [],
    };

    setUsers((prev) => [...prev, newUser]);

    return {
      success: true,
      message: `Account created successfully for ${name}. Account No: ${accountNumber}`,
      user: newUser,
    };
  };

  // First-time verification: user enters account number + email
  const verifyFirstTimeUser = (accountNumber, email) => {
    const user = users.find(
      (u) =>
        u.accountNumber.toLowerCase() === accountNumber.toLowerCase() &&
        u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return {
        success: false,
        message: 'No matching account found. Please check your account number and email.',
      };
    }

    if (user.isPasswordSet) {
      return {
        success: false,
        message: 'Password is already set for this account. Please use the regular login.',
      };
    }

    return { success: true, user };
  };

  // First-time password setup
  const setFirstTimePassword = (userId, password) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, password, isPasswordSet: true }
          : u
      )
    );

    const user = users.find((u) => u.id === userId);
    return {
      success: true,
      message: `Password set successfully for ${user?.name}. You can now log in.`,
    };
  };

  // Regular user login with email + password
  const loginUser = (email, password) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return { success: false, message: 'No account found with this email address.' };
    }

    if (!user.isPasswordSet) {
      return {
        success: false,
        message: 'Password not set yet. Please complete first-time setup first.',
        needsSetup: true,
      };
    }

    if (user.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    const session = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      accountNumber: user.accountNumber,
      accountType: user.accountType,
      branch: user.branch,
      role: 'user',
    };

    setCurrentUser(session);
    return { success: true, message: `Welcome back, ${user.name}!`, session };
  };

  // Admin login
  const loginAdmin = (email, password) => {
    if (
      email.toLowerCase() === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const session = {
        name: ADMIN_CREDENTIALS.name,
        email: ADMIN_CREDENTIALS.email,
        role: 'admin',
      };
      setCurrentUser(session);
      return { success: true, message: 'Admin access granted.', session };
    }
    return { success: false, message: 'Invalid admin credentials.' };
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
  };

  // Get user data for the banking context (balance, transactions, etc.)
  const getUserBankData = (userId) => {
    return users.find((u) => u.id === userId) || null;
  };

  // Update user bank data (balance, transactions)
  const updateUserBankData = (userId, updates) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updates } : u))
    );
  };

  // Get all users (for admin)
  const getAllUsers = () => users;

  // Delete a user account (admin only)
  const deleteUserAccount = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return { success: false, message: 'User not found.' };
    }
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    return { success: true, message: `Account for ${user.name} has been deleted.` };
  };

  const isAuthenticated = currentUser !== null;
  const isAdmin = currentUser?.role === 'admin';
  const isUser = currentUser?.role === 'user';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        isAuthenticated,
        isAdmin,
        isUser,
        createUserAccount,
        verifyFirstTimeUser,
        setFirstTimePassword,
        loginUser,
        loginAdmin,
        logout,
        getUserBankData,
        updateUserBankData,
        getAllUsers,
        deleteUserAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

