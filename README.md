# ASTA Bank Ltd. - Modern Bank Management System

A modern, responsive Bank Management System web application built with **React**, **Vite**, and **React Router DOM**. Developed as part of the Ostad React Assignment with all required and bonus features implemented.

---

## 🌟 Key Project Highlights

- **Bank Name:** `ASTA Bank Ltd.`
- **Default Currency:** `BDT (৳ Bangladeshi Taka)`
- **Account Holder:** `Md. Tanvir Hasan`
- **Account Number:** `ASTA-2026-9812401`
- **Account Type:** `Premium Savings Account`
- **Branch:** `Gulshan Corporate Branch, Dhaka`

---

## 📋 Features & Assignment Tasks Completed

### Task 1: Dashboard
- Displays bank name (**ASTA Bank Ltd.**) and portal title.
- Displays account holder's name (**Md. Tanvir Hasan**) and account number (**ASTA-2026-9812401**).
- Displays real-time **Current Account Balance** in BDT.
- Displays **Total Deposited Amount** in BDT.
- Displays **Total Withdrawn Amount** in BDT.
- Features reusable React components (`BalanceCard`, `TransactionList`, `TransactionItem`).
- High-end visual bank debit/savings card with metallic chip, card shine, and formatted numbers.

### Task 2: Deposit Money
- Deposit form with amount input, optional transaction remark, and Deposit button.
- Managed using `useState` and synchronized via `BankContext`.
- Handles form submission using standard `onSubmit`.
- Allows instant credit to balance in BDT.
- **Input Validation:** Prevents empty, zero, or negative deposit amounts.
- Displays formatted success alerts upon successful deposit.
- *(Bonus)* Utilizes `useRef` to auto-focus the amount input field.
- Quick preset buttons (`+৳500`, `+৳1,000`, `+৳5,000`, `+৳10,000`, `+৳25,000`).

### Task 3: Withdraw Money
- Withdrawal form with amount input, optional transaction remark, and Review button.
- Allows debiting money in BDT from available funds.
- **Input Validation:** Prevents zero or negative amounts, and prevents withdrawals exceeding available balance (overdraft protection).
- *(Bonus)* **Two-step confirmation modal** before finalizing withdrawals to verify amount, account details, and remaining balance.
- Displays clear success notifications and error alerts.
- *(Bonus)* Uses `useRef` to auto-focus the withdrawal amount input.
- Quick percentage buttons (`25%`, `50%`, `75%`, `Max 100%`).

### Task 4: Transaction History
- Full transaction statement ledger with transaction reference ID, type, amount in BDT, and formatted date/time.
- Stores transaction records using `useState` and Context API.
- Renders transaction list using JavaScript's `.map()` method.
- **Conditional Rendering:** Renders an empty-state illustration and message when no transactions match.
- **Distinctive Visual Styling:**
  - **Deposits:** Emerald theme, `+ ৳ Amount BDT`, incoming arrow badge.
  - **Withdrawals:** Rose theme, `- ৳ Amount BDT`, outgoing arrow badge.
- Instant search by reference note/ID and category filter tabs (**All**, **Deposits**, **Withdrawals**).

### Task 5: Navigation (React Router DOM)
- Multi-page navigation menu:
  - **Dashboard** (`/`)
  - **Deposit** (`/deposit`)
  - **Withdraw** (`/withdraw`)
  - **Transaction History** (`/transactions`)
- Utilizes `react-router-dom` (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`).
- Persistent `Navbar` with active tab highlights, live balance pill, and mobile drawer menu.

### Task 6: Reusable Component Architecture
- `src/components/Navbar.jsx` - Persistent top navigation with live balance and responsive drawer.
- `src/components/BalanceCard.jsx` - Reusable metric display card and luxury bank card.
- `src/components/DepositForm.jsx` - Form with validation, quick amounts, and live preview.
- `src/components/WithdrawForm.jsx` - Form with validation, percentage chips, and confirmation modal.
- `src/components/TransactionList.jsx` - Searchable, filterable list iterating over transactions.
- `src/components/TransactionItem.jsx` - Distinct deposit/withdrawal transaction row component.

---

## 🏆 Bonus Tasks Implemented

1. **`useRef` Hook:** Automatically focuses on the amount input field upon page load and after submissions.
2. **Context API:** Centralized `BankContext.jsx` (`useBank`) to share live balance, account metadata, and transaction history seamlessly across all pages without prop-drilling.
3. **`localStorage` Persistence:** Account balance and transaction history are automatically persisted to `localStorage` so data remains intact even after refreshing the browser. A "Reset Demo" button is also provided in the navbar to reset to default state at any time.
4. **Withdrawal Confirmation Modal:** An interactive dialog confirms withdrawal details (holder, account number, deduction amount, and post-withdrawal remaining balance) before executing the transaction.

---

## 📂 Project Folder Structure

```text
bank-management/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Persistent navigation bar
│   │   ├── BalanceCard.jsx       # Reusable balance and metric cards
│   │   ├── DepositForm.jsx       # Deposit form with validation
│   │   ├── WithdrawForm.jsx      # Withdrawal form & confirmation modal
│   │   ├── TransactionList.jsx   # Filterable & searchable transaction ledger
│   │   └── TransactionItem.jsx   # Individual transaction item
│   ├── context/
│   │   └── BankContext.jsx       # Central state management & localStorage
│   ├── pages/
│   │   ├── Dashboard.jsx         # Main dashboard view
│   │   ├── Deposit.jsx           # Deposit page
│   │   ├── Withdraw.jsx          # Withdrawal page
│   │   └── Transactions.jsx      # Statement and transaction audit log
│   ├── App.jsx                   # Application router & footer layout
│   ├── main.jsx                  # React application entry point
│   └── index.css                 # Custom design system & luxury dark styling
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

Open your browser and navigate to `http://localhost:5173/` to view the application.

### 4. Building for Production
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
- **Vanilla CSS** (Custom Design Tokens, Glassmorphism, Micro-animations)

---

## 📄 License & Notes
This project was developed for the **Ostad React Assignment**. It is a frontend simulation; no real monetary transactions or banking APIs are connected.
