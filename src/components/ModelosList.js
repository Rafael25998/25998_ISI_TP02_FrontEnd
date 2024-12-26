import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ModelosList from "./components/ModelosList";
import ModeloForm from "./components/ModeloForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ModelosList />} />
        <Route path="/add" element={<ModeloForm />} />
      </Routes>
    </Router>
  );
}

export default App;
