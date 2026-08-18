import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import {
  getCurrentProfile,
  updateCurrentProfile,
} from '../services/auth'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = async (currentUser) => {
    if (!currentUser) {
      setProfile(null)
      return
    }

    const { profile: currentProfile, error } = await getCurrentProfile()

    if (error) {
      console.error('Failed to load profile:', error)
      setProfile(null)
      return
    }

    setProfile(currentProfile)

    if (currentProfile?.language) {
  const { changeLanguage } = await import('../i18n')

  await changeLanguage(currentProfile.language)
}
  }

  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const currentUser = session?.user ?? null

      setUser(currentUser)

      await loadProfile(currentUser)

      setLoading(false)
    }

    getInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null

        setUser(currentUser)

        await loadProfile(currentUser)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])


  const updateProfile = async (updates) => {
  const { profile: updatedProfile, error } =
    await updateCurrentProfile(updates)

  if (error) {
    return {
      profile: null,
      error,
    }
  }

  setProfile(updatedProfile)

  return {
    profile: updatedProfile,
    error: null,
  }
}

  return (
    <AuthContext.Provider
      value={{ 
    user, 
    profile, 
    loading,
    updateProfile,
  }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}