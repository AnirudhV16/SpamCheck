/** @format */

import React from "react";
import "./Home.css"; // CSS file for styling

const Home = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>SPAM DETECTOR</h1>
        <p>
          Effortlessly detect and analyze spam messages using our cutting-edge
          tools.
        </p>
        <div className="cta">
          <a href="/single" className="cta-button">
            Try Single Detection
          </a>
          <a href="/bulk" className="cta-button">
            Start Bulk Detection
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
