import { useStorage, useFirestore } from "reactfire";
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { serverTimestamp } from "../FirebaseStuff";
import Dropzone from "react-dropzone";

import { v4 as uuid } from "uuid";
import FileForm from "../FileForm";

const AddPost = ({ user }) => {
  const [file, setFile] = useState(null);
  const [didascalia, setDidascalia] = useState(null);
  const [titolo, setTitolo] = useState(null);
  const [sottotitolo, setSottotitolo] = useState(null);
  const [progresso, setProgresso] = useState(0);
  const [done, setDone] = useState(false);
  const [bottoneAttivo, setBottoneAttivo] = useState(true);

  const storage = useStorage().ref();
  const firestore = useFirestore();

  const posta = (e) => {
    e.preventDefault();

    if (!file || !titolo || !sottotitolo) {
      return alert(
        "Non hai selezionato un file, scritto un sottotitolo oppure scritto un titolo"
      );
    }

    let name = uuid();

    setBottoneAttivo(false);

    const uploadTask = storage.child("video/" + name).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgresso(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        let downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

        await addDataToDatabase(downloadURL, name);
        setDone(true);
        setBottoneAttivo(true);
      }
    );
  };

  const addDataToDatabase = (link, id) => {
    firestore
      .collection("Giocatori")
      .doc(user.uid)
      .collection("Posts")
      .doc(id)
      .set({
        id,
        didascalia,
        titolo,
        sottotitolo,
        link,
        like: 0,
        dataPostato: serverTimestamp(),
        likedBy: [],
        owner: {
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL || "",
        },
      });
  };

  if (done) {
    return <div>Hai pubblicato il post {titolo}</div>;
  }

  return (
    <form onSubmit={posta}>
      <div>
        <FileForm setFile={setFile} />
      </div>

      <div style={{ height: "25px" }} />
      <div>
        <TextField
          required
          type="text"
          placeholder="Titolo"
          onChange={(e) => setTitolo(e.target.value)}
        />
        <br />
        <br />
        <TextField
          type="text"
          placeholder="Didascalia"
          onChange={(e) => setDidascalia(e.target.value)}
        />
        <br />
        <br />
        <TextField
          type="text"
          placeholder="Sottotitolo"
          onChange={(e) => setSottotitolo(e.target.value)}
        />
      </div>
      <div style={{ height: "25px" }} />
      <div>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          disabled={!bottoneAttivo}
        >
          Posta
        </Button>
      </div>

      {progresso > 0 && <div>Progresso: {progresso}</div>}
    </form>
  );
};

export default AddPost;
