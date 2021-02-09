import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link className="logo-container " to="/">
        <h1 className="my-logo">ToDo</h1>
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Daily
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/weekly" className="nav-link">
            Weekly
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
