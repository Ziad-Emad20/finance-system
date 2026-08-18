import { useTranslation } from 'react-i18next'
import './Dashboard.css'

function Dashboard() {
  const { t } = useTranslation()

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>{t('dashboard.title')}</h1>
          <p>{t('dashboard.subtitle')}</p>
        </div>

        <button className="primary-button">
          + {t('dashboard.addTransaction')}
        </button>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <span className="summary-card-label">
            {t('dashboard.totalBalance')}
          </span>

          <h2>25,000 EGP</h2>
        </div>

        <div className="summary-card">
          <span className="summary-card-label">
            {t('dashboard.totalIncome')}
          </span>

          <h2>15,000 EGP</h2>
        </div>

        <div className="summary-card">
          <span className="summary-card-label">
            {t('dashboard.totalExpenses')}
          </span>

          <h2>7,500 EGP</h2>
        </div>

        <div className="summary-card">
          <span className="summary-card-label">
            {t('dashboard.totalDebts')}
          </span>

          <h2>3,000 EGP</h2>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="recent-transactions">
        <div className="section-header">
          <div>
            <h2>{t('dashboard.recentTransactions')}</h2>
            <p>{t('dashboard.latestFinancialActivity')}</p>
          </div>

          <button className="secondary-button">
            {t('dashboard.viewAll')}
          </button>
        </div>

        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>{t('dashboard.description')}</th>
                <th>{t('dashboard.category')}</th>
                <th>{t('dashboard.date')}</th>
                <th>{t('dashboard.amount')}</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Salary</td>
                <td>{t('dashboard.income')}</td>
                <td>Aug 10, 2026</td>
                <td className="income">+15,000 EGP</td>
              </tr>

              <tr>
                <td>Groceries</td>
                <td>Food</td>
                <td>Aug 9, 2026</td>
                <td className="expense">-1,200 EGP</td>
              </tr>

              <tr>
                <td>Internet Bill</td>
                <td>Bills</td>
                <td>Aug 8, 2026</td>
                <td className="expense">-500 EGP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard