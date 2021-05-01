const SelectEspansibile = ({ opzioni, setSelezionata }) => {
  return (
    <>
      <SelectCustom opzioni={opzioni} setSelezionata={setSelezionata} />
    </>
  );
};

const SelectCustom = ({ opzioni, setSelezionata }) => {
  return (
    <>
      <select onChange={setSelezionata}>
        {opzioni.map((opzione) => {
          return <option value={opzioni}>{opzione}</option>;
        })}
      </select>
      <button>Aggiungi</button>
    </>
  );
};

export default SelectEspansibile;
