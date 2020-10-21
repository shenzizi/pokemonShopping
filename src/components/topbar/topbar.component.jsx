import React from 'react';
import { NavLink } from "react-router-dom";

import './topbar.styles.css';


const Topbar = () => {
  console.log('render Topbar component');
  return (
    <nav className="topbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/signin">Signin</NavLink>
      <NavLink to="/cart">Cart</NavLink>
    </nav>
  )
}

export default Topbar;

