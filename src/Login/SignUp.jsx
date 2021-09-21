import React, { useState } from "react";
import { useAuth, useFirestore } from "reactfire";
import firebase from "firebase/app";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import SigninForm from "./SigninForm";
import Errore from "../components/Errore";
import {
  signup,
  login,
  continua,
  pushDataToFirestore,
} from "./LoginMiddleware";

import "./Stile.css";

const SignUp = () => {
  const auth = useAuth();
  const firestore = useFirestore();

  const [error, setError] = useState();

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  const signUpWithGoogle = async () => {
    try {
      let ris = await login(auth, googleAuthProvider);

      await pushData(ris);
      continua(ris);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const pushData = async (user) => {
    await pushDataToFirestore(firestore, user.user);
  };

  return (
    <div className="container-fluid" id="formRegistrazione">
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
      <div style={{ paddingTop: "1%" }} className="col-md-12" >
        <span style={{ color: "rgb(31 31 31)" }}></span>
        <br />
        <br />
        <button className="btn btn-warning" style={{ fontWeight: "bold", textAlign:"right"}} onClick={signUpWithGoogle}>
          <AccountCircleIcon></AccountCircleIcon> Registrati con Google
        </button>{" "}
      </div>
    </div>
  );
};

export default SignUp;
