import { useTranslation } from 'react-i18next'
import {
  HandCoins,
  ArrowDownLeft,
  ArrowUpRight,
  WalletCards,
  CircleDollarSign,
} from 'lucide-react'

import { useTransactions } from '../hooks/useTransactions'

import './Debts.css'

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

  const renderDebtRows = (debtList) => {
    return debtList.map((debt) => (
      <tr key={debt.id}>

        <td>
          <div className="debt-person">
            <div className="debt-person-icon">
              <WalletCards size={15} />
            </div>

            <strong>
              {debt.party_name}
            </strong>
          </div>
        </td>

        <td>
          <span className="debt-transaction-title">
            {debt.title}
          </span>
        </td>

        <td>
          {formatAmount(
            Number(debt.total_amount),
            debt.accounts?.currency
          )}
        </td>

        <td>
          {formatAmount(
            Number(debt.paid_amount),
            debt.accounts?.currency
          )}
        </td>

        <td>
          <strong className="debt-remaining">
            {formatAmount(
              debt.outstanding,
              debt.accounts?.currency
            )}
          </strong>
        </td>

        <td>
          <span className="debt-date">
            {formatDate(
              debt.transaction_date
            )}
          </span>
        </td>

      </tr>
    ))
  }

  const renderMobileCards = (debtList) => {
    return (
      <div className="debts-mobile-list">
        {debtList.map((debt) => (
          <div
            className="debt-mobile-card"
            key={debt.id}
          >

            <div className="debt-mobile-top">

              <div className="debt-person">
                <div className="debt-person-icon">
                  <WalletCards size={15} />
                </div>

                <div>
                  <strong>
                    {debt.party_name}
                  </strong>

                  <span>
                    {debt.title}
                  </span>
                </div>
              </div>

              <strong className="debt-mobile-remaining">
                {formatAmount(
                  debt.outstanding,
                  debt.accounts?.currency
                )}
              </strong>

            </div>

            <div className="debt-mobile-details">

              <div>
                <span>
                  {t('debts.total')}
                </span>

                <strong>
                  {formatAmount(
                    Number(
                      debt.total_amount
                    ),
                    debt.accounts?.currency
                  )}
                </strong>
              </div>

              <div>
                <span>
                  {t('debts.paid')}
                </span>

                <strong>
                  {formatAmount(
                    Number(
                      debt.paid_amount
                    ),
                    debt.accounts?.currency
                  )}
                </strong>
              </div>

              <div>
                <span>
                  {t('debts.date')}
                </span>

                <strong>
                  {formatDate(
                    debt.transaction_date
                  )}
                </strong>
              </div>

            </div>

          </div>
        ))}
      </div>
    )
  }

  const renderDebtSection = ({
    type,
    title,
    description,
    list,
    emptyMessage,
  }) => {
    const isReceivable =
      type === 'receivable'

    return (
      <section
        className={`debts-section ${
          isReceivable
            ? 'receivables-section'
            : 'payables-section'
        }`}
      >

        <div className="section-header">

          <div className="section-title-wrapper">

            <div
              className={`debt-section-icon ${
                isReceivable
                  ? 'receivable-icon'
                  : 'payable-icon'
              }`}
            >
              {isReceivable ? (
                <ArrowDownLeft size={19} />
              ) : (
                <ArrowUpRight size={19} />
              )}
            </div>

            <div>
              <h2>
                {title}
              </h2>

              <p>
                {description}
              </p>
            </div>

          </div>

          <div
            className={`debt-count ${
              isReceivable
                ? 'receivable-count'
                : 'payable-count'
            }`}
          >
            {list.length}
          </div>

        </div>

        {list.length === 0 ? (
          <div className="debt-empty-state">

            <div className="debt-empty-icon">
              <HandCoins size={22} />
            </div>

            <p>
              {emptyMessage}
            </p>

          </div>
        ) : (
          <>
            <div className="debts-table-wrapper">

              <table className="debts-table">

                <thead>
                  <tr>

                    <th>
                      {t(
                        'debts.personCompany'
                      )}
                    </th>

                    <th>
                      {t(
                        'debts.transaction'
                      )}
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
                  {renderDebtRows(list)}
                </tbody>

              </table>

            </div>

            {renderMobileCards(list)}
          </>
        )}

      </section>
    )
  }

  return (
    <div className="debts-page">

      {/* Header */}

      <div className="debts-header">

        <div>
          <h1>
            {t('debts.title')}
          </h1>

          <p>
            {t('debts.subtitle')}
          </p>
        </div>

      </div>

      {/* Loading */}

      {loading && (
        <div className="debts-state">

          <div className="debts-loading-spinner" />

          <p>
            {t('debts.loading')}
          </p>

        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <div className="debts-state debts-state-error">

          <p>
            {error.message}
          </p>

        </div>
      )}

      {!loading && !error && (
        <>

          {/* Summary */}

          <div className="debts-summary-cards">

            <div className="debt-summary-card receivable-summary">

              <div className="debt-summary-top">

                <div className="debt-summary-icon">
                  <ArrowDownLeft size={19} />
                </div>

                <span>
                  {t(
                    'debts.moneyOwedToYou'
                  )}
                </span>

              </div>

              <h2>
                {formatAmount(
                  totalReceivables
                )}
              </h2>

              <p>
                {receivables.length}{' '}
                {i18n.language === 'ar'
                  ? 'معاملة'
                  : 'transactions'}
              </p>

            </div>

            <div className="debt-summary-card payable-summary">

              <div className="debt-summary-top">

                <div className="debt-summary-icon">
                  <ArrowUpRight size={19} />
                </div>

                <span>
                  {t(
                    'debts.moneyYouOwe'
                  )}
                </span>

              </div>

              <h2>
                {formatAmount(
                  totalPayables
                )}
              </h2>

              <p>
                {payables.length}{' '}
                {i18n.language === 'ar'
                  ? 'معاملة'
                  : 'transactions'}
              </p>

            </div>

            <div className="debt-summary-card total-summary">

              <div className="debt-summary-top">

                <div className="debt-summary-icon">
                  <CircleDollarSign
                    size={19}
                  />
                </div>

                <span>
                  {t(
                    'debts.totalOutstanding'
                  )}
                </span>

              </div>

              <h2>
                {formatAmount(
                  totalReceivables +
                    totalPayables
                )}
              </h2>

              <p>
                {debts.length}{' '}
                {i18n.language === 'ar'
                  ? 'معاملة'
                  : 'transactions'}
              </p>

            </div>

          </div>

          {/* Receivables */}

          {renderDebtSection({
            type: 'receivable',
            title: t(
              'debts.moneyOwedToYou'
            ),
            description: t(
              'debts.receivablesDescription'
            ),
            list: receivables,
            emptyMessage: t(
              'debts.noReceivables'
            ),
          })}

          {/* Payables */}

          {renderDebtSection({
            type: 'payable',
            title: t(
              'debts.moneyYouOwe'
            ),
            description: t(
              'debts.payablesDescription'
            ),
            list: payables,
            emptyMessage: t(
              'debts.noPayables'
            ),
          })}

        </>
      )}

    </div>
  )
}

export default Debts