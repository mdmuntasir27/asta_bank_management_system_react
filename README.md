# ASTA Bank Ltd. - Modern Bank Management System

A modern, responsive Bank Management System web application built with **React**, **Vite**, and **React Router DOM**. Developed with complete banking workflows, role-based access control, admin management, first-time user password setup with real-time strength testing, and persistent transaction ledgers.

---

## 🌟 Key Project Highlights

- **Bank Name:** `ASTA Bank Ltd.`
- **Default Currency:** `BDT (৳ Bangladeshi Taka)`
- **Access Control:** Role-based Admin & Customer Portal
- **Default Admin Credentials:**
  - **Email:** `admin@astabank.com`
  - **Password:** `admin123`

---

## 🔐 Authentication, Admin & Security System

### 1. Admin-Controlled Account Creation
- Bank accounts can **only be created and issued by an administrator**.
- Admin inputs customer profile details:
  - **Full Name**
  - **Email Address**
  - **Phone Number**
  - **Account Number** (e.g. `ASTA-2026-0001`)
  - **Account Type** (Savings, Current, Premium Savings, Student, Fixed Deposit)
  - **Branch Location**
  - **Initial Opening Deposit** (in BDT)
- **No password is set by the admin**, ensuring privacy and customer ownership of credentials.
- Includes duplicate prevention for email addresses and account numbers.
- Administrator management panel displays account list, status badges (`Active` vs. `Pending Setup`), balances, and account deletion.

### 2. First-Time User Setup & Verification
- When a user logs in for the first time, they navigate to **First-Time Account Setup** (`/first-time-setup`).
- **Step 1 - Identity Verification:** The customer verifies their identity by entering their **Account Number** and **Email Address**.
- **Step 2 - Password Creation:** Once verified, the customer creates their own private password.

### 3. Password Strength Test & Privacy Policy Enforcement
Under the password creation field, an interactive security test evaluates the password in real time:
- **Interactive Criteria Checklist:**
  - ✔ Minimum 8 characters long
  - ✔ At least one uppercase letter (`A-Z`)
  - ✔ At least one lowercase letter (`a-z`)
  - ✔ At least one numeric digit (`0-9`)
  - ✔ At least one special symbol (`!@#$%^&*...`)
- **4-Segment Dynamic Strength Bar & Rating:**
  - **Low** (1 bar, red)
  - **Medium** (2 bars, amber)
  - **Strong** (3 bars, emerald green)
  - **Very Strong** (4 bars, vibrant cyan-emerald with glow)
- **Privacy & Security Guard:**
  - If a password is rated **Low** or **Medium**, the form will **reject submission** and display an explicit warning:
    > *"Password strength is insufficient! For your privacy and account security, ASTA Bank requires your password to be at least 'Strong' or 'Very Strong'. Please fulfill more criteria below before proceeding."*
  - Only passwords meeting at least **Strong** or **Very Strong** ratings are accepted.

### 4. Customer Login & Protected Routes
- Once the password is set, the customer logs in with **Email** and **Password** at `/login`.
- **Route Protection:**
  - Unauthenticated visitors are redirected to `/login`.
  - Customers cannot access the `/admin` dashboard.
  - Administrators accessing the banking portal are directed to the admin panel.
  - Authenticated sessions are prevented from accessing guest login pages.
- **Per-User Isolated State:** Every customer's balance, deposits, withdrawals, and transaction records are isolated and persisted in `localStorage`.
- **Sign Out:** Accessible from the top navbar on desktop and mobile drawer.

---

## 📋 Banking Features & Assignment Tasks Completed

### Task 1: Dashboard
- Displays bank name (**ASTA Bank Ltd.**) and portal title.
- Displays logged-in customer's name, account number, account type, and branch.
- Displays real-time **Current Account Balance** in BDT.
- Displays **Total Deposited Amount** in BDT.
- Displays **Total Withdrawn Amount** in BDT.
- High-end visual bank debit/savings card with metallic chip, card shine, and formatted numbers.
- Reusable React components (`BalanceCard`, `TransactionList`, `TransactionItem`).

### Task 2: Deposit Money
- Deposit form with amount input, optional transaction remark, and Deposit button.
- Instant credit to balance in BDT synchronized via `BankContext`.
- **Input Validation:** Prevents empty, zero, or negative deposit amounts.
- Displays formatted success alerts upon successful deposit.
- Quick preset buttons (`+৳500`, `+৳1,000`, `+৳5,000`, `+৳10,000`, `+৳25,000`).
- Auto-focuses amount input field with `useRef`.

### Task 3: Withdraw Money
- Withdrawal form with amount input, optional transaction remark, and Review button.
- Instant debit in BDT from available cleared funds.
- **Input Validation:** Prevents zero or negative amounts, and prevents withdrawals exceeding available balance (overdraft protection).
- **Two-step confirmation modal** before finalizing withdrawals to verify amount, account details, and post-transaction balance.
- Displays clear success notifications and error alerts.
- Quick percentage buttons (`25%`, `50%`, `75%`, `Max 100%`).
- Auto-focuses amount input field with `useRef`.

### Task 4: Transaction History
- Full transaction statement ledger with unique reference ID, transaction type, amount in BDT, date/time, and remarks.
- Stores transaction records using `useState` and Context API.
- Renders transaction list using JavaScript's `.map()` method.
- **Conditional Rendering:** Renders an empty-state illustration when no transactions match.
- **Distinctive Visual Styling:**
  - **Deposits:** Emerald theme, `+ ৳ Amount BDT`, incoming arrow badge.
  - **Withdrawals:** Rose theme, `- ৳ Amount BDT`, outgoing arrow badge.
- Instant search by reference note/ID and category filter tabs (**All**, **Deposits**, **Withdrawals**).

### Task 5: Navigation & Routing (React Router DOM)
- Multi-page navigation menu:
  - **User Login** (`/login`)
  - **Admin Login** (`/admin-login`)
  - **First-Time Password Setup** (`/first-time-setup`)
  - **Admin Management Panel** (`/admin`)
  - **Customer Dashboard** (`/`)
  - **Deposit Funds** (`/deposit`)
  - **Withdraw Funds** (`/withdraw`)
  - **Transaction History Statement** (`/transactions`)
- Utilizes `react-router-dom` (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `Navigate`).
- Persistent `Navbar` with active tab highlights, live balance pill, sign-out button, and mobile drawer menu.

### Task 6: Reusable Component Architecture
- `src/components/Navbar.jsx` - Persistent top navigation with balance pill, logout, and responsive drawer.
- `src/components/BalanceCard.jsx` - Reusable metric display card and luxury bank card.
- `src/components/DepositForm.jsx` - Form with validation, quick amounts, and live preview.
- `src/components/WithdrawForm.jsx` - Form with validation, percentage chips, and confirmation modal.
- `src/components/TransactionList.jsx` - Searchable, filterable list iterating over transactions.
- `src/components/TransactionItem.jsx` - Distinct deposit/withdrawal transaction row component.

---

## 🏆 Bonus & Advanced Capabilities Implemented

1. **Role-Based Auth & Admin Control:** Secure admin dashboard for customer onboarding without hardcoded passwords.
2. **First-Time Password Setup with Strength Testing:** Live criteria checks, dynamic 4-segment strength bar, and privacy policy rejection for weak passwords.
3. **`useRef` Hook:** Automatically focuses on the amount input field upon page load and after submissions.
4. **Context API Architecture:** Dual context system:
   - `AuthContext.jsx` (`useAuth`) manages credentials, sessions, and user records.
   - `BankContext.jsx` (`useBank`) connects authenticated user data to banking operations.
5. **`localStorage` Persistence:** All registered users, passwords, sessions, account balances, and transaction statements persist across page reloads.
6. **Withdrawal Confirmation Modal:** Interactive security modal confirming customer and balance details before debits.

---

## 📂 Project Folder Structure

```text
asta_bank_management_system_react/
├── src/
│   ├── components/
│   │   ├── BalanceCard.jsx       # Reusable balance and metric cards
│   │   ├── DepositForm.jsx       # Deposit form with validation & quick amounts
│   │   ├── Navbar.jsx            # Persistent navigation bar with logout
│   │   ├── TransactionItem.jsx   # Individual deposit/withdrawal row item
│   │   ├── TransactionList.jsx   # Filterable & searchable transaction ledger
│   │   └── WithdrawForm.jsx      # Withdrawal form & confirmation modal
│   ├── context/
│   │   ├── AuthContext.jsx       # Authentication, admin & customer session store
│   │   └── BankContext.jsx       # Per-user balance, ledger & banking actions
│   ├── pages/
│   │   ├── AdminDashboard.jsx    # Admin account creation & user management
│   │   ├── AdminLogin.jsx        # Admin credential sign-in page
│   │   ├── Dashboard.jsx         # Customer main dashboard view
│   │   ├── Deposit.jsx           # Deposit page
│   │   ├── FirstTimeSetup.jsx    # Identity verification & password strength setup
│   │   ├── Login.jsx             # Customer email & password login
│   │   ├── Transactions.jsx      # Statement and transaction audit log
│   │   └── Withdraw.jsx          # Withdrawal page with overdraft guard
│   ├── App.jsx                   # Application router, protected routes & footer
│   ├── index.css                 # Custom design tokens, auth styles & animations
│   └── main.jsx                  # React application entry point
├── index.html                    # HTML entry point with ASTA Bank branding
├── package.json                  # Dependencies and scripts
└── README.md                     # Documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your machine.

### 2. Installation
Open your terminal in the project root directory and run:

```bash
npm install
```

### 3. Running Locally
Start the development server with:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173/`.

### 4. Default Testing Workflow
1. Navigate to `/admin-login` and sign in with:
   - **Email:** `admin@astabank.com`
   - **Password:** `admin123`
2. In the Admin Panel, create a new customer account (e.g., Name: `Rahim Ahmed`, Email: `rahim@example.com`, Account No: `ASTA-2026-1001`, Initial Deposit: `50000`).
3. Log out of admin.
4. Go to **First time logging in? Set up your password** (`/first-time-setup`).
5. Verify identity using the Account Number and Email.
6. Test the **Password Strength Meter**:
   - Try entering a weak password (e.g. `123456`) → notice the warning and submission rejection.
   - Enter a **Strong** or **Very Strong** password satisfying the criteria (e.g. `Rahim@Bank2026`).
7. Log in with the customer's email and password to access the banking dashboard, deposit, withdraw, and view statements!

### 5. Building for Production
To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🛠️ Technologies Used

- **React 19**
- **Vite 8**
- **React Router DOM 7**
- **Lucide React** (Modern Icons)
- **Vanilla CSS** (Custom Design Tokens, Glassmorphism, Responsive Grid, Micro-animations)

---

## 📄 License & Notes
This project was developed for the **Ostad React Assignment**. It is a frontend simulation; no real monetary transactions or external banking APIs are connected.
