import { useState } from "react";
import GenericInfoForm from "./GenericInfoForm";

const AllenatoreForm = () => {
  const [dataDiNascita, setdataDiNascita] = useState("");
  const [nazionalita, setnazionalita] = useState("");
  const [altezza, setaltezza] = useState("");
  const [peso, setpeso] = useState("");
  const [squadra, setSquadra] = useState("");
  const [procuratore, setProcuratore] = useState("");

  const [vittorie, setVittorie] = useState(0);
  const [sconfitte, setSconfitte] = useState(0);
  const [puntiFatti, setPuntiFatti] = useState(0);
  const [puntiSubiti, setPuntiSubiti] = useState(0);
  const [trofeiVinti, setTrofeiVinti] = useState(0);

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

      <button>Perfect Bitch</button>
    </div>
  );
};

export default AllenatoreForm;
