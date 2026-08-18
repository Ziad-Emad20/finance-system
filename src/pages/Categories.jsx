import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'

import './Categories.css'

function Categories() {
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
      setFormError('Please enter a category name.')
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

    setSuccess('Category created successfully.')
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
      setEditError('Please enter a category name.')
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
    setSuccess('Category updated successfully.')
  }

  // Delete category
  const handleDeleteClick = async (category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
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
    setSuccess('Category deleted successfully.')
  }

  return (
    <div className="categories-page">

      <div className="categories-header">
        <div>
          <h1>Categories</h1>
          <p>Manage your income and expense categories.</p>
        </div>
      </div>

      {/* Add Category */}
      <div className="category-form-section">

        <h2>Add Category</h2>

        <form onSubmit={handleSubmit}>

          <div>
            <label>Category Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Freelancing"
            />
          </div>

          <div>
            <label>Category Type</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            {saving ? 'Creating...' : 'Create Category'}
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

        <h2>Your Categories</h2>

        {loading && (
          <p>Loading categories...</p>
        )}

        {!loading && error && (
          <p>{error.message}</p>
        )}

        {!loading && !error && categories.length === 0 && (
          <p>No categories yet.</p>
        )}

        {!loading && !error && categories.length > 0 && (
          <div>

            {categories.map((category) => (
              <div key={category.id}>

                <h3>{category.name}</h3>

                <p>
                  Type: {category.type}
                </p>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => handleEditClick(category)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => handleDeleteClick(category)}
                  disabled={deletingCategoryId === category.id}
                >
                  {deletingCategoryId === category.id
                    ? 'Deleting...'
                    : 'Delete'}
                </button>

                {/* Edit Category */}
                {editingCategory?.id === category.id && (
                  <div className="category-edit-form">

                    <h3>Edit Category</h3>

                    <form onSubmit={handleEditSubmit}>

                      <div>
                        <label>Category Name</label>

                        <input
                          type="text"
                          value={editName}
                          onChange={(e) =>
                            setEditName(e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label>Category Type</label>

                        <select
                          value={editType}
                          onChange={(e) =>
                            setEditType(e.target.value)
                          }
                        >
                          <option value="income">Income</option>
                          <option value="expense">Expense</option>
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

export default Categories