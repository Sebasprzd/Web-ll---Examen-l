import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

interface Entrenador {
  _id: string; 
  nombre: string;
  genero: string;
  localizacion: string;
  foto: string;
}

const Entrenadores: React.FC = () => {
  const [entrenadores, setEntrenadores] = useState<Entrenador[]>([]);
  const [selectedEntrenador, setSelectedEntrenador] = useState<Entrenador | null>(null);

  useEffect(() => {
    const fetchEntrenadores = async () => {
      try {
        const response = await axios.get('http://localhost:5005/entrenadores'); 
        setEntrenadores(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEntrenadores();
  }, []);

  const openModal = (entrenador: Entrenador) => {
    setSelectedEntrenador(entrenador);
  };

  const closeModal = () => {
    setSelectedEntrenador(null);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Entrenadores</h1>
      <div className="row">
        {entrenadores.map((entrenador) => ( 
          <div className="col-md-4 mb-4" key={entrenador._id}>
            <div className="card" style={{ cursor: 'pointer' }} onClick={() => openModal(entrenador)}>
              <img className="card-img-top" src={entrenador.foto} alt={`Foto de ${entrenador.nombre}`} />
              <div className="card-body">
                <h5 className="card-title">{entrenador.nombre}</h5>
                <p className="card-text">Genero: {entrenador.genero}</p>
                <p className="card-text">Localizacion: {entrenador.localizacion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEntrenador && (
        <Modal show={true} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEntrenador.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <img
                src={selectedEntrenador.foto}
                alt={`Foto de ${selectedEntrenador.nombre}`}
                className="img-fluid"
              />
              <h5>Genero: {selectedEntrenador.genero}</h5>
              <h5>Localizacion: {selectedEntrenador.localizacion}</h5>
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

export default Entrenadores;
