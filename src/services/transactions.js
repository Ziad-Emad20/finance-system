import { supabase } from './supabase'

export const getTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      accounts (
        id,
        name,
        type,
        currency
      ),
      categories (
        id,
        name,
        type
      )
    `)
    .order('transaction_date', { ascending: false })
    .order('created_at', { ascending: false })

  return {
    transactions: data ?? [],
    error,
  }
}

export const createTransaction = async ({
  accountId,
  categoryId,
  type,
  title,
  totalAmount,
  paidAmount,
  transactionDate,
  notes,
  partyName,
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      transaction: null,
      error: new Error('User is not authenticated'),
    }
  }

  const {
    data: transactionId,
    error: rpcError,
  } = await supabase.rpc(
    'create_transaction_with_balance',
    {
      p_account_id: accountId,
      p_category_id: categoryId,
      p_type: type,
      p_title: title.trim(),
      p_total_amount: totalAmount,
      p_paid_amount: paidAmount,
      p_transaction_date: transactionDate,
      p_notes: notes?.trim() || null,
      p_party_name: partyName?.trim() || null,
    }
  )

  if (rpcError) {
    return {
      transaction: null,
      error: rpcError,
    }
  }

  const {
    data: transaction,
    error: fetchError,
  } = await supabase
    .from('transactions')
    .select(`
      *,
      accounts (
        id,
        name,
        type,
        currency
      ),
      categories (
        id,
        name,
        type
      )
    `)
    .eq('id', transactionId)
    .single()

  return {
    transaction,
    error: fetchError,
  }
}

export const updateTransaction = async (
  id,
  {
    accountId,
    categoryId,
    type,
    title,
    totalAmount,
    paidAmount,
    transactionDate,
    notes,
    partyName,
  }
) => {
  const {
    data: transactionId,
    error: rpcError,
  } = await supabase.rpc(
    'update_transaction_with_balance',
    {
      p_transaction_id: id,
      p_account_id: accountId,
      p_category_id: categoryId,
      p_type: type,
      p_title: title.trim(),
      p_total_amount: totalAmount,
      p_paid_amount: paidAmount,
      p_transaction_date: transactionDate,
      p_notes: notes?.trim() || null,
      p_party_name: partyName?.trim() || null,
    }
  )

  if (rpcError) {
    return {
      transaction: null,
      error: rpcError,
    }
  }

  const {
    data: transaction,
    error: fetchError,
  } = await supabase
    .from('transactions')
    .select(`
      *,
      accounts (
        id,
        name,
        type,
        currency
      ),
      categories (
        id,
        name,
        type
      )
    `)
    .eq('id', transactionId)
    .single()

  return {
    transaction,
    error: fetchError,
  }
}

export const deleteTransaction = async (id) => {
  const { error } = await supabase.rpc(
    'delete_transaction_with_balance',
    {
      p_transaction_id: id,
    }
  )

  return {
    error,
  }
}