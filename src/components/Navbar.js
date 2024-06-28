import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // Make sure to create and include a CSS file for styling

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">EssentialAnd1</div>
    <div className="nav-links">
      <Link to="/login">Login</Link>
      <Link to="/signup" className="get-started-link">Get Started</Link>
    </div>
  </nav>
);

export default Navbar;
