const mongoose = require('mongoose');

const EquipoSchema = new mongoose.Schema({
  entrenador: { type: mongoose.Schema.Types.ObjectId, ref: 'Entrenador', required: true },
  pokemones: [{ type: String, required: true }]
});

module.exports = mongoose.model('Equipo', EquipoSchema);
