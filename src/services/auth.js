import { supabase } from './supabase'

export const signUp = async (email, password) => {
  return await supabase.auth.signUp({
    email,
    password,
  })
}

export const signIn = async (email, password) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export const signOut = async () => {
  return await supabase.auth.signOut()
}

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser()

  return {
    user: data.user,
    error,
  }
}


export const getCurrentProfile = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    return {
      profile: null,
      error: userError,
    }
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return {
    profile: data,
    error,
  }
}


export const updateCurrentProfile = async ({
  fullName,
  language,
}) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    return {
      profile: null,
      error: userError,
    }
  }

  const { data, error } = await supabase
    .from('profiles')
   .update({
  full_name: fullName,
  language,
})
    .eq('id', user.id)
    .select()
    .single()

  return {
    profile: data,
    error,
  }
}