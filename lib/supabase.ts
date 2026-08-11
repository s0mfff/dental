import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Проверяем, есть ли реальные рабочие данные для подключения
const isConfigured = Boolean(url && url.startsWith('http') && key && key.length > 10);

// Если данные есть — подключаемся к Supabase. Если нет — используем безопасный заглушечный объект
export const supabase = isConfigured
  ? createClient(url!, key!)
  : ({
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: [], error: null }),
        update: () => Promise.resolve({ data: [], error: null }),
        delete: () => Promise.resolve({ data: [], error: null }),
      }),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    } as any);