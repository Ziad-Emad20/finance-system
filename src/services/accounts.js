import { supabase } from './supabase'

export const getAccounts = async () => {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .order('created_at', { ascending: false })

  return {
    accounts: data ?? [],
    error,
  }
}

export const createAccount = async ({
  name,
  type,
  balance = 0,
  currency = 'EGP',
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      account: null,
      error: new Error('User is not authenticated'),
    }
  }

  const { data, error } = await supabase
    .from('accounts')
    .insert({
      user_id: user.id,
      name,
      type,
      balance,
      currency,
    })
    .select()
    .single()

  return {
    account: data,
    error,
  }
}

export const updateAccount = async (id, updates) => {
  const { data, error } = await supabase
    .from('accounts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return {
    account: data,
    error,
  }
}

export const deleteAccount = async (id) => {
  const { error } = await supabase
    .from('accounts')
    .delete()
    .eq('id', id)

  return {
    error,
  }
}