import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  WalletCards,
  Mail,
  ArrowRight,
  ArrowLeft,
  CircleAlert,
  CircleCheck,
} from 'lucide-react'
import { resetPassword } from '../services/auth'
import './Auth.css'

function ForgotPassword() {
  const { t } = useTranslation()

  const [email, setEmail] = useState('')

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setMessage('')
    setLoading(true)

    const { error } = await resetPassword(email)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setMessage(
      t('auth.resetLinkSent')
    )

    setLoading(false)
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
            {t('auth.forgotPasswordTitle')}
          </h1>

          <p>
            {t('auth.forgotPasswordSubtitle')}
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              {t('auth.email')}
            </label>

            <div className="auth-input-wrapper">
              <Mail size={17} />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder={t('auth.emailPlaceholder')}
                autoComplete="email"
                required
              />
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
                {t('auth.sending')}
              </span>
            ) : (
              <>
                <span>
                  {t('auth.sendResetLink')}
                </span>

                <ArrowRight size={16} />
              </>
            )}
          </button>

        </form>

        <div className="auth-back-link">
          <Link to="/login">
            <ArrowLeft size={15} />

            <span>
              {t('auth.backToLogin')}
            </span>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword