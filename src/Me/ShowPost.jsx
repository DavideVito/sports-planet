import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

const ShowPost = () => {
  const { data: user } = useUser();
  const firestore = useFirestore();

  const query = firestore
    .collection("Giocatori")
    .doc(user.uid)
    .collection("Posts")
    .limit(9);

  const d = useFirestoreCollectionData(query);

  if (d.status === "loading") {
    return "loading";
  }

  const posts = d.data;

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {posts.map((post) => {
        return (
          <div key={post.NO_ID_FIELD}>
            <img src={post.link} width="150" height="150" />
          </div>
        );
      })}
    </div>
  );
};

export default ShowPost;
