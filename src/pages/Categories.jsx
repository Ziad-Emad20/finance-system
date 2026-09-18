import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCategories } from '../hooks/useCategories'

import './Categories.css'

function Categories() {
  const { t } = useTranslation()

  const {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    removeCategory,
  } = useCategories()

  const [name, setName] = useState('')
  const [type, setType] = useState('income')

  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')

  // Edit state
  const [editingCategory, setEditingCategory] = useState(null)
  const [editName, setEditName] = useState('')
  const [editType, setEditType] = useState('income')
  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')

  // Delete state
  const [deletingCategoryId, setDeletingCategoryId] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setFormError('')
    setSuccess('')

    if (!name.trim()) {
      setFormError(
        t('categories.pleaseEnterName')
      )
      return
    }

    setSaving(true)

    const {
      category,
      error: createError,
    } = await addCategory({
      name: name.trim(),
      type,
    })

    if (createError) {
      setFormError(createError.message)
      setSaving(false)
      return
    }

    setName('')
    setType('income')

    setSuccess(
      t('categories.categoryCreated')
    )

    setSaving(false)

    console.log('Created category:', category)
  }

  // Start editing
  const handleEditClick = (category) => {
    setEditingCategory(category)
    setEditName(category.name)
    setEditType(category.type)
    setEditError('')
    setSuccess('')
    setDeleteError('')
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingCategory(null)
    setEditError('')
  }

  // Save edit
  const handleEditSubmit = async (e) => {
    e.preventDefault()

    setEditError('')
    setSuccess('')

    if (!editName.trim()) {
      setEditError(
        t('categories.pleaseEnterName')
      )
      return
    }

    setEditSaving(true)

    const {
      error: updateError,
    } = await editCategory(
      editingCategory.id,
      {
        name: editName.trim(),
        type: editType,
      }
    )

    if (updateError) {
      setEditError(updateError.message)
      setEditSaving(false)
      return
    }

    setEditingCategory(null)
    setEditSaving(false)

    setSuccess(
      t('categories.categoryUpdated')
    )
  }

  // Delete category
  const handleDeleteClick = async (category) => {
    const confirmed = window.confirm(
      t('categories.confirmDelete', {
        name: category.name,
      })
    )

    if (!confirmed) {
      return
    }

    setDeletingCategoryId(category.id)
    setDeleteError('')
    setSuccess('')

    const {
      error: deleteError,
    } = await removeCategory(category.id)

    if (deleteError) {
      setDeleteError(deleteError.message)
      setDeletingCategoryId(null)
      return
    }

    if (editingCategory?.id === category.id) {
      setEditingCategory(null)
    }

    setDeletingCategoryId(null)

    setSuccess(
      t('categories.categoryDeleted')
    )
  }

  return (
    <div className="categories-page">

      <div className="categories-header">
        <div>
          <h1>{t('categories.title')}</h1>

          <p>
            {t('categories.subtitle')}
          </p>
        </div>
      </div>

      {/* Add Category */}

      <div className="category-form-section">

        <h2>
          {t('categories.addCategory')}
        </h2>

        <form onSubmit={handleSubmit}>

          <div>
            <label>
              {t('categories.categoryName')}
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder={t(
                'categories.namePlaceholder'
              )}
            />
          </div>

          <div>
            <label>
              {t('categories.categoryType')}
            </label>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              <option value="income">
                {t('categories.income')}
              </option>

              <option value="expense">
                {t('categories.expense')}
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            {saving
              ? t('categories.creating')
              : t('categories.createCategory')}
          </button>

          {formError && (
            <p>{formError}</p>
          )}

          {success && (
            <p>{success}</p>
          )}

        </form>

      </div>

      {/* Categories List */}

      <div className="categories-list-section">

        <h2>
          {t('categories.yourCategories')}
        </h2>

        {loading && (
          <p>
            {t('categories.loading')}
          </p>
        )}

        {!loading && error && (
          <p>{error.message}</p>
        )}

        {!loading &&
          !error &&
          categories.length === 0 && (
            <p>
              {t('categories.noCategories')}
            </p>
          )}

        {!loading &&
          !error &&
          categories.length > 0 && (
            <div>

              {categories.map((category) => (
                <div key={category.id}>

                  <h3>{category.name}</h3>

                  <p>
                    {t('categories.type')}:{' '}
                    {category.type === 'income'
                      ? t('categories.income')
                      : t('categories.expense')}
                  </p>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                      handleEditClick(category)
                    }
                  >
                    {t('categories.edit')}
                  </button>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                      handleDeleteClick(category)
                    }
                    disabled={
                      deletingCategoryId === category.id
                    }
                  >
                    {deletingCategoryId === category.id
                      ? t('categories.deleting')
                      : t('categories.delete')}
                  </button>

                  {/* Edit Category */}

                  {editingCategory?.id === category.id && (
                    <div className="category-edit-form">

                      <h3>
                        {t('categories.editCategory')}
                      </h3>

                      <form onSubmit={handleEditSubmit}>

                        <div>
                          <label>
                            {t('categories.categoryName')}
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

                        <div>
                          <label>
                            {t('categories.categoryType')}
                          </label>

                          <select
                            value={editType}
                            onChange={(e) =>
                              setEditType(
                                e.target.value
                              )
                            }
                          >
                            <option value="income">
                              {t('categories.income')}
                            </option>

                            <option value="expense">
                              {t('categories.expense')}
                            </option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="primary-button"
                          disabled={editSaving}
                        >
                          {editSaving
                            ? t('categories.saving')
                            : t('categories.saveChanges')}
                        </button>

                        <button
                          type="button"
                          className="secondary-button"
                          onClick={handleCancelEdit}
                        >
                          {t('categories.cancel')}
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

export default Categories