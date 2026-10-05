import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  WalletCards,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  CircleAlert,
  CircleCheck,
} from 'lucide-react'
import { updatePassword } from '../services/auth'
import './Auth.css'

function ResetPassword() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [password, setPassword] =
    useState('')

  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [showPassword, setShowPassword] =
    useState(false)

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [error, setError] =
    useState('')

  const [message, setMessage] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setMessage('')

    if (password.length < 6) {
      setError(
        t('auth.passwordMinLength')
      )

      return
    }

    if (password !== confirmPassword) {
      setError(
        t('auth.passwordsDoNotMatch')
      )

      return
    }

    setLoading(true)

    const { error } =
      await updatePassword(password)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setMessage(
      t('auth.passwordUpdated')
    )

    setPassword('')
    setConfirmPassword('')

    setLoading(false)

    setTimeout(() => {
      navigate('/login')
    }, 1800)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <WalletCards size={22} />
          </div>

          <span>
            {t('auth.brand')}
          </span>
        </div>

        {/* Header */}
        <div className="auth-header">
          <h1>
            {t('auth.resetPasswordTitle')}
          </h1>

          <p>
            {t('auth.resetPasswordSubtitle')}
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* New Password */}
          <div className="form-group">
            <label htmlFor="password">
              {t('auth.newPassword')}
            </label>

            <div className="auth-input-wrapper">
              <LockKeyhole size={17} />

              <input
                id="password"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder={t('auth.newPasswordPlaceholder')}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                aria-label={
                  showPassword
                    ? t('auth.hidePassword')
                    : t('auth.showPassword')
                }
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">
              {t('auth.confirmPassword')}
            </label>

            <div className="auth-input-wrapper">
              <LockKeyhole size={17} />

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder={t(
                  'auth.confirmNewPasswordPlaceholder'
                )}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? t('auth.hidePassword')
                    : t('auth.showPassword')
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="auth-error">
              <CircleAlert size={16} />

              <span>
                {error}
              </span>
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="auth-message">
              <CircleCheck size={16} />

              <span>
                {message}
              </span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="primary-button auth-submit-button"
            disabled={loading}
          >
            {loading ? (
              <span>
                {t('auth.updating')}
              </span>
            ) : (
              <>
                <span>
                  {t('auth.updatePassword')}
                </span>

                <ArrowRight size={16} />
              </>
            )}
          </button>

        </form>

        <div className="auth-back-link">
          <Link to="/login">
            {t('auth.backToLogin')}
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ResetPassword