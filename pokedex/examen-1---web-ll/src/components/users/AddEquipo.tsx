import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/fonts.css';


interface Entrenador {
  _id: string;
  nombre: string;
}

interface Pokemon {
  name: string;
  url: string;
}

const AgregarEquipo: React.FC = () => {
  const [entrenadores, setEntrenadores] = useState<Entrenador[]>([]);
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [selectedEntrenador, setSelectedEntrenador] = useState<string>('');
  const [selectedPokemones, setSelectedPokemones] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchEntrenadores = async () => {
      try {
        const response = await axios.get('http://localhost:5005/entrenadores');
        setEntrenadores(response.data);
      } catch (error) {
        console.error('Error al obtener entrenadores:', error);
      }
    };

    const fetchPokemones = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        setPokemones(response.data.results);
      } catch (error) {
        console.error('Error al obtener Pokémon:', error);
      }
    };

    fetchEntrenadores();
    fetchPokemones();
  }, []);

  const handleGenerationChange = async (generationOffset: number, generationLimit: number) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${generationOffset}&limit=${generationLimit}`
      );
      setPokemones(response.data.results);
    } catch (error) {
      console.error('Error al obtener Pokémon:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPokemones.length !== 6) {
      alert('Por favor selecciona exactamente 6 Pokémones.');
      return;
    }
    try {
      await axios.post('http://localhost:5005/equipos', {
        entrenador: selectedEntrenador,
        pokemones: selectedPokemones.map(pokemon => pokemon.name) // Envía solo los nombres de los Pokémon
      });
      alert('Equipo agregado con éxito.');
      setSelectedEntrenador('');
      setSelectedPokemones([]);
    } catch (error) {
      console.error('Error al agregar equipo:', error);
      alert('Error al agregar equipo.');
    }
  };

  const handlePokemonChange = (pokemon: Pokemon) => {
    if (selectedPokemones.length < 6 && !selectedPokemones.some(p => p.name === pokemon.name)) {
      setSelectedPokemones([...selectedPokemones, pokemon]);
    } else if (selectedPokemones.some(p => p.name === pokemon.name)) {
      setSelectedPokemones(selectedPokemones.filter(p => p.name !== pokemon.name));
    } else {
      alert('tranquilo bro, solo puedes seleccionar 6 pokes.');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Agregar Equipo Pokémon</h1>

      {/* Botones de selección de generaciones */}
      <div className="btn-group mt-4 mb-3" role="group" aria-label="Generaciones">
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => handleGenerationChange(0, 151)}
        >
          Primera Generación
        </button>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => handleGenerationChange(151, 100)}
        >
          Segunda Generación
        </button>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => handleGenerationChange(251, 135)}
        >
          Tercera Generación
        </button>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => handleGenerationChange(386, 107)}
        >
          Cuarta Generación
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => handleGenerationChange(493, 156)}
        >
          Quinta Generación
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="entrenador">Entrenador</label>
          <select
            className="form-control"
            id="entrenador"
            value={selectedEntrenador}
            onChange={(e) => setSelectedEntrenador(e.target.value)}
            required
          >
            <option value="">Seleccione un entrenador</option>
            {entrenadores.map((entrenador) => (
              <option key={entrenador._id} value={entrenador._id}>
                {entrenador.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="pokemones">Pokemones (Seleccione exactamente 6)</label>
          <div id="pokemones" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {pokemones.map((pokemon) => (
              <div key={pokemon.name} className="form-check" style={{ width: '25%', marginBottom: '10px' }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={pokemon.name}
                  id={pokemon.name}
                  onChange={() => handlePokemonChange(pokemon)}
                  checked={selectedPokemones.some(p => p.name === pokemon.name)}
                />
                <label className="form-check-label" htmlFor={pokemon.name}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`}
                    alt={`Imagen de ${pokemon.name}`}
                    style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '10px' }}
                  />
                  {pokemon.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Agregar Equipo</button>
      </form>
    </div>
  );
};

export default AgregarEquipo;
