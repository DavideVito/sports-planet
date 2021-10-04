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
      allenatore: true,
    };

    pushToDatabase(firestore, user.uid, obj, sportSelezionato).then(() => {
      window.location.href = "/success";
    });

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

      <button className="button" onClick={handleClick}>
        Salva
      </button>
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
  const [moduloPreferito, setModuloPreferito] = useState("");

  useEffect(() => {
    let d = {
      vittorie,
      sconfitte,
      pareggi,
      golFatti,
      golSubiti,
      trofeiVinti,
      moduloPreferito,
    };

    setData(d);
  }, [
    vittorie,
    sconfitte,
    pareggi,
    golFatti,
    golSubiti,
    trofeiVinti,
    moduloPreferito,
  ]);
  return (
    <div class="form-group">
      <p>Info</p>
      <label for="Trofei Vinti">Modulo Preferito</label>
      <input
        className="form-control"
        name="Modulo Preferito"
        placeholder="Modulo Preferito"
        onChange={(e) => setModuloPreferito(e.target.value)}
      />

      <label for="vittorie">Vittorie</label>
      <input
        name="vittorie"
        placeholder="Vittorie"
        className="form-control"
        type="number"
        onChange={(e) => setVittorie(e.target.value)}
      />
      <label for="Sconfitte">Sconfitte</label>
      <input
        className="form-control"
        name="Sconfitte"
        placeholder="Sconfitte"
        type="number"
        onChange={(e) => setSconfitte(e.target.value)}
      />
      <label for="pareggi">Pareggi</label>
      <input
        className="form-control"
        name="pareggi"
        placeholder="pareggi"
        type="number"
        onChange={(e) => setPareggi(e.target.value)}
      />
      <label for="golFatti">Gol Fatti</label>
      <input
        className="form-control"
        name="golFatti"
        placeholder="Goal Fatti"
        type="number"
        onChange={(e) => setGolFatti(e.target.value)}
      />
      <label for="Gol subiti">Gol subiti</label>
      <input
        className="form-control"
        name="Gol subiti"
        placeholder="Gol subiti"
        type="number"
        onChange={(e) => setGolSubiti(e.target.value)}
      />
      <label for="Trofei Vinti">Trofei Vinti</label>
      <input
        className="form-control"
        name="Trofei Vinti"
        placeholder="Trofei Vinti"
        type="number"
        onChange={(e) => setTrofeiVinti(e.target.value)}
      />
    </div>
  );
};

const AllenatoreBasket = ({ data, setData }) => {
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
