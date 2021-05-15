import React from "react";
import { useUser, AuthCheck } from "reactfire";
import { useParams } from "react-router-dom";

import ShowPost from "./ShowPost";
import ShowInfo from "./ShowInfo";

import ErroreSloggato from "../components/Errore/ErroreSloggato";

const Me = () => {
  const u = useUser();
  const { id } = useParams();
  console.log(id);

  const user = u.data;
  if (!user) {
    return <ErroreSloggato />;
  }
  return (
    <AuthCheck fallback={<ErroreSloggato />}>
      <ShowInfo user={user} id={id} />
      <ShowPost user={user} id={id} />
    </AuthCheck>
  );
};

export default Me;
