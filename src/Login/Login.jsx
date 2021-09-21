import React, {useState, Suspense} from "react";
import {continua, login} from "./LoginMiddleware";
import "./Stile.css";
import firebase from 'firebase/app';
import 'firebase/auth';

const auth = firebase.auth();

const LoginForm = React.lazy(() => import("./LoginForm"));

const Login = () => {
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
        <Suspense fallback={<div>Loading</div>}>
            <LoginForm
                setEmail={setEmail}
                setPassword={setPassword}
                error={error}
                setError={setError}
                loginHandler={loginHandler}
                signUpWithGoogle={signUpWithGoogle}
            />
        </Suspense>
    );
};

export default Login;
