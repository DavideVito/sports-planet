import { Suspense } from "react";
import { AuthCheck, useUser } from "reactfire";

import ChatsView from "./ChatsView";

import "firebase/firestore";
import "firebase/auth";
import Login from "../Login/Login";

const Chats = () => {
  return (
    <AuthCheck fallback={<Login />}>
      <Suspense fallback="Loading">
        <ChatsView />
      </Suspense>
    </AuthCheck>
  );
};

export default Chats;
