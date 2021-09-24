import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Preloader from "./components/Preloader/Preloader";
import Timer from "./components/Countdown/Timer";

ReactDOM.render(
    <React.StrictMode>
        <App />
        {/*<div className="App">
            <div className="container">
                <h1>
                    Sito
                    <br/>
                    In arrivo il
                </h1>
                <Timer/>
                <h2 style={{marginTop: "15px"}}>Rimani aggiornato con la <a href="">pagina instagram</a> di sportsplanet
                </h2>
                <Preloader/>
            </div>
        </div>*/}
    </React.StrictMode>,
    document.getElementById("root")
);


