const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
   cliente: {
    type: String,
    required: true
  },

  servicio_asignado: {
    type: String,
    required: true
  },
    barbero_asignado: {
    type: String
  },
   barberia_asignada: {
    type: String
  },
    hora_asignada: {
    type: String,
    required: true
  },
    fecha: {
    type: Date,
    required: true
  },

    estatus: {
      type: String,
      enum: ['PENDIENTE', 'COMPLETADA', 'CANCELADA','POSPUESTA'],
     default: "PENDIENTE"
    },
  notas: {
    type: String
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
  fecha_actualizacion: {    
    type: Array
  },

  recordatorio: {
    tipo: {
      type: String,
      enum: ['CORREO', 'SMS','WHATSAPP'],
      default: 'CORREO'
    },
    enviado: {
      type: String,
      enum: ['SI','NO'],
      default: "SI"
    }
  }
});

const Cita = mongoose.model('citas', citaSchema);

module.exports = Cita;
