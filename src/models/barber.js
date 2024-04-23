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
   descanso: {
    type: String,
    enum: ['SI', 'NO'],
    default: 'NO'
  },

    datos_personales: {
      telefono: { type: String, default: "" },
      fecha_nacimiento: { type: String, default: "" },
      direccion: { type: String, default: "" },
      ciudad: { type: String, default: "" },
      estado: { type: String, default: "" },
      cp: { type: String, default: "" },
     
  },
servicios_realizados: [{
    fecha: { type: Date, required: true },
    servicio: { type: String, required: true },
    costo: { type: Number, required: true },
  }], 

    imagenes: {
    type: [{
      url: { type: String, default: 'default-url' },
      id: { type: String, default: 'default-alt' },
      path: { type: String, default: 'default-descripcion' }
    }],
    default: [{ 
      url: 'https://firebasestorage.googleapis.com/v0/b/storage-eltio-barbershop.appspot.com/o/barbers%2Fbarbero.png?alt=media&token=f2ed44d8-1d3b-43a5-bfa7-7cbdd6db93cb',
      id: 'https://firebasestorage.googleapis.com/v0/b/storage-eltio-barbershop.appspot.com/o/barbers%2Fbarbero.png?alt=media&token=f2ed44d8-1d3b-43a5-bfa7-7cbdd6db93cb',
      path: ''
    }]
  }


});

const Barbero = mongoose.model('barbers', barberoSchema);

module.exports = Barbero;
