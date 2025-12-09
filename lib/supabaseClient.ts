
import { createClient } from '@supabase/supabase-js';

// NOTE: In a real production app, these should be in a .env file
// For this environment, we will use placeholders. You MUST replace these 
// with your actual Supabase Project URL and Anon Key from your Supabase Dashboard.

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
