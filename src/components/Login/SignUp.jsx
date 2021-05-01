import React, { useState } from "react";
import { signup, login, continua } from "./LoginMiddleware";
import SigninForm from "./SigninForm";
import { useAuth } from "reactfire";
import firebase from "firebase/app";
import Errore from "../Errore";

import "./Stile.css";

const SignUp = () => {
  const auth = useAuth();

  const [error, setError] = useState();

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  const signUpWithGoogle = async () => {
    try {
      let ris = await login(auth, googleAuthProvider);

      continua(ris);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div>
      Registrazione
      {error?.code === "auth/invalid-email" ? (
        <Errore
          tilolo="Email Sbagliata"
          messaggio="L'email inserita non è formattata correttamente"
        />
      ) : (
        <></>
      )}
      {error?.code === "auth/weak-password" ? (
        <Errore
          tilolo="Password Debole"
          messaggio="La password è debole negro"
        />
      ) : (
        <></>
      )}
      <div>
        <button onClick={signUpWithGoogle}>Registrati con Google</button>
      </div>
      <SigninForm
        signup={signup}
        continua={continua}
        auth={auth}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default SignUp;
