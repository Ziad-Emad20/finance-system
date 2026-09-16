import { useTransactions } from '../hooks/useTransactions'

function Debts() {
  const {
    transactions,
    loading,
    error,
  } = useTransactions()

  const debts = transactions
    .map((transaction) => {
      const totalAmount =
        Number(transaction.total_amount || 0)

      const paidAmount =
        Number(transaction.paid_amount || 0)

      const outstanding =
        totalAmount - paidAmount

      return {
        ...transaction,
        outstanding,
      }
    })
    .filter(
      (transaction) =>
        transaction.outstanding > 0 &&
        transaction.party_name
    )

  const receivables = debts.filter(
    (debt) => debt.type === 'income'
  )

  const payables = debts.filter(
    (debt) => debt.type === 'expense'
  )

  const totalReceivables = receivables.reduce(
    (total, debt) =>
      total + debt.outstanding,
    0
  )

  const totalPayables = payables.reduce(
    (total, debt) =>
      total + debt.outstanding,
    0
  )

  const formatAmount = (amount, currency = 'EGP') => {
    return `${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })} ${currency}`
  }

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

  return (
    <div className="debts-page">

      {/* Header */}

      <div className="debts-header">

        <div>
          <h1>Debts</h1>

          <p>
            Track money you owe and money owed to you.
          </p>
        </div>

      </div>

      {/* Loading */}

      {loading && (
        <p>Loading debts...</p>
      )}

      {/* Error */}

      {!loading && error && (
        <p>{error.message}</p>
      )}

      {!loading && !error && (
        <>
          {/* Summary */}

          <div className="summary-cards">

            <div className="summary-card">

              <span className="summary-card-label">
                Money Owed to You
              </span>

              <h2>
                {formatAmount(
                  totalReceivables
                )}
              </h2>

            </div>

            <div className="summary-card">

              <span className="summary-card-label">
                Money You Owe
              </span>

              <h2>
                {formatAmount(
                  totalPayables
                )}
              </h2>

            </div>

            <div className="summary-card">

              <span className="summary-card-label">
                Total Outstanding
              </span>

              <h2>
                {formatAmount(
                  totalReceivables +
                    totalPayables
                )}
              </h2>

            </div>

          </div>

          {/* Money Owed to You */}

          <div className="debts-section">

            <div className="section-header">

              <div>
                <h2>
                  Money Owed to You
                </h2>

                <p>
                  Income that has not been fully collected.
                </p>
              </div>

            </div>

            {receivables.length === 0 ? (
              <p>
                No outstanding receivables.
              </p>
            ) : (
              <div className="debts-table-wrapper">

                <table className="debts-table">

                  <thead>

                    <tr>
                      <th>Person / Company</th>
                      <th>Transaction</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Remaining</th>
                      <th>Date</th>
                    </tr>

                  </thead>

                  <tbody>

                    {receivables.map(
                      (debt) => (
                        <tr key={debt.id}>

                          <td>
                            <strong>
                              {debt.party_name}
                            </strong>
                          </td>

                          <td>
                            {debt.title}
                          </td>

                          <td>
                            {formatAmount(
                              Number(
                                debt.total_amount
                              ),
                              debt.accounts?.currency
                            )}
                          </td>

                          <td>
                            {formatAmount(
                              Number(
                                debt.paid_amount
                              ),
                              debt.accounts?.currency
                            )}
                          </td>

                          <td>
                            {formatAmount(
                              debt.outstanding,
                              debt.accounts?.currency
                            )}
                          </td>

                          <td>
                            {formatDate(
                              debt.transaction_date
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

          {/* Money You Owe */}

          <div className="debts-section">

            <div className="section-header">

              <div>
                <h2>
                  Money You Owe
                </h2>

                <p>
                  Expenses that have not been fully paid.
                </p>
              </div>

            </div>

            {payables.length === 0 ? (
              <p>
                No outstanding payables.
              </p>
            ) : (
              <div className="debts-table-wrapper">

                <table className="debts-table">

                  <thead>

                    <tr>
                      <th>Person / Company</th>
                      <th>Transaction</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Remaining</th>
                      <th>Date</th>
                    </tr>

                  </thead>

                  <tbody>

                    {payables.map(
                      (debt) => (
                        <tr key={debt.id}>

                          <td>
                            <strong>
                              {debt.party_name}
                            </strong>
                          </td>

                          <td>
                            {debt.title}
                          </td>

                          <td>
                            {formatAmount(
                              Number(
                                debt.total_amount
                              ),
                              debt.accounts?.currency
                            )}
                          </td>

                          <td>
                            {formatAmount(
                              Number(
                                debt.paid_amount
                              ),
                              debt.accounts?.currency
                            )}
                          </td>

                          <td>
                            {formatAmount(
                              debt.outstanding,
                              debt.accounts?.currency
                            )}
                          </td>

                          <td>
                            {formatDate(
                              debt.transaction_date
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

        </>
      )}

    </div>
  )
}

export default Debts