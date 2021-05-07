import React from "react";
import { Link } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";

import Navbar from "../components/Navbar";

import DoppioCartellino from "./Immagini/DoppioCartellino.png";
import YellowCard from "./Immagini/YellowCard.svg";
import "./StileShowInfo.css";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const ShowInfo = ({ user }) => {
  const firestore = useFirestore();

  const query = firestore.collection("Giocatori").doc(user.uid);

  const doc = useFirestoreDocData(query);

  if (doc.status === "loading") return "Loading...";

  const docData = doc.data;

  if (typeof docData.done === "undefined") {
    return (
      <div>
        Il tuo account è incompleto, clicca <Link to="/aggiungiInfo">Qui</Link>{" "}
        completarlo
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div>
        Ciao {user.displayName}
        <img src={user.photoURL} />
      </div>
      <div>
        {docData.sport === "Calcio" ? (
          <GiocatoreCalcio data={docData} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const GiocatoreCalcio = ({ data }) => {
  return (
    <>
      <div className="container" id="datiPersonali">
        <div className="row">
          <div className="col-md-4">
            Altezza <div>{data.altezza} cm</div>
          </div>
          <div className="col-md-4">
            Peso <div>{data.peso} kg</div>
          </div>
          <div className="col-md-4">
            Piede preferito<div>{data.piede[0].label}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            Data di nascita{" "}
            <div>
              {data.dataDiNascita
                .toDate()
                .toLocaleDateString(undefined, options)}
            </div>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4"></div>
        </div>
      </div>

      <div>
        Ruoli
        {data.ruoli.map((ruolo, index) => {
          return <div key={index}>{ruolo.label} </div>;
        })}
      </div>

      <div className="container" id="statistiche">
        <div className="row">
          <div className="col-md-4">
            Gol <div>{data.gol}</div>
          </div>
          <div className="col-md-4">
            Assist <div>{data.assist}</div>
          </div>
          <div className="col-md-4">
            Ammonizioni <div>{data.ammonizioni}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            Espulsioni <div>{data.espulsioni}</div>
          </div>
          <div className="col-md-4">
            Partite da Titolare <div>{data.titolare}</div>
          </div>
          <div className="col-md-4">
            Partite da Subentrato <div>{data.subentrato}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <>
              <i class="fa fa-trophy" aria-hidden="true"></i>
            </>
            Trofei
            <div>{data.trofeiVinti}</div>
          </div>
          <div className="col-md-6">
            Attualmente Infortunato <div>{data.infortunato ? "Sì" : "No"}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowInfo;
