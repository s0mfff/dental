import { createClient } from '@supabase/supabase-js';

// Проверяем наличие реальных ключей. Если их нет — передаем валидный тестовый URL и JWT-токен
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.trim() !== '')
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : 'https://placeholder-dental-app.supabase.co';

const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim() !== '')
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MDk0NTkyMDAsImV4cCI6MTkyNTAzNTIwMH0.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);