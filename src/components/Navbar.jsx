import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { user, setUser } = useState(null);
  return (
    <div className = "flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28 sm:w-32 lg:w-40" />
      </Link>
      <div>
        {user ? (
          <div> </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p>Pricing</p>
            <button>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
