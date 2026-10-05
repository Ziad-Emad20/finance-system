import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  WalletCards,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  CircleAlert,
  CircleCheck,
} from 'lucide-react'
import { signUp } from '../services/auth'
import './Auth.css'

function Register() {
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(t('auth.passwordsDoNotMatch'))
      return
    }

    setLoading(true)

    const { data, error } = await signUp(
      formData.email,
      formData.password
    )

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setLoading(false)

    if (data.user) {
      setIsRegistered(true)
    }
  }

  return (
    <div className="auth-page">
      <div
        className={`auth-card ${
          isRegistered ? 'auth-card-success' : ''
        }`}
      >

        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <WalletCards size={22} />
          </div>

          <span>
            {t('auth.brand')}
          </span>
        </div>

        {isRegistered ? (
          <>
            {/* Success Icon */}
            <div className="auth-success-icon">
              <CircleCheck size={26} strokeWidth={2.2} />
            </div>

            {/* Success Header */}
            <div className="auth-header auth-success-header">
              <h1>
                {t('auth.checkYourEmail')}
              </h1>

              <p>
                {t('auth.verificationEmailSent')}
              </p>
            </div>

            {/* Email */}
            <div className="auth-email-notice">
              <Mail size={17} />

              <span>
                {formData.email}
              </span>
            </div>

            {/* Hint */}
            <div className="auth-verification-hint">
              <p>
                {t('auth.emailVerificationHint')}
              </p>
            </div>

            {/* Back To Login */}
            <Link
              to="/login"
              className="primary-button auth-submit-button auth-back-button"
            >
              <span>
                {t('auth.backToLogin')}
              </span>

              <ArrowRight size={16} />
            </Link>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="auth-header">
              <h1>
                {t('auth.createAccountTitle')}
              </h1>

              <p>
                {t('auth.registerSubtitle')}
              </p>
            </div>

            {/* Form */}
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
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('auth.emailPlaceholder')}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">
                  {t('auth.password')}
                </label>

                <div className="auth-input-wrapper auth-password-wrapper">
                  <LockKeyhole size={17} />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t('auth.passwordPlaceholder')}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
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

                <div className="auth-input-wrapper auth-password-wrapper">
                  <LockKeyhole size={17} />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? 'text'
                        : 'password'
                    }
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder={t('auth.confirmPasswordPlaceholder')}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
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

              {/* Submit */}
              <button
                type="submit"
                className="primary-button auth-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    {t('auth.creatingAccount')}
                  </span>
                ) : (
                  <>
                    <span>
                      {t('auth.createAccount')}
                    </span>

                    <ArrowRight size={16} />
                  </>
                )}
              </button>

            </form>

            {/* Footer */}
            <p className="auth-footer">
              {t('auth.alreadyHaveAccount')}{' '}

              <Link to="/login">
                {t('auth.login')}
              </Link>
            </p>
          </>
        )}

      </div>
    </div>
  )
}

export default Register