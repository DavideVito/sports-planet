import { useStorage, useFirestore } from "reactfire";
import firebase from "firebase";
import { useState } from "react";
import { serverTimestamp } from "../FirebaseStuff";

import { v4 as uuid } from "uuid";

const AddPost = ({ user }) => {
  const [file, setFile] = useState(null);
  const [didascalia, setDidascalia] = useState(null);
  const [progresso, setProgresso] = useState(0);
  const [done, setDone] = useState(false);
  const [bottoneAttivo, setBottoneAttivo] = useState(true);

  const storage = useStorage().ref();
  const firestore = useFirestore();

  const posta = () => {
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

        await addDataToDatabase(downloadURL);
        setDone(true);
        setBottoneAttivo(true);
      }
    );
  };

  const addDataToDatabase = (link) => {
    firestore
      .collection("Giocatori")
      .doc(user.uid)
      .collection("Posts")
      .doc()
      .set({
        didascalia,
        link,
        dataPostato: serverTimestamp(),
        owner: {
          displayName: user.displayName,
          photoURL: user.photoURL || "",
        },
      });
  };

  if (done) {
    return <div>Post Pubblicato YEEEE</div>;
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        required
        type="file"
        accept=".mp4"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <div>
        <input
          required
          type="text"
          placeholder="Didascalia"
          onChange={(e) => setDidascalia(e.target.value)}
        />
      </div>

      <div>
        <button onClick={posta} disabled={!bottoneAttivo}>
          Posta
        </button>
      </div>

      {progresso > 0 && <div>Progresso: {progresso}</div>}
    </form>
  );
};

export default AddPost;
