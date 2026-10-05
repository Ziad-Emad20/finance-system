import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { changeLanguage } from '../i18n'

import { useNavigate } from 'react-router-dom'

import {
  UserRound,
  Mail,
  Languages,
  ShieldCheck,
  LockKeyhole,
  LogOut,
  Save,
  KeyRound,
  CircleCheck,
  CircleAlert,
  UserCog,
} from 'lucide-react'

import {
  signOut,
  verifyCurrentPassword,
  updatePassword,
} from '../services/auth'

import { useAuth } from '../context/AuthContext'

import './Settings.css'

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

    if (!currentPassword) {
      setPasswordError(
        t(
          'settings.currentPasswordRequired'
        )
      )

      return
    }

    if (!newPassword) {
      setPasswordError(
        t(
          'settings.newPasswordRequired'
        )
      )

      return
    }

    if (newPassword.length < 6) {
      setPasswordError(
        t(
          'settings.passwordMinLength'
        )
      )

      return
    }

    if (
      newPassword !== confirmPassword
    ) {
      setPasswordError(
        t(
          'settings.passwordsDoNotMatch'
        )
      )

      return
    }

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

    // Verify current password

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

    // Update password

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

    // Success

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')

    setPasswordMessage(
      t('settings.passwordUpdated')
    )

    setChangingPassword(false)
  }

  return (
    <div className="settings-page">

      {/* Page Header */}

      <div className="settings-header">

        <div className="settings-header-icon">
          <UserCog size={22} />
        </div>

        <div>
          <h1>
            {t('settings.title')}
          </h1>

          <p>
            {t('settings.title')}
          </p>
        </div>

      </div>

      {/* Profile */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-card-icon profile-icon">
            <UserRound size={19} />
          </div>

          <div>
            <h2>
              {t('settings.profile')}
            </h2>
          </div>

        </div>

        <form
          className="settings-form"
          onSubmit={handleSaveProfile}
        >

          <div className="settings-form-grid">

            {/* Full Name */}

            <div className="settings-field">

              <label>
                {t('settings.fullName')}
              </label>

              <div className="settings-input-wrapper">

                <UserRound size={16} />

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

            </div>

            {/* Email */}

            <div className="settings-field">

              <label>
                {t('settings.email')}
              </label>

              <div className="settings-input-wrapper settings-input-disabled">

                <Mail size={16} />

                <input
                  type="email"
                  value={
                    user?.email ?? ''
                  }
                  disabled
                />

              </div>

            </div>

            {/* Language */}

            <div className="settings-field">

              <label>
                {t('settings.language')}
              </label>

              <div className="settings-input-wrapper">

                <Languages size={16} />

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

            </div>

            {/* Role */}

            <div className="settings-field">

              <label>
                {t('settings.role')}
              </label>

              <div className="settings-role-box">

                <ShieldCheck size={16} />

                <strong>
                  {profile?.role}
                </strong>

              </div>

            </div>

          </div>

          <div className="settings-form-footer">

            <button
              type="submit"
              className="primary-button settings-save-button"
              disabled={saving}
            >
              <Save size={15} />

              <span>
                {saving
                  ? t('settings.saving')
                  : t(
                      'settings.saveChanges'
                    )}
              </span>
            </button>

          </div>

          {message && (
            <div className="settings-message settings-success">
              <CircleCheck size={16} />

              <span>
                {message}
              </span>
            </div>
          )}

          {error && (
            <div className="settings-message settings-error">
              <CircleAlert size={16} />

              <span>
                {error}
              </span>
            </div>
          )}

        </form>

      </section>

      {/* Security */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-card-icon security-icon">
            <LockKeyhole size={19} />
          </div>

          <div>
            <h2>
              {t('settings.security')}
            </h2>
          </div>

        </div>

        <form
          className="settings-form"
          onSubmit={
            handleChangePassword
          }
        >

          <div className="settings-password-grid">

            {/* Current Password */}

            <div className="settings-field">

              <label>
                {t(
                  'settings.currentPassword'
                )}
              </label>

              <div className="settings-input-wrapper">

                <KeyRound size={16} />

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

            </div>

            {/* New Password */}

            <div className="settings-field">

              <label>
                {t(
                  'settings.newPassword'
                )}
              </label>

              <div className="settings-input-wrapper">

                <LockKeyhole size={16} />

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

            </div>

            {/* Confirm Password */}

            <div className="settings-field">

              <label>
                {t(
                  'settings.confirmNewPassword'
                )}
              </label>

              <div className="settings-input-wrapper">

                <LockKeyhole size={16} />

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

            </div>

          </div>

          <div className="settings-form-footer">

            <button
              type="submit"
              className="primary-button settings-save-button"
              disabled={
                changingPassword
              }
            >
              <LockKeyhole size={15} />

              <span>
                {changingPassword
                  ? t('settings.updating')
                  : t(
                      'settings.changePassword'
                    )}
              </span>

            </button>

          </div>

          {passwordMessage && (
            <div className="settings-message settings-success">
              <CircleCheck size={16} />

              <span>
                {passwordMessage}
              </span>
            </div>
          )}

          {passwordError && (
            <div className="settings-message settings-error">
              <CircleAlert size={16} />

              <span>
                {passwordError}
              </span>
            </div>
          )}

        </form>

      </section>

      {/* Account */}

      <section className="settings-card settings-account-card">

        <div className="settings-card-header">

          <div className="settings-card-icon account-icon">
            <ShieldCheck size={19} />
          </div>

          <div>
            <h2>
              {t('settings.account')}
            </h2>
          </div>

        </div>

        <div className="settings-logout-wrapper">

          <button
            type="button"
            className="settings-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={16} />

            <span>
              {t('settings.logout')}
            </span>
          </button>

        </div>

      </section>

    </div>
  )
}

export default Settings