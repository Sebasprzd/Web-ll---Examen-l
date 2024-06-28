const express = require('express');
const router = express.Router();
const Entrenador = require('../models/entrenador');

router.get('/', async (req, res) => {
  try {
    const entrenadores = await Entrenador.find();
    res.status(200).json(entrenadores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { nombre, genero, localizacion, foto } = req.body;

  try {
    const nuevoEntrenador = new Entrenador({
      nombre,
      genero,
      localizacion,
      foto
    });

    const entrenadorGuardado = await nuevoEntrenador.save();
    res.status(201).json(entrenadorGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
