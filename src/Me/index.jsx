import React, { Suspense } from "react";
import { AuthCheck } from "reactfire";

import ErroreSloggato from "../components/Errore/ErroreSloggato";

const ShowPost = React.lazy(() => import("./ShowPost"));
const ShowInfo = React.lazy(() => import("./ShowInfo"));

const Me = () => {
  return (
    <AuthCheck fallback={<ErroreSloggato />}>
      <Suspense fallback={<div>Loading user info...</div>}>
        <ShowInfo />
        <ShowPost />
      </Suspense>
    </AuthCheck>
  );
};

export default Me;
