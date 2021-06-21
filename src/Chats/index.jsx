import {
  useFirestore,
  useFirestoreCollectionData,
  useUser,
  AuthCheck,
} from "reactfire";

import ErroreSloggato from "../components/Errore/ErroreSloggato";

const Chats = () => {
  const userData = useUser();
  console.log(userData);
  const user = userData.data;
  if (!user) {
    return <ErroreSloggato />;
  }
  return (
    <AuthCheck fallback={<ErroreSloggato />}>
      <ChatsView user={user} />
    </AuthCheck>
  );
};

const ChatsView = ({ user }) => {
  const firestore = useFirestore();
  console.log(user.uid);
  const query = firestore
    .collection("Chats")
    .where("utenti", "array-contains-any", [user.uid]);

  const dataDoc = useFirestoreCollectionData(query);

  if (dataDoc.status === "loading") {
    return "Loading Chats";
  }

  const data = dataDoc.data;

  if (data.length === 0) {
    return (
      <div>
        <p>Non fai parte di alcuna chat</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        {data.map((chat) => {
          const altroUtente = chat.utenti.filter((e) => e !== user.uid)[0];

          return (
            <a href={`chat/${chat.NO_ID_FIELD}`} key={chat.NO_ID_FIELD}>
              <div>
                <img src={chat[altroUtente].photoURL} />
                <div>
                  <p>Con: {chat[altroUtente].displayName}</p>
                </div>
              </div>{" "}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Chats;
