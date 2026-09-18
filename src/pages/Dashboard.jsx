import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  BarChart3,
  HandCoins,
  CreditCard,
  Plus,
} from 'lucide-react'

import { useAccounts } from '../hooks/useAccounts'
import { useTransactions } from '../hooks/useTransactions'

import {
  getTotalIncome,
  getTotalExpenses,
  getTotalBalance,
  getReceivables,
  getPayables,
  getAverageMonthlyIncome,
  getMonthlyIncome,
  getMonthlyIncomeVsExpenses,
} from '../utils/finance'

import './Dashboard.css'

function Dashboard() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const {
    accounts,
    loading: accountsLoading,
    error: accountsError,
  } = useAccounts()

  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
  } = useTransactions()

  // -----------------------------
  // Loading / Errors
  // -----------------------------

  const loading =
    accountsLoading || transactionsLoading

  const error =
    accountsError || transactionsError

  // -----------------------------
  // Financial Calculations
  // -----------------------------

  const totalBalance =
    getTotalBalance(accounts)

  const totalIncome =
    getTotalIncome(transactions)

  const totalExpenses =
    getTotalExpenses(transactions)

  const receivables =
    getReceivables(transactions)

  const payables =
    getPayables(transactions)

  const averageMonthlyIncome =
    getAverageMonthlyIncome(transactions)

  const monthlyIncome =
    getMonthlyIncome(transactions)

  const monthlyIncomeVsExpenses =
    getMonthlyIncomeVsExpenses(transactions)

  // -----------------------------
  // Monthly Income Chart
  // -----------------------------

  const maxMonthlyIncome =
    monthlyIncome.length > 0
      ? Math.max(
          ...monthlyIncome.map(
            (item) => item.amount
          )
        )
      : 0

  // -----------------------------
  // Income vs Expenses Chart
  // -----------------------------

  const maxIncomeVsExpenses =
    monthlyIncomeVsExpenses.length > 0
      ? Math.max(
          ...monthlyIncomeVsExpenses.map(
            (item) =>
              Math.max(
                item.income,
                item.expenses
              )
          )
        )
      : 0

  // -----------------------------
  // Format Amount
  // -----------------------------

  const formatAmount = (amount) => {
    return `${amount.toLocaleString(
      'en-US',
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    )} EGP`
  }

  // -----------------------------
  // Format Date
  // -----------------------------

  const formatDate = (date) => {
    if (!date) return '-'

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      i18n.language === 'ar'
        ? 'ar-EG'
        : 'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }
    )
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
      i18n.language === 'ar'
        ? 'ar-EG'
        : 'en-US',
      {
        month: 'short',
        year: 'numeric',
      }
    )
  }

  // -----------------------------
  // Recent Transactions
  // -----------------------------

  const recentTransactions =
    transactions.slice(0, 5)

  return (
    <div className="dashboard-page">

      {/* Header */}

      <div className="dashboard-header">

        <div>

          <h1>
            {t('dashboard.title')}
          </h1>

          <p>
            {t('dashboard.subtitle')}
          </p>

        </div>

        <button
          className="primary-button dashboard-add-button"
          onClick={() =>
            navigate('/transactions')
          }
        >
          <Plus size={16} strokeWidth={2.5} />

          <span>
            {t('dashboard.addTransaction')}
          </span>
        </button>

      </div>

      {/* Summary Cards */}

      <div className="summary-cards">

        {/* Total Balance */}

        <div className="summary-card balance-card">

          <div className="summary-card-top">

            <div className="summary-card-icon balance-icon">
              <Wallet size={19} strokeWidth={2} />
            </div>

            <span className="summary-card-label">
              {t('dashboard.totalBalance')}
            </span>

          </div>

          <h2>
            {loading
              ? t('dashboard.loading')
              : formatAmount(totalBalance)}
          </h2>

        </div>

        {/* Total Income */}

        <div className="summary-card income-card">

          <div className="summary-card-top">

            <div className="summary-card-icon income-icon">
              <TrendingUp size={19} strokeWidth={2} />
            </div>

            <span className="summary-card-label">
              {t('dashboard.totalIncome')}
            </span>

          </div>

          <h2>
            {loading
              ? t('dashboard.loading')
              : formatAmount(totalIncome)}
          </h2>

        </div>

        {/* Total Expenses */}

        <div className="summary-card expense-card">

          <div className="summary-card-top">

            <div className="summary-card-icon expense-icon">
              <TrendingDown size={19} strokeWidth={2} />
            </div>

            <span className="summary-card-label">
              {t('dashboard.totalExpenses')}
            </span>

          </div>

          <h2>
            {loading
              ? t('dashboard.loading')
              : formatAmount(totalExpenses)}
          </h2>

        </div>

        {/* Average Monthly Income */}

        <div className="summary-card average-card">

          <div className="summary-card-top">

            <div className="summary-card-icon average-icon">
              <BarChart3 size={19} strokeWidth={2} />
            </div>

            <span className="summary-card-label">
              {t(
                'dashboard.averageMonthlyIncome'
              )}
            </span>

          </div>

          <h2>
            {loading
              ? t('dashboard.loading')
              : formatAmount(
                  averageMonthlyIncome
                )}
          </h2>

        </div>

        {/* Money Owed To You */}

        <div className="summary-card receivable-card">

          <div className="summary-card-top">

            <div className="summary-card-icon receivable-icon">
              <HandCoins size={19} strokeWidth={2} />
            </div>

            <span className="summary-card-label">
              {t(
                'dashboard.moneyOwedToYou'
              )}
            </span>

          </div>

          <h2>
            {loading
              ? t('dashboard.loading')
              : formatAmount(receivables)}
          </h2>

        </div>

        {/* Money You Owe */}

        <div className="summary-card payable-card">

          <div className="summary-card-top">

            <div className="summary-card-icon payable-icon">
              <CreditCard size={19} strokeWidth={2} />
            </div>

            <span className="summary-card-label">
              {t(
                'dashboard.moneyYouOwe'
              )}
            </span>

          </div>

          <h2>
            {loading
              ? t('dashboard.loading')
              : formatAmount(payables)}
          </h2>

        </div>

      </div>

      {/* Error */}

      {error && (
        <p>
          {error.message}
        </p>
      )}

      {/* Monthly Income */}

      <div className="monthly-income-section">

        <div className="section-header">

          <div>

            <h2>
              {t(
                'dashboard.monthlyIncome'
              )}
            </h2>

            <p>
              {t(
                'dashboard.monthlyIncomeDescription'
              )}
            </p>

          </div>

        </div>

        {loading ? (

          <p>
            {t(
              'dashboard.loadingMonthlyIncome'
            )}
          </p>

        ) : monthlyIncome.length === 0 ? (

          <p>
            {t(
              'dashboard.noIncomeData'
            )}
          </p>

        ) : (

          <div className="income-chart">

            <div className="income-chart-bars">

              {monthlyIncome.map(
                ({ month, amount }) => {

                  const height =
                    maxMonthlyIncome > 0
                      ? (amount /
                          maxMonthlyIncome) *
                        100
                      : 0

                  return (

                    <div
                      key={month}
                      className="income-chart-column"
                    >

                      <div className="income-chart-value">
                        {formatAmount(amount)}
                      </div>

                      <div className="income-chart-bar-wrapper">

                        <div
                          className="income-chart-bar"
                          style={{
                            height: `${height}%`,
                          }}
                        />

                      </div>

                      <div className="income-chart-label">
                        {formatMonth(month)}
                      </div>

                    </div>

                  )
                }
              )}

            </div>

          </div>

        )}

      </div>

      {/* Income vs Expenses */}

      <div className="income-expenses-section">

        <div className="section-header">

          <div>

            <h2>
              {t(
                'dashboard.incomeVsExpenses'
              )}
            </h2>

            <p>
              {t(
                'dashboard.incomeVsExpensesDescription'
              )}
            </p>

          </div>

        </div>

        {loading ? (

          <p>
            {t(
              'dashboard.loadingIncomeExpenses'
            )}
          </p>

        ) : monthlyIncomeVsExpenses.length === 0 ? (

          <p>
            {t(
              'dashboard.noIncomeExpenseData'
            )}
          </p>

        ) : (

          <div className="income-expenses-chart">

            {monthlyIncomeVsExpenses.map(
              ({
                month,
                income,
                expenses,
              }) => {

                const incomeHeight =
                  maxIncomeVsExpenses > 0
                    ? (income /
                        maxIncomeVsExpenses) *
                      100
                    : 0

                const expensesHeight =
                  maxIncomeVsExpenses > 0
                    ? (expenses /
                        maxIncomeVsExpenses) *
                      100
                    : 0

                return (

                  <div
                    key={month}
                    className="income-expenses-column"
                  >

                    <div className="income-expenses-values">

                      <span>
                        +{formatAmount(income)}
                      </span>

                      <span>
                        -{formatAmount(expenses)}
                      </span>

                    </div>

                    <div className="income-expenses-bars">

                      <div className="income-bar-wrapper">

                        <div
                          className="income-bar"
                          style={{
                            height: `${incomeHeight}%`,
                          }}
                        />

                      </div>

                      <div className="expense-bar-wrapper">

                        <div
                          className="expense-bar"
                          style={{
                            height: `${expensesHeight}%`,
                          }}
                        />

                      </div>

                    </div>

                    <div className="income-expenses-label">
                      {formatMonth(month)}
                    </div>

                  </div>

                )
              }
            )}

          </div>

        )}

      </div>

      {/* Recent Transactions */}

      <div className="recent-transactions">

        <div className="section-header">

          <div>

            <h2>
              {t(
                'dashboard.recentTransactions'
              )}
            </h2>

            <p>
              {t(
                'dashboard.latestFinancialActivity'
              )}
            </p>

          </div>

          <button
            className="secondary-button"
            onClick={() =>
              navigate('/transactions')
            }
          >
            {t('dashboard.viewAll')}
          </button>

        </div>

        <div className="transactions-table-wrapper">

          {loading ? (

            <p>
              {t('dashboard.loading')}
            </p>

          ) : recentTransactions.length === 0 ? (

            <p>
              {t(
                'dashboard.noTransactions'
              )}
            </p>

          ) : (

            <table className="transactions-table">

              <thead>

                <tr>

                  <th>
                    {t(
                      'dashboard.description'
                    )}
                  </th>

                  <th>
                    {t(
                      'dashboard.category'
                    )}
                  </th>

                  <th>
                    {t(
                      'dashboard.date'
                    )}
                  </th>

                  <th>
                    {t(
                      'dashboard.amount'
                    )}
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentTransactions.map(
                  (transaction) => {

                    const isIncome =
                      transaction.type ===
                      'income'

                    const amount =
                      Number(
                        transaction.paid_amount ||
                        0
                      )

                    return (

                      <tr
                        key={transaction.id}
                      >

                        <td>
                          {transaction.title}
                        </td>

                        <td>
                          {transaction.categories?.name ||
                            '-'}
                        </td>

                        <td>
                          {formatDate(
                            transaction.transaction_date
                          )}
                        </td>

                        <td
                          className={
                            isIncome
                              ? 'income'
                              : 'expense'
                          }
                        >

                          {isIncome
                            ? '+'
                            : '-'}

                          {formatAmount(amount)}

                        </td>

                      </tr>

                    )
                  }
                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  )
}

export default Dashboard