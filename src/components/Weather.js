import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("Braga"); // Cidade padrão inicial para busca
  const [searchedCity, setSearchedCity] = useState(""); // Cidade exibida após a busca
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      const apiKey = "d3c56ab755bbf66c9228fe7954ab85df";

      // Obter as coordenadas da cidade
      const geoResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
      );

      if (geoResponse.data.length === 0) {
        alert("Cidade não encontrada.");
        return;
      }

      const { lat, lon } = geoResponse.data[0];

      // Obter os dados climáticos com as coordenadas
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      setWeather(weatherResponse.data);
      setSearchedCity(cityName); // Atualiza a cidade exibida
    } catch (error) {
      console.error("Erro ao procurar a metereologia:", error);
    }
  };

  // Procurar o clima de Braga por padrão ao carregar o componente
  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleCityChange = (e) => {
    setCity(e.target.value); // Atualiza a cidade que será buscada
  };

  const handleSearch = () => {
    fetchWeather(city); // Procura o clima da cidade inserida
  };

  return (
    <div style={{ textAlign: "left", fontFamily: "Arial, sans-serif" }}>
      {/* Apenas exibe o clima após a busca */}
      {weather && (
        <>
          <h2>Metereologia em {searchedCity}</h2>
          <p>
            <strong>Temperatura:</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Condições:</strong> {weather.weather[0].description}
          </p>
        </>
      )}

      {/* Campo de busca */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Digite uma cidade"
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Procurar
        </button>
      </div>
    </div>
  );
};

export default Weather;
