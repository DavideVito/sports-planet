import { useState } from "react";
import { useUser } from "reactfire";
import { useHistory } from "react-router-dom";
import Errore from "./../../components/Errore";
import Opzione from "./OpzioneForm/Opzione";
import OpzioneForm from "./OpzioneForm";

import "./StileAggiungiInfo.css";

const AggiungiInfo = () => {
  const history = useHistory();
  const user = useUser();
  const [selezionato, setSelezionato] = useState();

  if (user.status === "loading") {
    return <div>loading...</div>;
  }

  const backOnLoginPage = () => {
    history.push("/login");
  };

  let utente = user.data;
  const otherStyle = { backgroundColor: "red", marginLeft: "10px" };
  const opzioni = [
    {
      nome: "Giocatore",
    },
    { nome: "Allenatore" },
    { nome: "Società" },
    { nome: "Osservatore" },
    { nome: "Tifoso" },
  ];

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
      <div>Chi sei?</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ display: "flex" }}>
          {opzioni.map((opzione) => {
            return (
              <Opzione
                nome={opzione.nome}
                setSelezionato={setSelezionato}
                otherStyles={
                  selezionato === opzione.nome
                    ? otherStyle
                    : { backgroundColor: "lightgreen", marginLeft: "10px" }
                }
              />
            );
          })}

          <br />
          <OpzioneForm opzione={selezionato} opzioni={opzioni} />
        </div>
      </form>
    </div>
  );
};

export default AggiungiInfo;
