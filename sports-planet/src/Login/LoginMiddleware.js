export const login = (auth, provider, email, password) => {
  auth.useDeviceLanguage();
  if (provider) {
    return auth.signInWithPopup(provider);
  }
  return auth.signInWithEmailAndPassword(email, password);
};

export const signup = (auth, user) => {
  auth.useDeviceLanguage();
  let ris = auth.createUserWithEmailAndPassword(user.email, user.password);
  ris.then((utente) => {
    console.log(utente.user);
    aggiungiDisplayName(user.nome + " " + user.cognome, utente.user);
  });
  return ris;
};

export const aggiungiDisplayName = (name, user) => {
  user.updateProfile({
    displayName: name,
  });
};

export const photoURL = (url, user) => {
  user.updateProfile({
    photoURL: url,
  });
};

export const continua = (user) => {
  debugger;
  if (user.additionalUserInfo.isNewUser) {
    window.location.href = "/aggiungiInfo";
  } else {
    window.location.href = "/home";
  }
};

export const pushDataToFirestore = async (firestore, user) => {
  let { email, displayName, uid, photoURL } = user;

  const obj = {
    email,
    photoURL: photoURL ?? "",
    displayName,

    uid,
  };

  await firestore.collection("Giocatori").doc(uid).set(obj);
};
