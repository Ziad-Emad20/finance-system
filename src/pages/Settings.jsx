import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import  { changeLanguage } from '../i18n'

import { useNavigate } from 'react-router-dom'
import { signOut } from '../services/auth'

import { useAuth } from '../context/AuthContext'

function Settings() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { user, profile, updateProfile } = useAuth()

  const [fullName, setFullName] = useState(profile?.full_name ?? '')
  const [language, setLanguage] = useState(profile?.language ?? 'en')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleLogout = async () => {
    const { error } = await signOut()

    if (!error) {
      navigate('/login')
    }
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()

    setSaving(true)
    setMessage('')
    setError('')

    const { error: updateError } = await updateProfile({
      fullName,
      language,
    })

    if (updateError) {
      setError(updateError.message)
      setSaving(false)
      return
    }

    await changeLanguage(language)

   setMessage(t('settings.profileUpdated'))
    setSaving(false)
  }

  return (
    <div className="settings-section">
      <h1>{t('settings.title')}</h1>

      <form onSubmit={handleSaveProfile}>
        <div>
          <label>{t('settings.fullName')}</label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t('settings.fullNamePlaceholder')}
          />
        </div>

        <div>
          <label>{t('settings.email')}</label>

          <input
            type="email"
            value={user?.email ?? ''}
            disabled
          />
        </div>

        <div>
          <label>{t('settings.language')}</label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        <div>
          <span>{t('settings.role')}</span>
          <strong>{profile?.role}</strong>
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

      <button
        type="button"
        className="primary-button"
        onClick={handleLogout}
      >
        {t('settings.logout')}
      </button>
    </div>
  )
}

export default Settings