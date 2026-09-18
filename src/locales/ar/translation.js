const ar = {
  translation: {
    // =============================
    // Dashboard
    // =============================

    dashboard: {
      title: 'لوحة التحكم',
      subtitle: 'نظرة عامة على وضعك المالي.',

      income: 'الدخل',
      expenses: 'المصروفات',
      netIncome: 'صافي الدخل',
      currentBalance: 'الرصيد الحالي',
      moneyOutstanding: 'المبالغ المستحقة لك',
      youOwe: 'المبالغ المستحقة عليك',

      selectedPeriod: 'الفترة المحددة',
      allAccounts: 'كل الحسابات',
      unpaidIncome: 'الدخل غير المحصل',
      unpaidDebts: 'الديون غير المسددة',

      period: 'الفترة',
      incomeVsExpenses: 'الدخل مقابل المصروفات',
      topExpenseCategories:
        'أعلى فئات المصروفات',
      incomeSources: 'مصادر الدخل',
      recentTransactions: 'أحدث المعاملات',

      viewAll: 'عرض الكل',
      noTransactions: 'لا توجد معاملات حتى الآن.',
      noData: 'لا توجد بيانات.',
      nothingOutstanding:
        'لا توجد مبالغ مستحقة. تم تحصيل كل شيء.',
      stillToCollect: 'متبقي للتحصيل.',

      total: 'الإجمالي',
      paid: 'المدفوع',
      remaining: 'المتبقي',

      addTransaction: 'إضافة معاملة',

      totalBalance: 'إجمالي الرصيد',
      totalIncome: 'إجمالي الدخل',
      totalExpenses: 'إجمالي المصروفات',
      totalDebts: 'إجمالي الديون',

      averageMonthlyIncome:
        'متوسط الدخل الشهري',

      moneyOwedToYou:
        'المبالغ المستحقة لك',

      moneyYouOwe:
        'المبالغ المستحقة عليك',

      latestFinancialActivity:
        'أحدث نشاط مالي لك.',

      description: 'الوصف',
      category: 'الفئة',
      date: 'التاريخ',
      amount: 'المبلغ',

      monthlyIncome: 'الدخل الشهري',

      monthlyIncomeDescription:
        'الدخل المدفوع لكل شهر.',

      loadingMonthlyIncome:
        'جاري تحميل الدخل الشهري...',

      noIncomeData:
        'لا توجد بيانات دخل حتى الآن.',

      incomeVsExpensesDescription:
        'مقارنة الدخل والمصروفات المدفوعة لكل شهر.',

      loadingIncomeExpenses:
        'جاري تحميل الدخل والمصروفات...',

      noIncomeExpenseData:
        'لا توجد بيانات دخل أو مصروفات حتى الآن.',
        loading: 'جاري التحميل...',
    },

    // =============================
    // Navigation
    // =============================

    navigation: {
      dashboard: 'لوحة التحكم',
      accounts: 'الحسابات',
      transactions: 'المعاملات',
      categories: 'الفئات',
      debts: 'الديون',
      reports: 'التقارير',
      settings: 'الإعدادات',
    },

    // =============================
    // Reports
    // =============================

    reports: {
      title: 'التقارير',

      subtitle:
        'اعرض وحلل نشاطك المالي.',

      loading:
        'جاري تحميل التقارير...',

      period: 'الفترة',

      allTime: 'كل الوقت',
      thisMonth: 'هذا الشهر',
      lastMonth: 'الشهر الماضي',
      lastThreeMonths: 'آخر 3 شهور',
      thisYear: 'هذا العام',
      customRange: 'فترة مخصصة',

      from: 'من',
      to: 'إلى',

      totalIncome: 'إجمالي الدخل',
      totalExpenses: 'إجمالي المصروفات',
      netCashFlow: 'صافي التدفق النقدي',

      averageMonthlyIncome:
        'متوسط الدخل الشهري',

      incomeByCategory:
        'الدخل حسب الفئة',

      incomeBreakdown:
        'تفصيل الدخل حسب الفئات.',

      expensesByCategory:
        'المصروفات حسب الفئة',

      expensesBreakdown:
        'تفصيل المصروفات حسب الفئات.',

      monthlyFinancialReport:
        'التقرير المالي الشهري',

      monthlyReportDescription:
        'الدخل والمصروفات وصافي التدفق النقدي لكل شهر.',

      month: 'الشهر',
      income: 'الدخل',
      expenses: 'المصروفات',

      noIncomeData:
        'لا توجد بيانات دخل خلال هذه الفترة.',

      noExpenseData:
        'لا توجد بيانات مصروفات خلال هذه الفترة.',

      noFinancialData:
        'لا توجد بيانات مالية خلال هذه الفترة.',

      uncategorized: 'غير مصنف',
    },
    // Transactions
    transactions: {
  title: 'المعاملات',
  subtitle: 'إدارة الدخل والمصروفات الخاصة بك.',

  addTransaction: 'إضافة معاملة',
  recentTransactions: 'أحدث المعاملات',

  type: 'النوع',
  income: 'دخل',
  expense: 'مصروف',

  titleLabel: 'العنوان',
  titlePlaceholder: 'مثال: مشروع Shopify',

  category: 'الفئة',
  loadingCategories: 'جاري تحميل الفئات...',
  selectCategory: 'اختر الفئة',

  paidIntoAccount: 'تم الدفع إلى الحساب',
  paidFromAccount: 'تم الدفع من الحساب',

  loadingAccounts: 'جاري تحميل الحسابات...',
  selectAccount: 'اختر الحساب',

  totalAmount: 'إجمالي المبلغ',
  paidAmount: 'المبلغ المدفوع',
  outstanding: 'المبلغ المتبقي',

  whoOwesYou: 'مين عليه الفلوس؟',
  whoDoYouOwe: 'مين أنت عليك الفلوس؟',

  owedYouPlaceholder: 'مثال: شركة ABC',
  owePlaceholder: 'مثال: محل اللابتوب',

  date: 'التاريخ',
  notes: 'ملاحظات',
  notesPlaceholder: 'ملاحظات اختيارية...',

  creating: 'جاري الإنشاء...',
  createTransaction: 'إنشاء المعاملة',

  transactionCreated:
    'تم إنشاء المعاملة بنجاح.',

  loadingTransactions:
    'جاري تحميل المعاملات...',

  noTransactions:
    'لا توجد معاملات حتى الآن.',

  edit: 'تعديل',
  delete: 'حذف',

  deleting: 'جاري الحذف...',

  transactionUpdated:
    'تم تعديل المعاملة بنجاح.',

  transactionDeleted:
    'تم حذف المعاملة بنجاح.',

  editTransaction: 'تعديل المعاملة',

  saving: 'جاري الحفظ...',
  saveChanges: 'حفظ التغييرات',
  cancel: 'إلغاء',

  confirmDelete:
    'هل أنت متأكد أنك تريد حذف هذه المعاملة؟',

  owesYou: 'مستحق لك:',
  youOwe: 'مستحق عليك:',
  account: 'الحساب',
  total: 'الإجمالي',
  paid: 'المدفوع',
  dateLabel: 'التاريخ',
  notesLabel: 'ملاحظات',

  pleaseEnterTitle:
    'من فضلك اكتب عنوان المعاملة.',

  pleaseSelectAccount:
    'من فضلك اختر الحساب.',

  pleaseSelectCategory:
    'من فضلك اختر الفئة.',

  pleaseEnterTotal:
    'من فضلك اكتب إجمالي المبلغ.',

  invalidTotal:
    'من فضلك اكتب إجمالي مبلغ صحيح.',

  invalidPaid:
    'من فضلك اكتب مبلغ مدفوع صحيح.',

  paidGreaterThanTotal:
    'المبلغ المدفوع لا يمكن أن يكون أكبر من إجمالي المبلغ.',

  pleaseEnterWhoOwesYou:
    'من فضلك اكتب اسم الشخص أو الجهة المستحقة عليك.',

  pleaseEnterWhoYouOwe:
    'من فضلك اكتب اسم الشخص أو الجهة المستحقة لك.',
},

// Debts

debts: {
  title: 'الديون',
  subtitle: 'تابع المبالغ المستحقة عليك والمبالغ المستحقة لك.',
  loading: 'جاري تحميل الديون...',
  moneyOwedToYou: 'المبالغ المستحقة لك',
  moneyYouOwe: 'المبالغ المستحقة عليك',
  totalOutstanding: 'إجمالي المبالغ المستحقة',
  receivablesDescription: 'دخل لم يتم تحصيله بالكامل.',
  payablesDescription: 'مصروفات لم يتم دفعها بالكامل.',
  noReceivables: 'لا توجد مبالغ مستحقة لك.',
  noPayables: 'لا توجد مبالغ مستحقة عليك.',
  personCompany: 'الشخص / الشركة',
  transaction: 'المعاملة',
  total: 'الإجمالي',
  paid: 'المدفوع',
  remaining: 'المتبقي',
  date: 'التاريخ',
},
// Accounts
accounts: {
  title: 'الحسابات',
  subtitle: 'إدارة حساباتك.',
  addAccount: 'إضافة حساب',
  accountName: 'اسم الحساب',
  namePlaceholder: 'مثال: كاش',
  accountType: 'نوع الحساب',
  cash: 'كاش',
  bank: 'بنك',
  wallet: 'محفظة',
  savings: 'توفير',
  currency: 'العملة',
  creating: 'جاري الإنشاء...',
  createAccount: 'إنشاء الحساب',
  accountCreated: 'تم إنشاء الحساب بنجاح.',
  yourAccounts: 'حساباتك',
  loading: 'جاري تحميل الحسابات...',
  noAccounts: 'لا توجد حسابات حتى الآن.',
  type: 'النوع',
  balance: 'الرصيد',
  edit: 'تعديل',
  delete: 'حذف',
  deleting: 'جاري الحذف...',
  editAccount: 'تعديل الحساب',
  saving: 'جاري الحفظ...',
  saveChanges: 'حفظ التغييرات',
  cancel: 'إلغاء',
  accountUpdated: 'تم تحديث الحساب بنجاح.',
  accountDeleted: 'تم حذف الحساب بنجاح.',
  confirmDelete: 'هل أنت متأكد أنك تريد حذف "{{name}}"؟',
  pleaseEnterName: 'من فضلك اكتب اسم الحساب.',
  pleaseEnterBalance: 'من فضلك اكتب الرصيد.',
  invalidBalance: 'من فضلك اكتب رصيد صحيح.',
  types: {
    cash: 'كاش',
    bank: 'بنك',
    wallet: 'محفظة',
    savings: 'توفير',
  },
},
// Categories
categories: {
  title: 'الفئات',
  subtitle: 'إدارة فئات الدخل والمصروفات الخاصة بك.',
  addCategory: 'إضافة فئة',
  categoryName: 'اسم الفئة',
  namePlaceholder: 'مثال: العمل الحر',
  categoryType: 'نوع الفئة',
  income: 'دخل',
  expense: 'مصروف',
  creating: 'جاري الإنشاء...',
  createCategory: 'إنشاء الفئة',
  categoryCreated: 'تم إنشاء الفئة بنجاح.',
  yourCategories: 'فئاتك',
  loading: 'جاري تحميل الفئات...',
  noCategories: 'لا توجد فئات حتى الآن.',
  type: 'النوع',
  edit: 'تعديل',
  delete: 'حذف',
  deleting: 'جاري الحذف...',
  editCategory: 'تعديل الفئة',
  saving: 'جاري الحفظ...',
  saveChanges: 'حفظ التغييرات',
  cancel: 'إلغاء',
  categoryUpdated: 'تم تحديث الفئة بنجاح.',
  categoryDeleted: 'تم حذف الفئة بنجاح.',
  confirmDelete: 'هل أنت متأكد أنك تريد حذف "{{name}}"؟',
  pleaseEnterName: 'من فضلك اكتب اسم الفئة.',
},
    // =============================
    // Settings
    // =============================

    settings: {
      title: 'الإعدادات',

      profile: 'الملف الشخصي',
      security: 'الأمان',
      account: 'الحساب',

      language: 'اللغة',

      fullName: 'الاسم بالكامل',

      fullNamePlaceholder:
        'اكتب اسمك بالكامل',

      email: 'البريد الإلكتروني',
      role: 'الصلاحية',

      saveChanges: 'حفظ التغييرات',
      saving: 'جاري الحفظ...',

      profileUpdated:
        'تم تحديث الملف الشخصي بنجاح.',

      currentPassword:
        'كلمة المرور الحالية',

      currentPasswordPlaceholder:
        'اكتب كلمة المرور الحالية',

      newPassword:
        'كلمة المرور الجديدة',

      newPasswordPlaceholder:
        'اكتب كلمة المرور الجديدة',

      confirmNewPassword:
        'تأكيد كلمة المرور الجديدة',

      confirmNewPasswordPlaceholder:
        'أعد كتابة كلمة المرور الجديدة',

      changePassword:
        'تغيير كلمة المرور',

      updating: 'جاري التحديث...',

      passwordUpdated:
        'تم تحديث كلمة المرور بنجاح.',

      currentPasswordRequired:
        'من فضلك اكتب كلمة المرور الحالية.',

      newPasswordRequired:
        'من فضلك اكتب كلمة المرور الجديدة.',

      passwordMinLength:
        'يجب أن تكون كلمة المرور 6 أحرف على الأقل.',

      passwordsDoNotMatch:
        'كلمتا المرور غير متطابقتين.',

      passwordMustBeDifferent:
        'يجب أن تكون كلمة المرور الجديدة مختلفة عن الحالية.',

      currentPasswordIncorrect:
        'كلمة المرور الحالية غير صحيحة.',

      logout: 'تسجيل الخروج',
    },
  },
}

export default ar