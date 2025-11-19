import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://zbyquplcrjllqmytqekr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieXF1cGxjcmpsbHFteXRxZWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NzY5ODYsImV4cCI6MjA3OTA1Mjk4Nn0.UMVT-hmpO4Qv2lLCiWMRdUUf1PYbhOaNEhenkkyZCdo"

);
