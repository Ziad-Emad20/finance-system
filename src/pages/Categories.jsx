import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Tags,
  Tag,
  TrendingUp,
  TrendingDown,
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
} from 'lucide-react'

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

  // Add state
  const [name, setName] = useState('')
  const [type, setType] = useState('income')

  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')

  // Edit state
  const [editingCategory, setEditingCategory] =
    useState(null)

  const [editName, setEditName] = useState('')
  const [editType, setEditType] = useState('income')
  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')

  // Delete state
  const [deletingCategoryId, setDeletingCategoryId] =
    useState(null)

  const [deleteError, setDeleteError] = useState('')

  // -----------------------------
  // Add Category
  // -----------------------------

  const handleSubmit = async (e) => {
    e.preventDefault()

    setFormError('')
    setSuccess('')
    setDeleteError('')

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

    console.log(
      'Created category:',
      category
    )
  }

  // -----------------------------
  // Start Editing
  // -----------------------------

  const handleEditClick = (category) => {
    setEditingCategory(category)

    setEditName(category.name)
    setEditType(category.type)

    setEditError('')
    setSuccess('')
    setDeleteError('')
  }

  // -----------------------------
  // Cancel Editing
  // -----------------------------

  const handleCancelEdit = () => {
    setEditingCategory(null)
    setEditError('')
  }

  // -----------------------------
  // Save Edit
  // -----------------------------

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    setEditError('')
    setSuccess('')
    setDeleteError('')

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
      setEditError(
        updateError.message
      )
      setEditSaving(false)
      return
    }

    setEditingCategory(null)
    setEditSaving(false)

    setSuccess(
      t('categories.categoryUpdated')
    )
  }

  // -----------------------------
  // Delete Category
  // -----------------------------

  const handleDeleteClick = async (category) => {
    const confirmed =
      window.confirm(
        t('categories.confirmDelete', {
          name: category.name,
        })
      )

    if (!confirmed) return

    setDeletingCategoryId(category.id)
    setDeleteError('')
    setSuccess('')

    const {
      error: deleteError,
    } = await removeCategory(category.id)

    if (deleteError) {
      setDeleteError(
        deleteError.message
      )
      setDeletingCategoryId(null)
      return
    }

    if (
      editingCategory?.id === category.id
    ) {
      setEditingCategory(null)
    }

    setDeletingCategoryId(null)

    setSuccess(
      t('categories.categoryDeleted')
    )
  }

  // -----------------------------
  // Categories
  // -----------------------------

  const incomeCategories =
    categories.filter(
      (category) =>
        category.type === 'income'
    )

  const expenseCategories =
    categories.filter(
      (category) =>
        category.type === 'expense'
    )

  // -----------------------------
  // Category Card
  // -----------------------------

  const renderCategoryCard = (
    category
  ) => {
    const isIncome =
      category.type === 'income'

    const isEditing =
      editingCategory?.id === category.id

    const isDeleting =
      deletingCategoryId === category.id

    return (
      <article
        key={category.id}
        className={`category-card ${
          isIncome
            ? 'category-income'
            : 'category-expense'
        } ${
          isEditing
            ? 'category-card-editing'
            : ''
        }`}
      >

        <div className="category-card-top">

          <div className="category-card-info">

            <div
              className={`category-icon ${
                isIncome
                  ? 'category-income-icon'
                  : 'category-expense-icon'
              }`}
            >
              {isIncome ? (
                <TrendingUp
                  size={19}
                  strokeWidth={2.2}
                />
              ) : (
                <TrendingDown
                  size={19}
                  strokeWidth={2.2}
                />
              )}
            </div>

            <div className="category-card-name-wrapper">

              <h3>
                {category.name}
              </h3>

              <span
                className={`category-type-badge ${
                  isIncome
                    ? 'income-badge'
                    : 'expense-badge'
                }`}
              >
                {isIncome
                  ? t(
                      'categories.income'
                    )
                  : t(
                      'categories.expense'
                    )}
              </span>

            </div>

          </div>

          <Tag
            size={17}
            className="category-tag-icon"
          />

        </div>

        <div className="category-card-actions">

          <button
            type="button"
            className="category-action-button category-edit-button"
            onClick={() =>
              handleEditClick(category)
            }
            disabled={isDeleting}
          >
            <Pencil size={14} />

            <span>
              {t('categories.edit')}
            </span>
          </button>

          <button
            type="button"
            className="category-action-button category-delete-button"
            onClick={() =>
              handleDeleteClick(category)
            }
            disabled={isDeleting}
          >
            <Trash2 size={14} />

            <span>
              {isDeleting
                ? t(
                    'categories.deleting'
                  )
                : t(
                    'categories.delete'
                  )}
            </span>
          </button>

        </div>

        {isEditing && (
          <div className="category-edit-form">

            <div className="category-edit-header">

              <h3>
                {t(
                  'categories.editCategory'
                )}
              </h3>

              <button
                type="button"
                className="category-edit-close"
                onClick={
                  handleCancelEdit
                }
                aria-label={t(
                  'categories.cancel'
                )}
              >
                <X size={16} />
              </button>

            </div>

            <form
              onSubmit={
                handleEditSubmit
              }
            >

              <div className="category-form-field">

                <label>
                  {t(
                    'categories.categoryName'
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

              <div className="category-form-field">

                <label>
                  {t(
                    'categories.categoryType'
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
                  <option value="income">
                    {t(
                      'categories.income'
                    )}
                  </option>

                  <option value="expense">
                    {t(
                      'categories.expense'
                    )}
                  </option>
                </select>

              </div>

              <div className="category-edit-actions">

                <button
                  type="submit"
                  className="primary-button"
                  disabled={
                    editSaving
                  }
                >
                  <Save size={14} />

                  <span>
                    {editSaving
                      ? t(
                          'categories.saving'
                        )
                      : t(
                          'categories.saveChanges'
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
                    'categories.cancel'
                  )}
                </button>

              </div>

              {editError && (
                <p className="category-form-error">
                  {editError}
                </p>
              )}

            </form>

          </div>
        )}

      </article>
    )
  }

  return (
    <div className="categories-page">

      {/* =========================
          Header
      ========================= */}

      <div className="categories-header">

        <div>
          <h1>
            {t('categories.title')}
          </h1>

          <p>
            {t('categories.subtitle')}
          </p>
        </div>

      </div>

      {/* =========================
          Messages
      ========================= */}

      {success && (
        <div className="category-message category-success">
          {success}
        </div>
      )}

      {formError && (
        <div className="category-message category-error">
          {formError}
        </div>
      )}

      {deleteError && (
        <div className="category-message category-error">
          {deleteError}
        </div>
      )}

      {/* =========================
          Add Category
      ========================= */}

      <section className="category-form-section">

        <div className="category-section-heading">

          <div className="category-section-icon">
            <Plus
              size={19}
              strokeWidth={2.3}
            />
          </div>

          <div>
            <h2>
              {t(
                'categories.addCategory'
              )}
            </h2>

            <p>
              {t(
                'categories.subtitle'
              )}
            </p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="category-form-field">

            <label>
              {t(
                'categories.categoryName'
              )}
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder={t(
                'categories.namePlaceholder'
              )}
            />

          </div>

          <div className="category-form-field">

            <label>
              {t(
                'categories.categoryType'
              )}
            </label>

            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target.value
                )
              }
            >
              <option value="income">
                {t(
                  'categories.income'
                )}
              </option>

              <option value="expense">
                {t(
                  'categories.expense'
                )}
              </option>
            </select>

          </div>

          <button
            type="submit"
            className={`primary-button category-submit-button ${
              type === 'expense'
                ? 'category-expense-submit'
                : ''
            }`}
            disabled={saving}
          >
            <Plus size={16} />

            <span>
              {saving
                ? t(
                    'categories.creating'
                  )
                : t(
                    'categories.createCategory'
                  )}
            </span>
          </button>

        </form>

      </section>

      {/* =========================
          Categories List
      ========================= */}

      <section className="categories-list-section">

        <div className="categories-list-header">

          <div>
            <h2>
              {t(
                'categories.yourCategories'
              )}
            </h2>

            <p>
              {categories.length}
            </p>
          </div>

          <div className="categories-list-icon">
            <Tags
              size={19}
              strokeWidth={2}
            />
          </div>

        </div>

        {loading && (
          <div className="categories-state">

            <div className="categories-loading-spinner" />

            <p>
              {t(
                'categories.loading'
              )}
            </p>

          </div>
        )}

        {!loading && error && (
          <div className="categories-state categories-state-error">

            <p>
              {error.message}
            </p>

          </div>
        )}

        {!loading &&
          !error &&
          categories.length === 0 && (
            <div className="categories-state">

              <div className="categories-empty-icon">
                <Tags
                  size={27}
                  strokeWidth={1.8}
                />
              </div>

              <h3>
                {t(
                  'categories.noCategories'
                )}
              </h3>

            </div>
          )}

        {!loading &&
          !error &&
          categories.length > 0 && (

            <div className="categories-groups">

              {/* Income */}

              <div className="category-group">

                <div className="category-group-header">

                  <div className="category-group-title">

                    <div className="category-group-icon income-group-icon">
                      <TrendingUp
                        size={17}
                      />
                    </div>

                    <div>
                      <h3>
                        {t(
                          'categories.income'
                        )}
                      </h3>

                      <span>
                        {
                          incomeCategories.length
                        }
                      </span>
                    </div>

                  </div>

                </div>

                {incomeCategories.length ===
                0 ? (
                  <div className="category-group-empty">
                    {t(
                      'categories.noCategories'
                    )}
                  </div>
                ) : (
                  <div className="categories-grid">
                    {incomeCategories.map(
                      renderCategoryCard
                    )}
                  </div>
                )}

              </div>

              {/* Expense */}

              <div className="category-group">

                <div className="category-group-header">

                  <div className="category-group-title">

                    <div className="category-group-icon expense-group-icon">
                      <TrendingDown
                        size={17}
                      />
                    </div>

                    <div>
                      <h3>
                        {t(
                          'categories.expense'
                        )}
                      </h3>

                      <span>
                        {
                          expenseCategories.length
                        }
                      </span>
                    </div>

                  </div>

                </div>

                {expenseCategories.length ===
                0 ? (
                  <div className="category-group-empty">
                    {t(
                      'categories.noCategories'
                    )}
                  </div>
                ) : (
                  <div className="categories-grid">
                    {expenseCategories.map(
                      renderCategoryCard
                    )}
                  </div>
                )}

              </div>

            </div>
          )}

      </section>

    </div>
  )
}

export default Categories