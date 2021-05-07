import React, { useState } from "react";
import { continua, login } from "./LoginMiddleware";
import { useAuth } from "reactfire";
import firebase from "firebase/app";
import Errore from "../components/Errore";

import bg from "./Immagini/bg.png";
import "./Stile.css";
const Login = () => {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const loginHandler = async () => {
    try {
      let ris = await login(auth, null, email, password);
      continua(ris);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  const signUpWithGoogle = async () => {
    try {
      let ris = await login(auth, googleAuthProvider);
      continua(ris);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div>
      <img src={bg} />
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

export default Login;
