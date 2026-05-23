// js/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://dtgnuplyrzrwfwuqnuik.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0Z251cGx5cnpyd2Z3dXFudWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MTAzMTMsImV4cCI6MjA5NTA4NjMxM30.mjNGeTQYoCIXyk1coG3u4n31jp7-bf8lTUI8dhVk1xw';

export const supabase = createClient(supabaseUrl, supabaseKey);
