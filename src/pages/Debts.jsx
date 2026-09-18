import { useTranslation } from 'react-i18next'
import { useTransactions } from '../hooks/useTransactions'

function Debts() {
  const { t, i18n } = useTranslation()

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

  const formatAmount = (
    amount,
    currency = 'EGP'
  ) => {
    return `${amount.toLocaleString(
      i18n.language === 'ar'
        ? 'ar-EG'
        : 'en-US',
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    )} ${currency}`
  }

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

  return (
    <div className="debts-page">

      {/* Header */}

      <div className="debts-header">
        <div>
          <h1>{t('debts.title')}</h1>

          <p>
            {t('debts.subtitle')}
          </p>
        </div>
      </div>

      {/* Loading */}

      {loading && (
        <p>{t('debts.loading')}</p>
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
                {t('debts.moneyOwedToYou')}
              </span>

              <h2>
                {formatAmount(
                  totalReceivables
                )}
              </h2>
            </div>

            <div className="summary-card">
              <span className="summary-card-label">
                {t('debts.moneyYouOwe')}
              </span>

              <h2>
                {formatAmount(
                  totalPayables
                )}
              </h2>
            </div>

            <div className="summary-card">
              <span className="summary-card-label">
                {t('debts.totalOutstanding')}
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
                  {t('debts.moneyOwedToYou')}
                </h2>

                <p>
                  {t('debts.receivablesDescription')}
                </p>

              </div>
            </div>

            {receivables.length === 0 ? (
              <p>
                {t('debts.noReceivables')}
              </p>
            ) : (
              <div className="debts-table-wrapper">

                <table className="debts-table">

                  <thead>
                    <tr>
                      <th>
                        {t('debts.personCompany')}
                      </th>

                      <th>
                        {t('debts.transaction')}
                      </th>

                      <th>
                        {t('debts.total')}
                      </th>

                      <th>
                        {t('debts.paid')}
                      </th>

                      <th>
                        {t('debts.remaining')}
                      </th>

                      <th>
                        {t('debts.date')}
                      </th>
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
                  {t('debts.moneyYouOwe')}
                </h2>

                <p>
                  {t('debts.payablesDescription')}
                </p>

              </div>
            </div>

            {payables.length === 0 ? (
              <p>
                {t('debts.noPayables')}
              </p>
            ) : (
              <div className="debts-table-wrapper">

                <table className="debts-table">

                  <thead>
                    <tr>
                      <th>
                        {t('debts.personCompany')}
                      </th>

                      <th>
                        {t('debts.transaction')}
                      </th>

                      <th>
                        {t('debts.total')}
                      </th>

                      <th>
                        {t('debts.paid')}
                      </th>

                      <th>
                        {t('debts.remaining')}
                      </th>

                      <th>
                        {t('debts.date')}
                      </th>
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