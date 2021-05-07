import React from "react";
import {
  useUser,
  AuthCheck,
  useFirestore,
  useFirestoreDocDataOnce,
} from "reactfire";

import ShowInfo from "./ShowInfo";

import Errore from "../components/Errore";

const Me = () => {
  const u = useUser();

  if (u.status === "loading") {
    return "Loading";
  }

  const user = u.data;

  if (!user) {
    return "Loading...";
  }

  return (
    <AuthCheck
      fallback={
        <Errore titolo="Non sei loggato" messaggio="Non fare il mongoloide" />
      }
    >
      <ShowInfo user={user} />
    </AuthCheck>
  );
};

export default Me;
