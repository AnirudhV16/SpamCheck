/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Single from "./components/navpage1/Single";
import Bulkk from "./components/navpage2/Bulkk";
import Models from "./components/navpage3/Models";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single" element={<Single />} />
        <Route path="/bulk" element={<Bulkk />} />
        <Route path="/model" element={<Models />} />
      </Routes>
    </Router>
  );
}

export default App;
