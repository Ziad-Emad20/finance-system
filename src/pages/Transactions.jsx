import { useState } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { useAccounts } from '../hooks/useAccounts'
import { useCategories } from '../hooks/useCategories'

function Transactions() {
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
  const [editingTransaction, setEditingTransaction] = useState(null)

  const [editType, setEditType] = useState('income')
  const [editTitle, setEditTitle] = useState('')
  const [editAccountId, setEditAccountId] = useState('')
  const [editCategoryId, setEditCategoryId] = useState('')
  const [editTotalAmount, setEditTotalAmount] = useState('')
  const [editPaidAmount, setEditPaidAmount] = useState('')
  const [editPartyName, setEditPartyName] = useState('')
  const [editTransactionDate, setEditTransactionDate] = useState('')
  const [editNotes, setEditNotes] = useState('')

  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')

  // Delete state
  const [deletingId, setDeletingId] = useState(null)

  // Add outstanding
  const outstanding =
    Number(totalAmount || 0) - Number(paidAmount || 0)

  // Edit categories
  const {
    categories: editCategories,
    loading: editCategoriesLoading,
  } = useCategories(editType)

  const editOutstanding =
    Number(editTotalAmount || 0) -
    Number(editPaidAmount || 0)

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
      setFormError('Please enter a transaction title.')
      return
    }

    if (!accountId) {
      setFormError('Please select an account.')
      return
    }

    if (!categoryId) {
      setFormError('Please select a category.')
      return
    }

    if (totalAmount === '') {
      setFormError('Please enter the total amount.')
      return
    }

    const numericTotal = Number(totalAmount)
    const numericPaid = Number(paidAmount || 0)

    if (
      !Number.isFinite(numericTotal) ||
      numericTotal <= 0
    ) {
      setFormError('Please enter a valid total amount.')
      return
    }

    if (
      !Number.isFinite(numericPaid) ||
      numericPaid < 0
    ) {
      setFormError('Please enter a valid paid amount.')
      return
    }

    if (numericPaid > numericTotal) {
      setFormError(
        'Paid amount cannot be greater than total amount.'
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
          ? 'Please enter who owes you.'
          : 'Please enter who you owe.'
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

    setSuccess('Transaction created successfully.')
    setSaving(false)

    console.log('Created transaction:', transaction)
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
    setEditPartyName(transaction.party_name || '')
    setEditTransactionDate(transaction.transaction_date)
    setEditNotes(transaction.notes || '')

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
      setEditError('Please enter a transaction title.')
      return
    }

    if (!editAccountId) {
      setEditError('Please select an account.')
      return
    }

    if (!editCategoryId) {
      setEditError('Please select a category.')
      return
    }

    if (editTotalAmount === '') {
      setEditError('Please enter the total amount.')
      return
    }

    const numericTotal = Number(editTotalAmount)
    const numericPaid = Number(editPaidAmount || 0)

    if (
      !Number.isFinite(numericTotal) ||
      numericTotal <= 0
    ) {
      setEditError('Please enter a valid total amount.')
      return
    }

    if (
      !Number.isFinite(numericPaid) ||
      numericPaid < 0
    ) {
      setEditError('Please enter a valid paid amount.')
      return
    }

    if (numericPaid > numericTotal) {
      setEditError(
        'Paid amount cannot be greater than total amount.'
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
          ? 'Please enter who owes you.'
          : 'Please enter who you owe.'
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
      setEditError(updateError.message)
      setEditSaving(false)
      return
    }

    setEditingTransaction(null)
    setEditSaving(false)

    setSuccess('Transaction updated successfully.')

    console.log('Updated transaction:', transaction)
  }

  // -----------------------------
  // Delete Transaction
  // -----------------------------

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this transaction?'
    )

    if (!confirmed) return

    setDeletingId(id)
    setFormError('')
    setSuccess('')

    const { error: deleteError } =
      await removeTransaction(id)

    if (deleteError) {
      setFormError(deleteError.message)
      setDeletingId(null)
      return
    }

    if (editingTransaction?.id === id) {
      setEditingTransaction(null)
    }

    setDeletingId(null)
    setSuccess('Transaction deleted successfully.')
  }

  return (
    <div className="transactions-page">

      <div className="transactions-header">
        <div>
          <h1>Transactions</h1>
          <p>Manage your income and expenses.</p>
        </div>
      </div>

      {/* Add Transaction */}

      <div className="transaction-form-section">

        <h2>Add Transaction</h2>

        <form onSubmit={handleSubmit}>

          <div>
            <label>Type</label>

            <select
              value={type}
              onChange={(e) =>
                handleTypeChange(e.target.value)
              }
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label>Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="e.g. Shopify Project"
            />
          </div>

          <div>
            <label>Category</label>

            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value)
              }
              disabled={categoriesLoading}
            >
              <option value="">
                {categoriesLoading
                  ? 'Loading categories...'
                  : 'Select category'}
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>
              {type === 'income'
                ? 'Paid Into Account'
                : 'Paid From Account'}
            </label>

            <select
              value={accountId}
              onChange={(e) =>
                setAccountId(e.target.value)
              }
              disabled={accountsLoading}
            >
              <option value="">
                {accountsLoading
                  ? 'Loading accounts...'
                  : 'Select account'}
              </option>

              {accounts.map((account) => (
                <option
                  key={account.id}
                  value={account.id}
                >
                  {account.name} ({account.currency})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Total Amount</label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={totalAmount}
              onChange={(e) =>
                setTotalAmount(e.target.value)
              }
              placeholder="0.00"
            />
          </div>

          <div>
            <label>Paid Amount</label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={paidAmount}
              onChange={(e) =>
                setPaidAmount(e.target.value)
              }
              placeholder="0.00"
            />
          </div>

          <div>
            <label>Outstanding</label>

            <input
              type="text"
              value={
                outstanding >= 0
                  ? outstanding.toFixed(2)
                  : '0.00'
              }
              readOnly
            />
          </div>

          {outstanding > 0 && (
            <div>
              <label>
                {type === 'income'
                  ? 'Who owes you?'
                  : 'Who do you owe?'}
              </label>

              <input
                type="text"
                value={partyName}
                onChange={(e) =>
                  setPartyName(e.target.value)
                }
                placeholder={
                  type === 'income'
                    ? 'e.g. ABC Company'
                    : 'e.g. Laptop Store'
                }
              />
            </div>
          )}

          <div>
            <label>Date</label>

            <input
              type="date"
              value={transactionDate}
              onChange={(e) =>
                setTransactionDate(e.target.value)
              }
            />
          </div>

          <div>
            <label>Notes</label>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Optional notes..."
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            {saving
              ? 'Creating...'
              : 'Create Transaction'}
          </button>

          {formError && <p>{formError}</p>}

          {success && <p>{success}</p>}

        </form>

      </div>

      {/* Transactions List */}

      <div className="transactions-list-section">

        <h2>Recent Transactions</h2>

        {loading && (
          <p>Loading transactions...</p>
        )}

        {!loading && error && (
          <p>{error.message}</p>
        )}

        {!loading &&
          !error &&
          transactions.length === 0 && (
            <p>No transactions yet.</p>
          )}

        {!loading &&
          !error &&
          transactions.length > 0 && (
            <div>

              {transactions.map((transaction) => {

                const outstandingAmount =
                  Number(transaction.total_amount) -
                  Number(transaction.paid_amount)

                return (
                  <div key={transaction.id}>

                    <h3>{transaction.title}</h3>

                    <p>
                      Type: {transaction.type}
                    </p>

                    <p>
                      Category:{' '}
                      {transaction.categories?.name}
                    </p>

                    <p>
                      Account:{' '}
                      {transaction.accounts?.name}
                    </p>

                    <p>
                      Total:{' '}
                      {transaction.total_amount}{' '}
                      {transaction.accounts?.currency}
                    </p>

                    <p>
                      Paid:{' '}
                      {transaction.paid_amount}{' '}
                      {transaction.accounts?.currency}
                    </p>

                    <p>
                      Outstanding:{' '}
                      {outstandingAmount}{' '}
                      {transaction.accounts?.currency}
                    </p>

                    {transaction.party_name && (
                      <p>
                        {transaction.type === 'income'
                          ? 'Owes you:'
                          : 'You owe:'}{' '}
                        {transaction.party_name}
                      </p>
                    )}

                    <p>
                      Date:{' '}
                      {transaction.transaction_date}
                    </p>

                    {transaction.notes && (
                      <p>
                        Notes: {transaction.notes}
                      </p>
                    )}

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() =>
                        handleEditClick(transaction)
                      }
                      disabled={deletingId === transaction.id}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() =>
                        handleDelete(transaction.id)
                      }
                      disabled={deletingId === transaction.id}
                    >
                      {deletingId === transaction.id
                        ? 'Deleting...'
                        : 'Delete'}
                    </button>

                    {/* Edit Form */}

                    {editingTransaction?.id ===
                      transaction.id && (
                      <div className="transaction-edit-form">

                        <h3>Edit Transaction</h3>

                        <form onSubmit={handleEditSubmit}>

                          <div>
                            <label>Type</label>

                            <select
                              value={editType}
                              onChange={(e) =>
                                handleEditTypeChange(
                                  e.target.value
                                )
                              }
                            >
                              <option value="income">
                                Income
                              </option>

                              <option value="expense">
                                Expense
                              </option>
                            </select>
                          </div>

                          <div>
                            <label>Title</label>

                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) =>
                                setEditTitle(
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <label>Category</label>

                            <select
                              value={editCategoryId}
                              onChange={(e) =>
                                setEditCategoryId(
                                  e.target.value
                                )
                              }
                              disabled={
                                editCategoriesLoading
                              }
                            >
                              <option value="">
                                {editCategoriesLoading
                                  ? 'Loading categories...'
                                  : 'Select category'}
                              </option>

                              {editCategories.map(
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

                          <div>
                            <label>
                              {editType === 'income'
                                ? 'Paid Into Account'
                                : 'Paid From Account'}
                            </label>

                            <select
                              value={editAccountId}
                              onChange={(e) =>
                                setEditAccountId(
                                  e.target.value
                                )
                              }
                              disabled={accountsLoading}
                            >
                              <option value="">
                                {accountsLoading
                                  ? 'Loading accounts...'
                                  : 'Select account'}
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

                          <div>
                            <label>
                              Total Amount
                            </label>

                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={editTotalAmount}
                              onChange={(e) =>
                                setEditTotalAmount(
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <label>
                              Paid Amount
                            </label>

                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={editPaidAmount}
                              onChange={(e) =>
                                setEditPaidAmount(
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <label>
                              Outstanding
                            </label>

                            <input
                              type="text"
                              value={
                                editOutstanding >= 0
                                  ? editOutstanding.toFixed(2)
                                  : '0.00'
                              }
                              readOnly
                            />
                          </div>

                          {editOutstanding > 0 && (
                            <div>
                              <label>
                                {editType === 'income'
                                  ? 'Who owes you?'
                                  : 'Who do you owe?'}
                              </label>

                              <input
                                type="text"
                                value={editPartyName}
                                onChange={(e) =>
                                  setEditPartyName(
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  editType === 'income'
                                    ? 'e.g. ABC Company'
                                    : 'e.g. Laptop Store'
                                }
                              />
                            </div>
                          )}

                          <div>
                            <label>Date</label>

                            <input
                              type="date"
                              value={
                                editTransactionDate
                              }
                              onChange={(e) =>
                                setEditTransactionDate(
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <label>Notes</label>

                            <textarea
                              value={editNotes}
                              onChange={(e) =>
                                setEditNotes(
                                  e.target.value
                                )
                              }
                              rows="3"
                            />
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
                )
              })}

            </div>
          )}

      </div>

    </div>
  )
}

export default Transactions