import React from "react";

export const pushToDatabase = async (firestore, uid, data) => {
  await firestore
    .collection("Giocatori")
    .doc(uid)
    .set({ done: true, ...data }, { merge: true });
};
