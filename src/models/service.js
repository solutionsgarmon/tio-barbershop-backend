const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
   nombre: {
    type: String,
     required: true 
  },
 categorias: {
    type: Array,
  },
  precio: {
    type: Number,
     default: 0
  },
  duracion:{
    type: Number,
     default: 0
  },     
  descripcion: {
    type: String,
     default: ''
  },
  imagenes: [],

});


const Servicio = mongoose.model('services', servicioSchema);

module.exports = Servicio;
