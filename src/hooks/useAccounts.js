import { useCallback, useEffect, useState } from 'react'

import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} from '../services/accounts'

export function useAccounts() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initial fetch
  useEffect(() => {
    let cancelled = false

    const fetchInitialAccounts = async () => {
      const { accounts: data, error: fetchError } =
        await getAccounts()

      if (cancelled) return

      if (fetchError) {
        setError(fetchError)
        setLoading(false)
        return
      }

      setAccounts(data)
      setLoading(false)
    }

    fetchInitialAccounts()

    return () => {
      cancelled = true
    }
  }, [])

  // Manual refresh
  const loadAccounts = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { accounts: data, error: fetchError } =
      await getAccounts()

    if (fetchError) {
      setError(fetchError)
      setLoading(false)

      return {
        accounts: [],
        error: fetchError,
      }
    }

    setAccounts(data)
    setLoading(false)

    return {
      accounts: data,
      error: null,
    }
  }, [])

  const addAccount = async (accountData) => {
    setError(null)

    const { account, error: createError } =
      await createAccount(accountData)

    if (createError) {
      setError(createError)

      return {
        account: null,
        error: createError,
      }
    }

    setAccounts((currentAccounts) => [
      account,
      ...currentAccounts,
    ])

    return {
      account,
      error: null,
    }
  }

  const editAccount = async (id, updates) => {
    setError(null)

    const { account, error: updateError } =
      await updateAccount(id, updates)

    if (updateError) {
      setError(updateError)

      return {
        account: null,
        error: updateError,
      }
    }

    setAccounts((currentAccounts) =>
      currentAccounts.map((item) =>
        item.id === id ? account : item
      )
    )

    return {
      account,
      error: null,
    }
  }

  const removeAccount = async (id) => {
    setError(null)

    const { error: deleteError } =
      await deleteAccount(id)

    if (deleteError) {
      setError(deleteError)

      return {
        error: deleteError,
      }
    }

    setAccounts((currentAccounts) =>
      currentAccounts.filter((item) => item.id !== id)
    )

    return {
      error: null,
    }
  }

  return {
    accounts,
    loading,
    error,
    loadAccounts,
    addAccount,
    editAccount,
    removeAccount,
  }
}