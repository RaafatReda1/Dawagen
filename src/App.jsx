import { useEffect, useState } from "react";

import "./App.css";
import SigninGoogleBtn from "./Components/Auth/SigninGoogleBtn";
import  supabase  from "./utils/supabase";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session);
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }



  return <>{session ? <h1>{session.user.email}</h1> : <SigninGoogleBtn />}</>;
}

export default App;
