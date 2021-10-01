import React, {useState, useEffect} from "react";
import {useUser, useFirestore, useFirestoreDocDataOnce} from "reactfire";
import {useHistory} from "react-router-dom";
import Errore from "./../../components/Errore";
import Opzione from "./OpzioneForm/Opzione";
import OpzioneForm from "./OpzioneForm";
import "./StileAggiungiInfo.css";
const AggiungiInfo = () => {
    const history = useHistory();
    const user = useUser();
    const [selezionato, setSelezionato] = useState();
    const [documentoUtente, setDocumento] = useState({status: "loading"});
    const firestore = useFirestore();

    let utente = user.data;

    useEffect(() => {
        if (utente?.uid) {
            const query = firestore.collection("Giocatori").doc(utente.uid);

            query.get().then((docSnapshot) => {
                setDocumento({data: docSnapshot.data()});
            });
        }
    }, [utente]);
    if (user.status === "loading") {
        return <div>loading...</div>;
    }

    if (documentoUtente.status === "loading") {
        return <div>Loading...</div>;
    }

    const backOnLoginPage = () => {
        history.push("/login");
    };

    console.log(documentoUtente);

    const otherStyle = {
        backgroundColor: "#e56b54",
        marginLeft: "15px",
        padding: "20px",
        fontWeight: "bold",
        border: "4px solid black",
        borderRadius: "7px"
    };
    const opzioni = [
        {
            nome: "Giocatore",
        },
        {
            nome: "Allenatore",
        },
        {
            nome: "Società",
        },
        {
            nome: "Osservatore",

        },
        {
            nome: "Tifoso",
        },
    ];

    if (documentoUtente.data?.done) {
        return (
            <div>
                <Errore
                    titolo="Hai già inserito queste informazioni"
                    messaggio="Questa pagina è visibile solo per chi crea un account per la prima volta, tu avendolo già creato non puoi stare qua"
                />

                <button type="button" onClick={backOnLoginPage}>
                    Go home
                </button>

                <button type="button" onClick={backOnLoginPage}>
                    Per modificare le informazioni...
                </button>
            </div>
        );
    }

    if (!utente) {
        return (
            <div>
                <Errore
                    titolo="Utente non loggato"
                    messaggio="Devi essere loggato per accedere a questa pagina"
                />

                <button type="button" onClick={backOnLoginPage}>
                    Go home
                </button>
            </div>
        );
    }
    return (
        <div>
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <div className="content infodiv">
                <h2 class="header-text">
                    Chi sei?
                </h2>
                <form className="form-group" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        {opzioni.map((opzione) => {
                            return (
                                <Opzione
                                    nome={opzione.nome}
                                    setSelezionato={setSelezionato}
                                    otherStyles={
                                        selezionato === opzione.nome
                                            ? otherStyle
                                            : {
                                                backgroundColor: "orange",
                                                marginLeft: "15px",
                                                padding: "20px",
                                                fontWeight: "bold",
                                                border: "2px solid white",
                                                borderRadius: "5px"
                                            }
                                    }
                                />
                            );
                        })}

                        <br/>
                        <OpzioneForm opzione={selezionato} opzioni={opzioni}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AggiungiInfo;
