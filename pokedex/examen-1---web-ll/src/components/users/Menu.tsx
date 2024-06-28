import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './img/logo.png';
import './style/navbar.css';
import './style/menu.css';

const Menu: React.FC = () => {
  return (
    <div className="menu-container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" style={{ maxHeight: '80px' }} />
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/pokemons">Ver Pokémons</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entrenadores">Ver Entrenadores</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Equipo">Ver Equipo</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addEntrenadores">Agregar Entrenador</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addEquipo">Formar Equipo</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <footer className="footer">
        <p>Derechos de autor: serbatillo, Carrera: ITI, Vive en: su casa</p>
      </footer>
    </div>
  );
}

export default Menu;
