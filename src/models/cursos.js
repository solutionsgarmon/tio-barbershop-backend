const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
    descripcion: {
    type: String,
   
  },
  fecha_inicio: {
    type: String,
  },
  fecha_Fin: {
    type: String,

  },
    costo: {
    type: Number,
  },
  imagenes: []
});

const Curso = mongoose.model('cursos', userSchema);

module.exports = Curso;
