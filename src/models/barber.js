const mongoose = require('mongoose');

const barberoSchema = new mongoose.Schema({
   barberia_asignada: {
    type: String,
     default: ''
  },
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
    required: true,
  },
  descripcion: {
    type: String,
     default: ''
  },
  horario: {
    lunes: {
      trabaja: {
      type: String,
      default: 'N'
    },
    hora_inicio: {
      type: String,
       default: ''
     }, 
     hora_fin: {
      type: String,
       default: ''
     }
    },
    martes: {
        trabaja: {
        type: String,
        default: 'N'
      },
      hora_inicio: {
        type: String,
        default: ''
      }, 
      hora_fin: {
        type: String,
        default: ''
      }
      },
    miercoles: {
        trabaja: {
        type: String,
        default: 'N'
      },
      hora_inicio: {
        type: String,
        default: ''
      }, 
      hora_fin: {
        type: String,
        default: ''
      }
      },
    jueves: {
      trabaja: {
      type: String,
      default: 'N'
    },
      hora_inicio: {
        type: String,
        default: ''
      }, 
      hora_fin: {
        type: String,
        default: ''
      }
    },
    viernes: {
      trabaja: {
      type: String,
      default: 'N'
    },
      hora_inicio: {
        type: String,
        default: ''
      }, 
      hora_fin: {
        type: String,
        default: ''
      }
    },
    sabado: {
      trabaja: {
      type: String,
      default: 'N'
    },
    hora_inicio: {
      type: String,
       default: ''
     }, 
     hora_fin: {
      type: String,
       default: ''
     }
    },
    domingo: {
      trabaja: {
      type: String,
      default: 'N'
    },
    hora_inicio: {
      type: String,
       default: ''
     }, 
     hora_fin: {
      type: String,
       default: ''
     }
    },
  },

    rol: {
    type: String,
    default: "BARBERO"
  },
 
  estatus: {
    type: String,
    enum: ['ACTIVO', 'INACTIVO'],
    default: 'ACTIVO'
  },

    datos_personales: {
      telefono: { type: String, default: "" },
      fecha_nacimiento: { type: String, default: "" },
      direccion: { type: String, default: "" },
      ciudad: { type: String, default: "" },
      estado: { type: String, default: "" },
      cp: { type: String, default: "" },
      imagen: { type: String, default: "" },
  },
servicios_realizados: [{
    fecha: { type: Date, required: true },
    servicio: { type: String, required: true },
    costo: { type: Number, required: true },
  }]


});

const Barbero = mongoose.model('barbers', barberoSchema);

module.exports = Barbero;
