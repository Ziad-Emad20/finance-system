import { useTranslation } from 'react-i18next'

import { useAccounts } from '../hooks/useAccounts'
import { useTransactions } from '../hooks/useTransactions'

import './Dashboard.css'

function Dashboard() {
  const { t } = useTranslation()

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
  // Total Balance
  // -----------------------------

  const totalBalance = accounts.reduce(
    (total, account) =>
      total + Number(account.balance || 0),
    0
  )

  // -----------------------------
  // Total Income
  // -----------------------------

  const totalIncome = transactions
    .filter(
      (transaction) => transaction.type === 'income'
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.paid_amount || 0),
      0
    )

  // -----------------------------
  // Total Expenses
  // -----------------------------

  const totalExpenses = transactions
    .filter(
      (transaction) => transaction.type === 'expense'
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.paid_amount || 0),
      0
    )

  // -----------------------------
  // Total Debts
  // -----------------------------

  const totalDebts = transactions.reduce(
    (total, transaction) => {
      const outstanding =
        Number(transaction.total_amount || 0) -
        Number(transaction.paid_amount || 0)

      return outstanding > 0
        ? total + outstanding
        : total
    },
    0
  )

  // -----------------------------
  // Format Amount
  // -----------------------------

  const formatAmount = (amount) => {
    return `${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })} EGP`
  }

  // -----------------------------
  // Format Date
  // -----------------------------

  const formatDate = (date) => {
    if (!date) return '-'

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
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

        <button className="primary-button">
          + {t('dashboard.addTransaction')}
        </button>

      </div>

      {/* Summary Cards */}

      <div className="summary-cards">

        {/* Total Balance */}

        <div className="summary-card">

          <span className="summary-card-label">
            {t('dashboard.totalBalance')}
          </span>

          <h2>
            {loading
              ? 'Loading...'
              : formatAmount(totalBalance)}
          </h2>

        </div>

        {/* Total Income */}

        <div className="summary-card">

          <span className="summary-card-label">
            {t('dashboard.totalIncome')}
          </span>

          <h2>
            {loading
              ? 'Loading...'
              : formatAmount(totalIncome)}
          </h2>

        </div>

        {/* Total Expenses */}

        <div className="summary-card">

          <span className="summary-card-label">
            {t('dashboard.totalExpenses')}
          </span>

          <h2>
            {loading
              ? 'Loading...'
              : formatAmount(totalExpenses)}
          </h2>

        </div>

        {/* Total Debts */}

        <div className="summary-card">

          <span className="summary-card-label">
            {t('dashboard.totalDebts')}
          </span>

          <h2>
            {loading
              ? 'Loading...'
              : formatAmount(totalDebts)}
          </h2>

        </div>

      </div>

      {/* Error */}

      {error && (
        <p>
          {error.message}
        </p>
      )}

      {/* Recent Transactions */}

      <div className="recent-transactions">

        <div className="section-header">

          <div>
            <h2>
              {t('dashboard.recentTransactions')}
            </h2>

            <p>
              {t('dashboard.latestFinancialActivity')}
            </p>
          </div>

          <button className="secondary-button">
            {t('dashboard.viewAll')}
          </button>

        </div>

        <div className="transactions-table-wrapper">

          {loading ? (
            <p>
              Loading transactions...
            </p>
          ) : recentTransactions.length === 0 ? (
            <p>
              No transactions yet.
            </p>
          ) : (
            <table className="transactions-table">

              <thead>

                <tr>

                  <th>
                    {t('dashboard.description')}
                  </th>

                  <th>
                    {t('dashboard.category')}
                  </th>

                  <th>
                    {t('dashboard.date')}
                  </th>

                  <th>
                    {t('dashboard.amount')}
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentTransactions.map(
                  (transaction) => {

                    const isIncome =
                      transaction.type === 'income'

                    const amount =
                      Number(
                        transaction.paid_amount || 0
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
                          {isIncome ? '+' : '-'}
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