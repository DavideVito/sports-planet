import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div>
      Yay, ci sei amigo, ora puoi andare alla <Link to="/home">home</Link>{" "}
    </div>
  );
};
export default Success;
