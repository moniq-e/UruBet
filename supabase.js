import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient('https://alrpipsaxamccdrepcxm.supabase.co', 'sb_publishable_8sVNBBBJS_iSNQOW2961gQ_GohHbKiy')

export async function insert(username, balance) {
    const { error } = await supabase.from("saldo").upsert({username, balance}, {onConflict: "username"})

    if (error) console.error(error)
}   

export async function retrieve(username) {
    /**
     * @type {{data: []}}
     */
    const { data, error } = await supabase.from("saldo").select("balance").eq("username", username)

    if (error) console.error(error)
    if (data.length == 0) return

    return data[0].balance
}