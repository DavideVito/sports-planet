import { useState } from "react";

const SigninForm = ({ signup, continua, auth, error, setError }) => {
  const signUpHandler = async () => {
    try {
      let ris = await signup(auth, { email, password, nome, cognome });

      continua(ris);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUpHandler();
        }}
      >
        <input
          required
          type="text"
          placeholder="Nome"
          onChange={(e) => setNome(e.target.value)}
        />
        <br />
        <input
          required
          type="text"
          placeholder="Cognome"
          onChange={(e) => setCognome(e.target.value)}
        />
        <br />
        <input
          required
          type="mail"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          required
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign up</button>
      </form>
    </>
  );
};

export default SigninForm;
