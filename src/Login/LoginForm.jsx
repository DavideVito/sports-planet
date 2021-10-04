import React from "react";
import {useAuth, useUser} from "reactfire";
import {Link} from 'react-router';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Errore from "../components/Errore";
import {useEffect} from "react";
import logo from "../Images/logo.png";
import apple from "./Immagini/apple.png";
import android from "./Immagini/android.jpeg";
const LoginForm = ({
                       setEmail,
                       setPassword,
                       error,
                       setError,
                       loginHandler,
                       signUpWithGoogle,
                   }) => {
    const auth = useAuth;
    const {data: user} = useUser();

    useEffect(() => {
        if (user?.data) {
            window.location.href = "/home";
        }
    }, [user]);

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID, auth.S],
        signInSuccessUrl: "/aggiungiInfo",
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => true,
        },
    };

    // return (
    //   <div>
    //     <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
    //   </div>
    // );

    return (
        <div>
            <div class="bg"></div>
            <div class="bg bg2"></div>
            <div class="bg bg3"></div>
            <div class="content" style={{overflow: "auto", maxHeight: "100%"}}>
                <img style={{width: "20%", height: "20%", marginBottom: "10px"}} src={logo} alt="logo"/>
                <h3 id="login-title">Accedi utilizzando il tuo username e la tua password</h3>
                {error?.code === "auth/wrong-password" ? (
                    <Errore
                        tilolo="Password Sbagliata"
                        messaggio="La password inserita non è corretta, riprova"
                    />
                ) : (
                    <></>
                )}
                <form id="form" class="form-control" onSubmit={(e) => e.preventDefault()}>
                    <div class="mb-3">
                        <label class="fieldPlacement" id="username" htmlFor="Username">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label class="fieldPlacement" id="password" htmlFor="Username">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button value="Login" class="button" onClick={loginHandler}>Accedi</button>

                    <div class="mb-3">
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()}/>
                    </div>
                    <div class="mb-3 mt-3 fw-bold">
                        <span>Non sei ancora registrato ? <a class="fw-bold" href="/registrati">Clicca qui</a></span>
                    </div>
                </form>
                <br/>
                <div className={"add_app"}>
                    <h2>
                        <strong>Hai scaricato sportsplanet nel tuo device mobile ?</strong>
                    </h2>

                <div className="container_scroll">
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                </div>
                <br/>
                <br/>
                <h4>Segui le istruzioni qua sotto per aggiungere la nostra applicazione alla home del tuo device in
                    pochi semplici passi</h4>
                <br/>
                <br/>
                <h3><strong>Apple</strong></h3>
                <br/>
                <img style={{width:"100%"}} src={apple} alt="apple"/>
                <br/>
                <br/>
                <h3><strong>Android</strong></h3>
                <br/>
                <img style={{width:"100%"}} src={android} alt="apple"/>
                <br/>
                </div>

            </div>
        </div>

)
    ;
};

export default LoginForm;