import "./StileForms.css";

const GenericInfoForm = ({
  giocatore,
  setDataDiNascita,
  setNazionalita,
  setAltezza,
  setPeso,
  setSquadra,
  setProcuratore,
  setFile,
}) => {
  const handeData = (val) => {
    const data = new Date(val);
    setDataDiNascita(data);
  };

  return (
    <div>
      <label for="birth">Data di Nascita</label>
      <input
        name="birth"
        placeholder="Data di nascita"
        type="date"
        onChange={(e) => handeData(e.target.value)}
      />
      <label for="naz">Nazionalità</label>
      <input
        name="naz"
        placeholder="Nazionalità"
        type="text"
        onChange={(e) => setNazionalita(e.target.value)}
      />
      {giocatore && (
        <div>
          <label for="altezza">Altezza in CM</label>
          <input
            name="altezza"
            placeholder="Altezza"
            onChange={(e) => setAltezza(e.target.value)}
          />
          <br />
          <label for="peso">Peso</label>
          <input
            name="peso"
            placeholder="Peso"
            onChange={(e) => setPeso(e.target.value)}
          />
        </div>
      )}
      <label for="squadra">Squadra</label>
      <input
        name="squadra"
        placeholder="Squadra in cui giochi"
        onChange={(e) => setSquadra(e.target.value)}
      />

      <input
        placeholder="Procuratore"
        onChange={(e) => setProcuratore(e.target.value)}
      />
      <br />
      <label>
        <strong>Inserisci qui la tua foto</strong>
      </label>
      <input
        placeholder="Foto"
        type="file"
        onChange={(e) => setFile(e.target.files[0] || null)}
      />
    </div>
  );
};
export default GenericInfoForm;
