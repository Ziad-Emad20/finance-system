const en = {
  translation: {
    // =============================
    // Dashboard
    // =============================

    dashboard: {
      title: 'Dashboard',
      subtitle: 'Here’s an overview of your finances.',

      income: 'Income',
      expenses: 'Expenses',
      netIncome: 'Net Income',
      currentBalance: 'Current Balance',
      moneyOutstanding: 'Money Outstanding',
      youOwe: 'You Owe',

      selectedPeriod: 'Selected period',
      allAccounts: 'All accounts',
      unpaidIncome: 'Unpaid income',
      unpaidDebts: 'Unpaid debts',

      period: 'Period',
      incomeVsExpenses: 'Income vs Expenses',
      topExpenseCategories: 'Top Expense Categories',
      incomeSources: 'Income Sources',
      recentTransactions: 'Recent Transactions',

      viewAll: 'View all',
      noTransactions: 'No transactions yet.',
      noData: 'No data.',
      nothingOutstanding:
        'Nothing outstanding. Everything is collected.',
      stillToCollect: 'still to collect.',

      total: 'Total',
      paid: 'Paid',
      remaining: 'Remaining',

      addTransaction: 'Add Transaction',

      totalBalance: 'Total Balance',
      totalIncome: 'Total Income',
      totalExpenses: 'Total Expenses',
      totalDebts: 'Total Debts',

      averageMonthlyIncome:
        'Average Monthly Income',

      moneyOwedToYou: 'Money Owed to You',
      moneyYouOwe: 'Money You Owe',

      latestFinancialActivity:
        'Your latest financial activity.',

      description: 'Description',
      category: 'Category',
      date: 'Date',
      amount: 'Amount',

      monthlyIncome: 'Monthly Income',
      monthlyIncomeDescription:
        'Your paid income by month.',
      loadingMonthlyIncome:
        'Loading monthly income...',
      noIncomeData:
        'No income data yet.',

      incomeVsExpensesDescription:
        'Compare your paid income and expenses by month.',
      loadingIncomeExpenses:
        'Loading income and expenses...',
      noIncomeExpenseData:
        'No income or expense data yet.',
        loading: 'Loading...',
    },

    // =============================
    // Navigation
    // =============================

    navigation: {
      dashboard: 'Dashboard',
      accounts: 'Accounts',
      transactions: 'Transactions',
      categories: 'Categories',
      debts: 'Debts',
      reports: 'Reports',
      settings: 'Settings',
    },

    // =============================
    // Reports
    // =============================

    reports: {
      title: 'Reports',
      subtitle:
        'View and analyze your financial activity.',

      loading: 'Loading reports...',

      period: 'Period',

      allTime: 'All Time',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      lastThreeMonths: 'Last 3 Months',
      thisYear: 'This Year',
      customRange: 'Custom Range',

      from: 'From',
      to: 'To',

      totalIncome: 'Total Income',
      totalExpenses: 'Total Expenses',
      netCashFlow: 'Net Cash Flow',
      averageMonthlyIncome:
        'Average Monthly Income',

      incomeByCategory:
        'Income by Category',
      incomeBreakdown:
        'Breakdown of your income.',

      expensesByCategory:
        'Expenses by Category',
      expensesBreakdown:
        'Breakdown of your expenses.',

      monthlyFinancialReport:
        'Monthly Financial Report',

      monthlyReportDescription:
        'Monthly income, expenses and net cash flow.',

      month: 'Month',
      income: 'Income',
      expenses: 'Expenses',

      noIncomeData:
        'No income data for this period.',
      noExpenseData:
        'No expense data for this period.',
      noFinancialData:
        'No financial data for this period.',

      uncategorized: 'Uncategorized',
    },
    // Transactions
    transactions: {
  title: 'Transactions',
  subtitle: 'Manage your income and expenses.',

  addTransaction: 'Add Transaction',
  recentTransactions: 'Recent Transactions',

  type: 'Type',
  income: 'Income',
  expense: 'Expense',

  titleLabel: 'Title',
  titlePlaceholder: 'e.g. Shopify Project',

  category: 'Category',
  loadingCategories: 'Loading categories...',
  selectCategory: 'Select category',

  paidIntoAccount: 'Paid Into Account',
  paidFromAccount: 'Paid From Account',

  loadingAccounts: 'Loading accounts...',
  selectAccount: 'Select account',

  totalAmount: 'Total Amount',
  paidAmount: 'Paid Amount',
  outstanding: 'Outstanding',

  whoOwesYou: 'Who owes you?',
  whoDoYouOwe: 'Who do you owe?',

  owedYouPlaceholder: 'e.g. ABC Company',
  owePlaceholder: 'e.g. Laptop Store',

  date: 'Date',
  notes: 'Notes',
  notesPlaceholder: 'Optional notes...',

  creating: 'Creating...',
  createTransaction: 'Create Transaction',

  transactionCreated:
    'Transaction created successfully.',

  loadingTransactions:
    'Loading transactions...',

  noTransactions:
    'No transactions yet.',

  edit: 'Edit',
  delete: 'Delete',

  deleting: 'Deleting...',

  transactionUpdated:
    'Transaction updated successfully.',

  transactionDeleted:
    'Transaction deleted successfully.',

  editTransaction: 'Edit Transaction',

  saving: 'Saving...',
  saveChanges: 'Save Changes',
  cancel: 'Cancel',

  confirmDelete:
    'Are you sure you want to delete this transaction?',

  owesYou: 'Owes you:',
  youOwe: 'You owe:',
  account: 'Account',
  total: 'Total',
  paid: 'Paid',
  dateLabel: 'Date',
  notesLabel: 'Notes',

  pleaseEnterTitle:
    'Please enter a transaction title.',

  pleaseSelectAccount:
    'Please select an account.',

  pleaseSelectCategory:
    'Please select a category.',

  pleaseEnterTotal:
    'Please enter the total amount.',

  invalidTotal:
    'Please enter a valid total amount.',

  invalidPaid:
    'Please enter a valid paid amount.',

  paidGreaterThanTotal:
    'Paid amount cannot be greater than total amount.',

  pleaseEnterWhoOwesYou:
    'Please enter who owes you.',

  pleaseEnterWhoYouOwe:
    'Please enter who you owe.',
},
// Debts
debts: {
  title: 'Debts',
  subtitle: 'Track money you owe and money owed to you.',
  loading: 'Loading debts...',
  moneyOwedToYou: 'Money Owed to You',
  moneyYouOwe: 'Money You Owe',
  totalOutstanding: 'Total Outstanding',
  receivablesDescription: 'Income that has not been fully collected.',
  payablesDescription: 'Expenses that have not been fully paid.',
  noReceivables: 'No outstanding receivables.',
  noPayables: 'No outstanding payables.',
  personCompany: 'Person / Company',
  transaction: 'Transaction',
  total: 'Total',
  paid: 'Paid',
  remaining: 'Remaining',
  date: 'Date',
},
// Accounts
accounts: {
  title: 'Accounts',
  subtitle: 'Manage your accounts.',
  addAccount: 'Add Account',
  accountName: 'Account Name',
  namePlaceholder: 'e.g. Cash',
  accountType: 'Account Type',
  cash: 'Cash',
  bank: 'Bank',
  wallet: 'Wallet',
  savings: 'Savings',
  currency: 'Currency',
  creating: 'Creating...',
  createAccount: 'Create Account',
  accountCreated: 'Account created successfully.',
  yourAccounts: 'Your Accounts',
  loading: 'Loading accounts...',
  noAccounts: 'No accounts yet.',
  type: 'Type',
  balance: 'Balance',
  edit: 'Edit',
  delete: 'Delete',
  deleting: 'Deleting...',
  editAccount: 'Edit Account',
  saving: 'Saving...',
  saveChanges: 'Save Changes',
  cancel: 'Cancel',
  accountUpdated: 'Account updated successfully.',
  accountDeleted: 'Account deleted successfully.',
  confirmDelete: 'Are you sure you want to delete "{{name}}"?',
  pleaseEnterName: 'Please enter an account name.',
  pleaseEnterBalance: 'Please enter a balance.',
  invalidBalance: 'Please enter a valid balance.',
  types: {
    cash: 'Cash',
    bank: 'Bank',
    wallet: 'Wallet',
    savings: 'Savings',
  },
},
// Categories
categories: {
  title: 'Categories',
  subtitle: 'Manage your income and expense categories.',
  addCategory: 'Add Category',
  categoryName: 'Category Name',
  namePlaceholder: 'e.g. Freelancing',
  categoryType: 'Category Type',
  income: 'Income',
  expense: 'Expense',
  creating: 'Creating...',
  createCategory: 'Create Category',
  categoryCreated: 'Category created successfully.',
  yourCategories: 'Your Categories',
  loading: 'Loading categories...',
  noCategories: 'No categories yet.',
  type: 'Type',
  edit: 'Edit',
  delete: 'Delete',
  deleting: 'Deleting...',
  editCategory: 'Edit Category',
  saving: 'Saving...',
  saveChanges: 'Save Changes',
  cancel: 'Cancel',
  categoryUpdated: 'Category updated successfully.',
  categoryDeleted: 'Category deleted successfully.',
  confirmDelete: 'Are you sure you want to delete "{{name}}"?',
  pleaseEnterName: 'Please enter a category name.',
},

    // =============================
    // Settings
    // =============================

    settings: {
      title: 'Settings',

      profile: 'Profile',
      security: 'Security',
      account: 'Account',

      language: 'Language',

      fullName: 'Full Name',
      fullNamePlaceholder:
        'Enter your full name',

      email: 'Email',
      role: 'Role',

      saveChanges: 'Save Changes',
      saving: 'Saving...',

      profileUpdated:
        'Profile updated successfully.',

      currentPassword: 'Current Password',
      currentPasswordPlaceholder:
        'Enter current password',

      newPassword: 'New Password',
      newPasswordPlaceholder:
        'Enter new password',

      confirmNewPassword:
        'Confirm New Password',

      confirmNewPasswordPlaceholder:
        'Confirm new password',

      changePassword: 'Change Password',
      updating: 'Updating...',

      passwordUpdated:
        'Password updated successfully.',

      currentPasswordRequired:
        'Please enter your current password.',

      newPasswordRequired:
        'Please enter a new password.',

      passwordMinLength:
        'Password must be at least 6 characters.',

      passwordsDoNotMatch:
        'Passwords do not match.',

      passwordMustBeDifferent:
        'New password must be different from your current password.',

      currentPasswordIncorrect:
        'Current password is incorrect.',

      logout: 'Logout',
    },
  },
}

export default en