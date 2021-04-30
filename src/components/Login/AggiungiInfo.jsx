import React from "react";
import { useUser } from "reactfire";
import { useHistory } from "react-router-dom";
import Errore from "../Errore";

import { aggiungiDisplayName } from "./LoginMiddleware";

const AggiungiInfo = () => {
  const history = useHistory();
  const user = useUser();
  const [displayName, setDisplayName] = React.useState("");

  if (user.status === "loading") {
    return <div>loading...</div>;
  }

  const backOnLoginPage = () => {
    history.push("/login");
  };

  let utente = user.data;

  if (!user.data) {
    return (
      <div>
        <Errore
          titolo="Utente non loggato"
          messaggio="devi essere loggato per accedere a questa pagina amico ei amico io ti
        buco ti faccio tanti di quei buchi"
        />

        <button type="button" onClick={backOnLoginPage}>
          Go home
        </button>
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {!utente.displayName ? (
          <div>
            <input
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
            />{" "}
            <button
              onClick={() => {
                aggiungiDisplayName(displayName, utente);
              }}
            >
              Conferma
            </button>
          </div>
        ) : (
          <></>
        )}
        <div>
          <input />
        </div>
      </form>
    </div>
  );
};

export default AggiungiInfo;
