import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient('https://alrpipsaxamccdrepcxm.supabase.co', 'urubetcassino')

export function insert(username, balance) {
    supabase.from("saldo").upsert({username, balance}, {onConflict: "username"})
}

export function retrieve(username) {
    const { data, error } = supabase.from("saldo").select("balance").eq("username", username)
    return data
}