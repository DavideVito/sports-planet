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
            <span></span>
            <br />
            <span>Altezza</span> <div>{data.altezza} cm</div>
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
            <i class="fa fa-futbol-o" aria-hidden="true"></i>
            <br />
            <span>Gol</span> <div>{data.gol}</div>
          </div>
          <div className="col-md-4">
            <i class="fa fa-hand-paper-o" aria-hidden="true"></i>
            <br />
            <span>Assist</span> <div>{data.assist}</div>
          </div>
          <div className="col-md-4">
            <svg
              id="Capa_1"
              enable-background="new 0 0 512.001 512.001"
              height="20"
              viewBox="0 0 512.001 512.001"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="m140.132 512.001c-3.499 0-6.629-2.461-7.345-6.023l-42.652-212.205c-2.029-10.097.227-20.704 6.189-29.102l43.911-61.833c6.13-8.633 15.622-14.228 26.004-15.507v-83.15c0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5v82.87h41.913c12.654 0 24.363 6.31 31.321 16.879l25.355 38.513c3.367 5.115 4.415 11.342 2.875 17.085-1.516 5.656-5.456 10.44-10.81 13.124-2.919 1.463-5.966 2.497-9.059 3.119.996 2.302 1.724 4.761 2.142 7.345.223 1.382.45 2.832.679 4.347l81.049.004c4.136 0 7.5-3.364 7.5-7.5v-257.467c0-4.136-3.364-7.5-7.5-7.5h-157.964c-4.136 0-7.5 3.364-7.5 7.5v51.681c0 4.142-3.358 7.5-7.5 7.5s-7.5-3.358-7.5-7.5v-51.681c0-12.407 10.093-22.5 22.5-22.5h157.965c12.406 0 22.5 10.093 22.5 22.5v257.466c0 12.407-10.094 22.5-22.5 22.5l-33.446-.002c-7.22 14.833-11.021 31.267-11.021 47.772v19.494c0 4.142-3.357 7.5-7.5 7.5s-7.5-3.358-7.5-7.5v-19.494c0-16.371 3.287-32.679 9.573-47.773l-29.157-.001c1.524 13.181 2.739 28.943 2.739 45.685 0 26.067-2.945 49.752-5.416 65.032-2.257 13.951-13.545 24.311-27.354 25.528 7.758 15.625 10.434 31.821 8.26 50.173l5.265-3.342c22.598-14.344 36.089-38.888 36.089-65.654v-20.154c0-4.142 3.357-7.5 7.5-7.5s7.5 3.358 7.5 7.5v20.153c0 31.929-16.094 61.207-43.05 78.318l-19.897 12.63c-2.599 1.649-5.941 1.544-8.432-.268-2.489-1.811-3.619-4.959-2.849-7.94 6.887-26.657 4.022-46.736-9.578-67.137l-20-30c-1.534-2.301-1.677-5.26-.372-7.699 1.305-2.438 3.846-3.961 6.612-3.961h24.221c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5h-10.207l10 15h6.202c7.632 0 14.059-5.485 15.281-13.043 1.458-9.016 3.087-21.063 4.133-34.797-1.529-7.135-7.801-12.252-15.132-12.252h-68.656c-4.142 0-7.5-3.358-7.5-7.5s3.358-7.5 7.5-7.5h68.656c5.91 0 11.47 1.686 16.183 4.641.027-1.731.041-3.473.041-5.229 0-5.862-.155-11.601-.424-17.143-1.363-7.364-7.729-12.685-15.218-12.685h-84.656c-4.142 0-7.5-3.358-7.5-7.5s3.358-7.5 7.5-7.5h84.656c4.726 0 9.225 1.075 13.246 3.012-.879-7.958-1.889-15.018-2.828-20.822-.966-5.972-5.918-13.043-15.281-13.043h-96.656c-4.142 0-7.5-3.358-7.5-7.5s3.358-7.5 7.5-7.5h31.204l13.595-23.265c1.345-2.302 3.81-3.716 6.476-3.716h29c2.441 0 4.73 1.188 6.135 3.186l13.136 18.68c6.214 8.835 17.736 11.733 27.395 6.891 1.985-.996 2.751-2.507 3.044-3.599.438-1.632.112-3.391-.916-4.953l-25.355-38.513c-4.175-6.341-11.2-10.127-18.793-10.127h-52.342c-7.275 0-14.133 3.541-18.345 9.473l-43.911 61.833c-3.578 5.039-4.931 11.403-3.713 17.461l42.652 212.205c.816 4.061-1.814 8.015-5.875 8.831-.5.101-.997.149-1.487.149zm46.678-254.535h36.227l-8.425-11.981h-20.801zm227.785-52.831c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-31c-4.143 0-7.5-3.358-7.5-7.5v-106.413c0-4.142 3.357-7.5 7.5-7.5s7.5 3.358 7.5 7.5v106.413c0 4.142-3.358 7.5-7.5 7.5z" />
              </g>
            </svg>
            <br />
            <span>Ammonizioni</span> <div>{data.ammonizioni}</div>
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
            <span>
              <i class="fa fa-trophy" aria-hidden="true"></i>
            </span>
            <br />
            <span>Trofei</span>
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
