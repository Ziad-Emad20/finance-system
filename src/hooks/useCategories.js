import { useCallback, useEffect, useState } from 'react'

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categories'

export function useCategories(type = null) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initial fetch
  useEffect(() => {
    let cancelled = false

    const fetchInitialCategories = async () => {
      const {
        categories: data,
        error: fetchError,
      } = await getCategories(type)

      if (cancelled) return

      if (fetchError) {
        setError(fetchError)
        setLoading(false)
        return
      }

      setCategories(data)
      setLoading(false)
    }

    fetchInitialCategories()

    return () => {
      cancelled = true
    }
  }, [type])

  // Manual refresh
  const loadCategories = useCallback(async () => {
    setLoading(true)
    setError(null)

    const {
      categories: data,
      error: fetchError,
    } = await getCategories(type)

    if (fetchError) {
      setError(fetchError)
      setLoading(false)

      return {
        categories: [],
        error: fetchError,
      }
    }

    setCategories(data)
    setLoading(false)

    return {
      categories: data,
      error: null,
    }
  }, [type])

  const addCategory = async ({ name, type: categoryType }) => {
    setError(null)

    const {
      category,
      error: createError,
    } = await createCategory({
      name,
      type: categoryType,
    })

    if (createError) {
      setError(createError)

      return {
        category: null,
        error: createError,
      }
    }

    setCategories((currentCategories) => [
      ...currentCategories,
      category,
    ])

    return {
      category,
      error: null,
    }
  }

  const editCategory = async (id, updates) => {
    setError(null)

    const {
      category,
      error: updateError,
    } = await updateCategory(id, updates)

    if (updateError) {
      setError(updateError)

      return {
        category: null,
        error: updateError,
      }
    }

    setCategories((currentCategories) =>
      currentCategories.map((item) =>
        item.id === id ? category : item
      )
    )

    return {
      category,
      error: null,
    }
  }

  const removeCategory = async (id) => {
    setError(null)

    const {
      error: deleteError,
    } = await deleteCategory(id)

    if (deleteError) {
      setError(deleteError)

      return {
        error: deleteError,
      }
    }

    setCategories((currentCategories) =>
      currentCategories.filter((item) => item.id !== id)
    )

    return {
      error: null,
    }
  }

  return {
    categories,
    loading,
    error,
    loadCategories,
    addCategory,
    editCategory,
    removeCategory,
  }
}