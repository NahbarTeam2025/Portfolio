import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://affdznuqhzexhuvdznqf.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZmR6bnVxaHpleGh1dmR6bnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NjcwMzMsImV4cCI6MjA5MTE0MzAzM30.EVnMm4jA0rcxiIluHuaNtWhF3ChzR6NPTWRK7sPBROo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
