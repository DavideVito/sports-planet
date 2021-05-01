import Errore from "../../../Errore";

import GiocatoreForm from "./Forms/GiocatoreForm";
import AllenatoreForm from "./Forms/AllenatoreForm";
import ScoutForm from "./Forms/ScoutForm";
import SocietaForm from "./Forms/SocietaForm";
import Opzione from "./Opzione";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./StileOpzioneForm.css";
const sports = [
  {
    nome: "Pallavolo",
  },
  { nome: "Calcio" },
  { nome: "Basket" },
];

const Wrapper = ({ sportSelezionato, setSportSelezionato }) => {
  return (
    <div>
      Cosa ti interessa?
      {sports.map((sport) => {
        return (
          <Opzione
            nome={sport.nome}
            setSelezionato={setSportSelezionato}
            otherStyles={
              sportSelezionato === sport.nome
                ? { backgroundColor: "blue" }
                : { backgroundColor: "lightgreen", marginLeft: "10px" }
            }
          />
        );
      })}
    </div>
  );
};

const OpzioneForm = ({ opzione }) => {
  const [sportSelezionato, setSportSelezionato] = useState("");

  if (opzione === "Giocatore") {
    return (
      <div>
        <Wrapper
          sportSelezionato={sportSelezionato}
          setSportSelezionato={setSportSelezionato}
        />
        <GiocatoreForm sportSelezionato={sportSelezionato} />
      </div>
    );
  }

  if (opzione === "Allenatore") {
    return (
      <div>
        <Wrapper
          sportSelezionato={sportSelezionato}
          setSportSelezionato={setSportSelezionato}
        />
        <AllenatoreForm sportSelezionato={sportSelezionato} />
      </div>
    );
  }
  if (opzione === "Società") {
    return <SocietaForm />;
  }
  if (opzione === "Osservatore") {
    return <ScoutForm />;
  }
  if (opzione === "Tifoso") {
    return <Link to="/home"> Vai alla home </Link>;
  }
  return <Errore titolo="Non esiste" messaggio="cazzo fai idota" />;
};

export default OpzioneForm;
