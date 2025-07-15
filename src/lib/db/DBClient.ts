import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "$env/static/private";

const DBClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default DBClient;