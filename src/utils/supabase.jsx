import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Supabase URL'nizi buraya ekleyin
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY // Supabase API anahtarınızı buraya ekleyin

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
