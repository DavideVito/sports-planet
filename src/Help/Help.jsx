import React from "react";
import "./Help.css";
import Fab from "@material-ui/core/Fab";
import HomeIcon from "@material-ui/icons/Home";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";


const Help = () => {
    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    return (
        <div>
            <br/><br/>
            <h1>Hai bisogno di una mano ?</h1>
            <h3>Cerca tra le domande più frequenti e magari troverai la risposta che cerchi !</h3>
            <h5>Oppure scrivi alla nostra email <a href="#">assistenzasportsplanet@gmail.com</a> e ti ricontatteremo al
                più presto </h5>
            <br/><br/>
            <div style={{marginBottom: "10px", left: "20%", width: "100%", display: "flex"}} className="fixed-bottom">
                <Fab href="/home" className="back-home" color="primary" aria-label="edit"
                     variant="extended">
                    <HomeIcon style={{marginRight: "5px"}}/>
                    Torna alla home
                </Fab>
                <Fab style={{marginLeft: "5px"}} color="primary" aria-label="edit" onClick={scrollTop}>
                    <UpIcon/>
                </Fab>
            </div>
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                aria-controls="panelsStayOpen-collapseOne">Come faccio a postare un video ?
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"
                         aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body">
                            <strong>Postare un video è semplice come bere un bicchiere d'acqua su sportsplanet !.</strong>Recati nella pagina 'posta' situata nella homepage... successivamente inserisci il video dal tuo device ,inserisci titolo,didascalia,un commento principale e il gioco è fatto !
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseTwo">
                            Come posso modificare nuovamente le mia scheda tecnica ?
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show"
                         aria-labelledby="panelsStayOpen-headingTwo">
                        <div class="accordion-body">
                            <strong>Per modificare le tue informazioni</strong> ti invitiamo a scirverci una email
                            segnalando quali informazioni cambiare e quali valori assegnare...Per questioni di sicurezza
                            e privacy siamo costretti a contorllare che le informazioni siano veritiere
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                            <button class="accordion-button " type="button" data-bs-toggle="collapse"
                                    data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                                    aria-controls="panelsStayOpen-collapseThree">
                                Come funziona l'editor ?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show"
                             aria-labelledby="panelsStayOpen-headingThree">
                            <div class="accordion-body">
                                <strong>L'editor è semplicissimo da usare.</strong>Troverai un tutorial guidato su come editare i tuoi e renderli spettacolari e interessanti per tutti i tuoi fan
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/><br/><br/>
        </div>
    );
}
export default Help;