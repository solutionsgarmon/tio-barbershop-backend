const mongoose = require('mongoose');

const recomendacionSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true
  },
  servicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Servicio',
    required: true
  },
  comentario: {
    type: String
  }
});

const Recomendacion = mongoose.model('recommendation', recomendacionSchema);

module.exports = Recomendacion;
