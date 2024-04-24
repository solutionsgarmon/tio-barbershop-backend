const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({

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
    hora_inicio_asignada: {
    type: String,
    required: true
  },
    hora_fin_asignada: {
    type: String,
    required: true
  },
    fecha_asignada: {
    type: String,
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
    type: String,
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
  },
  datos_cliente: {
    nombre: {
      type: String,
    },
    telefono: {
      type: String,

    },
    correo: {
      type: String,
    },
     imagen: {
      type: String,
    }
  }
});

const Cita = mongoose.model('citas', citaSchema);

module.exports = Cita;
