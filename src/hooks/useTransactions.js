import { useCallback, useEffect, useState } from 'react'

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../services/transactions'

export function useTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadTransactions = useCallback(async () => {
    setLoading(true)
    setError(null)

    const {
      transactions: data,
      error: fetchError,
    } = await getTransactions()

    if (fetchError) {
      setError(fetchError)
      setLoading(false)

      return {
        transactions: [],
        error: fetchError,
      }
    }

    setTransactions(data)
    setLoading(false)

    return {
      transactions: data,
      error: null,
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const fetchInitialTransactions = async () => {
      const {
        transactions: data,
        error: fetchError,
      } = await getTransactions()

      if (cancelled) return

      if (fetchError) {
        setError(fetchError)
        setLoading(false)
        return
      }

      setTransactions(data)
      setLoading(false)
    }

    fetchInitialTransactions()

    return () => {
      cancelled = true
    }
  }, [])

  const addTransaction = async (transactionData) => {
    setError(null)

    const {
      transaction,
      error: createError,
    } = await createTransaction(transactionData)

    if (createError) {
      setError(createError)

      return {
        transaction: null,
        error: createError,
      }
    }

    setTransactions((currentTransactions) => [
      transaction,
      ...currentTransactions,
    ])

    return {
      transaction,
      error: null,
    }
  }

  const editTransaction = async (id, updates) => {
    setError(null)

    const {
      transaction,
      error: updateError,
    } = await updateTransaction(id, updates)

    if (updateError) {
      setError(updateError)

      return {
        transaction: null,
        error: updateError,
      }
    }

    setTransactions((currentTransactions) =>
      currentTransactions.map((item) =>
        item.id === id ? transaction : item
      )
    )

    return {
      transaction,
      error: null,
    }
  }

  const removeTransaction = async (id) => {
    setError(null)

    const {
      error: deleteError,
    } = await deleteTransaction(id)

    if (deleteError) {
      setError(deleteError)

      return {
        error: deleteError,
      }
    }

    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (item) => item.id !== id
      )
    )

    return {
      error: null,
    }
  }

  return {
    transactions,
    loading,
    error,
    loadTransactions,
    addTransaction,
    editTransaction,
    removeTransaction,
  }
}