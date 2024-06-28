const mongoose = require('mongoose');

const entrenadorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  genero: { type: String, required: true },
  localizacion: { type: String, required: true },
  foto: { type: String, required: true }
});

const Entrenador = mongoose.model('Entrenador', entrenadorSchema);

module.exports = Entrenador;
