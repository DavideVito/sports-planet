import { useState } from "react";
import GenericInfoForm from "./GenericInfoForm";
import MultiSelect from "react-multi-select-component";

import { useFirestore, useUser } from "reactfire";
import { pushToDatabase } from "./DatabaseHandler";

import "./StileForms.css";

const stabilimenti = [
  { label: "Stadio", value: "stadio" },
  { label: "Palazzetto", value: "palazzetto" },
];
const SocietaForm = ({ sportSelezionato }) => {
  const [dataDiNascita, setDataDiNascita] = useState("");
  const [nome, setNome] = useState("");
  const [luogo, setLuogo] = useState("");
  const [stabilimento, setStabilimento] = useState([]);
  const [lega, setLega] = useState("");
  const [posizione, setPosizione] = useState(0);
  const [trofeiVinti, setTrofeiVinti] = useState(0);

  let u = useUser();
  const firestore = useFirestore();

  if (u.status === "loading") {
    return "";
  }

  let user = u.data;

  const handleClick = async () => {
    const obj = {
      dataDiNascita,
      nome,
      luogo,
      stabilimento,
      lega,
      posizione,
      trofeiVinti,
      uid: user.uid,
    };

    pushToDatabase(firestore, user.uid, obj, sportSelezionato).then(() => {
      window.location.href = "/success";
    });

    console.log(obj);
  };

  return (
    <div>
      <label for="name">Nome Società</label>
      <input
        name="name"
        placeholder="Nome Società"
        type="text"
        onChange={(e) => setNome(e.target.value)}
      />
      <label for="Fondazione ">Fondazione Società</label>
      <input
        name="Fondazione "
        placeholder="Fondazione Società"
        type="date"
        onChange={(e) => setDataDiNascita(e.target.value)}
      />
      <label for="Luogo">Luogo</label>
      <input
        name="Luogo"
        placeholder="Luogo"
        type="text"
        onChange={(e) => setLuogo(e.target.value)}
      />

      <MultiSelect
        options={stabilimenti}
        value={stabilimento}
        onChange={setStabilimento}
        labelledBy="Seleziona stabilimento"
        hasSelectAll={false}
      />

      <label for="Lega ">Lega </label>
      <input
        name="Lega "
        placeholder="Lega "
        type="text"
        onChange={(e) => setLega(e.target.value)}
      />
      <label for="Posizione">Posizione</label>
      <input
        name="Posizione"
        placeholder="Posizione"
        type="number"
        onChange={(e) => setPosizione(e.target.value)}
      />
      <div>
        <p>Info</p>
        <label for="TrofeiVinti">Trofei Vinti</label>
        <input
          name="TrofeiVinti"
          placeholder="Trofei Vinti"
          type="number"
          onChange={(e) => setTrofeiVinti(e.target.value)}
        />
      </div>

      <button className="button" onClick={handleClick}>Salva</button>
    </div>
  );
};

export default SocietaForm;
