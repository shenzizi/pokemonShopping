import React from 'react';
import { Link } from "react-router-dom";

import './topbar.styles.css';


const Topbar = () => {
  return (
    <div className="topbar">
      <Link to="/">Home</Link>
      <Link to="/signin">Signin</Link>
      <Link to="/cart">Cart</Link>
    </div>
  )
}

export default Topbar;

