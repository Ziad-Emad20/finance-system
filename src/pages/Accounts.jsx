import { useState } from 'react'
import { useAccounts } from '../hooks/useAccounts'

import './Accounts.css'

function Accounts() {
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    setFormError('')
    setSuccess('')

    if (!name.trim()) {
      setFormError('Please enter an account name.')
      return
    }

    setSaving(true)

    const { account, error: createError } = await addAccount({
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

    setSuccess('Account created successfully.')
    setSaving(false)

    console.log('Created account:', account)
  }

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
      setEditError('Please enter an account name.')
      return
    }

    if (editBalance === '') {
      setEditError('Please enter a balance.')
      return
    }

    const numericBalance = Number(editBalance)

    if (!Number.isFinite(numericBalance)) {
      setEditError('Please enter a valid balance.')
      return
    }

    setEditSaving(true)

    const { error: updateError } = await editAccount(
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
    setSuccess('Account updated successfully.')
  }

  const handleDeleteClick = async (account) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${account.name}"?`
    )

    if (!confirmed) {
      return
    }

    setDeletingAccountId(account.id)
    setDeleteError('')
    setSuccess('')

    const { error: deleteError } = await removeAccount(account.id)

    if (deleteError) {
      setDeleteError(deleteError.message)
      setDeletingAccountId(null)
      return
    }

    if (editingAccount?.id === account.id) {
      setEditingAccount(null)
    }

    setDeletingAccountId(null)
    setSuccess('Account deleted successfully.')
  }

  return (
    <div className="accounts-page">

      <div className="accounts-header">
        <div>
          <h1>Accounts</h1>
          <p>Manage your accounts.</p>
        </div>
      </div>

      {/* Add Account */}
      <div className="account-form-section">
        <h2>Add Account</h2>

        <form onSubmit={handleSubmit}>

          <div>
            <label>Account Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cash"
            />
          </div>

          <div>
            <label>Account Type</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
              <option value="wallet">Wallet</option>
              <option value="savings">Savings</option>
            </select>
          </div>

          <div>
            <label>Currency</label>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="EGP">EGP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="SAR">SAR</option>
            </select>
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            {saving ? 'Creating...' : 'Create Account'}
          </button>

          {formError && (
            <p>{formError}</p>
          )}

          {success && (
            <p>{success}</p>
          )}

        </form>
      </div>

      {/* Accounts List */}
      <div className="accounts-list-section">
        <h2>Your Accounts</h2>

        {loading && (
          <p>Loading accounts...</p>
        )}

        {!loading && error && (
          <p>{error.message}</p>
        )}

        {!loading && !error && accounts.length === 0 && (
          <p>No accounts yet.</p>
        )}

        {!loading && !error && accounts.length > 0 && (
          <div>

            {accounts.map((account) => (
              <div key={account.id}>

                <h3>{account.name}</h3>

                <p>
                  Type: {account.type}
                </p>

                <p>
                  Balance: {account.balance} {account.currency}
                </p>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => handleEditClick(account)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => handleDeleteClick(account)}
                  disabled={deletingAccountId === account.id}
                >
                  {deletingAccountId === account.id
                    ? 'Deleting...'
                    : 'Delete'}
                </button>

                {/* Edit Account */}
                {editingAccount?.id === account.id && (
                  <div className="account-edit-form">

                    <h3>Edit Account</h3>

                    <form onSubmit={handleEditSubmit}>

                      <div>
                        <label>Account Name</label>

                        <input
                          type="text"
                          value={editName}
                          onChange={(e) =>
                            setEditName(e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label>Account Type</label>

                        <select
                          value={editType}
                          onChange={(e) =>
                            setEditType(e.target.value)
                          }
                        >
                          <option value="cash">Cash</option>
                          <option value="bank">Bank</option>
                          <option value="wallet">Wallet</option>
                          <option value="savings">Savings</option>
                        </select>
                      </div>

                      <div>
                        <label>Balance</label>

                        <input
                          type="number"
                          step="0.01"
                          value={editBalance}
                          onChange={(e) =>
                            setEditBalance(e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label>Currency</label>

                        <select
                          value={editCurrency}
                          onChange={(e) =>
                            setEditCurrency(e.target.value)
                          }
                        >
                          <option value="EGP">EGP</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="SAR">SAR</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="primary-button"
                        disabled={editSaving}
                      >
                        {editSaving
                          ? 'Saving...'
                          : 'Save Changes'}
                      </button>

                      <button
                        type="button"
                        className="secondary-button"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>

                      {editError && (
                        <p>{editError}</p>
                      )}

                    </form>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

        {deleteError && (
          <p>{deleteError}</p>
        )}

      </div>

    </div>
  )
}

export default Accounts