import Errore from "../../../Errore";

import Giocatore from "./Giocatore";
const OpzioneForm = ({ opzione }) => {
  if (opzione === "Giocatore") {
    return <Giocatore />;
  }
  return <Errore titolo="Non esiste" messaggio="cazzo fai idota" />;
};

export default OpzioneForm;
