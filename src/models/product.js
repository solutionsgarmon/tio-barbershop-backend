const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema({
    nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
  },
  precio: {
    type: Number,
    default:0

  },
  stock: {
    type: Number,
    default:0

  },
  categoria: {
    type: String,

  },
  marca: {
    type: String,
    
  },
   mostrar: {
    type: Boolean,
    default:true
  },
  images: {
    type: [String],
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUpdatedAt: {
    type: Date,
    default: Date.now
  },
  ventas: {
    type: Number,
    default: 0
  },
   barberias_asignadas: [],
  reviews: [
    {
      usuario: {
        type: String,
        required: true
      },
      comentario: String,
      rating: {
        type: Number,
        required: true
      }
    }
  ]
});

const model = mongoose.model('products', productSchema);

module.exports = model;
