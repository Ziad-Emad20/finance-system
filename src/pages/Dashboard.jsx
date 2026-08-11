import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Here’s an overview of your finances.</p>
        </div>

        <button className="primary-button">
          + Add Transaction
        </button>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <span className="summary-card-label">
            Total Balance
          </span>

          <h2>25,000 EGP</h2>
        </div>

        <div className="summary-card">
          <span className="summary-card-label">
            Total Income
          </span>

          <h2>15,000 EGP</h2>
        </div>

        <div className="summary-card">
          <span className="summary-card-label">
            Total Expenses
          </span>

          <h2>7,500 EGP</h2>
        </div>

        <div className="summary-card">
          <span className="summary-card-label">
            Total Debts
          </span>

          <h2>3,000 EGP</h2>
        </div>
      </div>
{/* recent-transactions */}
      <div className="recent-transactions">
  <div className="section-header">
    <div>
      <h2>Recent Transactions</h2>
      <p>Your latest financial activity.</p>
    </div>

    <button className="secondary-button">
      View All
    </button>
  </div>

  <div className="transactions-table-wrapper">
    <table className="transactions-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Category</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Salary</td>
          <td>Income</td>
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

    
  );
}

export default Dashboard;