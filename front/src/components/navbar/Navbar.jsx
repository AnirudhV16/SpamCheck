/** @format */

import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>SpamDetector</span>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/" className="navbar-link">
            Home
          </a>
        </li>
        <li>
          <a href="/single" className="navbar-link">
            Single
          </a>
        </li>
        <li>
          <a href="/bulk" className="navbar-link">
            Bulk
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
