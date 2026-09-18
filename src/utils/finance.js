export const getTotalIncome = (transactions) => {
  return transactions
    .filter(
      (transaction) =>
        transaction.type === 'income'
    )
    .reduce(
      (total, transaction) =>
        total +
        Number(transaction.paid_amount || 0),
      0
    )
}

export const getTotalExpenses = (transactions) => {
  return transactions
    .filter(
      (transaction) =>
        transaction.type === 'expense'
    )
    .reduce(
      (total, transaction) =>
        total +
        Number(transaction.paid_amount || 0),
      0
    )
}

export const getTotalBalance = (accounts) => {
  return accounts.reduce(
    (total, account) =>
      total +
      Number(account.balance || 0),
    0
  )
}

export const getReceivables = (transactions) => {
  return transactions
    .filter(
      (transaction) =>
        transaction.type === 'income' &&
        Number(transaction.total_amount || 0) >
          Number(transaction.paid_amount || 0)
    )
    .reduce(
      (total, transaction) =>
        total +
        (
          Number(transaction.total_amount || 0) -
          Number(transaction.paid_amount || 0)
        ),
      0
    )
}

export const getPayables = (transactions) => {
  return transactions
    .filter(
      (transaction) =>
        transaction.type === 'expense' &&
        Number(transaction.total_amount || 0) >
          Number(transaction.paid_amount || 0)
    )
    .reduce(
      (total, transaction) =>
        total +
        (
          Number(transaction.total_amount || 0) -
          Number(transaction.paid_amount || 0)
        ),
      0
    )
}

export const getMonthlyIncome = (transactions) => {
  const monthlyIncome = {}

  transactions
    .filter(
      (transaction) =>
        transaction.type === 'income'
    )
    .forEach((transaction) => {
      const amount = Number(
        transaction.paid_amount || 0
      )

      if (!transaction.transaction_date) {
        return
      }

      const month =
        transaction.transaction_date.slice(0, 7)

      if (!monthlyIncome[month]) {
        monthlyIncome[month] = 0
      }

      monthlyIncome[month] += amount
    })

  return Object.entries(monthlyIncome)
    .sort(([monthA], [monthB]) =>
      monthA.localeCompare(monthB)
    )
    .map(([month, amount]) => ({
      month,
      amount,
    }))
}

export const getAverageMonthlyIncome = (
  transactions
) => {
  const monthlyIncome =
    getMonthlyIncome(transactions)

  if (monthlyIncome.length === 0) {
    return 0
  }

  const totalIncome =
    monthlyIncome.reduce(
      (total, month) =>
        total + month.amount,
      0
    )

  return (
    totalIncome /
    monthlyIncome.length
  )
}

export const getMonthlyIncomeVsExpenses = (
  transactions
) => {
  const monthlyData = {}

  transactions.forEach((transaction) => {
    if (!transaction.transaction_date) {
      return
    }

    const month =
      transaction.transaction_date.slice(0, 7)

    const amount = Number(
      transaction.paid_amount || 0
    )

    if (!monthlyData[month]) {
      monthlyData[month] = {
        income: 0,
        expenses: 0,
      }
    }

    if (transaction.type === 'income') {
      monthlyData[month].income += amount
    }

    if (transaction.type === 'expense') {
      monthlyData[month].expenses += amount
    }
  })

  return Object.entries(monthlyData)
    .sort(([monthA], [monthB]) =>
      monthA.localeCompare(monthB)
    )
    .map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
    }))
}

export const getNetCashFlow = (transactions) => {
  const totalIncome =
    getTotalIncome(transactions)

  const totalExpenses =
    getTotalExpenses(transactions)

  return totalIncome - totalExpenses
}

export const getIncomeByCategory = (
  transactions
) => {
  const categoryData = {}

  transactions
    .filter(
      (transaction) =>
        transaction.type === 'income'
    )
    .forEach((transaction) => {
      const categoryName =
        transaction.categories?.name ||
        'Uncategorized'

      const amount = Number(
        transaction.paid_amount || 0
      )

      if (!categoryData[categoryName]) {
        categoryData[categoryName] = 0
      }

      categoryData[categoryName] += amount
    })

  return Object.entries(categoryData)
    .sort(([, amountA], [, amountB]) =>
      amountB - amountA
    )
    .map(([category, amount]) => ({
      category,
      amount,
    }))
}

export const getExpensesByCategory = (
  transactions
) => {
  const categoryData = {}

  transactions
    .filter(
      (transaction) =>
        transaction.type === 'expense'
    )
    .forEach((transaction) => {
      const categoryName =
        transaction.categories?.name ||
        'Uncategorized'

      const amount = Number(
        transaction.paid_amount || 0
      )

      if (!categoryData[categoryName]) {
        categoryData[categoryName] = 0
      }

      categoryData[categoryName] += amount
    })

  return Object.entries(categoryData)
    .sort(([, amountA], [, amountB]) =>
      amountB - amountA
    )
    .map(([category, amount]) => ({
      category,
      amount,
    }))
}

export const getMonthlyFinancialReport = (
  transactions
) => {
  const monthlyData = {}

  transactions.forEach((transaction) => {
    if (!transaction.transaction_date) {
      return
    }

    const month =
      transaction.transaction_date.slice(0, 7)

    const amount = Number(
      transaction.paid_amount || 0
    )

    if (!monthlyData[month]) {
      monthlyData[month] = {
        income: 0,
        expenses: 0,
      }
    }

    if (transaction.type === 'income') {
      monthlyData[month].income += amount
    }

    if (transaction.type === 'expense') {
      monthlyData[month].expenses += amount
    }
  })

  return Object.entries(monthlyData)
    .sort(([monthA], [monthB]) =>
      monthA.localeCompare(monthB)
    )
    .map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
      net:
        data.income -
        data.expenses,
    }))
}