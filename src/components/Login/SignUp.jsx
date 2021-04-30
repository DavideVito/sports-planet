import React, { useState } from "react";
import { signup, login, continua } from "./LoginMiddleware";
import { useAuth } from "reactfire";
import firebase from "firebase/app";
import Errore from "../Errore";

const SignUp = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  const signUpHandler = async () => {
    try {
      let ris = await signup(auth, { email, password });
      continua(ris);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

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
      Registrati negro
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
        <button onClick={signUpHandler}>Sign up</button>
      </form>
      <div>
        <button onClick={signUpWithGoogle}>Sign up with google</button>
      </div>
    </div>
  );
};

export default SignUp;
