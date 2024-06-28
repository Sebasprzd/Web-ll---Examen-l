const express = require('express');
const router = express.Router();
const Equipo = require('../models/equipo');
const Entrenador = require('../models/entrenador');

// Obtener todos los equipos
router.get('/', async (req, res) => {
  try {
    const equipos = await Equipo.find().populate('entrenador');
    res.status(200).json(equipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo equipo
router.post('/', async (req, res) => {
  const { entrenador, pokemones } = req.body;

  try {
    const nuevoEquipo = new Equipo({
      entrenador,
      pokemones
    });

    const equipoGuardado = await nuevoEquipo.save();
    res.status(201).json(equipoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
