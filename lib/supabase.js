// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hnokmbgyizspolxmnslp.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhub2ttYmd5aXpzcG9seG1uc2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMTU1NTksImV4cCI6MjA3MzY5MTU1OX0.nAHWR-M3YCLvayNJ6DXL9xrerDjMaVuuPqIylhfDCjE"

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)