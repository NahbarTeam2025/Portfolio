import { createClient } from '@supabase/supabase-js';

// WICHTIG: In Vite (React) verwenden wir import.meta.env statt process.env
// und die Variablen müssen mit VITE_ beginnen, nicht mit NEXT_PUBLIC_
const getEnvVar = (key: string) => {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    return (import.meta as any).env[key];
  }
  return undefined;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || 'https://affdznuqhzexhuvdznqf.supabase.co';
export const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZmR6bnVxaHpleGh1dmR6bnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NjcwMzMsImV4cCI6MjA5MTE0MzAzM30.EVnMm4jA0rcxiIluHuaNtWhF3ChzR6NPTWRK7sPBROo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
