const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  tipo_cita: {
     type: String,
      enum: ['CITA', 'DESCANSO'],
     default: "CITA"
   
  },

  servicio_asignado: {
    type: String,
   
  },
    barbero_asignado: {
    type: String
  },
   barberia_asignada: {
    type: String
  },
   nombre_servicio_asignado: {
    type: String,

  },
    nombre_barbero_asignado: {
    type: String
  },
   nombre_barberia_asignada: {
    type: String
  },
  imagen_barbero_asignado:{
    type: String,

  },
    hora_inicio_asignada: {
    type: String,

  },
    hora_fin_asignada: {
    type: String,

  },
      costo: {
    type: Number,

  },
    fecha_asignada: {
    type: String,
  
  },
      fecha_asignada_fin: {
    type: String,
  
  },
    estatus: {
      type: String,
          enum: ['COMPLETADA', 'CANCELADA'],
     default: "COMPLETADA"
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
   
    },
    enviado: {
      type: String,
      enum: ['SI','NO'],
   
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

const Cita = mongoose.model('citas_registro', citaSchema);

module.exports = Cita;
