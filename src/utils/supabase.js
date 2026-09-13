import { createClient } from "@supabase/supabase-js";

const projectUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const projectKey = import.meta.env.VITE_SUPABASE_PROJECT_ANON_KEY;
const supabase = createClient(projectUrl, projectKey);

export default supabase;

 export const signInWithGoogle = async ()=>{
    await supabase.auth.signInWithOAuth({
        provider: 'google',
        redirectTo: window.location.origin
    })
}