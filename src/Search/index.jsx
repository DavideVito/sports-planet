import { useRef, useEffect, useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

const Search = () => {
  const textRef = useRef(null);

  const firestore = useFirestore();

  const [searchResult, setSearchResult] = useState(null);

  const search = async () => {
    setSearchResult(null);
    let strSearch = textRef.current.value;
    console.log(strSearch);
    let strlength = strSearch.length;
    let strFrontCode = strSearch.slice(0, strlength - 1);
    let strEndCode = strSearch.slice(strlength - 1, strSearch.length);

    let startcode = strSearch;
    let endcode =
      strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

    let ris = await firestore
      .collection("Giocatori")
      .where("displayName", ">=", startcode)
      .where("displayName", "<", endcode)
      .limit(15)
      .get();

    let tmp = [];

    ris.docs.forEach((utente) => {
      tmp = [...tmp, utente.data()];
    });

    setSearchResult(tmp);
  };

  return (
    <div>
      <div>
        <p>Cerca un utente</p>
      </div>
      <input type="text" ref={textRef} />
      <button onClick={search}>Cerca</button>

      {searchResult && (
        <div>
          {searchResult.map((utente) => {
            return (
              <a href={"/user/" + utente.uid}>
                <img src={utente.photoURL} />
                <div>
                  <p>
                    {utente.displayName}: {utente.sport}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
