import Errore from "./../../../components/Errore";
import GiocatoreForm from "./Forms/GiocatoreForm";
import AllenatoreForm from "./Forms/AllenatoreForm";
import ScoutForm from "./Forms/ScoutForm";
import SocietaForm from "./Forms/SocietaForm";
import Opzione from "./Opzione";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useFirestore} from "reactfire";

import "./StileOpzioneForm.css";

const sports = [
    {
        nome: "Pallavolo",
    },
    {nome: "Calcio"},
    {nome: "Basket"},
];

const Wrapper = ({sportSelezionato, setSportSelezionato}) => {
    return (
        <div>
            <p style={{fontSize: "24px", fontWeight: "bold"}}>Cosa ti interessa?</p>
            {sports.map((sport) => {
                return (
                    <Opzione
                        nome={sport.nome}
                        setSelezionato={setSportSelezionato}
                        otherStyles={
                            sportSelezionato === sport.nome
                                ? {
                                    backgroundColor: "#e56b54",
                                    marginLeft: "10px",
                                    marginBottom: "10px",
                                    padding: "10px",
                                    border: "4px solid black",
                                    borderRadius: "7px",
                                    color: "white",
                                    fonWeight: "bold"
                                }
                                : {
                                    backgroundColor: "orange",
                                    marginLeft: "10px",
                                    marginBottom: "10px",
                                    padding: "10px",
                                    border: "4px solid black",
                                    borderRadius: "7px",
                                    color: "black"
                                }
                        }
                    />
                );
            })}
        </div>
    );
};

const OpzioneForm = ({opzione}) => {
    const [sportSelezionato, setSportSelezionato] = useState("");

    if (opzione === "Giocatore") {
        return (
            <div style={{marginLeft:"15px"}}>
                <Wrapper
                    sportSelezionato={sportSelezionato}
                    setSportSelezionato={setSportSelezionato}
                />
                <GiocatoreForm sportSelezionato={sportSelezionato}/>
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
                <AllenatoreForm sportSelezionato={sportSelezionato}/>
            </div>
        );
    }
    if (opzione === "Società") {
        return <SocietaForm/>;
    }
    if (opzione === "Osservatore") {
        return <ScoutForm/>;
    }
    if (opzione === "Tifoso") {
        return <Link style={{textDecoration:"none",marginLeft:"10px"}} className="button" to="/home"> Vai alla home </Link>;
    }
    return <></>;
};

export default OpzioneForm;
