import firebase from "firebase";

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const incrementa = firebase.firestore.FieldValue.increment;
const decrementa = (quanto) => {};
