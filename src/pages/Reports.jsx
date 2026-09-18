import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useTransactions } from '../hooks/useTransactions'

import {
  getTotalIncome,
  getTotalExpenses,
  getAverageMonthlyIncome,
  getNetCashFlow,
  getIncomeByCategory,
  getExpensesByCategory,
  getMonthlyFinancialReport,
} from '../utils/finance'

import './Reports.css'

function Reports() {
  const { t } = useTranslation()

  const {
    transactions,
    loading,
    error,
  } = useTransactions()

  // -----------------------------
  // Report Filter
  // -----------------------------

  const [period, setPeriod] = useState('all')

  const [customStartDate, setCustomStartDate] =
    useState('')

  const [customEndDate, setCustomEndDate] =
    useState('')

  // -----------------------------
  // Get Date String
  // -----------------------------

  const formatDateForComparison = (date) => {
    const year = date.getFullYear()

    const month = String(
      date.getMonth() + 1
    ).padStart(2, '0')

    const day = String(
      date.getDate()
    ).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  // -----------------------------
  // Filter Transactions
  // -----------------------------

  const filteredTransactions = useMemo(() => {
    const today = new Date()

    const todayString =
      formatDateForComparison(today)

    let startDate = null
    let endDate = todayString

    // All Time
    if (period === 'all') {
      return transactions
    }

    // This Month
    if (period === 'this-month') {
      const start = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )

      startDate =
        formatDateForComparison(start)
    }

    // Last Month
    if (period === 'last-month') {
      const start = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      )

      const end = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      )

      startDate =
        formatDateForComparison(start)

      endDate =
        formatDateForComparison(end)
    }

    // Last 3 Months
    if (period === 'last-3-months') {
      const start = new Date(
        today.getFullYear(),
        today.getMonth() - 2,
        1
      )

      startDate =
        formatDateForComparison(start)
    }

    // This Year
    if (period === 'this-year') {
      const start = new Date(
        today.getFullYear(),
        0,
        1
      )

      startDate =
        formatDateForComparison(start)
    }

    // Custom Range
    if (period === 'custom') {
      if (
        !customStartDate ||
        !customEndDate
      ) {
        return []
      }

      startDate = customStartDate
      endDate = customEndDate
    }

    return transactions.filter(
      (transaction) => {
        if (!transaction.transaction_date) {
          return false
        }

        const transactionDate =
          transaction.transaction_date

        return (
          transactionDate >= startDate &&
          transactionDate <= endDate
        )
      }
    )
  }, [
    transactions,
    period,
    customStartDate,
    customEndDate,
  ])

  // -----------------------------
  // Financial Summary
  // -----------------------------

  const totalIncome =
    getTotalIncome(filteredTransactions)

  const totalExpenses =
    getTotalExpenses(filteredTransactions)

  const averageMonthlyIncome =
    getAverageMonthlyIncome(
      filteredTransactions
    )

  const netCashFlow =
    getNetCashFlow(filteredTransactions)

  // -----------------------------
  // Reports Data
  // -----------------------------

  const incomeByCategory =
    getIncomeByCategory(
      filteredTransactions
    )

  const expensesByCategory =
    getExpensesByCategory(
      filteredTransactions
    )

  const monthlyReport =
    getMonthlyFinancialReport(
      filteredTransactions
    )

  // -----------------------------
  // Category Maximums
  // -----------------------------

  const maxIncomeCategory =
    incomeByCategory.length > 0
      ? Math.max(
          ...incomeByCategory.map(
            (item) => item.amount
          )
        )
      : 0

  const maxExpenseCategory =
    expensesByCategory.length > 0
      ? Math.max(
          ...expensesByCategory.map(
            (item) => item.amount
          )
        )
      : 0

  // -----------------------------
  // Format Amount
  // -----------------------------

  const formatAmount = (amount) => {
    return `${Number(amount).toLocaleString(
      'en-US',
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    )} EGP`
  }

  // -----------------------------
  // Format Month
  // -----------------------------

  const formatMonth = (month) => {
    const [year, monthNumber] =
      month.split('-')

    return new Date(
      Number(year),
      Number(monthNumber) - 1,
      1
    ).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        year: 'numeric',
      }
    )
  }

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <div className="reports-page">

        <div className="reports-header">

          <h1>
            {t('reports.title')}
          </h1>

          <p>
            {t('reports.loading')}
          </p>

        </div>

      </div>
    )
  }

  // -----------------------------
  // Error
  // -----------------------------

  if (error) {
    return (
      <div className="reports-page">

        <div className="reports-header">

          <h1>
            {t('reports.title')}
          </h1>

          <div className="reports-error">
            {error.message}
          </div>

        </div>

      </div>
    )
  }

  return (
    <div className="reports-page">

      {/* Header */}

      <div className="reports-header">

        <div>

          <h1>
            {t('reports.title')}
          </h1>

          <p>
            {t('reports.subtitle')}
          </p>

        </div>

      </div>

      {/* Period Filter */}

      <div className="reports-filter">

        <div className="reports-filter-field">

          <label htmlFor="report-period">
            {t('reports.period')}
          </label>

          <select
            id="report-period"
            value={period}
            onChange={(event) =>
              setPeriod(event.target.value)
            }
          >

            <option value="all">
              {t('reports.allTime')}
            </option>

            <option value="this-month">
              {t('reports.thisMonth')}
            </option>

            <option value="last-month">
              {t('reports.lastMonth')}
            </option>

            <option value="last-3-months">
              {t('reports.lastThreeMonths')}
            </option>

            <option value="this-year">
              {t('reports.thisYear')}
            </option>

            <option value="custom">
              {t('reports.customRange')}
            </option>

          </select>

        </div>

        {period === 'custom' && (

          <div className="custom-date-fields">

            <div className="reports-filter-field">

              <label htmlFor="start-date">
                {t('reports.from')}
              </label>

              <input
                id="start-date"
                type="date"
                value={customStartDate}
                onChange={(event) =>
                  setCustomStartDate(
                    event.target.value
                  )
                }
              />

            </div>

            <div className="reports-filter-field">

              <label htmlFor="end-date">
                {t('reports.to')}
              </label>

              <input
                id="end-date"
                type="date"
                value={customEndDate}
                min={
                  customStartDate ||
                  undefined
                }
                onChange={(event) =>
                  setCustomEndDate(
                    event.target.value
                  )
                }
              />

            </div>

          </div>

        )}

      </div>

      {/* Financial Summary */}

      <div className="reports-summary">

        <div className="report-summary-card">

          <span>
            {t('reports.totalIncome')}
          </span>

          <h2>
            {formatAmount(totalIncome)}
          </h2>

        </div>

        <div className="report-summary-card">

          <span>
            {t('reports.totalExpenses')}
          </span>

          <h2>
            {formatAmount(totalExpenses)}
          </h2>

        </div>

        <div className="report-summary-card">

          <span>
            {t('reports.netCashFlow')}
          </span>

          <h2
            className={
              netCashFlow >= 0
                ? 'positive'
                : 'negative'
            }
          >

            {netCashFlow >= 0
              ? '+'
              : '-'}

            {formatAmount(
              Math.abs(netCashFlow)
            )}

          </h2>

        </div>

        <div className="report-summary-card">

          <span>
            {t(
              'reports.averageMonthlyIncome'
            )}
          </span>

          <h2>
            {formatAmount(
              averageMonthlyIncome
            )}
          </h2>

        </div>

      </div>

      {/* Category Reports */}

      <div className="category-reports">

        {/* Income By Category */}

        <div className="report-card">

          <div className="report-card-header">

            <div>

              <h2>
                {t(
                  'reports.incomeByCategory'
                )}
              </h2>

              <p>
                {t(
                  'reports.incomeBreakdown'
                )}
              </p>

            </div>

          </div>

          {incomeByCategory.length === 0 ? (

            <div className="empty-report">
              {t(
                'reports.noIncomeData'
              )}
            </div>

          ) : (

            <div className="category-list">

              {incomeByCategory.map(
                ({
                  category,
                  amount,
                }) => {

                  const percentage =
                    maxIncomeCategory > 0
                      ? (amount /
                          maxIncomeCategory) *
                        100
                      : 0

                  return (
                    <div
                      key={category}
                      className="category-item"
                    >

                      <div className="category-info">

                        <span>
                          {category}
                        </span>

                        <strong>
                          {formatAmount(amount)}
                        </strong>

                      </div>

                      <div className="category-progress">

                        <div
                          className="category-progress-fill income-progress"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  )
                }
              )}

            </div>

          )}

        </div>

        {/* Expenses By Category */}

        <div className="report-card">

          <div className="report-card-header">

            <div>

              <h2>
                {t(
                  'reports.expensesByCategory'
                )}
              </h2>

              <p>
                {t(
                  'reports.expensesBreakdown'
                )}
              </p>

            </div>

          </div>

          {expensesByCategory.length === 0 ? (

            <div className="empty-report">
              {t(
                'reports.noExpenseData'
              )}
            </div>

          ) : (

            <div className="category-list">

              {expensesByCategory.map(
                ({
                  category,
                  amount,
                }) => {

                  const percentage =
                    maxExpenseCategory > 0
                      ? (amount /
                          maxExpenseCategory) *
                        100
                      : 0

                  return (
                    <div
                      key={category}
                      className="category-item"
                    >

                      <div className="category-info">

                        <span>
                          {category}
                        </span>

                        <strong>
                          {formatAmount(amount)}
                        </strong>

                      </div>

                      <div className="category-progress">

                        <div
                          className="category-progress-fill expense-progress"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  )
                }
              )}

            </div>

          )}

        </div>

      </div>

      {/* Monthly Financial Report */}

      <div className="report-card monthly-report">

        <div className="report-card-header">

          <div>

            <h2>
              {t(
                'reports.monthlyFinancialReport'
              )}
            </h2>

            <p>
              {t(
                'reports.monthlyReportDescription'
              )}
            </p>

          </div>

        </div>

        {monthlyReport.length === 0 ? (

          <div className="empty-report">
            {t(
              'reports.noFinancialData'
            )}
          </div>

        ) : (

          <div className="monthly-table-wrapper">

            <table className="monthly-report-table">

              <thead>

                <tr>

                  <th>
                    {t('reports.month')}
                  </th>

                  <th>
                    {t('reports.income')}
                  </th>

                  <th>
                    {t('reports.expenses')}
                  </th>

                  <th>
                    {t(
                      'reports.netCashFlow'
                    )}
                  </th>

                </tr>

              </thead>

              <tbody>

                {monthlyReport.map(
                  ({
                    month,
                    income,
                    expenses,
                    net,
                  }) => (

                    <tr
                      key={month}
                    >

                      <td>
                        <strong>
                          {formatMonth(month)}
                        </strong>
                      </td>

                      <td className="income">
                        +{formatAmount(income)}
                      </td>

                      <td className="expense">
                        -{formatAmount(expenses)}
                      </td>

                      <td
                        className={
                          net >= 0
                            ? 'income'
                            : 'expense'
                        }
                      >

                        {net >= 0
                          ? '+'
                          : '-'}

                        {formatAmount(
                          Math.abs(net)
                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  )
}

export default Reports