import { useState, useEffect } from "react";
import { useUser, useFirestore, useFirestoreDocDataOnce } from "reactfire";
import { useHistory } from "react-router-dom";
import Errore from "./../../components/Errore";
import Opzione from "./OpzioneForm/Opzione";
import OpzioneForm from "./OpzioneForm";

import "./StileAggiungiInfo.css";

const AggiungiInfo = () => {
  const history = useHistory();
  const user = useUser();
  const [selezionato, setSelezionato] = useState();
  const [documentoUtente, setDocumento] = useState({ status: "loading" });
  const firestore = useFirestore();

  let utente = user.data;

  useEffect(() => {
    if (utente?.uid) {
      const query = firestore.collection("Giocatori").doc(utente.uid);

      query.get().then((docSnapshot) => {
        setDocumento({ data: docSnapshot.data() });
      });
    }
  }, [utente]);
  if (user.status === "loading") {
    return <div>loading...</div>;
  }

  if (documentoUtente.status === "loading") {
    return <div>Loading...</div>;
  }

  const backOnLoginPage = () => {
    history.push("/login");
  };

  console.log(documentoUtente);

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

  if (documentoUtente.data.done) {
    return (
      <div>
        <Errore
          titolo="Hai già inserito queste informazioni"
          messaggio="Questa pagina è visibile solo per chi crea un account per la prima volta, tu avendolo già creato non puoi stare qua"
        />

        <button type="button" onClick={backOnLoginPage}>
          Go home
        </button>

        <button type="button" onClick={backOnLoginPage}>
          Per modificare le informazioni...
        </button>
      </div>
    );
  }

  if (!utente) {
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
