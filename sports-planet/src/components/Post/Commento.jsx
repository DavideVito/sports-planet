const Commento = ({ testo, owner, data }) => {
  return (
    <div>
      <div>
        <img src={owner.photoURL} />
        <p>{owner.displayName}</p>
      </div>
      <div>
        <p>{testo}</p>
      </div>
    </div>
  );
};

export default Commento;
