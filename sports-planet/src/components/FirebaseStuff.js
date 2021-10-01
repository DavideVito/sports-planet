import firebase from "firebase";

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const incrementa = firebase.firestore.FieldValue.increment;

export const pushToArray = firebase.firestore.FieldValue.arrayUnion;
export const removeFromArray = firebase.firestore.FieldValue.arrayRemove;
