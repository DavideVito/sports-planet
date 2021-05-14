import React from "react";
import {
  useUser,
  AuthCheck,
  useFirestore,
  useFirestoreDocDataOnce,
} from "reactfire";

import ShowPost from "./ShowPost";

import ShowInfo from "./ShowInfo";

import ErroreSloggato from "../components/Errore/ErroreSloggato";

const Me = () => {
  const u = useUser();

  const user = u.data;
  if (!user) {
    return <ErroreSloggato />;
  }
  return (
    <AuthCheck fallback={<ErroreSloggato />}>
      <ShowInfo user={user} />
      <ShowPost user={user} />
    </AuthCheck>
  );
};

export default Me;
