const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
      default:""
  },
    descripcion: {
    type: String,
      default:""
   
  },
  fecha_inicio: {
    type: String,
      default:""
  },
  fecha_fin: {
    type: String,
     default:""

  },
  horario: {
    lunes: {
      type: { inicio: String, fin: String },
      default: null
    },
    martes: {
      type: { inicio: String, fin: String },
      default: null
    },
    miercoles: {
      type: { inicio: String, fin: String },
      default: null
    },
    jueves: {
      type: { inicio: String, fin: String },
      default: null
    },
    viernes: {
      type: { inicio: String, fin: String },
      default: null
    },
    sabado: {
      type: { inicio: String, fin: String },
      default: null
    },
    domingo: {
      type: { inicio: String, fin: String },
      default: null
    },
  },
    costo: {
    type: Number,
     default:0
  },

  barbero: {
    type: Object,
     default:null
  },
    barberia: {
    type: Object,
     default:null
  },
  imagenes: {
    type: Array,
    default:[]
  },
  isOnlyImage: {
    type: Boolean,
    default: true // Opcional: Puedes definir un valor por defecto
  },
});

const Curso = mongoose.model('cursos', userSchema);

module.exports = Curso;
