import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { changeLanguage } from '../i18n'

import { useNavigate } from 'react-router-dom'

import {
  signOut,
  verifyCurrentPassword,
  updatePassword,
} from '../services/auth'

import { useAuth } from '../context/AuthContext'

function Settings() {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const {
    user,
    profile,
    updateProfile,
  } = useAuth()

  // -----------------------------
  // Profile
  // -----------------------------

  const [fullName, setFullName] =
    useState(profile?.full_name ?? '')

  const [language, setLanguage] =
    useState(profile?.language ?? 'en')

  const [saving, setSaving] =
    useState(false)

  const [message, setMessage] =
    useState('')

  const [error, setError] =
    useState('')

  // -----------------------------
  // Password
  // -----------------------------

  const [currentPassword, setCurrentPassword] =
    useState('')

  const [newPassword, setNewPassword] =
    useState('')

  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [changingPassword, setChangingPassword] =
    useState(false)

  const [passwordMessage, setPasswordMessage] =
    useState('')

  const [passwordError, setPasswordError] =
    useState('')

  // -----------------------------
  // Logout
  // -----------------------------

  const handleLogout = async () => {
    const { error } = await signOut()

    if (!error) {
      navigate('/login')
    }
  }

  // -----------------------------
  // Save Profile
  // -----------------------------

  const handleSaveProfile = async (e) => {
    e.preventDefault()

    setSaving(true)

    setMessage('')

    setError('')

    const {
      error: updateError,
    } = await updateProfile({
      fullName,
      language,
    })

    if (updateError) {
      setError(updateError.message)

      setSaving(false)

      return
    }

    await changeLanguage(language)

    setMessage(
      t('settings.profileUpdated')
    )

    setSaving(false)
  }

  // -----------------------------
  // Change Password
  // -----------------------------

  const handleChangePassword = async (e) => {
    e.preventDefault()

    setPasswordMessage('')

    setPasswordError('')

    // Current password

    if (!currentPassword) {
      setPasswordError(
        t('settings.currentPasswordRequired')
      )

      return
    }

    // New password

    if (!newPassword) {
      setPasswordError(
        t('settings.newPasswordRequired')
      )

      return
    }

    // Minimum length

    if (newPassword.length < 6) {
      setPasswordError(
        t('settings.passwordMinLength')
      )

      return
    }

    // Confirm password

    if (
      newPassword !== confirmPassword
    ) {
      setPasswordError(
        t('settings.passwordsDoNotMatch')
      )

      return
    }

    // Prevent same password

    if (
      currentPassword === newPassword
    ) {
      setPasswordError(
        t(
          'settings.passwordMustBeDifferent'
        )
      )

      return
    }

    setChangingPassword(true)

    // -----------------------------
    // Verify Current Password
    // -----------------------------

    const {
      error: verifyError,
    } = await verifyCurrentPassword(
      user?.email,
      currentPassword
    )

    if (verifyError) {
      setPasswordError(
        t(
          'settings.currentPasswordIncorrect'
        )
      )

      setChangingPassword(false)

      return
    }

    // -----------------------------
    // Update Password
    // -----------------------------

    const {
      error: updatePasswordError,
    } = await updatePassword(
      newPassword
    )

    if (updatePasswordError) {
      setPasswordError(
        updatePasswordError.message
      )

      setChangingPassword(false)

      return
    }

    // -----------------------------
    // Success
    // -----------------------------

    setCurrentPassword('')

    setNewPassword('')

    setConfirmPassword('')

    setPasswordMessage(
      t('settings.passwordUpdated')
    )

    setChangingPassword(false)
  }

  return (
    <div className="settings-section">

      {/* Page Header */}

      <h1>
        {t('settings.title')}
      </h1>

      {/* Profile */}

      <div>

        <h2>
          {t('settings.profile')}
        </h2>

        <form
          onSubmit={handleSaveProfile}
        >

          <div>

            <label>
              {t('settings.fullName')}
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value
                )
              }
              placeholder={t(
                'settings.fullNamePlaceholder'
              )}
            />

          </div>

          <div>

            <label>
              {t('settings.email')}
            </label>

            <input
              type="email"
              value={user?.email ?? ''}
              disabled
            />

          </div>

          <div>

            <label>
              {t('settings.language')}
            </label>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(
                  e.target.value
                )
              }
            >

              <option value="en">
                English
              </option>

              <option value="ar">
                العربية
              </option>

            </select>

          </div>

          <div>

            <span>
              {t('settings.role')}
            </span>

            <strong>
              {profile?.role}
            </strong>

          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >

            {saving
              ? t('settings.saving')
              : t('settings.saveChanges')}

          </button>

          {message && (
            <p>
              {message}
            </p>
          )}

          {error && (
            <p>
              {error}
            </p>
          )}

        </form>

      </div>

      {/* Security */}

      <div>

        <h2>
          {t('settings.security')}
        </h2>

        <form
          onSubmit={
            handleChangePassword
          }
        >

          {/* Current Password */}

          <div>

            <label>
              {t(
                'settings.currentPassword'
              )}
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              placeholder={t(
                'settings.currentPasswordPlaceholder'
              )}
              autoComplete="current-password"
            />

          </div>

          {/* New Password */}

          <div>

            <label>
              {t(
                'settings.newPassword'
              )}
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              placeholder={t(
                'settings.newPasswordPlaceholder'
              )}
              autoComplete="new-password"
            />

          </div>

          {/* Confirm Password */}

          <div>

            <label>
              {t(
                'settings.confirmNewPassword'
              )}
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder={t(
                'settings.confirmNewPasswordPlaceholder'
              )}
              autoComplete="new-password"
            />

          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={changingPassword}
          >

            {changingPassword
              ? t('settings.updating')
              : t(
                  'settings.changePassword'
                )}

          </button>

          {passwordMessage && (
            <p>
              {passwordMessage}
            </p>
          )}

          {passwordError && (
            <p>
              {passwordError}
            </p>
          )}

        </form>

      </div>

      {/* Account */}

      <div>

        <h2>
          {t('settings.account')}
        </h2>

        <button
          type="button"
          className="primary-button"
          onClick={handleLogout}
        >
          {t('settings.logout')}
        </button>

      </div>

    </div>
  )
}

export default Settings