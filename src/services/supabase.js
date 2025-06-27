import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ohxvrgskowfwbbgwjlvo.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oeHZyZ3Nrb3dmd2JiZ3dqbHZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODcwMDIsImV4cCI6MjA2MzY2MzAwMn0.f4ccR-D0G3fJnPSSbmi10WY3fAcmMAvuearm5egdRAY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
