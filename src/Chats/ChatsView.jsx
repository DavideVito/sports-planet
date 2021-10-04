import { useUser, useFirestore, useFirestoreCollectionData } from "reactfire";

import "firebase/firestore";
import "firebase/auth";

const ChatsView = () => {
  const { data: user } = useUser();
  const firestore = useFirestore();

  const query = firestore
    .collection("Chats")
    .where("utenti", "array-contains-any", [user.uid]);

  const { data: data } = useFirestoreCollectionData(query);

  if (!data) {
    return <></>;
  }

  if (data.length === 0) {
    return (
      <div>
        <p>Non fai parte di alcuna chat</p>
        <p>Per crearne una, cerca prima un giocatore dalla pagina home</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        {data.map((chat) => {
          let info = chat.info;

          delete info[user.uid];

          const altroUtente = info[Object.keys(info)[0]];

          return (
            <a href={`chat/${chat.NO_ID_FIELD}`} key={chat.NO_ID_FIELD}>
              <div>
                <img
                  src={altroUtente.photoURL}
                  style={{ borderRadius: "50%" }}
                />
                <div>
                  <p>Con: {altroUtente.nome}</p>
                </div>
              </div>{" "}
            </a>
          );
        })}
      </div>
    </div>
  );
};
export default ChatsView;
