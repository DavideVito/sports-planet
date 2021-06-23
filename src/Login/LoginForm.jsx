import React from "react";
import { useAuth, useUser } from "reactfire";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Errore from "../components/Errore";
import { useEffect } from "react";

const LoginForm = ({
  setEmail,
  setPassword,
  error,
  setError,
  loginHandler,
  signUpWithGoogle,
}) => {
  const auth = useAuth;
  const { data: user } = useUser();

  useEffect(() => {
    if (user?.data) {
      window.location.href = "/home";
    }
  }, [user]);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID, auth.S],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
    </div>
  );

  return (
    <div>
      Log
      {error?.code === "auth/wrong-password" ? (
        <Errore
          tilolo="Password Sbagliata"
          messaggio="La password inserita non è corretta, riprova"
        />
      ) : (
        <></>
      )}
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button value="Login" onClick={loginHandler} />
      </form>
      <button onClick={signUpWithGoogle}>Sign up with google</button>
    </div>
  );
};

export default LoginForm;
