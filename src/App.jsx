import { useEffect, useState } from "react";

import "./App.css";
import SigninGoogleBtn from "./Components/Auth/SigninGoogleBtn";
import supabase from "./utils/supabase";
import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const signOut = async () => await supabase.auth.signOut();
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

  return (
    <>
      {session ? (
        <>
          <h1>{session.user.email}</h1>
          <button onClick={signOut}>Sign out</button>
        </>
      ) : (
        <LandingPage />
      )}
    </>
  );
}

export default App;
