import "./StileErrore.css";
const Errore = ({ titolo, messaggio }) => {
  return (
    <div className="erroreBox">
      <div>{titolo}</div>
      <div>{messaggio}</div>
    </div>
  );
};

export default Errore;
