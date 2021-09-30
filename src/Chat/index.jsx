import {useParams} from "react-router-dom";
import {
    useFirestore,
    useFirestoreCollectionData,
    useUser,
    AuthCheck,
} from "reactfire";
import React, {useState, useRef} from "react";
import {serverTimestamp} from "../components/FirebaseStuff";

import ErroreSloggato from "../components/Errore/ErroreSloggato";

import {Button, TextField} from "@material-ui/core";

import "./stile.css";

import "firebase/firestore";
import Fab from "@material-ui/core/Fab";
import HomeIcon from "@material-ui/icons/Home";

const Chat = () => {
    let {id} = useParams();

    const u = useUser();

    const user = u;
    if (!user) {
        return <ErroreSloggato/>;
    }

    return (
        <AuthCheck fallback={<ErroreSloggato/>}>
            <ChatView user={user.data} idChat={id}/>
        </AuthCheck>
    );
};

const ChatView = ({user, idChat}) => {
    const firestore = useFirestore();
    const form = useRef(null);
    const [testo, setTesto] = useState("");

    const messaggiRef = firestore
        .collection("Chats")
        .doc(idChat)
        .collection("Messaggi");

    const query = messaggiRef.orderBy("data", "asc").limit(25);

    const docData = useFirestoreCollectionData(query);

    const addMessaggio = (e) => {
        e.preventDefault();

        const data = {
            mittente: user.uid,
            testo: testo,
            data: serverTimestamp(),
            photoURL: user.photoURL,
        };

        messaggiRef
            .doc()
            .set(data)
            .then(() => {
            })
            .catch(() => {
                alert("Errore nell'invio");
            });

        setTesto("");
        form.current.scrollIntoView();
    };

    if (docData.status === "loading") {
        return "Loading";
    }

    const data = docData.data;
    return (
        <div>
            <div className="fixed-top" style={{top: "20px", right: "90%"}}>
                <Fab href="/home" className="" color="primary" aria-label="edit"
                     variant="extended">
                    <HomeIcon style={{marginRight: "5px"}}/>
                    Torna alla home
                </Fab>
            </div>
            <div className="messages">
                {data.map((messaggio) => {
                    return (
                        <Messaggio
                            mittente={messaggio.mittente}
                            utente={user.uid}
                            testo={messaggio.testo}
                            immagineProfilo={messaggio.photoURL}
                        />
                    );
                })}
                <div>
                    <form className="fixed-bottom z" onSubmit={(e) => addMessaggio(e)} ref={form}>
                        <TextField
                            onChange={(e) => setTesto(e.target.value)}
                            placeholder="Scrivi qui il tuo messaggio"
                            value={testo}
                        />
                        <Button type="submit">Invia</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Messaggio = ({mittente, testo, immagineProfilo, utente}) => {
    return (
        <div className={mittente === utente ? "Mittente" : "Destinatario"}>
            <div>{mittente !== utente ? <img src={immagineProfilo}/> : <>Tu</>}</div>
            <div>
                <p>{testo}</p>
            </div>
        </div>
    );
};

export default Chat;
