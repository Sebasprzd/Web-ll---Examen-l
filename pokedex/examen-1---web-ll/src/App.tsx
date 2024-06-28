import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/users/Menu';
import Pokedex from './components/users/Pokedex';
import Entrenadores from './components/users/Entrenadores';
import AddEntrenadores from './components/users/AddEntrenadores';
import AddEquipo from './components/users/AddEquipo';
import Equipo from './components/users/Equipo'; 
import '../src/components/users/style/fondo.css'

const App: React.FC = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/pokemons" element={<Pokedex />} />
        <Route path="/entrenadores" element={<Entrenadores />} />
        <Route path="/Addentrenadores" element={<AddEntrenadores />} />
        <Route path='/AddEquipo' element={<AddEquipo/>} />
        <Route path='/Equipo' element={<Equipo/>} />

        
      </Routes>
    </Router>
  );
};

export default App;
