// js/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ojplhcukghcmqogcafhj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcGxoY3VrZ2hjbXFvZ2NhZmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2OTAzMTYsImV4cCI6MjA5MzI2NjMxNn0.jWh2bcdIwTVj6h3ikrLu7sNnXa2bwo400aTmLUhCq68';

export const supabase = createClient(supabaseUrl, supabaseKey);
