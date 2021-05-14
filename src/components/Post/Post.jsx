import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { useState } from "react";
import { incrementa, serverTimestamp } from "../FirebaseStuff";
import Commento from "./Commento";

const Post = ({ post, user }) => {
  const firestore = useFirestore();
  const [like, setLike] = useState(post.like ?? 0);
  const [showAddCommento, setAddCommento] = useState(false);
  const [testo, setTesto] = useState("");

  const postRef = firestore
    .collection("Giocatori")
    .doc(post.owner.uid)
    .collection("Posts")
    .doc(post.id);

  const commentiRef = postRef.collection("Commenti").limit(10);
  const commentData = useFirestoreCollectionData(commentiRef);

  const mettiLike = () => {
    postRef.update({ like: incrementa(1) });
    setLike(like + 1);
  };

  const addCommento = (e) => {
    e.preventDefault();
    const data = {
      data: serverTimestamp(),
      testo,
      owner: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    };
    postRef
      .collection("Commenti")
      .add(data)
      .then(() => {
        setTesto("");
      });
  };

  return (
    <div>
      <div>
        <div>
          <img src={post.owner.photoURL} />
        </div>
        <div>{post.owner.displayName}</div>
      </div>

      <div>
        <video controls src={post.link} width="150" height="150" />
        <div>{post.didascalia}</div>
      </div>

      <div>
        {like} <button onClick={mettiLike}>Metti like</button>
      </div>
      <div>
        {commentData.data && <p>Commenti</p>}
        <div>
          {commentData.data?.map((commento) => {
            return (
              <Commento
                testo={commento.testo}
                owner={commento.owner}
                data={commento.data}
                key={commento.NO_FIELD_ID}
              />
            );
          })}
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setAddCommento(!showAddCommento);
          }}
        >
          {!showAddCommento ? "Aggiungi un commento" : "Chiudi"}
        </button>
        {showAddCommento && (
          <form onSubmit={addCommento}>
            Aggiungi commento <br />
            <input
              type="text"
              placeholder="Commento"
              value={testo}
              onChange={(e) => setTesto(e.target.value)}
            />
            <button>Aggiungi</button>
          </form>
        )}
      </div>
      <div>{post.dataPostato.toDate().toLocaleDateString()}</div>
    </div>
  );
};

export default Post;
