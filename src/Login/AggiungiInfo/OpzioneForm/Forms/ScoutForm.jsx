import { useState } from "react";
import GenericInfoForm from "./GenericInfoForm";

import { useFirestore, useUser } from "reactfire";
import { pushToDatabase } from "./DatabaseHandler";
import "./StileForms.css";

const ScoutForm = ({ sportSelezionato }) => {
  const [dataDiNascita, setdataDiNascita] = useState("");
  const [nazionalita, setnazionalita] = useState("");
  const [altezza, setaltezza] = useState("");
  const [peso, setpeso] = useState("");
  const [squadra, setSquadra] = useState("");
  const [procuratore, setProcuratore] = useState("");

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

      <button onClick={handleClick}>Salva</button>
    </div>
  );
};

export default ScoutForm;
