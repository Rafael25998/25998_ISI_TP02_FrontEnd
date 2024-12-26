import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CarSearch from "./components/CarSearch";
import Navbar from "./components/Navbar";
import Weather from "./components/Weather";

function App() {
  return (
    <Router>
      {/* Contêiner principal */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Contêiner para Weather e CarSearch */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "10px",
          }}
        >
          {/* Weather no canto esquerdo */}
          <div style={{ flex: "0 0 auto" }}>
            <Weather />
          </div>

          {/* CarSearch centralizado horizontalmente */}
          <div style={{ flex: 1, display: "flex", justifyContent: "left", marginLeft:"340px" }}>
            <CarSearch />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;