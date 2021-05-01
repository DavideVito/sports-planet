import MultiSelect from "react-multi-select-component";
import { useState } from "react";
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
const Giocatore = () => {
  const [ruoliSelezionati, setRuoli] = useState([]);
  const [piediSelezionati, setPiedi] = useState([]);
  const [dataDiNascita, setdataDiNascita] = useState("");
  const [nazionalita, setnazionalita] = useState("");
  const [altezza, setaltezza] = useState("");
  const [peso, setpeso] = useState("");

  return (
    <div>
      <input
        placeholder="Data di nascita"
        type="date"
        onChange={(e) => setdataDiNascita(e.target.value)}
      />
      <input
        placeholder="Nazionalità"
        type="text"
        onChange={(e) => setnazionalita(e.target.value)}
      />
      <div>
        <input
          placeholder="Altezza"
          onChange={(e) => setaltezza(e.target.value)}
        />
        in KM
        <br />
        <input
          placeholder="Peso"
          onChange={(e) => setpeso(e.target.value)}
        />{" "}
        in KG
      </div>

      <input placeholder="Squadra in cui giochi" />
      <MultiSelect
        options={ruoli}
        value={ruoliSelezionati}
        onChange={setRuoli}
        labelledBy="Select"
        hasSelectAll={false}
      />
      <MultiSelect
        options={piedi}
        value={piediSelezionati}
        onChange={setPiedi}
        labelledBy="Select"
        hasSelectAll={false}
      />
      <input placeholder="Procuratore" />
      <input placeholder="Foto" type="file" />
      <button>Perfect Bitch</button>
    </div>
  );
};

export default Giocatore;
