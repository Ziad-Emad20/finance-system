import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  Tag,
  CalendarDays,
  FileText,
  UserRound,
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
  CircleDollarSign,
} from 'lucide-react'

import { useTransactions } from '../hooks/useTransactions'
import { useAccounts } from '../hooks/useAccounts'
import { useCategories } from '../hooks/useCategories'

import './Transactions.css'

function Transactions() {
  const { t, i18n } = useTranslation()

  const {
    transactions,
    loading,
    error,
    addTransaction,
    editTransaction,
    removeTransaction,
  } = useTransactions()

  const {
    accounts,
    loading: accountsLoading,
  } = useAccounts()

  const [type, setType] = useState('income')

  const {
    categories,
    loading: categoriesLoading,
  } = useCategories(type)

  // Add form
  const [title, setTitle] = useState('')
  const [accountId, setAccountId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [paidAmount, setPaidAmount] = useState('')
  const [partyName, setPartyName] = useState('')

  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  const [notes, setNotes] = useState('')

  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')

  // Edit state
  const [editingTransaction, setEditingTransaction] =
    useState(null)

  const [editType, setEditType] = useState('income')
  const [editTitle, setEditTitle] = useState('')
  const [editAccountId, setEditAccountId] = useState('')
  const [editCategoryId, setEditCategoryId] = useState('')
  const [editTotalAmount, setEditTotalAmount] = useState('')
  const [editPaidAmount, setEditPaidAmount] = useState('')
  const [editPartyName, setEditPartyName] = useState('')
  const [editTransactionDate, setEditTransactionDate] =
    useState('')
  const [editNotes, setEditNotes] = useState('')

  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')

  // Delete state
  const [deletingId, setDeletingId] = useState(null)

  // Add outstanding
  const outstanding =
    Number(totalAmount || 0) -
    Number(paidAmount || 0)

  // Edit categories
  const {
    categories: editCategories,
    loading: editCategoriesLoading,
  } = useCategories(editType)

  const editOutstanding =
    Number(editTotalAmount || 0) -
    Number(editPaidAmount || 0)

  // -----------------------------
  // Helpers
  // -----------------------------

  const formatAmount = (amount, currency = 'EGP') => {
    return `${Number(amount || 0).toLocaleString(
      'en-US',
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

  // -----------------------------
  // Type Change
  // -----------------------------

  const handleTypeChange = (value) => {
    setType(value)
    setCategoryId('')
    setPartyName('')
  }

  const handleEditTypeChange = (value) => {
    setEditType(value)
    setEditCategoryId('')
    setEditPartyName('')
  }

  // -----------------------------
  // Add Transaction
  // -----------------------------

  const handleSubmit = async (e) => {
    e.preventDefault()

    setFormError('')
    setSuccess('')

    if (!title.trim()) {
      setFormError(
        t('transactions.pleaseEnterTitle')
      )
      return
    }

    if (!accountId) {
      setFormError(
        t('transactions.pleaseSelectAccount')
      )
      return
    }

    if (!categoryId) {
      setFormError(
        t('transactions.pleaseSelectCategory')
      )
      return
    }

    if (totalAmount === '') {
      setFormError(
        t('transactions.pleaseEnterTotal')
      )
      return
    }

    const numericTotal = Number(totalAmount)
    const numericPaid = Number(paidAmount || 0)

    if (
      !Number.isFinite(numericTotal) ||
      numericTotal <= 0
    ) {
      setFormError(
        t('transactions.invalidTotal')
      )
      return
    }

    if (
      !Number.isFinite(numericPaid) ||
      numericPaid < 0
    ) {
      setFormError(
        t('transactions.invalidPaid')
      )
      return
    }

    if (numericPaid > numericTotal) {
      setFormError(
        t('transactions.paidGreaterThanTotal')
      )
      return
    }

    const currentOutstanding =
      numericTotal - numericPaid

    if (
      currentOutstanding > 0 &&
      !partyName.trim()
    ) {
      setFormError(
        type === 'income'
          ? t(
              'transactions.pleaseEnterWhoOwesYou'
            )
          : t(
              'transactions.pleaseEnterWhoYouOwe'
            )
      )
      return
    }

    setSaving(true)

    const {
      transaction,
      error: createError,
    } = await addTransaction({
      accountId,
      categoryId,
      type,
      title: title.trim(),
      totalAmount: numericTotal,
      paidAmount: numericPaid,
      transactionDate,
      notes,
      partyName:
        currentOutstanding > 0
          ? partyName.trim()
          : null,
    })

    if (createError) {
      setFormError(createError.message)
      setSaving(false)
      return
    }

    setTitle('')
    setAccountId('')
    setCategoryId('')
    setTotalAmount('')
    setPaidAmount('')
    setPartyName('')
    setNotes('')

    setSuccess(
      t('transactions.transactionCreated')
    )

    setSaving(false)

    console.log(
      'Created transaction:',
      transaction
    )
  }

  // -----------------------------
  // Edit Transaction
  // -----------------------------

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction)

    setEditType(transaction.type)
    setEditTitle(transaction.title)
    setEditAccountId(transaction.account_id)
    setEditCategoryId(transaction.category_id)
    setEditTotalAmount(transaction.total_amount)
    setEditPaidAmount(transaction.paid_amount)
    setEditPartyName(
      transaction.party_name || ''
    )
    setEditTransactionDate(
      transaction.transaction_date
    )
    setEditNotes(
      transaction.notes || ''
    )

    setEditError('')
    setSuccess('')
  }

  const handleCancelEdit = () => {
    setEditingTransaction(null)
    setEditError('')
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    setEditError('')
    setSuccess('')

    if (!editTitle.trim()) {
      setEditError(
        t('transactions.pleaseEnterTitle')
      )
      return
    }

    if (!editAccountId) {
      setEditError(
        t('transactions.pleaseSelectAccount')
      )
      return
    }

    if (!editCategoryId) {
      setEditError(
        t('transactions.pleaseSelectCategory')
      )
      return
    }

    if (editTotalAmount === '') {
      setEditError(
        t('transactions.pleaseEnterTotal')
      )
      return
    }

    const numericTotal =
      Number(editTotalAmount)

    const numericPaid =
      Number(editPaidAmount || 0)

    if (
      !Number.isFinite(numericTotal) ||
      numericTotal <= 0
    ) {
      setEditError(
        t('transactions.invalidTotal')
      )
      return
    }

    if (
      !Number.isFinite(numericPaid) ||
      numericPaid < 0
    ) {
      setEditError(
        t('transactions.invalidPaid')
      )
      return
    }

    if (numericPaid > numericTotal) {
      setEditError(
        t(
          'transactions.paidGreaterThanTotal'
        )
      )
      return
    }

    const currentOutstanding =
      numericTotal - numericPaid

    if (
      currentOutstanding > 0 &&
      !editPartyName.trim()
    ) {
      setEditError(
        editType === 'income'
          ? t(
              'transactions.pleaseEnterWhoOwesYou'
            )
          : t(
              'transactions.pleaseEnterWhoYouOwe'
            )
      )
      return
    }

    setEditSaving(true)

    const {
      transaction,
      error: updateError,
    } = await editTransaction(
      editingTransaction.id,
      {
        accountId: editAccountId,
        categoryId: editCategoryId,
        type: editType,
        title: editTitle.trim(),
        totalAmount: numericTotal,
        paidAmount: numericPaid,
        transactionDate: editTransactionDate,
        notes: editNotes,
        partyName:
          currentOutstanding > 0
            ? editPartyName.trim()
            : null,
      }
    )

    if (updateError) {
      setEditError(
        updateError.message
      )
      setEditSaving(false)
      return
    }

    setEditingTransaction(null)
    setEditSaving(false)

    setSuccess(
      t('transactions.transactionUpdated')
    )

    console.log(
      'Updated transaction:',
      transaction
    )
  }

  // -----------------------------
  // Delete Transaction
  // -----------------------------

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        t('transactions.confirmDelete')
      )

    if (!confirmed) return

    setDeletingId(id)
    setFormError('')
    setSuccess('')

    const {
      error: deleteError,
    } = await removeTransaction(id)

    if (deleteError) {
      setFormError(
        deleteError.message
      )
      setDeletingId(null)
      return
    }

    if (
      editingTransaction?.id === id
    ) {
      setEditingTransaction(null)
    }

    setDeletingId(null)

    setSuccess(
      t('transactions.transactionDeleted')
    )
  }

  return (
    <div className="transactions-page">

      {/* =========================
          Header
      ========================= */}

      <div className="transactions-header">

        <div>
          <h1>
            {t('transactions.title')}
          </h1>

          <p>
            {t('transactions.subtitle')}
          </p>
        </div>

        <button
          type="button"
          className="primary-button transactions-add-button"
          onClick={() =>
            document
              .getElementById(
                'add-transaction-form'
              )
              ?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              })
          }
        >
          <Plus
            size={17}
            strokeWidth={2.5}
          />

          <span>
            {t(
              'transactions.addTransaction'
            )}
          </span>
        </button>

      </div>

      {/* =========================
          Messages
      ========================= */}

      {success && (
        <div className="transaction-message transaction-success">
          {success}
        </div>
      )}

      {formError && (
        <div className="transaction-message transaction-error">
          {formError}
        </div>
      )}

      {/* =========================
          Add Transaction
      ========================= */}

      <section
        id="add-transaction-form"
        className="transaction-form-section"
      >

        <div className="transaction-section-heading">

          <div className="transaction-section-icon">
            <CircleDollarSign
              size={19}
              strokeWidth={2}
            />
          </div>

          <div>
            <h2>
              {t(
                'transactions.addTransaction'
              )}
            </h2>

            <p>
              {t(
                'transactions.subtitle'
              )}
            </p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Type */}

          <div className="transaction-form-field">

            <label>
              {t('transactions.type')}
            </label>

            <select
              value={type}
              onChange={(e) =>
                handleTypeChange(
                  e.target.value
                )
              }
            >
              <option value="income">
                {t('transactions.income')}
              </option>

              <option value="expense">
                {t('transactions.expense')}
              </option>
            </select>

          </div>

          {/* Title */}

          <div className="transaction-form-field">

            <label>
              {t(
                'transactions.titleLabel'
              )}
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder={t(
                'transactions.titlePlaceholder'
              )}
            />

          </div>

          {/* Category */}

          <div className="transaction-form-field">

            <label>
              {t(
                'transactions.category'
              )}
            </label>

            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(
                  e.target.value
                )
              }
              disabled={categoriesLoading}
            >
              <option value="">
                {categoriesLoading
                  ? t(
                      'transactions.loadingCategories'
                    )
                  : t(
                      'transactions.selectCategory'
                    )}
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>

          </div>

          {/* Account */}

          <div className="transaction-form-field">

            <label>
              {type === 'income'
                ? t(
                    'transactions.paidIntoAccount'
                  )
                : t(
                    'transactions.paidFromAccount'
                  )}
            </label>

            <select
              value={accountId}
              onChange={(e) =>
                setAccountId(
                  e.target.value
                )
              }
              disabled={accountsLoading}
            >
              <option value="">
                {accountsLoading
                  ? t(
                      'transactions.loadingAccounts'
                    )
                  : t(
                      'transactions.selectAccount'
                    )}
              </option>

              {accounts.map(
                (account) => (
                  <option
                    key={account.id}
                    value={account.id}
                  >
                    {account.name} (
                    {account.currency})
                  </option>
                )
              )}
            </select>

          </div>

          {/* Total */}

          <div className="transaction-form-field">

            <label>
              {t(
                'transactions.totalAmount'
              )}
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={totalAmount}
              onChange={(e) =>
                setTotalAmount(
                  e.target.value
                )
              }
              placeholder="0.00"
            />

          </div>

          {/* Paid */}

          <div className="transaction-form-field">

            <label>
              {t(
                'transactions.paidAmount'
              )}
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={paidAmount}
              onChange={(e) =>
                setPaidAmount(
                  e.target.value
                )
              }
              placeholder="0.00"
            />

          </div>

          {/* Outstanding */}

          <div className="transaction-form-field">

            <label>
              {t(
                'transactions.outstanding'
              )}
            </label>

            <div
              className={`transaction-outstanding-input ${
                outstanding > 0
                  ? 'has-outstanding'
                  : ''
              }`}
            >
              {outstanding >= 0
                ? outstanding.toFixed(2)
                : '0.00'}
            </div>

          </div>

          {/* Party */}

          {outstanding > 0 && (
            <div className="transaction-form-field">

              <label>
                {type === 'income'
                  ? t(
                      'transactions.whoOwesYou'
                    )
                  : t(
                      'transactions.whoDoYouOwe'
                    )}
              </label>

              <input
                type="text"
                value={partyName}
                onChange={(e) =>
                  setPartyName(
                    e.target.value
                  )
                }
                placeholder={
                  type === 'income'
                    ? t(
                        'transactions.owedYouPlaceholder'
                      )
                    : t(
                        'transactions.owePlaceholder'
                      )
                }
              />

            </div>
          )}

          {/* Date */}

          <div className="transaction-form-field">

            <label>
              {t('transactions.date')}
            </label>

            <input
              type="date"
              value={transactionDate}
              onChange={(e) =>
                setTransactionDate(
                  e.target.value
                )
              }
            />

          </div>

          {/* Notes */}

          <div className="transaction-form-field transaction-notes-field">

            <label>
              {t('transactions.notes')}
            </label>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              placeholder={t(
                'transactions.notesPlaceholder'
              )}
              rows="3"
            />

          </div>

          <button
            type="submit"
            className={`primary-button transaction-submit-button ${
              type === 'expense'
                ? 'expense-submit'
                : ''
            }`}
            disabled={saving}
          >
            {saving ? (
              t('transactions.creating')
            ) : (
              <>
                <Plus
                  size={16}
                  strokeWidth={2.5}
                />

                {t(
                  'transactions.createTransaction'
                )}
              </>
            )}
          </button>

        </form>

      </section>

      {/* =========================
          Transactions List
      ========================= */}

      <section className="transactions-list-section">

        <div className="transactions-list-header">

          <div>
            <h2>
              {t(
                'transactions.recentTransactions'
              )}
            </h2>

            <p>
              {transactions.length}{' '}
              {transactions.length === 1
                ? 'transaction'
                : 'transactions'}
            </p>
          </div>

        </div>

        {/* Loading */}

        {loading && (
          <div className="transactions-state">

            <div className="transactions-loading-spinner" />

            <p>
              {t(
                'transactions.loadingTransactions'
              )}
            </p>

          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="transactions-state transactions-state-error">
            <p>
              {error.message}
            </p>
          </div>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          transactions.length === 0 && (
            <div className="transactions-state">

              <div className="transactions-empty-icon">
                <FileText
                  size={28}
                  strokeWidth={1.8}
                />
              </div>

              <h3>
                {t(
                  'transactions.noTransactions'
                )}
              </h3>

            </div>
          )}

        {/* Cards */}

        {!loading &&
          !error &&
          transactions.length > 0 && (

            <div className="transactions-grid">

              {transactions.map(
                (transaction) => {

                  const isIncome =
                    transaction.type ===
                    'income'

                  const outstandingAmount =
                    Number(
                      transaction.total_amount
                    ) -
                    Number(
                      transaction.paid_amount
                    )

                  const currency =
                    transaction.accounts
                      ?.currency || 'EGP'

                  return (

                    <article
                      key={transaction.id}
                      className={`transaction-card ${
                        isIncome
                          ? 'transaction-income'
                          : 'transaction-expense'
                      } ${
                        editingTransaction?.id ===
                        transaction.id
                          ? 'transaction-card-editing'
                          : ''
                      }`}
                    >

                      {/* Card Top */}

                      <div className="transaction-card-top">

                        <div className="transaction-type-wrapper">

                          <div
                            className={`transaction-type-icon ${
                              isIncome
                                ? 'transaction-income-icon'
                                : 'transaction-expense-icon'
                            }`}
                          >
                            {isIncome ? (
                              <ArrowDownLeft
                                size={21}
                                strokeWidth={2.2}
                              />
                            ) : (
                              <ArrowUpRight
                                size={21}
                                strokeWidth={2.2}
                              />
                            )}
                          </div>

                          <div>
                            <span
                              className={`transaction-type-badge ${
                                isIncome
                                  ? 'income-badge'
                                  : 'expense-badge'
                              }`}
                            >
                              {isIncome
                                ? t(
                                    'transactions.income'
                                  )
                                : t(
                                    'transactions.expense'
                                  )}
                            </span>

                            <h3 className="transaction-card-title">
                              {transaction.title}
                            </h3>
                          </div>

                        </div>

                        <div className="transaction-card-amount">

                          <span>
                            {isIncome
                              ? '+'
                              : '-'}
                          </span>

                          {formatAmount(
                            transaction.paid_amount,
                            currency
                          )}

                        </div>

                      </div>

                      {/* Details */}

                      <div className="transaction-card-details">

                        <div className="transaction-detail">

                          <Tag size={15} />

                          <div>
                            <span>
                              {t(
                                'transactions.category'
                              )}
                            </span>

                            <strong>
                              {transaction
                                .categories
                                ?.name || '-'}
                            </strong>
                          </div>

                        </div>

                        <div className="transaction-detail">

                          <Wallet size={15} />

                          <div>
                            <span>
                              {t(
                                'transactions.account'
                              )}
                            </span>

                            <strong>
                              {transaction
                                .accounts
                                ?.name || '-'}
                            </strong>
                          </div>

                        </div>

                        <div className="transaction-detail">

                          <CalendarDays
                            size={15}
                          />

                          <div>
                            <span>
                              {t(
                                'transactions.dateLabel'
                              )}
                            </span>

                            <strong>
                              {formatDate(
                                transaction.transaction_date
                              )}
                            </strong>
                          </div>

                        </div>

                      </div>

                      {/* Money Summary */}

                      <div className="transaction-money-summary">

                        <div>
                          <span>
                            {t(
                              'transactions.total'
                            )}
                          </span>

                          <strong>
                            {formatAmount(
                              transaction.total_amount,
                              currency
                            )}
                          </strong>
                        </div>

                        <div>
                          <span>
                            {t(
                              'transactions.paid'
                            )}
                          </span>

                          <strong>
                            {formatAmount(
                              transaction.paid_amount,
                              currency
                            )}
                          </strong>
                        </div>

                        <div
                          className={
                            outstandingAmount >
                            0
                              ? 'remaining-money'
                              : 'fully-paid'
                          }
                        >
                          <span>
                            {t(
                              'transactions.outstanding'
                            )}
                          </span>

                          <strong>
                            {formatAmount(
                              outstandingAmount,
                              currency
                            )}
                          </strong>
                        </div>

                      </div>

                      {/* Party */}

                      {transaction.party_name && (
                        <div className="transaction-party">

                          <UserRound
                            size={15}
                          />

                          <span>
                            {transaction.type ===
                            'income'
                              ? t(
                                  'transactions.owesYou'
                                )
                              : t(
                                  'transactions.youOwe'
                                )}
                          </span>

                          <strong>
                            {transaction.party_name}
                          </strong>

                        </div>
                      )}

                      {/* Notes */}

                      {transaction.notes && (
                        <div className="transaction-notes">

                          <FileText
                            size={15}
                          />

                          <span>
                            {transaction.notes}
                          </span>

                        </div>
                      )}

                      {/* Actions */}

                      <div className="transaction-card-actions">

                        <button
                          type="button"
                          className="transaction-action-button transaction-edit-button"
                          onClick={() =>
                            handleEditClick(
                              transaction
                            )
                          }
                          disabled={
                            deletingId ===
                            transaction.id
                          }
                        >
                          <Pencil
                            size={15}
                          />

                          <span>
                            {t(
                              'transactions.edit'
                            )}
                          </span>
                        </button>

                        <button
                          type="button"
                          className="transaction-action-button transaction-delete-button"
                          onClick={() =>
                            handleDelete(
                              transaction.id
                            )
                          }
                          disabled={
                            deletingId ===
                            transaction.id
                          }
                        >
                          <Trash2
                            size={15}
                          />

                          <span>
                            {deletingId ===
                            transaction.id
                              ? t(
                                  'transactions.deleting'
                                )
                              : t(
                                  'transactions.delete'
                                )}
                          </span>
                        </button>

                      </div>

                      {/* Edit Form */}

                      {editingTransaction?.id ===
                        transaction.id && (

                        <div className="transaction-edit-form">

                          <div className="transaction-edit-header">

                            <div>
                              <h3>
                                {t(
                                  'transactions.editTransaction'
                                )}
                              </h3>
                            </div>

                            <button
                              type="button"
                              className="transaction-edit-close"
                              onClick={
                                handleCancelEdit
                              }
                            >
                              <X size={17} />
                            </button>

                          </div>

                          <form
                            onSubmit={
                              handleEditSubmit
                            }
                          >

                            <div className="transaction-form-field">

                              <label>
                                {t(
                                  'transactions.type'
                                )}
                              </label>

                              <select
                                value={
                                  editType
                                }
                                onChange={(e) =>
                                  handleEditTypeChange(
                                    e.target
                                      .value
                                  )
                                }
                              >
                                <option value="income">
                                  {t(
                                    'transactions.income'
                                  )}
                                </option>

                                <option value="expense">
                                  {t(
                                    'transactions.expense'
                                  )}
                                </option>
                              </select>

                            </div>

                            <div className="transaction-form-field">

                              <label>
                                {t(
                                  'transactions.titleLabel'
                                )}
                              </label>

                              <input
                                type="text"
                                value={
                                  editTitle
                                }
                                onChange={(e) =>
                                  setEditTitle(
                                    e.target
                                      .value
                                  )
                                }
                              />

                            </div>

                            <div className="transaction-form-field">

                              <label>
                                {t(
                                  'transactions.category'
                                )}
                              </label>

                              <select
                                value={
                                  editCategoryId
                                }
                                onChange={(e) =>
                                  setEditCategoryId(
                                    e.target
                                      .value
                                  )
                                }
                                disabled={
                                  editCategoriesLoading
                                }
                              >
                                <option value="">
                                  {editCategoriesLoading
                                    ? t(
                                        'transactions.loadingCategories'
                                      )
                                    : t(
                                        'transactions.selectCategory'
                                      )}
                                </option>

                                {editCategories.map(
                                  (
                                    category
                                  ) => (
                                    <option
                                      key={
                                        category.id
                                      }
                                      value={
                                        category.id
                                      }
                                    >
                                      {
                                        category.name
                                      }
                                    </option>
                                  )
                                )}
                              </select>

                            </div>

                            <div className="transaction-form-field">

                              <label>
                                {editType ===
                                'income'
                                  ? t(
                                      'transactions.paidIntoAccount'
                                    )
                                  : t(
                                      'transactions.paidFromAccount'
                                    )}
                              </label>

                              <select
                                value={
                                  editAccountId
                                }
                                onChange={(e) =>
                                  setEditAccountId(
                                    e.target
                                      .value
                                  )
                                }
                                disabled={
                                  accountsLoading
                                }
                              >
                                <option value="">
                                  {accountsLoading
                                    ? t(
                                        'transactions.loadingAccounts'
                                      )
                                    : t(
                                        'transactions.selectAccount'
                                      )}
                                </option>

                                {accounts.map(
                                  (
                                    account
                                  ) => (
                                    <option
                                      key={
                                        account.id
                                      }
                                      value={
                                        account.id
                                      }
                                    >
                                      {
                                        account.name
                                      } (
                                      {
                                        account.currency
                                      }
                                      )
                                    </option>
                                  )
                                )}
                              </select>

                            </div>

                            <div className="transaction-form-field">

                              <label>
                                {t(
                                  'transactions.totalAmount'
                                )}
                              </label>

                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                  editTotalAmount
                                }
                                onChange={(e) =>
                                  setEditTotalAmount(
                                    e.target
                                      .value
                                  )
                                }
                              />

                            </div>

                            <div className="transaction-form-field">

                              <label>
                                {t(
                                  'transactions.paidAmount'
                                )}
                              </label>

                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                  editPaidAmount
                                }
                                onChange={(e) =>
                                  setEditPaidAmount(
                                    e.target
                                      .value
                                  )
                                }
                              />

                            </div>

                            <div className="transaction-form-field">

                              <label>
                                {t(
                                  'transactions.outstanding'
                                )}
                              </label>

                              <div className="transaction-outstanding-input">
                                {editOutstanding >=
                                0
                                  ? editOutstanding.toFixed(
                                      2
                                    )
                                  : '0.00'}
                              </div>

                            </div>

                            {editOutstanding >
                              0 && (
                              <div className="transaction-form-field">

                                <label>
                                  {editType ===
                                  'income'
                                    ? t(
                                        'transactions.whoOwesYou'
                                      )
                                    : t(
                                        'transactions.whoDoYouOwe'
                                      )}
                                </label>

                                <input
                                  type="text"
                                  value={
                                    editPartyName
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    setEditPartyName(
                                      e.target
                                        .value
                                    )
                                  }
                                  placeholder={
                                    editType ===
                                    'income'
                                      ? t(
                                          'transactions.owedYouPlaceholder'
                                        )
                                      : t(
                                          'transactions.owePlaceholder'
                                        )
                                  }
                                />

                              </div>
                            )}

                            <div className="transaction-form-field">

                              <label>
                                {t(
                                  'transactions.date'
                                )}
                              </label>

                              <input
                                type="date"
                                value={
                                  editTransactionDate
                                }
                                onChange={(e) =>
                                  setEditTransactionDate(
                                    e.target
                                      .value
                                  )
                                }
                              />

                            </div>

                            <div className="transaction-form-field transaction-notes-field">

                              <label>
                                {t(
                                  'transactions.notes'
                                )}
                              </label>

                              <textarea
                                value={
                                  editNotes
                                }
                                onChange={(e) =>
                                  setEditNotes(
                                    e.target
                                      .value
                                  )
                                }
                                rows="3"
                              />

                            </div>

                            <div className="transaction-edit-actions">

                              <button
                                type="submit"
                                className="primary-button"
                                disabled={
                                  editSaving
                                }
                              >
                                <Save
                                  size={15}
                                />

                                <span>
                                  {editSaving
                                    ? t(
                                        'transactions.saving'
                                      )
                                    : t(
                                        'transactions.saveChanges'
                                      )}
                                </span>
                              </button>

                              <button
                                type="button"
                                className="secondary-button"
                                onClick={
                                  handleCancelEdit
                                }
                              >
                                {t(
                                  'transactions.cancel'
                                )}
                              </button>

                            </div>

                            {editError && (
                              <p className="transaction-form-error">
                                {editError}
                              </p>
                            )}

                          </form>

                        </div>
                      )}

                    </article>
                  )
                }
              )}

            </div>
          )}

      </section>

    </div>
  )
}

export default Transactions