import "./StileOpzione.css";

const Opzione = ({ nome, icona, setSelezionato, otherStyles }) => {
  const stile = { cursor: "pointer", ...otherStyles };
  const handleClick = () => {
    setSelezionato(nome);
  };
  return (
    <div style={stile} onClick={handleClick}>
      <p>{nome}</p>
      {icona && <img src={icona} />}
    </div>
  );
};
export default Opzione;
