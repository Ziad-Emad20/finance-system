import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  WalletCards,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  CircleAlert,
} from 'lucide-react'
import { signIn } from '../services/auth'
import './Auth.css'

function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
    setLoading(true)

    const { error } = await signIn(
      formData.email,
      formData.password
    )

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setLoading(false)
    navigate('/dashboard')
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
            {t('auth.welcomeBack')}
          </h1>

          <p>
            {t('auth.loginSubtitle')}
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
                autoComplete="current-password"
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

          {/* Forgot Password */}
          <div className="auth-forgot-password">
            <Link to="/forgot-password">
              {t('auth.forgotPassword')}
            </Link>
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
                {t('auth.loggingIn')}
              </span>
            ) : (
              <>
                <span>
                  {t('auth.login')}
                </span>

                <ArrowRight size={16} />
              </>
            )}
          </button>

        </form>

        {/* Footer */}
        <p className="auth-footer">
          {t('auth.noAccount')}{' '}

          <Link to="/register">
            {t('auth.createAccount')}
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login