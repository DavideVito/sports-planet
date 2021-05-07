import { useState } from "react";
import { useFirestore } from "reactfire";

import "./Stile.css";
const SigninForm = ({ signup, continua, auth, error, setError }) => {
  const signUpHandler = async () => {
    try {
      let ris = await signup(auth, { email, password, nome, cognome });
      let uid = ris.user.uid;

      await pushDataToDatabase(uid);

      continua(ris);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const firestore = useFirestore();

  const pushDataToDatabase = async (uid) => {
    const obj = { email, nome, cognome, uid };

    await firestore.collection("Giocatori").doc(uid).set(obj);
  };

  return (
    <div className="container align-items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUpHandler();
        }}
      >
        <div className="container" id="form">
          <div className="row fieldPlacement">
            <div className="col-md-6"> Nome </div>
            <div className="col-md-6">
              <input
                className="field"
                required
                type="text"
                placeholder="Nome"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </div>

          <div className="row fieldPlacement">
            <div className="col-md-6">Cognome</div>
            <div className="col-md-6">
              <input
                className="field"
                required
                type="text"
                placeholder="Cognome"
                onChange={(e) => setCognome(e.target.value)}
              />
            </div>
          </div>

          <div className="row fieldPlacement">
            <div className="col-md-6">Email</div>
            <div className="col-md-6">
              <input
                className="field"
                required
                type="mail"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="row fieldPlacement">
            <div className="col-md-6">Password</div>
            <div className="col-md-6">
              <input
                className="field"
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row" id="signUpButtonPlacement">
          <div className="col-md">
            <button id="signUpButton">Sign up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
