import React, { useState, useEffect } from "react";
import axios from "axios";
import CarList from "./CarList"; // Importa o componente CarList
import "./CarSearch.css";

const CarSearch = () => {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState("");
  const [selectedModelo, setSelectedModelo] = useState("");

  const BASE_URL = "http://localhost:5273/api";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Modelos`)
      .then((response) => {
        const uniqueMarcas = [
          ...new Set(response.data.map((carro) => carro.marca)),
        ];
        setMarcas(uniqueMarcas);
      })
      .catch((error) => console.error("Erro ao buscar marcas:", error));
  }, []);

  useEffect(() => {
    if (selectedMarca) {
      axios
        .get(`${BASE_URL}/Modelos/marca/${selectedMarca}`)
        .then((response) => {
          setModelos(response.data.map((carro) => carro.modelo));
        })
        .catch((error) => console.error("Erro ao buscar modelos:", error));
    }
  }, [selectedMarca]);

  return (
    <div className="car-search-container">
      <h1>Encontre aqui o seu novo carro</h1>
      <div className="dropdown-container">
        <div>
          <label>Marca</label>
          <select
            value={selectedMarca}
            onChange={(e) => {
              setSelectedMarca(e.target.value);
              setSelectedModelo("");
            }}
          >
            <option value="">Selecionar</option>
            {marcas.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Modelo</label>
          <select
            value={selectedModelo}
            onChange={(e) => setSelectedModelo(e.target.value)}
            disabled={!selectedMarca}
          >
            <option value="">Selecionar</option>
            {modelos.map((modelo) => (
              <option key={modelo} value={modelo}>
                {modelo}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Exibir a lista de carros filtrados */}
      <CarList marca={selectedMarca} modelo={selectedModelo} />
    </div>
  );
};

export default CarSearch;