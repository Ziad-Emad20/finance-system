import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en/translation'
import ar from './locales/ar/translation'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      ar,
    },

    lng: localStorage.getItem('language') || 'en',

    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  })


  export const changeLanguage = async (language) => {
  await i18n.changeLanguage(language)

  localStorage.setItem('language', language)

  document.documentElement.lang = language
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
}

const currentLanguage = i18n.language

document.documentElement.lang = currentLanguage
document.documentElement.dir =
  currentLanguage === 'ar' ? 'rtl' : 'ltr'

export default i18n