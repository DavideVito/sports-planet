import React, { useState } from "react";
import { signup, login, continua } from "./LoginMiddleware";
import SigninForm from "./SigninForm";
import { useAuth } from "reactfire";
import firebase from "firebase/app";
import Errore from "../components/Errore";

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
    <div className="container-fluid" id="formRegistrazione">
      <h1 id="testoHeader">Inserisci i tuoi dati.</h1>
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

      <SigninForm
        signup={signup}
        continua={continua}
        auth={auth}
        error={error}
        setError={setError}
      />
      <div className="col-md-6">
        <button onClick={signUpWithGoogle}>Registrati con Google</button>{" "}
        {/* Questo lo voglio sotto il form non sopra, come si fa */}
      </div>
    </div>
  );
};

export default SignUp;
