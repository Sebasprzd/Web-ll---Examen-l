import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import './style/cards.css'; // Importa el archivo CSS

interface Entrenador {
  _id: string;
  nombre: string;
  foto: string;
}

interface Equipo {
  _id: string;
  entrenador: Entrenador;
  pokemones: string[];
}

const MostrarEquipos: React.FC = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [selectedEquipo, setSelectedEquipo] = useState<Equipo | null>(null);
  const [pokemonImages, setPokemonImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await axios.get('http://localhost:5005/equipos');
        setEquipos(response.data);
      } catch (error) {
        console.error('Error fetching equipos:', error);
      }
    };

    fetchEquipos();
  }, []);

  const openEquipoModal = async (equipo: Equipo) => {
    setSelectedEquipo(equipo);

    // Obtener las imágenes de los Pokémon del equipo
    const images: string[] = [];
    for (const pokemon of equipo.pokemones) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
        const pokemonData = response.data;
        const imageUrl = pokemonData.sprites.other['official-artwork'].front_default;
        images.push(imageUrl);
      } catch (error) {
        console.error(`imagen de ${pokemon}:`, error); /* por si falla xd */
        images.push(''); 
      }
    }
    setPokemonImages(images);
  };

  const closeModal = () => {
    setSelectedEquipo(null);
    setPokemonImages([]);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Equipos Pokémon</h1>
      <div className="row">
        {equipos.map((equipo, index) => (
          <div className="col-md-4 mb-4" key={equipo._id}>
            <div
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => openEquipoModal(equipo)}
            >
              <div className="card-header">
                <h5 className="card-title">Equipo {index + 1}</h5>
              </div>
              <div className="card-body">
                <h5 className="card-title">Entrenador: {equipo.entrenador.nombre}</h5>
                <img
                  className="img-fluid"
                  src={equipo.entrenador.foto}
                  alt={`Foto de ${equipo.entrenador.nombre}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEquipo && (
        <Modal show={true} onHide={closeModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Equipo Pokémon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <img
                src={selectedEquipo.entrenador.foto}
                alt={`Foto de ${selectedEquipo.entrenador.nombre}`}
                className="img-fluid"
                style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
              />
              <h5>Entrenador: {selectedEquipo.entrenador.nombre}</h5>
              <h6>Pokemones:</h6>
              <div className="d-flex justify-content-around">
                {pokemonImages.map((image, index) => (
                  <div key={index}>
                    <p>{selectedEquipo.pokemones[index]}</p>
                    <img
                      src={image}
                      alt={`Imagen de ${selectedEquipo.pokemones[index]}`}
                      className="img-fluid"
                      style={{ maxWidth: '100%', height: 'auto', maxHeight: '100px' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default MostrarEquipos;
