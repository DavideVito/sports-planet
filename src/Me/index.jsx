import React, { Suspense } from "react";
import { AuthCheck } from "reactfire";

import ErroreSloggato from "../components/Errore/ErroreSloggato";

import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const ShowPost = React.lazy(() => import("./ShowPost"));
const ShowInfo = React.lazy(() => import("./ShowInfo"));

const Tmp = () => {
  const { id } = useParams();

  return (
    <Suspense fallback={<Loading />}>
      <AuthCheck fallback={<ErroreSloggato />}>
        <ShowInfo id={id} />
        <ShowPost id={id} />
      </AuthCheck>
    </Suspense>
  );
};

const Me = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Tmp />
    </Suspense>
  );
};

export default Me;
