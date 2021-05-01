import MultiSelect from "react-multi-select-component";
import { useState, useEffect } from "react";
import GenericInfoForm from "./GenericInfoForm";

const GiocatoreForm = ({ sportSelezionato }) => {
  const [dataDiNascita, setdataDiNascita] = useState("");
  const [nazionalita, setnazionalita] = useState("");
  const [altezza, setaltezza] = useState("");
  const [peso, setpeso] = useState("");
  const [squadra, setSquadra] = useState("");
  const [procuratore, setProcuratore] = useState("");
  const [file, setFile] = useState(null);

  const [data, setData] = useState(null);

  return (
    <div>
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

      <p>Info</p>
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
      <button>Perfect Bitch</button>
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
    { label: "Centrocampista Centrale Difensibo", value: "CDC" },
    { label: "Esterno Destro", value: "ED" },
    { label: "Esterno Sinistro", value: "ES" },
    { label: "Attaccante", value: "ATT" },
  ];

  const piedi = [
    { label: "Destro", value: "DX" },
    { label: "Sinistro", value: "TX" },
    { label: "Tutt'e 2", value: "FF" },
  ];
  const [vittorie, setVittorie] = useState(0);
  const [sconfitte, setSconfitte] = useState(0);
  const [pareggi, setPareggi] = useState(0);
  const [golFatti, setGolFatti] = useState(0);
  const [golSubiti, setGoliSubiti] = useState(0);
  const [trofeiVinti, setTrofeiVinti] = useState(0);
  const [ruoliSelezionati, setRuoli] = useState([]);
  const [piediSelezionati, setPiedi] = useState([]);

  useEffect(() => {
    let d = {
      vittorie,
      sconfitte,
      pareggi,
      golFatti,
      golSubiti,
      trofeiVinti,
      ruoli: ruoliSelezionati,
      piede: piediSelezionati,
    };

    setData(d);
  }, [
    vittorie,
    sconfitte,
    pareggi,
    golFatti,
    golSubiti,
    trofeiVinti,
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
        placeholder="Vittorie"
        type="number"
        onChange={(e) => setVittorie(e.target.value)}
      />
      <input
        placeholder="Sconfitte"
        type="number"
        onChange={(e) => setSconfitte(e.target.value)}
      />
      <input
        placeholder="Pareggi"
        type="number"
        onChange={(e) => setPareggi(e.target.value)}
      />
      <input
        placeholder="Gol Fatti"
        type="number"
        onChange={(e) => setGolFatti(e.target.value)}
      />
      <input
        placeholder="Gol Subiti"
        type="number"
        onChange={(e) => setGoliSubiti(e.target.value)}
      />
      <input
        placeholder="Trofei Vinti"
        type="number"
        onChange={(e) => setTrofeiVinti(e.target.value)}
      />
    </div>
  );
};

export default GiocatoreForm;
