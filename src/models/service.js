const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
   nombre: {
    type: String,
     required: true 
  },
 tipo: {
    type: String,
     default: ''
  },
  precio: {
    type: Number,
     default: 0
  },
  descripcion: {
    type: String,
     default: ''
  },
  imagenes: [],
  barberias: [],
  barberos: []
});


const Servicio = mongoose.model('services', servicioSchema);

module.exports = Servicio;
