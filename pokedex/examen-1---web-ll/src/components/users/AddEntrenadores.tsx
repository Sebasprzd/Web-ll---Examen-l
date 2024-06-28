import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AgregarEntrenadores: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('');
  const [localizacion, setLocalizacion] = useState('');
  const [foto, setFoto] = useState('');

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5005/entrenadores', {
        nombre,
        genero,
        localizacion,
        foto
      });
      alert('Entrenador agregado con éxito');
      setNombre('');
      setGenero('');
      setLocalizacion('');
      setFoto('');
    } catch (error) {
      console.error(error);
      alert('Error al agregar entrenador');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Agregar Entrenador</h1>
      <form onSubmit={manejarEnvio}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genero">Género</label>
          <input
            type="text"
            className="form-control"
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="localizacion">Localización</label>
          <input
            type="text"
            className="form-control"
            id="localizacion"
            value={localizacion}
            onChange={(e) => setLocalizacion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="foto">Foto (URL)</label>
          <input
            type="text"
            className="form-control"
            id="foto"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Agregar</button>
      </form>
    </div>
  );
};

export default AgregarEntrenadores;
