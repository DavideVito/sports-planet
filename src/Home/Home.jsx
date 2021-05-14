import {
  useFirestore,
  useFirestoreDocDataOnce,
  useUser,
  AuthCheck,
} from "reactfire";
import { useEffect, useState } from "react";
import ErroreSloggato from "../components/Errore/ErroreSloggato";

import Post from "../components/Post/Post";
import AddPost from "../components/Post/AddPost";

const Home = () => {
  const u = useUser();

  const user = u.data;
  if (!user) {
    return <ErroreSloggato />;
  }
  return (
    <AuthCheck fallback={<ErroreSloggato />}>
      <ShowPost user={user} />
    </AuthCheck>
  );
};

const ShowPost = ({ user }) => {
  const [post, setPost] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const firestore = useFirestore();
  const userDataQuery = firestore.collection("Giocatori").doc(user.uid);

  const userDataS = useFirestoreDocDataOnce(userDataQuery);

  let userData = null;

  useEffect(() => {
    if (!userData) {
      return;
    }
    const utentiSeguiti = userData.utentiSeguiti;

    let oggi = new Date();
    let ieri = new Date(new Date().setDate(oggi.getDate() - 3));

    if (!utentiSeguiti) {
      return;
    }

    const promises = utentiSeguiti.map(async (utente) => {
      let query = await firestore
        .collection("Giocatori")
        .doc(utente)
        .collection("Posts")
        .where("dataPostato", ">", ieri)
        .where("dataPostato", "<=", oggi)
        .orderBy("dataPostato", "desc")
        .orderBy("like", "desc")
        .limit(30)
        .get();

      return query;
    });

    Promise.all(promises).then((documents) => {
      let ogg = [];

      documents.forEach((doc) => {
        let a = doc.docs.map((d) => {
          return { id: d.id, ...d.data() };
        });

        ogg = [...a, ...ogg];
      });

      documents = ogg;
      setPost(documents);
    });
  }, [userDataS.status]);
  if (userDataS.status === "loading") {
    return <div>Loading</div>;
  }

  userData = userDataS.data;

  return (
    <div>
      <button
        onClick={(e) => {
          setShowAddPost(!showAddPost);
        }}
      >
        {!showAddPost ? <div>Aggiungi un post</div> : <div>Chiudi</div>}
      </button>
      {showAddPost && <AddPost user={user} />}
      {post.length === 0 ? (
        <div> non ci sono post</div>
      ) : (
        <div>
          {post.map((p) => {
            return <Post key={p.id} post={p} user={user} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
