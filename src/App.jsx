import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import supabase from "./utils/supabase";
import LandingPage from "./Components/LandingPage/LandingPage";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import { SessionContext } from "./utils/context";
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
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        جاري التحميل...
      </div>
    );
  }

  return (
    <SessionContext.Provider value={session}>
      {session ? (
        <BrowserRouter>
          <AdminPanel />
        </BrowserRouter>
      ) : (
        <LandingPage />
      )}
    </SessionContext.Provider>
  );
}

export default App;
