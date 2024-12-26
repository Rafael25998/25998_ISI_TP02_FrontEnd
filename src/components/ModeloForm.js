import React, { useState } from "react";
import axios from "axios";

const ModeloForm = () => {
  const [modelo, setModelo] = useState({
    marca: "",
    modelo: "",
    ano: "",
    preco: ""
  });

  const handleChange = (e) => {
    setModelo({ ...modelo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://carrosapi.azurewebsites.net/api/Modelos", modelo)
      .then(() => alert("Modelo adicionado com sucesso!"))
      .catch((error) => console.error("Erro ao adicionar modelo:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Adicionar Modelo</h1>
      <input type="text" name="marca" placeholder="Marca" onChange={handleChange} />
      <input type="text" name="modelo" placeholder="Modelo" onChange={handleChange} />
      <input type="number" name="ano" placeholder="Ano" onChange={handleChange} />
      <input type="number" name="preco" placeholder="Preço" onChange={handleChange} />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ModeloForm;
