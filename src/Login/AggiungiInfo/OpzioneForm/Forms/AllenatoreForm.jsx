import { useState, useEffect } from "react";
import GenericInfoForm from "./GenericInfoForm";
import Errore from "../../../../components/Errore";

import "./StileForms.css";
import { useFirestore, useUser } from "reactfire";
import { pushToDatabase } from "./DatabaseHandler";

const AllenatoreForm = ({ sportSelezionato }) => {
  const [dataDiNascita, setdataDiNascita] = useState("");
  const [nazionalita, setnazionalita] = useState("");
  const [altezza, setaltezza] = useState("");
  const [peso, setpeso] = useState("");
  const [squadra, setSquadra] = useState("");
  const [procuratore, setProcuratore] = useState("");
  const [data, setData] = useState(null);

  const firestore = useFirestore();

  let u = useUser();

  if (u.status === "loading") {
    return "";
  }

  let user = u.data;

  const handleClick = async () => {
    const obj = {
      dataDiNascita,
      nazionalita,
      altezza,
      peso,
      squadra,
      procuratore,
      sport: sportSelezionato,
      uid: user.uid,
      ...data,
    };

    pushToDatabase(firestore, user.uid, obj, sportSelezionato);

    console.log(obj);
  };

  return (
    <div>
      <GenericInfoForm
        setDataDiNascita={setdataDiNascita}
        setNazionalita={setnazionalita}
        setAltezza={setaltezza}
        setPeso={setpeso}
        setSquadra={setSquadra}
        setProcuratore={setProcuratore}
        giocatore={false}
      />
      {sportSelezionato === "Pallavolo" ? (
        <AllenatorePallavolo data={data} setData={setData} />
      ) : (
        <></>
      )}
      {sportSelezionato === "Calcio" ? (
        <AllenatoreCalcio data={data} setData={setData} />
      ) : (
        <></>
      )}
      {sportSelezionato === "Basket" ? (
        <AllenatoreBasket data={data} setData={setData} />
      ) : (
        <></>
      )}

      <button onClick={handleClick}>Perfect Bitch</button>
    </div>
  );
};

const AllenatoreCalcio = ({ data, setData }) => {
  const [vittorie, setVittorie] = useState(0);
  const [sconfitte, setSconfitte] = useState(0);
  const [pareggi, setPareggi] = useState(0);
  const [golFatti, setGolFatti] = useState(0);
  const [golSubiti, setGolSubiti] = useState(0);
  const [trofeiVinti, setTrofeiVinti] = useState(0);

  useEffect(() => {
    let d = {
      vittorie,
      sconfitte,
      pareggi,
      golFatti,
      golSubiti,
      trofeiVinti,
    };

    setData(d);
  }, [vittorie, sconfitte, pareggi, golFatti, golSubiti, trofeiVinti]);
  return (
    <div>
      <p>Info</p>
      <label for="vittorie">Vittorie</label>
      <input
        name="vittorie"
        placeholder="Vittorie"
        type="number"
        onChange={(e) => setVittorie(e.target.value)}
      />
      <label for="Sconfitte">Sconfitte</label>
      <input
        name="Sconfitte"
        placeholder="Sconfitte"
        type="number"
        onChange={(e) => setSconfitte(e.target.value)}
      />
      <label for="pareggi">Pareggi</label>
      <input
        name="pareggi"
        placeholder="pareggi"
        type="number"
        onChange={(e) => setPareggi(e.target.value)}
      />
      <label for="golFatti">Gol Fatti</label>
      <input
        name="golFatti"
        placeholder="Goal Fatti"
        type="number"
        onChange={(e) => setGolFatti(e.target.value)}
      />
      <label for="Gol subiti">Gol subiti</label>
      <input
        name="Gol subiti"
        placeholder="Gol subiti"
        type="number"
        onChange={(e) => setGolSubiti(e.target.value)}
      />
      <label for="Trofei Vinti">Trofei Vinti</label>
      <input
        name="Trofei Vinti"
        placeholder="Trofei Vinti"
        type="number"
        onChange={(e) => setTrofeiVinti(e.target.value)}
      />
    </div>
  );
};

const AllenatoreBasket = ({ data, setData }) => {
  return (
    <Errore
      messaggio="Il basket ancora non è supportato"
      titolo="Sport non supportato"
    />
  );
};
const AllenatorePallavolo = ({ data, setData }) => {
  const [vittorie, setVittorie] = useState(0);
  const [sconfitte, setSconfitte] = useState(0);
  const [puntiFatti, setPuntiFatti] = useState(0);
  const [puntiSubiti, setPuntiSubiti] = useState(0);
  const [trofeiVinti, setTrofeiVinti] = useState(0);

  useEffect(() => {
    let d = {
      vittorie,
      sconfitte,
      puntiFatti,
      puntiSubiti,
      trofeiVinti,
    };

    setData(d);
  }, [vittorie, sconfitte, puntiFatti, puntiSubiti, trofeiVinti]);
  return (
    <div>
      <p>Info</p>
      <label for="vittorie">Vittorie</label>
      <input
        name="vittorie"
        placeholder="Vittorie"
        type="number"
        onChange={(e) => setVittorie(e.target.value)}
      />
      <label for="Sconfitte">Sconfitte</label>
      <input
        name="Sconfitte"
        placeholder="Sconfitte"
        type="number"
        onChange={(e) => setSconfitte(e.target.value)}
      />
      <label for="Media punti fatti">Media punti fatti</label>
      <input
        name="Media punti fatti"
        placeholder="Media punti fatti"
        type="number"
        onChange={(e) => setPuntiFatti(e.target.value)}
      />
      <label for="Media punti subiti">Media punti subiti</label>
      <input
        name="Media punti subiti"
        placeholder="Media punti subiti"
        type="number"
        onChange={(e) => setPuntiSubiti(e.target.value)}
      />
      <label for="Trofei Vinti">Trofei Vinti</label>
      <input
        name="Trofei Vinti"
        placeholder="Trofei Vinti"
        type="number"
        onChange={(e) => setTrofeiVinti(e.target.value)}
      />
    </div>
  );
};

export default AllenatoreForm;
