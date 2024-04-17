const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
    imagen: {
    type: String,
    required: true
  },
    rol: {
    type: String,
    default: "ADMINISTRADOR"
  },
  datos_personales: {
      telefono: { type: String, default: "" },
      fecha_nacimiento: { type: String, default: "" },
      direccion: { type: String, default: "" },
      ciudad: { type: String, default: "" },
      estado: { type: String, default: "" },
      cp: { type: String, default: "" },
      imagen: { type: String, default: "" }
  
  },
});

const Admin = mongoose.model('administradores', userSchema);

module.exports = Admin;
