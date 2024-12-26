import React, { useState, useEffect } from "react";
import axios from "axios";

const CarList = ({ marca, modelo }) => {
  const [carros, setCarros] = useState([]);

  useEffect(() => {
    if (marca && modelo) {
      // Busca os carros filtrados pela marca e modelo
      axios
        .get(`http://localhost:5273/api/Modelos/marca/${marca}`)
        .then((response) => {
          const filteredCarros = response.data.filter(
            (carro) => carro.modelo === modelo
          );
          setCarros(filteredCarros);
        })
        .catch((error) =>
          console.error("Erro ao buscar os carros filtrados:", error)
        );
    }
  }, [marca, modelo]);

  if (!marca || !modelo) {
    return <p>Por favor, selecione uma marca e um modelo.</p>;
  }

  return (
    <div>
      <h2>Carros disponíveis:</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {carros.map((carro) => (
          <li key={carro.id} style={{ marginBottom: "20px" }}>
            <img
              src={carro.imagem}
              alt={`${carro.marca} ${carro.modelo}`}
              style={{ width: "300px", height: "auto", borderRadius: "5px" }}
            />
            <p>
            <strong>{carro.marca} {carro.modelo}</strong> - Ano: {carro.ano} - Preço: {carro.preco}€
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
