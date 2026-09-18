import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Wallet,
  Landmark,
  CreditCard,
  PiggyBank,
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
} from 'lucide-react'

import { useAccounts } from '../hooks/useAccounts'

import './Accounts.css'

function Accounts() {
  const { t } = useTranslation()

  const {
    accounts,
    loading,
    error,
    addAccount,
    editAccount,
    removeAccount,
  } = useAccounts()

  const [name, setName] = useState('')
  const [type, setType] = useState('cash')
  const [currency, setCurrency] = useState('EGP')

  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')

  // Edit state
  const [editingAccount, setEditingAccount] = useState(null)
  const [editName, setEditName] = useState('')
  const [editType, setEditType] = useState('cash')
  const [editBalance, setEditBalance] = useState('')
  const [editCurrency, setEditCurrency] = useState('EGP')
  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')

  // Delete state
  const [deletingAccountId, setDeletingAccountId] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  // -----------------------------
  // Account Icon
  // -----------------------------

  const getAccountIcon = (accountType) => {
    switch (accountType) {
      case 'bank':
        return Landmark

      case 'wallet':
        return CreditCard

      case 'savings':
        return PiggyBank

      default:
        return Wallet
    }
  }

  // -----------------------------
  // Account Icon Class
  // -----------------------------

  const getAccountIconClass = (accountType) => {
    switch (accountType) {
      case 'bank':
        return 'account-icon-bank'

      case 'wallet':
        return 'account-icon-wallet'

      case 'savings':
        return 'account-icon-savings'

      default:
        return 'account-icon-cash'
    }
  }

  // -----------------------------
  // Format Balance
  // -----------------------------

  const formatBalance = (balance, currency) => {
    return `${Number(balance || 0).toLocaleString(
      'en-US',
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    )} ${currency}`
  }

  // -----------------------------
  // Create Account
  // -----------------------------

  const handleSubmit = async (e) => {
    e.preventDefault()

    setFormError('')
    setSuccess('')

    if (!name.trim()) {
      setFormError(
        t('accounts.pleaseEnterName')
      )
      return
    }

    setSaving(true)

    const { account, error: createError } =
      await addAccount({
        name: name.trim(),
        type,
        currency,
      })

    if (createError) {
      setFormError(createError.message)
      setSaving(false)
      return
    }

    setName('')
    setType('cash')
    setCurrency('EGP')

    setSuccess(
      t('accounts.accountCreated')
    )

    setSaving(false)

    console.log(
      'Created account:',
      account
    )
  }

  // -----------------------------
  // Edit
  // -----------------------------

  const handleEditClick = (account) => {
    setEditingAccount(account)

    setEditName(account.name)
    setEditType(account.type)
    setEditBalance(account.balance)
    setEditCurrency(account.currency)

    setEditError('')
    setSuccess('')
  }

  const handleCancelEdit = () => {
    setEditingAccount(null)
    setEditError('')
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    setEditError('')
    setSuccess('')

    if (!editName.trim()) {
      setEditError(
        t('accounts.pleaseEnterName')
      )
      return
    }

    if (editBalance === '') {
      setEditError(
        t('accounts.pleaseEnterBalance')
      )
      return
    }

    const numericBalance =
      Number(editBalance)

    if (!Number.isFinite(numericBalance)) {
      setEditError(
        t('accounts.invalidBalance')
      )
      return
    }

    setEditSaving(true)

    const { error: updateError } =
      await editAccount(
        editingAccount.id,
        {
          name: editName.trim(),
          type: editType,
          balance: numericBalance,
          currency: editCurrency,
        }
      )

    if (updateError) {
      setEditError(updateError.message)
      setEditSaving(false)
      return
    }

    setEditingAccount(null)
    setEditSaving(false)

    setSuccess(
      t('accounts.accountUpdated')
    )
  }

  // -----------------------------
  // Delete
  // -----------------------------

  const handleDeleteClick = async (account) => {
    const confirmed =
      window.confirm(
        t('accounts.confirmDelete', {
          name: account.name,
        })
      )

    if (!confirmed) {
      return
    }

    setDeletingAccountId(account.id)
    setDeleteError('')
    setSuccess('')

    const { error: deleteError } =
      await removeAccount(account.id)

    if (deleteError) {
      setDeleteError(
        deleteError.message
      )
      setDeletingAccountId(null)
      return
    }

    if (
      editingAccount?.id ===
      account.id
    ) {
      setEditingAccount(null)
    }

    setDeletingAccountId(null)

    setSuccess(
      t('accounts.accountDeleted')
    )
  }

  return (
    <div className="accounts-page">

      {/* =========================
          Header
      ========================= */}

      <div className="accounts-header">

        <div>
          <h1>
            {t('accounts.title')}
          </h1>

          <p>
            {t('accounts.subtitle')}
          </p>
        </div>

        <button
          type="button"
          className="primary-button accounts-add-button"
          onClick={() =>
            document
              .getElementById(
                'add-account-form'
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
            {t('accounts.addAccount')}
          </span>
        </button>

      </div>

      {/* =========================
          Messages
      ========================= */}

      {success && (
        <div className="account-message account-success">
          {success}
        </div>
      )}

      {deleteError && (
        <div className="account-message account-error">
          {deleteError}
        </div>
      )}

      {/* =========================
          Add Account
      ========================= */}

      <section
        id="add-account-form"
        className="account-form-section"
      >

        <div className="account-section-heading">

          <div className="account-section-icon">
            <Plus
              size={18}
              strokeWidth={2.2}
            />
          </div>

          <div>
            <h2>
              {t('accounts.addAccount')}
            </h2>

            <p>
              {t('accounts.subtitle')}
            </p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="account-form-field">

            <label>
              {t('accounts.accountName')}
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder={t(
                'accounts.namePlaceholder'
              )}
            />

          </div>

          <div className="account-form-field">

            <label>
              {t('accounts.accountType')}
            </label>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              <option value="cash">
                {t('accounts.cash')}
              </option>

              <option value="bank">
                {t('accounts.bank')}
              </option>

              <option value="wallet">
                {t('accounts.wallet')}
              </option>

              <option value="savings">
                {t('accounts.savings')}
              </option>
            </select>

          </div>

          <div className="account-form-field">

            <label>
              {t('accounts.currency')}
            </label>

            <select
              value={currency}
              onChange={(e) =>
                setCurrency(e.target.value)
              }
            >
              <option value="EGP">
                EGP
              </option>

              <option value="USD">
                USD
              </option>

              <option value="EUR">
                EUR
              </option>

              <option value="SAR">
                SAR
              </option>
            </select>

          </div>

          <button
            type="submit"
            className="primary-button account-submit-button"
            disabled={saving}
          >
            <Plus
              size={16}
              strokeWidth={2.5}
            />

            <span>
              {saving
                ? t('accounts.creating')
                : t('accounts.createAccount')}
            </span>
          </button>

        </form>

        {formError && (
          <p className="account-form-error">
            {formError}
          </p>
        )}

      </section>

      {/* =========================
          Accounts List
      ========================= */}

      <section className="accounts-list-section">

        <div className="accounts-list-header">

          <div>
            <h2>
              {t('accounts.yourAccounts')}
            </h2>

            <p>
              {accounts.length}{' '}
              {accounts.length === 1
                ? 'account'
                : 'accounts'}
            </p>
          </div>

        </div>

        {/* Loading */}

        {loading && (
          <div className="accounts-state">
            <div className="accounts-loading-spinner" />

            <p>
              {t('accounts.loading')}
            </p>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="accounts-state accounts-state-error">
            <p>
              {error.message}
            </p>
          </div>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          accounts.length === 0 && (
            <div className="accounts-state">

              <div className="accounts-empty-icon">
                <Wallet
                  size={28}
                  strokeWidth={1.8}
                />
              </div>

              <h3>
                {t('accounts.noAccounts')}
              </h3>

              <p>
                {t('accounts.addAccount')}
              </p>

            </div>
          )}

        {/* Cards */}

        {!loading &&
          !error &&
          accounts.length > 0 && (

            <div className="accounts-grid">

              {accounts.map((account) => {

                const AccountIcon =
                  getAccountIcon(
                    account.type
                  )

                const iconClass =
                  getAccountIconClass(
                    account.type
                  )

                return (

                  <article
                    key={account.id}
                    className={`account-card ${
                      editingAccount?.id ===
                      account.id
                        ? 'account-card-editing'
                        : ''
                    }`}
                  >

                    {/* Card Top */}

                    <div className="account-card-top">

                      <div
                        className={`account-card-icon ${iconClass}`}
                      >
                        <AccountIcon
                          size={21}
                          strokeWidth={2}
                        />
                      </div>

                      <span className="account-type-badge">
                        {t(
                          `accounts.types.${account.type}`
                        )}
                      </span>

                    </div>

                    {/* Name */}

                    <h3 className="account-card-name">
                      {account.name}
                    </h3>

                    {/* Balance */}

                    <div className="account-card-balance-label">
                      {t('accounts.balance')}
                    </div>

                    <div className="account-card-balance">
                      {formatBalance(
                        account.balance,
                        account.currency
                      )}
                    </div>

                    {/* Actions */}

                    <div className="account-card-actions">

                      <button
                        type="button"
                        className="account-action-button account-edit-button"
                        onClick={() =>
                          handleEditClick(account)
                        }
                      >
                        <Pencil
                          size={15}
                          strokeWidth={2}
                        />

                        <span>
                          {t('accounts.edit')}
                        </span>
                      </button>

                      <button
                        type="button"
                        className="account-action-button account-delete-button"
                        onClick={() =>
                          handleDeleteClick(
                            account
                          )
                        }
                        disabled={
                          deletingAccountId ===
                          account.id
                        }
                      >
                        <Trash2
                          size={15}
                          strokeWidth={2}
                        />

                        <span>
                          {deletingAccountId ===
                          account.id
                            ? t(
                                'accounts.deleting'
                              )
                            : t(
                                'accounts.delete'
                              )}
                        </span>
                      </button>

                    </div>

                    {/* Edit Form */}

                    {editingAccount?.id ===
                      account.id && (

                      <div className="account-edit-form">

                        <div className="account-edit-header">

                          <div>
                            <h3>
                              {t(
                                'accounts.editAccount'
                              )}
                            </h3>
                          </div>

                          <button
                            type="button"
                            className="account-edit-close"
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

                          <div className="account-form-field">

                            <label>
                              {t(
                                'accounts.accountName'
                              )}
                            </label>

                            <input
                              type="text"
                              value={editName}
                              onChange={(e) =>
                                setEditName(
                                  e.target.value
                                )
                              }
                            />

                          </div>

                          <div className="account-form-field">

                            <label>
                              {t(
                                'accounts.accountType'
                              )}
                            </label>

                            <select
                              value={editType}
                              onChange={(e) =>
                                setEditType(
                                  e.target.value
                                )
                              }
                            >
                              <option value="cash">
                                {t(
                                  'accounts.cash'
                                )}
                              </option>

                              <option value="bank">
                                {t(
                                  'accounts.bank'
                                )}
                              </option>

                              <option value="wallet">
                                {t(
                                  'accounts.wallet'
                                )}
                              </option>

                              <option value="savings">
                                {t(
                                  'accounts.savings'
                                )}
                              </option>
                            </select>

                          </div>

                          <div className="account-form-field">

                            <label>
                              {t(
                                'accounts.balance'
                              )}
                            </label>

                            <input
                              type="number"
                              step="0.01"
                              value={
                                editBalance
                              }
                              onChange={(e) =>
                                setEditBalance(
                                  e.target.value
                                )
                              }
                            />

                          </div>

                          <div className="account-form-field">

                            <label>
                              {t(
                                'accounts.currency'
                              )}
                            </label>

                            <select
                              value={
                                editCurrency
                              }
                              onChange={(e) =>
                                setEditCurrency(
                                  e.target.value
                                )
                              }
                            >
                              <option value="EGP">
                                EGP
                              </option>

                              <option value="USD">
                                USD
                              </option>

                              <option value="EUR">
                                EUR
                              </option>

                              <option value="SAR">
                                SAR
                              </option>
                            </select>

                          </div>

                          <div className="account-edit-actions">

                            <button
                              type="submit"
                              className="primary-button"
                              disabled={
                                editSaving
                              }
                            >
                              <Save
                                size={15}
                                strokeWidth={2.2}
                              />

                              <span>
                                {editSaving
                                  ? t(
                                      'accounts.saving'
                                    )
                                  : t(
                                      'accounts.saveChanges'
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
                                'accounts.cancel'
                              )}
                            </button>

                          </div>

                          {editError && (
                            <p className="account-form-error">
                              {editError}
                            </p>
                          )}

                        </form>

                      </div>
                    )}

                  </article>

                )
              })}

            </div>
          )}

      </section>

    </div>
  )
}

export default Accounts