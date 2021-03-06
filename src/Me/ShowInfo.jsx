import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import "./StileShowInfo.css";
import Espulsioni from "./Immagini/Espulsioni.svg";
import Ammonizioni from "./Immagini/Ammonizioni.svg";
import PartiteTitolare from "./Immagini/PartiteTitolare.svg";
import PartiteSubentrato from "./Immagini/PartiteSubentrato.svg";
import Fab from "@material-ui/core/Fab";
import HomeIcon from "@material-ui/icons/Home";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import Loading from "../components/Loading";

const NewChat = lazy(() => import("./NewChat"));

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const ShowInfo = ({ id }) => {
  const { data: currentUser } = useUser();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const firestore = useFirestore();

  let query = firestore.collection("Giocatori").doc(id ?? currentUser.uid);
  const { data: utente } = useFirestoreDocData(query);

  if (!utente) {
    return <Loading />;
  }

  if (currentUser.uid === id) {
    if (typeof utente.done === "undefined") {
      return (
        <div>
          Il tuo account è incompleto, clicca{" "}
          <Link to="/aggiungiInfo">Qui</Link> completarlo
        </div>
      );
    }
  }

  return (
    <div>
      <div className="userInfo">
        <div
          style={{ marginBottom: "10px", left: "50%" }}
          className="fixed-bottom"
        >
          <Fab
            href="/home"
            className="back-home"
            color="primary"
            aria-label="edit"
            variant="extended"
          >
            <HomeIcon style={{ marginRight: "5px" }} />
            Torna alla home
          </Fab>
          <Fab
            style={{ marginLeft: "5px" }}
            color="primary"
            aria-label="edit"
            onClick={scrollTop}
          >
            <UpIcon />
          </Fab>
        </div>
        <div style={{ fontWeight: "bold", fontSize: "40px" }}>
          {utente.displayName}
        </div>
        <div style={{ marginTop: "10px" }} />
        <img src={utente.photoURL} style={{ borderRadius: "50%" }} />
        <div style={{ marginTop: "25px", marginBottom: "50px" }} />
        <div>
          {currentUser.uid === id ? (
            <></>
          ) : (
            <Suspense>
              <NewChat currentUser={currentUser} otherUser={utente} />
            </Suspense>
          )}
        </div>
      </div>
      <Switcher sport={utente.sport} utente={utente} />
    </div>
  );
};

const Switcher = ({ sport, utente }) => {
  if (utente.allenatore) {
    if (sport === "Calcio") return <AllenatoreCalcio data={utente} />;
    if (sport === "Pallavolo") return <AllenatorePallavolo data={utente} />;
    if (sport === "Basket") return <AllenatoreBasket data={utente} />;
  }

  if (sport === "Tifoso") {
    return <div>Sei un tifoso</div>;
  }

  if (sport === "Calcio") return <GiocatoreCalcio data={utente} />;
  if (sport === "Pallavolo") return <GiocatorePallavolo data={utente} />;
  if (sport === "Basket") return <GiocatoreBasket data={utente} />;

  return <div>boh</div>;
};

const AllenatoreCalcio = ({ data }) => {
  return (
    <>
      <div className="container" id="datiPersonali">
        <div className="row">
          <div className="col-md-4">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Data di nascita</strong>{" "}
            <div>
              {data.dataDiNascita === ""
                ? ""
                : data.dataDiNascita
                    .toDate()
                    .toLocaleDateString(undefined, options)}
            </div>
          </div>
          <div className="col-md-4">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Nazionalità</strong> <div>{data.nazionalita}</div>
          </div>
          <div className="col-md-4">
            <svg
              height="20px"
              viewBox="0 -43 512 512"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m453.332031 426.667969h-394.664062c-32.363281 0-58.667969-26.304688-58.667969-58.667969v-266.667969c0-32.363281 26.304688-58.664062 58.667969-58.664062h128c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-128c-14.699219 0-26.667969 11.964843-26.667969 26.664062v266.667969c0 14.699219 11.96875 26.667969 26.667969 26.667969h394.664062c14.699219 0 26.667969-11.96875 26.667969-26.667969v-266.667969c0-14.699219-11.96875-26.664062-26.667969-26.664062h-128c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h128c32.363281 0 58.667969 26.300781 58.667969 58.664062v266.667969c0 32.363281-26.304688 58.667969-58.667969 58.667969zm0 0" />
              <path d="m304 117.332031h-96c-20.585938 0-37.332031-16.746093-37.332031-37.332031v-42.667969c0-20.585937 16.746093-37.332031 37.332031-37.332031h96c20.585938 0 37.332031 16.746094 37.332031 37.332031v42.667969c0 20.585938-16.746093 37.332031-37.332031 37.332031zm-96-85.332031c-2.945312 0-5.332031 2.390625-5.332031 5.332031v42.667969c0 2.945312 2.386719 5.332031 5.332031 5.332031h96c2.945312 0 5.332031-2.386719 5.332031-5.332031v-42.667969c0-2.941406-2.386719-5.332031-5.332031-5.332031zm0 0" />
              <path d="m160 256c-29.398438 0-53.332031-23.9375-53.332031-53.332031 0-29.398438 23.933593-53.335938 53.332031-53.335938s53.332031 23.9375 53.332031 53.335938c0 29.394531-23.933593 53.332031-53.332031 53.332031zm0-74.667969c-11.753906 0-21.332031 9.578125-21.332031 21.335938 0 11.753906 9.578125 21.332031 21.332031 21.332031s21.332031-9.578125 21.332031-21.332031c0-11.757813-9.578125-21.335938-21.332031-21.335938zm0 0" />
              <path d="m240 362.667969c-8.832031 0-16-7.167969-16-16v-10.667969c0-14.699219-11.96875-26.667969-26.667969-26.667969h-74.664062c-14.699219 0-26.667969 11.96875-26.667969 26.667969v10.667969c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-10.667969c0-32.363281 26.304688-58.667969 58.667969-58.667969h74.664062c32.363281 0 58.667969 26.304688 58.667969 58.667969v10.667969c0 8.832031-7.167969 16-16 16zm0 0" />
              <path d="m432 192h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m432 277.332031h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m432 362.667969h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            </svg>
            <div>
              <strong>Nome Completo</strong>
              <div>{data.displayName}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Squadra</strong> <div>{data.squadra}</div>
          </div>
          <div className="col-md-4">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Procuratore</strong> <div>{data.procuratore}</div>
          </div>
        </div>
      </div>

      <div className="container" id="statistiche">
        <div className="row">
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-futbol-o" aria-hidden="true"></i>
              <br />
              <span>Gol Fatti</span> <div>{data.golFatti}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
              <br />
              <span>Gol Subiti</span> <div>{data.golSubiti}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <span>Vittore</span> <div>{data.vittorie}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="info">
              Sconfitte <div>{data.sconfitte}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              Pareggi <div>{data.pareggi}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const AllenatorePallavolo = ({ data }) => {
  return (
    <>
      <div className="container" id="datiPersonali">
        <div className="row">
          <div className="col-md-4">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Data di nascita</strong>{" "}
            <div>
              {data.dataDiNascita === ""
                ? ""
                : data.dataDiNascita
                    .toDate()
                    .toLocaleDateString(undefined, options)}
            </div>
          </div>
          <div className="col-md-4">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Nazionalità</strong> <div>{data.nazionalita}</div>
          </div>
          <div className="col-md-4">
            <svg
              height="20px"
              viewBox="0 -43 512 512"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m453.332031 426.667969h-394.664062c-32.363281 0-58.667969-26.304688-58.667969-58.667969v-266.667969c0-32.363281 26.304688-58.664062 58.667969-58.664062h128c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-128c-14.699219 0-26.667969 11.964843-26.667969 26.664062v266.667969c0 14.699219 11.96875 26.667969 26.667969 26.667969h394.664062c14.699219 0 26.667969-11.96875 26.667969-26.667969v-266.667969c0-14.699219-11.96875-26.664062-26.667969-26.664062h-128c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h128c32.363281 0 58.667969 26.300781 58.667969 58.664062v266.667969c0 32.363281-26.304688 58.667969-58.667969 58.667969zm0 0" />
              <path d="m304 117.332031h-96c-20.585938 0-37.332031-16.746093-37.332031-37.332031v-42.667969c0-20.585937 16.746093-37.332031 37.332031-37.332031h96c20.585938 0 37.332031 16.746094 37.332031 37.332031v42.667969c0 20.585938-16.746093 37.332031-37.332031 37.332031zm-96-85.332031c-2.945312 0-5.332031 2.390625-5.332031 5.332031v42.667969c0 2.945312 2.386719 5.332031 5.332031 5.332031h96c2.945312 0 5.332031-2.386719 5.332031-5.332031v-42.667969c0-2.941406-2.386719-5.332031-5.332031-5.332031zm0 0" />
              <path d="m160 256c-29.398438 0-53.332031-23.9375-53.332031-53.332031 0-29.398438 23.933593-53.335938 53.332031-53.335938s53.332031 23.9375 53.332031 53.335938c0 29.394531-23.933593 53.332031-53.332031 53.332031zm0-74.667969c-11.753906 0-21.332031 9.578125-21.332031 21.335938 0 11.753906 9.578125 21.332031 21.332031 21.332031s21.332031-9.578125 21.332031-21.332031c0-11.757813-9.578125-21.335938-21.332031-21.335938zm0 0" />
              <path d="m240 362.667969c-8.832031 0-16-7.167969-16-16v-10.667969c0-14.699219-11.96875-26.667969-26.667969-26.667969h-74.664062c-14.699219 0-26.667969 11.96875-26.667969 26.667969v10.667969c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-10.667969c0-32.363281 26.304688-58.667969 58.667969-58.667969h74.664062c32.363281 0 58.667969 26.304688 58.667969 58.667969v10.667969c0 8.832031-7.167969 16-16 16zm0 0" />
              <path d="m432 192h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m432 277.332031h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m432 362.667969h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            </svg>
            <div>
              <strong>Nome Completo</strong>
              <div>{data.displayName}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Squadra</strong> <div>{data.squadra}</div>
          </div>
          <div className="col-md-4">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Procuratore</strong> <div>{data.procuratore}</div>
          </div>
        </div>
      </div>

      <div className="container" id="statistiche">
        <div className="row">
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-futbol-o" aria-hidden="true"></i>
              <br />
              <span>Punti Fatti</span> <div>{data.puntiFatti}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
              <br />
              <span>Punti Subiti</span> <div>{data.puntiSubiti}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <span>Vittore</span> <div>{data.vittorie}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-futbol-o" aria-hidden="true"></i>
              <br />
              <span>Set Vinti</span> <div>{data.setVinti}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
              <br />
              <span>Set Persi</span> <div>{data.setPersi}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <span>Vittore</span> <div>{data.vittorie}</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="info">
              Sconfitte <div>{data.sconfitte}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const AllenatoreBasket = ({ data }) => {
  return (
    <>
      <div className="container" id="datiPersonali">
        <div className="row">
          <div className="col-md-4">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Data di nascita</strong>{" "}
            <div>
              {data.dataDiNascita === ""
                ? ""
                : data.dataDiNascita
                    .toDate()
                    .toLocaleDateString(undefined, options)}
            </div>
          </div>
          <div className="col-md-4">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Nazionalità</strong> <div>{data.nazionalita}</div>
          </div>
          <div className="col-md-4">
            <svg
              height="20px"
              viewBox="0 -43 512 512"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m453.332031 426.667969h-394.664062c-32.363281 0-58.667969-26.304688-58.667969-58.667969v-266.667969c0-32.363281 26.304688-58.664062 58.667969-58.664062h128c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-128c-14.699219 0-26.667969 11.964843-26.667969 26.664062v266.667969c0 14.699219 11.96875 26.667969 26.667969 26.667969h394.664062c14.699219 0 26.667969-11.96875 26.667969-26.667969v-266.667969c0-14.699219-11.96875-26.664062-26.667969-26.664062h-128c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h128c32.363281 0 58.667969 26.300781 58.667969 58.664062v266.667969c0 32.363281-26.304688 58.667969-58.667969 58.667969zm0 0" />
              <path d="m304 117.332031h-96c-20.585938 0-37.332031-16.746093-37.332031-37.332031v-42.667969c0-20.585937 16.746093-37.332031 37.332031-37.332031h96c20.585938 0 37.332031 16.746094 37.332031 37.332031v42.667969c0 20.585938-16.746093 37.332031-37.332031 37.332031zm-96-85.332031c-2.945312 0-5.332031 2.390625-5.332031 5.332031v42.667969c0 2.945312 2.386719 5.332031 5.332031 5.332031h96c2.945312 0 5.332031-2.386719 5.332031-5.332031v-42.667969c0-2.941406-2.386719-5.332031-5.332031-5.332031zm0 0" />
              <path d="m160 256c-29.398438 0-53.332031-23.9375-53.332031-53.332031 0-29.398438 23.933593-53.335938 53.332031-53.335938s53.332031 23.9375 53.332031 53.335938c0 29.394531-23.933593 53.332031-53.332031 53.332031zm0-74.667969c-11.753906 0-21.332031 9.578125-21.332031 21.335938 0 11.753906 9.578125 21.332031 21.332031 21.332031s21.332031-9.578125 21.332031-21.332031c0-11.757813-9.578125-21.335938-21.332031-21.335938zm0 0" />
              <path d="m240 362.667969c-8.832031 0-16-7.167969-16-16v-10.667969c0-14.699219-11.96875-26.667969-26.667969-26.667969h-74.664062c-14.699219 0-26.667969 11.96875-26.667969 26.667969v10.667969c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-10.667969c0-32.363281 26.304688-58.667969 58.667969-58.667969h74.664062c32.363281 0 58.667969 26.304688 58.667969 58.667969v10.667969c0 8.832031-7.167969 16-16 16zm0 0" />
              <path d="m432 192h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m432 277.332031h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m432 362.667969h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            </svg>
            <div>
              <strong>Nome Completo</strong>
              <div>{data.displayName}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Squadra</strong> <div>{data.squadra}</div>
          </div>
          <div className="col-md-4">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Procuratore</strong> <div>{data.procuratore}</div>
          </div>
          <div className="col-md-4">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Modulo Preferito</strong> <div>{data.moduloPreferito}</div>
          </div>
        </div>
      </div>

      <div className="container" id="statistiche">
        <div className="row">
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-futbol-o" aria-hidden="true"></i>
              <br />
              <span>Punti Fatti</span> <div>{data.puntiFatti}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
              <br />
              <span>Punti Subiti</span> <div>{data.puntiSubiti}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <span>Vittore</span> <div>{data.vittorie}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="info">
              Sconfitte <div>{data.sconfitte}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const GiocatoreCalcio = ({ data }) => {
  return (
    <>
      <div className="container" id="datiPersonali">
        <div className="row">
          <div className="col-md-4">
            <span></span>
            <svg
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="20px"
              y="20px"
              height="20px"
              width="20px"
              viewBox="0 0 466.85 466.85"
              enableBackground="new 0 0 466.85 466.85;"
            >
              <g>
                <g>
                  <path
                    d="M463.925,122.425l-119.5-119.5c-3.9-3.9-10.2-3.9-14.1,0l-327.4,327.4c-3.9,3.9-3.9,10.2,0,14.1l119.5,119.5
			c3.9,3.9,10.2,3.9,14.1,0l327.4-327.4C467.825,132.625,467.825,126.325,463.925,122.425z M129.425,442.725l-105.3-105.3l79.1-79.1
			l35.9,35.9c3.8,4,10.2,4.1,14.1,0.2c4-3.8,4.1-10.2,0.2-14.1c-0.1-0.1-0.1-0.1-0.2-0.2l-35.9-35.8l26.1-26.1l56,56
			c3.9,3.9,10.3,3.9,14.1-0.1c3.9-3.9,3.9-10.2,0-14.1l-56-56l26.1-26.1l35.9,35.8c3.9,3.9,10.2,3.9,14.1,0c3.9-3.9,3.9-10.2,0-14.1
			l-35.9-35.8l26.1-26.1l56,56c3.9,3.9,10.2,3.9,14.1,0c3.9-3.9,3.9-10.2,0-14.1l-56-56l26.1-26.1l35.9,35.9
			c3.9,3.9,10.2,4,14.1,0.1c3.9-3.9,4-10.2,0.1-14.1c0,0,0,0-0.1-0.1l-35.6-36.2l26.1-26.1l56,56c3.9,3.9,10.2,3.9,14.1,0
			c3.9-3.9,3.9-10.2,0-14.1l-56-56l18.8-18.8l105.3,105.3L129.425,442.725z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M137.325,331.325c-12.6-12.5-32.9-12.5-45.4,0c-12.5,12.6-12.5,32.9,0,45.4s32.9,12.5,45.4,0
			S149.825,343.925,137.325,331.325z M124.225,362.325c-0.2,0.2-0.5,0.5-1.1,0.4c-4.7,4.7-12.4,4.7-17.2,0c-4.7-4.7-4.7-12.4,0-17.2
			c4.7-4.7,12.4-4.7,17.2,0C128.025,350.025,128.725,357.425,124.225,362.325z"
                  />
                </g>
              </g>
            </svg>
            <br />
            <span>
              <strong>Altezza</strong>
            </span>{" "}
            <div>{data.altezza} cm</div>
          </div>
          <br />
          <div className="col-md-4">
            <i className="fas fa-weight-hanging"></i>
            <br />
            <strong>Peso</strong> <div>{data.peso} kg</div>
          </div>
          <br />
          <br />
          <div className="col-md-4">
            <i className="fas fa-shoe-prints"></i>
            <br />
            <strong>Piede preferito</strong>
            <div>{data.piede[0].label}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Data di nascita</strong>{" "}
            <div>
              {data.dataDiNascita === ""
                ? ""
                : data.dataDiNascita
                    .toDate()
                    .toLocaleDateString(undefined, options)}
            </div>
          </div>
          <div className="col-md-6">
            <svg
              height="20px"
              viewBox="0 -43 512 512"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m453.332031 426.667969h-394.664062c-32.363281 0-58.667969-26.304688-58.667969-58.667969v-266.667969c0-32.363281 26.304688-58.664062 58.667969-58.664062h128c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-128c-14.699219 0-26.667969 11.964843-26.667969 26.664062v266.667969c0 14.699219 11.96875 26.667969 26.667969 26.667969h394.664062c14.699219 0 26.667969-11.96875 26.667969-26.667969v-266.667969c0-14.699219-11.96875-26.664062-26.667969-26.664062h-128c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h128c32.363281 0 58.667969 26.300781 58.667969 58.664062v266.667969c0 32.363281-26.304688 58.667969-58.667969 58.667969zm0 0" />
              <path d="m304 117.332031h-96c-20.585938 0-37.332031-16.746093-37.332031-37.332031v-42.667969c0-20.585937 16.746093-37.332031 37.332031-37.332031h96c20.585938 0 37.332031 16.746094 37.332031 37.332031v42.667969c0 20.585938-16.746093 37.332031-37.332031 37.332031zm-96-85.332031c-2.945312 0-5.332031 2.390625-5.332031 5.332031v42.667969c0 2.945312 2.386719 5.332031 5.332031 5.332031h96c2.945312 0 5.332031-2.386719 5.332031-5.332031v-42.667969c0-2.941406-2.386719-5.332031-5.332031-5.332031zm0 0" />
              <path d="m160 256c-29.398438 0-53.332031-23.9375-53.332031-53.332031 0-29.398438 23.933593-53.335938 53.332031-53.335938s53.332031 23.9375 53.332031 53.335938c0 29.394531-23.933593 53.332031-53.332031 53.332031zm0-74.667969c-11.753906 0-21.332031 9.578125-21.332031 21.335938 0 11.753906 9.578125 21.332031 21.332031 21.332031s21.332031-9.578125 21.332031-21.332031c0-11.757813-9.578125-21.335938-21.332031-21.335938zm0 0" />
              <path d="m240 362.667969c-8.832031 0-16-7.167969-16-16v-10.667969c0-14.699219-11.96875-26.667969-26.667969-26.667969h-74.664062c-14.699219 0-26.667969 11.96875-26.667969 26.667969v10.667969c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-10.667969c0-32.363281 26.304688-58.667969 58.667969-58.667969h74.664062c32.363281 0 58.667969 26.304688 58.667969 58.667969v10.667969c0 8.832031-7.167969 16-16 16zm0 0" />
              <path d="m432 192h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m432 277.332031h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m432 362.667969h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            </svg>
            <div>
              <strong>Nome Completo </strong>
              <div>{data.displayName}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <i className="fas fa-user-tag"></i>
        <br />
        <strong>Ruoli</strong>
        {data.ruoli.map((ruolo, index) => {
          return <div key={index}>{ruolo.label} </div>;
        })}
      </div>

      <div className="container" id="statistiche">
        <div className="row">
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-futbol-o" aria-hidden="true"></i>
              <br />
              <span>Gol</span> <div>{data.gol}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
              <br />
              <span>Assist</span> <div>{data.assist}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <img src={Ammonizioni} />
              <br />
              <span>Ammonizioni</span> <div>{data.ammonizioni}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="info">
              <img src={Espulsioni} />
              <br />
              Espulsioni <div>{data.espulsioni}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <img src={PartiteTitolare} />
              <br />
              Partite da Titolare <div>{data.titolare}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <img src={PartiteSubentrato} />
              <br />
              Partite da Subentrato <div>{data.subentrato}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="info">
              <span>
                <i className="fa fa-trophy" aria-hidden="true"></i>
              </span>
              <br />
              <span>Trofei</span>
              <div>{data.trofeiVinti}</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="info">
              <i className="fas fa-plus"></i>
              <br />
              Attualmente Infortunato{" "}
              <div>{data.infortunato ? "Sì" : "No"}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const GiocatoreBasket = ({ data, setData }) => {
  return (
    <>
      <div className="container" id="datiPersonali">
        <div className="row">
          <div className="col-md-6">
            <span></span>
            <svg
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="20px"
              y="20px"
              height="20px"
              width="20px"
              viewBox="0 0 466.85 466.85"
              enableBackground="new 0 0 466.85 466.85;"
            >
              <g>
                <g>
                  <path
                    d="M463.925,122.425l-119.5-119.5c-3.9-3.9-10.2-3.9-14.1,0l-327.4,327.4c-3.9,3.9-3.9,10.2,0,14.1l119.5,119.5
			c3.9,3.9,10.2,3.9,14.1,0l327.4-327.4C467.825,132.625,467.825,126.325,463.925,122.425z M129.425,442.725l-105.3-105.3l79.1-79.1
			l35.9,35.9c3.8,4,10.2,4.1,14.1,0.2c4-3.8,4.1-10.2,0.2-14.1c-0.1-0.1-0.1-0.1-0.2-0.2l-35.9-35.8l26.1-26.1l56,56
			c3.9,3.9,10.3,3.9,14.1-0.1c3.9-3.9,3.9-10.2,0-14.1l-56-56l26.1-26.1l35.9,35.8c3.9,3.9,10.2,3.9,14.1,0c3.9-3.9,3.9-10.2,0-14.1
			l-35.9-35.8l26.1-26.1l56,56c3.9,3.9,10.2,3.9,14.1,0c3.9-3.9,3.9-10.2,0-14.1l-56-56l26.1-26.1l35.9,35.9
			c3.9,3.9,10.2,4,14.1,0.1c3.9-3.9,4-10.2,0.1-14.1c0,0,0,0-0.1-0.1l-35.6-36.2l26.1-26.1l56,56c3.9,3.9,10.2,3.9,14.1,0
			c3.9-3.9,3.9-10.2,0-14.1l-56-56l18.8-18.8l105.3,105.3L129.425,442.725z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M137.325,331.325c-12.6-12.5-32.9-12.5-45.4,0c-12.5,12.6-12.5,32.9,0,45.4s32.9,12.5,45.4,0
			S149.825,343.925,137.325,331.325z M124.225,362.325c-0.2,0.2-0.5,0.5-1.1,0.4c-4.7,4.7-12.4,4.7-17.2,0c-4.7-4.7-4.7-12.4,0-17.2
			c4.7-4.7,12.4-4.7,17.2,0C128.025,350.025,128.725,357.425,124.225,362.325z"
                  />
                </g>
              </g>
            </svg>
            <br />
            <span>
              <strong>Altezza</strong>
            </span>{" "}
            <div>{data.altezza} cm</div>
          </div>
          <br />
          <div className="col-md-6">
            <i className="fas fa-weight-hanging"></i>
            <br />
            <strong>Peso</strong> <div>{data.peso} kg</div>
          </div>
          <br />
          <br />
        </div>
        <div className="row">
          <div className="col-md-6">
            <i className="fas fa-calendar-alt"></i>
            <br />
            <strong>Data di nascita</strong>{" "}
            <div>
              {data.dataDiNascita === ""
                ? ""
                : data.dataDiNascita
                    .toDate()
                    .toLocaleDateString(undefined, options)}
            </div>
          </div>
          <div className="col-md-6">
            <svg
              height="20px"
              viewBox="0 -43 512 512"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m453.332031 426.667969h-394.664062c-32.363281 0-58.667969-26.304688-58.667969-58.667969v-266.667969c0-32.363281 26.304688-58.664062 58.667969-58.664062h128c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-128c-14.699219 0-26.667969 11.964843-26.667969 26.664062v266.667969c0 14.699219 11.96875 26.667969 26.667969 26.667969h394.664062c14.699219 0 26.667969-11.96875 26.667969-26.667969v-266.667969c0-14.699219-11.96875-26.664062-26.667969-26.664062h-128c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h128c32.363281 0 58.667969 26.300781 58.667969 58.664062v266.667969c0 32.363281-26.304688 58.667969-58.667969 58.667969zm0 0" />
              <path d="m304 117.332031h-96c-20.585938 0-37.332031-16.746093-37.332031-37.332031v-42.667969c0-20.585937 16.746093-37.332031 37.332031-37.332031h96c20.585938 0 37.332031 16.746094 37.332031 37.332031v42.667969c0 20.585938-16.746093 37.332031-37.332031 37.332031zm-96-85.332031c-2.945312 0-5.332031 2.390625-5.332031 5.332031v42.667969c0 2.945312 2.386719 5.332031 5.332031 5.332031h96c2.945312 0 5.332031-2.386719 5.332031-5.332031v-42.667969c0-2.941406-2.386719-5.332031-5.332031-5.332031zm0 0" />
              <path d="m160 256c-29.398438 0-53.332031-23.9375-53.332031-53.332031 0-29.398438 23.933593-53.335938 53.332031-53.335938s53.332031 23.9375 53.332031 53.335938c0 29.394531-23.933593 53.332031-53.332031 53.332031zm0-74.667969c-11.753906 0-21.332031 9.578125-21.332031 21.335938 0 11.753906 9.578125 21.332031 21.332031 21.332031s21.332031-9.578125 21.332031-21.332031c0-11.757813-9.578125-21.335938-21.332031-21.335938zm0 0" />
              <path d="m240 362.667969c-8.832031 0-16-7.167969-16-16v-10.667969c0-14.699219-11.96875-26.667969-26.667969-26.667969h-74.664062c-14.699219 0-26.667969 11.96875-26.667969 26.667969v10.667969c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-10.667969c0-32.363281 26.304688-58.667969 58.667969-58.667969h74.664062c32.363281 0 58.667969 26.304688 58.667969 58.667969v10.667969c0 8.832031-7.167969 16-16 16zm0 0" />
              <path d="m432 192h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m432 277.332031h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m432 362.667969h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            </svg>
            <div>
              <strong>Nome Completo</strong>
              <div>{data.displayName}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" id="statistiche">
        <div className="row">
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-futbol-o" aria-hidden="true"></i>
              <br />
              <span>Media Punti</span> <div>{data.mediaPunti}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
              <br />
              <span>Media Minuti</span> <div>{data.mediaMinuti}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <img src={Ammonizioni} />
              <br />
              <span>Media Rimbalzi</span> <div>{data.mediaRimbalzi}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="info">
              Media Palle Rubate <div>{data.mediaPalleRubate}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              Media Palle Perse <div>{data.mediaPallePerse}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <img src={PartiteSubentrato} />
              <br />
              Media Assists <div>{data.mediaAssist}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="info">
              <span>
                <i className="fa fa-trophy" aria-hidden="true"></i>
              </span>
              <br />
              <span>Trofei</span>
              <div>{data.trofei}</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="info">
              <i className="fas fa-plus"></i>
              <br />
              Infortuni {data.infortuni}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const GiocatorePallavolo = ({ data }) => {
  return (
    <>
      <div className="container" id="datiPersonali">
        <div className="row">
          <div className="col-md-4">
            <span></span>
            <svg
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="20px"
              y="20px"
              height="20px"
              width="20px"
              viewBox="0 0 466.85 466.85"
              enableBackground="new 0 0 466.85 466.85;"
            >
              <g>
                <g>
                  <path
                    d="M463.925,122.425l-119.5-119.5c-3.9-3.9-10.2-3.9-14.1,0l-327.4,327.4c-3.9,3.9-3.9,10.2,0,14.1l119.5,119.5
			c3.9,3.9,10.2,3.9,14.1,0l327.4-327.4C467.825,132.625,467.825,126.325,463.925,122.425z M129.425,442.725l-105.3-105.3l79.1-79.1
			l35.9,35.9c3.8,4,10.2,4.1,14.1,0.2c4-3.8,4.1-10.2,0.2-14.1c-0.1-0.1-0.1-0.1-0.2-0.2l-35.9-35.8l26.1-26.1l56,56
			c3.9,3.9,10.3,3.9,14.1-0.1c3.9-3.9,3.9-10.2,0-14.1l-56-56l26.1-26.1l35.9,35.8c3.9,3.9,10.2,3.9,14.1,0c3.9-3.9,3.9-10.2,0-14.1
			l-35.9-35.8l26.1-26.1l56,56c3.9,3.9,10.2,3.9,14.1,0c3.9-3.9,3.9-10.2,0-14.1l-56-56l26.1-26.1l35.9,35.9
			c3.9,3.9,10.2,4,14.1,0.1c3.9-3.9,4-10.2,0.1-14.1c0,0,0,0-0.1-0.1l-35.6-36.2l26.1-26.1l56,56c3.9,3.9,10.2,3.9,14.1,0
			c3.9-3.9,3.9-10.2,0-14.1l-56-56l18.8-18.8l105.3,105.3L129.425,442.725z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M137.325,331.325c-12.6-12.5-32.9-12.5-45.4,0c-12.5,12.6-12.5,32.9,0,45.4s32.9,12.5,45.4,0
			S149.825,343.925,137.325,331.325z M124.225,362.325c-0.2,0.2-0.5,0.5-1.1,0.4c-4.7,4.7-12.4,4.7-17.2,0c-4.7-4.7-4.7-12.4,0-17.2
			c4.7-4.7,12.4-4.7,17.2,0C128.025,350.025,128.725,357.425,124.225,362.325z"
                  />
                </g>
              </g>
            </svg>
            <br />
            <span>Altezza</span> <div>{data.altezza} cm</div>
          </div>
          <div className="col-md-4">
            <i className="fas fa-weight-hanging"></i>
            <br />
            Peso <div>{data.peso} kg</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <i className="fas fa-calendar-alt"></i>
            <br />
            Data di nascita{" "}
            <div>
              {data.dataDiNascita
                .toDate()
                .toLocaleDateString(undefined, options)}
            </div>
          </div>
          <div className="col-md-6">
            <svg
              height="20px"
              viewBox="0 -43 512 512"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m453.332031 426.667969h-394.664062c-32.363281 0-58.667969-26.304688-58.667969-58.667969v-266.667969c0-32.363281 26.304688-58.664062 58.667969-58.664062h128c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-128c-14.699219 0-26.667969 11.964843-26.667969 26.664062v266.667969c0 14.699219 11.96875 26.667969 26.667969 26.667969h394.664062c14.699219 0 26.667969-11.96875 26.667969-26.667969v-266.667969c0-14.699219-11.96875-26.664062-26.667969-26.664062h-128c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h128c32.363281 0 58.667969 26.300781 58.667969 58.664062v266.667969c0 32.363281-26.304688 58.667969-58.667969 58.667969zm0 0" />
              <path d="m304 117.332031h-96c-20.585938 0-37.332031-16.746093-37.332031-37.332031v-42.667969c0-20.585937 16.746093-37.332031 37.332031-37.332031h96c20.585938 0 37.332031 16.746094 37.332031 37.332031v42.667969c0 20.585938-16.746093 37.332031-37.332031 37.332031zm-96-85.332031c-2.945312 0-5.332031 2.390625-5.332031 5.332031v42.667969c0 2.945312 2.386719 5.332031 5.332031 5.332031h96c2.945312 0 5.332031-2.386719 5.332031-5.332031v-42.667969c0-2.941406-2.386719-5.332031-5.332031-5.332031zm0 0" />
              <path d="m160 256c-29.398438 0-53.332031-23.9375-53.332031-53.332031 0-29.398438 23.933593-53.335938 53.332031-53.335938s53.332031 23.9375 53.332031 53.335938c0 29.394531-23.933593 53.332031-53.332031 53.332031zm0-74.667969c-11.753906 0-21.332031 9.578125-21.332031 21.335938 0 11.753906 9.578125 21.332031 21.332031 21.332031s21.332031-9.578125 21.332031-21.332031c0-11.757813-9.578125-21.335938-21.332031-21.335938zm0 0" />
              <path d="m240 362.667969c-8.832031 0-16-7.167969-16-16v-10.667969c0-14.699219-11.96875-26.667969-26.667969-26.667969h-74.664062c-14.699219 0-26.667969 11.96875-26.667969 26.667969v10.667969c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-10.667969c0-32.363281 26.304688-58.667969 58.667969-58.667969h74.664062c32.363281 0 58.667969 26.304688 58.667969 58.667969v10.667969c0 8.832031-7.167969 16-16 16zm0 0" />
              <path d="m432 192h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m432 277.332031h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m432 362.667969h-117.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h117.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            </svg>
            <br />
            <div>
              Nome Completo <div>{data.displayName}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" id="statistiche">
        <div className="row">
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-futbol-o" aria-hidden="true"></i>
              <br />
              <span>Partite Giocate</span> <div>{data.partiteGiocate}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
              <br />
              <span>Set Giocati</span> <div>{data.sGiocati}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <img src={Ammonizioni} />
              <br />
              <span>Punti</span> <div>{data.punti}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="info">
              <img src={Espulsioni} />
              <br />
              Ace Totali <div>{data.aceTot}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <img src={PartiteTitolare} />
              <br />
              Ricezioni Totali <div>{data.ricezioniTot}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <img src={PartiteSubentrato} />
              <br />
              Muri Difesa <div>{data.muriDifesa}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="info">
              <i className="fas fa-plus"></i>
              <br />
              Attualmente Infortunato{" "}
              <div>{data.infortunato ? "Sì" : "No"}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowInfo;
