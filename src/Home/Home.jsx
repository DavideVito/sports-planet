import {
  useFirestore,
  useFirestoreDocDataOnce,
  useUser,
  AuthCheck,
} from "reactfire";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import Login from "../Login/Login";

import Post from "../components/Post/Post";
import AddPost from "../components/Post/AddPost";

const Home = () => {
  return (
    <AuthCheck fallback={<Login />}>
      <ShowPost />
    </AuthCheck>
  );
};

const ShowPost = () => {
  const { data: user } = useUser();
  const [post, setPost] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const firestore = useFirestore();
  const userDataQuery = firestore.collection("Giocatori").doc(user.uid);

  const userData = useFirestoreDocDataOnce(userDataQuery);

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
      return await firestore
        .collection("Giocatori")
        .doc(utente)
        .collection("Posts")
        .where("dataPostato", ">", ieri)
        .where("dataPostato", "<=", oggi)
        .orderBy("dataPostato", "desc")
        .orderBy("like", "desc")
        .limit(30)
        .get();
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
      console.table(documents);
      setPost(documents);
    });
  }, []);

  return (
    <div>
      <div>
        <div style={{ marginTop: "25px" }} />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => (window.location.href = "/chats")}
        >
          Vai alle chat
        </Button>
      </div>
      <div style={{ marginTop: "25px" }} />
      <Button
        color="primary"
        variant="outlined"
        onClick={(e) => {
          setShowAddPost(!showAddPost);
        }}
      >
        {!showAddPost ? <div>Aggiungi un post</div> : <div>Chiudi</div>}
      </Button>
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
