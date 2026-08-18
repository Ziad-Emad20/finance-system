import { supabase } from './supabase'

export const getCategories = async (type = null) => {
  let query = supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true })

  if (type) {
    query = query.eq('type', type)
  }

  const { data, error } = await query

  return {
    categories: data ?? [],
    error,
  }
}

export const createCategory = async ({
  name,
  type,
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      category: null,
      error: new Error('User is not authenticated'),
    }
  }

  const { data, error } = await supabase
    .from('categories')
    .insert({
      user_id: user.id,
      name: name.trim(),
      type,
    })
    .select()
    .single()

  return {
    category: data,
    error,
  }
}

export const updateCategory = async (id, updates) => {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return {
    category: data,
    error,
  }
}

export const deleteCategory = async (id) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  return {
    error,
  }
}