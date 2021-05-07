import React from "react";
import { useUser } from "reactfire";

import "./StileNavbar.css";

const Navbar = () => {
  const u = useUser();

  if (u.status === "loading") {
    return "Loading";
  }

  const user = u.data;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            {user.displayName}
            <img
              src={
                user.displayName ??
                "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
              }
              width="25"
              height="25"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
