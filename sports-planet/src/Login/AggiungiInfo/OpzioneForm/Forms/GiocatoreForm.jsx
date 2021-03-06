import MultiSelect from "react-multi-select-component";
import { useState, useEffect } from "react";
import GenericInfoForm from "./GenericInfoForm";

import { useFirestore, useUser } from "reactfire";
import { pushToDatabase } from "./DatabaseHandler";
import "./StileForms.css";

const GiocatoreForm = ({ sportSelezionato }) => {
  const [dataDiNascita, setdataDiNascita] = useState("");
  const [nazionalita, setnazionalita] = useState("");
  const [altezza, setaltezza] = useState("");
  const [peso, setpeso] = useState("");
  const [squadra, setSquadra] = useState("");
  const [procuratore, setProcuratore] = useState("");
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  let u = useUser();
  const firestore = useFirestore();

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
      displayName: user.displayName,
      photoURL: user.photoURL,

      ...data,
    };

    pushToDatabase(firestore, user.uid, obj, sportSelezionato).then(() => {
      window.location.href = "/success";
    });

    console.log(obj);
  };

  return (
    <div>
      <p>
        <strong>Informazioni generiche</strong>
      </p>
      <GenericInfoForm
        setDataDiNascita={setdataDiNascita}
        setNazionalita={setnazionalita}
        setAltezza={setaltezza}
        setPeso={setpeso}
        setSquadra={setSquadra}
        setProcuratore={setProcuratore}
        setFile={setFile}
        giocatore={true}
      />
      <p>
        <strong>Statistiche</strong>
      </p>
      {sportSelezionato === "Calcio" ? (
        <GiocatoreCalcio data={data} setData={setData} />
      ) : (
        <></>
      )}
      {sportSelezionato === "Pallavolo" ? (
        <GiocatorePallavolo data={data} setData={setData} />
      ) : (
        <></>
      )}
      <button onClick={handleClick}>Salva</button>
    </div>
  );
};

const GiocatorePallavolo = ({ data, setData }) => {
  const [partiteGiocate, setPartiteGiocate] = useState(0);
  const [sGiocati, setS_Giocati] = useState(0);
  const [punti, setPunti] = useState(0);
  const [aceTot, setAceTot] = useState(0);
  const [ricezioniTot, setRicezioniTot] = useState(0);
  const [muriDifesa, setMuriDifesa] = useState(0);
  const [infortuni, setInfortuni] = useState(0);

  useEffect(() => {
    let d = {
      partiteGiocate,
      setGiocati: sGiocati,
      punti,
      aceTotali: aceTot,
      ricezioniTotali: ricezioniTot,
      muriDifesa,
      infortuni,
    };

    setData(d);
  }, [
    partiteGiocate,
    sGiocati,
    punti,
    aceTot,
    ricezioniTot,
    muriDifesa,
    infortuni,
  ]);

  return (
    <div>
      <input
        placeholder="Partite Giocate"
        type="number"
        onChange={(e) => setPartiteGiocate(e.target.value)}
      />
      <input
        placeholder="Set Giocati"
        type="number"
        onChange={(e) => setS_Giocati(e.target.value)}
      />
      <input
        placeholder="Punti"
        type="number"
        onChange={(e) => setPunti(e.target.value)}
      />
      <input
        placeholder="Ace Tot"
        type="number"
        onChange={(e) => setAceTot(e.target.value)}
      />
      <input
        placeholder="Ricezioni Tot"
        type="number"
        onChange={(e) => setRicezioniTot(e.target.value)}
      />
      <input
        placeholder="Muri Difesa"
        type="number"
        onChange={(e) => setMuriDifesa(e.target.value)}
      />
      <input
        placeholder="Infortuni"
        type="number"
        onChange={(e) => setInfortuni(e.target.value)}
      />
    </div>
  );
};

const GiocatoreBasket = () => {};

const GiocatoreCalcio = ({ data, setData }) => {
  const ruoli = [
    { label: "Portiere", value: "POR" },
    { label: "Terzino Sinistro", value: "TS" },
    { label: "Terzino Destro", value: "TD" },
    { label: "Difensore Centrale", value: "DC" },
    { label: "Centrocampista Centrale Offensivo", value: "COC" },
    { label: "Centrocampista Centrale Difensivo", value: "CDC" },
    { label: "Centrocampista", value: "CC" },
    { label: "Esterno Destro", value: "ED" },
    { label: "Esterno Sinistro", value: "ES" },
    { label: "Ala Sinistra", value: "AS" },
    { label: "Ala Destra", value: "AD" },
    { label: "Attaccante", value: "ATT" },
  ];

  const piedi = [
    { label: "Destro", value: "DX" },
    { label: "Sinistro", value: "SX" },
    { label: "Ambidestro", value: "FF" },
  ];

  const [gol, setGol] = useState(0);
  const [assist, setAssist] = useState(0);
  const [ammonizioni, setAmmonizioni] = useState(0);
  const [espulsioni, setEspulsioni] = useState(0);
  const [titolare, settitolare] = useState(0);
  const [subentrato, setSubentrato] = useState(0);
  const [trofeiVinti, setTrofeiVinti] = useState(0);
  const [infortunato, setInfortunato] = useState(false);
  const [ruoliSelezionati, setRuoli] = useState([]);
  const [piediSelezionati, setPiedi] = useState([]);

  useEffect(() => {
    let d = {
      gol,
      assist,
      ammonizioni,
      espulsioni,
      titolare,
      subentrato,
      trofeiVinti,
      infortunato,
      ruoli: ruoliSelezionati,
      piede: piediSelezionati,
    };

    setData(d);
  }, [
    gol,
    assist,
    ammonizioni,
    espulsioni,
    titolare,
    subentrato,
    trofeiVinti,
    infortunato,
    ruoliSelezionati,
    piediSelezionati,
  ]);

  return (
    <div>
      <MultiSelect
        options={ruoli}
        value={ruoliSelezionati}
        onChange={setRuoli}
        labelledBy="Seleziona il tuo ruolo"
        hasSelectAll={false}
      />
      <MultiSelect
        options={piedi}
        value={piediSelezionati}
        onChange={setPiedi}
        labelledBy="Seleziona il tuo piede preferito"
        hasSelectAll={false}
      />
      <input
        placeholder="Gol"
        type="number"
        onChange={(e) => setGol(e.target.value)}
      />
      <input
        placeholder="Assist"
        type="number"
        onChange={(e) => setAssist(e.target.value)}
      />

      <input
        placeholder="Ammonizioni"
        type="number"
        onChange={(e) => setAmmonizioni(e.target.value)}
      />
      <input
        placeholder="Espulsioni"
        type="number"
        onChange={(e) => setEspulsioni(e.target.value)}
      />
      <input
        placeholder="Partite da Titolare"
        type="number"
        onChange={(e) => settitolare(e.target.value)}
      />
      <input
        placeholder="Partite da Subentrato"
        type="number"
        onChange={(e) => setSubentrato(e.target.value)}
      />
      <input
        placeholder="Trofei Vinti"
        type="number"
        onChange={(e) => setTrofeiVinti(e.target.value)}
      />
      <br />
      <label htmlFor="infortunato">Infortunato?</label>
      <input
        name="infortunato"
        placeholder="Infortunato?"
        type="checkbox"
        onChange={(e) => setInfortunato(e.target.value)}
      />
    </div>
  );
};

export default GiocatoreForm;
