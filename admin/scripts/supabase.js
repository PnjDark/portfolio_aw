// Supabase Client Configuration
// Replace local stubs with real Supabase integration

const supabaseUrl = 'https://axbfkyuhxwjtfpsnhydj.supabase.co';
const supabaseAnonKey = 'sb_publishable_wXbcO3_vH8eN7zq_yt05mw_TfKJQmz9';

const { createClient } = supabase;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

window.supabase = supabase;

export default supabase;
