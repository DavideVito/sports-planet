import { useState } from "react";
import { useFirestore } from "reactfire";

import { Button } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";

const NewChat = ({ currentUser, otherUser }) => {
  const firestore = useFirestore();

  const [utente] = useState(otherUser);

  const creaNuovaChat = async (utente) => {
    let chatInto = utente.inChats.filter(async () => {
      let ris = await firestore
        .collection("Chats")
        .where("utenti", "array-contains", [currentUser.uid, otherUser.uid])
        .get();

      if (ris.docs.length === 0) {
        return;
      }

      let id = ris.docs[0].id;

      return typeof id !== null;
    });

    let boh = await Promise.all(chatInto);
    if (boh[0]) {
      window.location.href = "/chat/" + boh[0];
    }
  };

  const iniziaChat = async () => {
    let data = {
      utenti: [currentUser.uid, utente.uid],
      info: {},
    };

    data.info[currentUser.uid] = {
      id: currentUser.uid,
      photoURL: currentUser.photoURL,
      nome: currentUser.displayName,
    };

    data.info[utente.uid] = {
      id: utente.uid,
      photoURL: utente.photoURL,
      nome: utente.displayName,
    };

    console.log(data);

    let s = [currentUser.uid, utente.uid].sort();

    let id1 = s[0];
    let id2 = s[1];

    let id = await sha256(id1 + id2);
    await firestore.collection("Chats").doc(id).set(data);

    await firestore
      .collection("Giocatori")
      .doc(utente.uid)
      .set({ inChats: [...(utente.inChats || []), id] }, { merge: true });

    window.location.href = "/chat/" + id;
  };

  return (
    <Button  style={{ border: "none", color: "white", width:"30%", marginBottom:"50px", padding:"20px" }} color="primary" className="button" onClick={iniziaChat}>
      <NavigationIcon style={{ marginRight:"5px" }}></NavigationIcon> Avvia una chat con me
    </Button>
  );
};

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
export default NewChat;
