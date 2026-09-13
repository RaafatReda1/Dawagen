import React from "react";
import { signInWithGoogle } from "../../utils/supabase";

const SigninGoogleBtn = () => {
  const handleGoogleSignin = async () => {
    await signInWithGoogle();
  };
  return (
    <>
      <button onClick={() => handleGoogleSignin()}>Sign in with Google</button>
    </>
  );
};

export default SigninGoogleBtn;
