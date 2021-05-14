import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { useState, useEffect } from "react";
import { incrementa, serverTimestamp } from "../FirebaseStuff";
import Commento from "./Commento";

const Post = ({ post, user }) => {
  const firestore = useFirestore();
  const [like, setLike] = useState(post.like ?? 0);
  const [isLiked, setIsLiked] = useState(false);
  const [mostraCommenti, setMostraCommenti] = useState(false);

  const [showAddCommento, setAddCommento] = useState(false);
  const [testo, setTesto] = useState("");

  useEffect(() => {
    let ris = post.likedBy.includes(user.uid);

    setIsLiked(ris);
  }, []);

  const postRef = firestore
    .collection("Giocatori")
    .doc(post.owner.uid)
    .collection("Posts")
    .doc(post.id);

  const commentiRef = postRef.collection("Commenti").limit(10);
  const commentData = useFirestoreCollectionData(commentiRef);

  const mettiLike = () => {
    if (isLiked) {
      return;
    }
    postRef.set(
      {
        like: incrementa(1),
        likedBy: [...post.likedBy, user.uid],
      },
      { merge: true }
    );
    setLike(like + 1);
    setIsLiked(true);
  };

  const togliLike = () => {
    if (!isLiked) {
      return;
    }
    post.likedBy = post.likedBy.filter((item) => {
      return item !== user.uid;
    });

    postRef.set(
      {
        like: incrementa(-1),
        likedBy: post.likedBy,
      },
      { merge: true }
    );
    setLike(like - 1);
    setIsLiked(false);
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
        {like}
        {isLiked ? (
          <button onClick={togliLike}>Togli Like</button>
        ) : (
          <button onClick={mettiLike}>Metti Like</button>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            setMostraCommenti(!mostraCommenti);
          }}
        >
          {!mostraCommenti ? "Mostra Commenti" : "Chiudi"}
        </button>
        {mostraCommenti && (
          <>
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
          </>
        )}
      </div>

      <div>{post.dataPostato.toDate().toLocaleDateString()}</div>
    </div>
  );
};

export default Post;
