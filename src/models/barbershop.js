const mongoose = require('mongoose');

const barberiaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    calle: {
      type: String,
      default: ""
    },
    ciudad: {
      type: String,
      default: ""
    },
    cp: {
      type: String,
      default: ""
    },
    colonia: {
      type: String,
      default: ""
    }
  },
  coordenadas: {
    latitud: {
      type: String,
      default: ""
    },
    longitud: {
      type: String,
      default: ""
    }
  },
  correo: {
    type: String,
    default: ""
  },
  telefono: {
    type: String,
    default: ""
  },
  imagenes: {
    type: Array,
    default: []
  },
  descripcion: {
    type: String,
    default: ""
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
      },
      descanso: {
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
      },
      descanso: {
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
      },
      descanso: {
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
      },
      descanso: {
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
      },
      descanso: {
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
      },
      descanso: {
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
      },
      descanso: {
        type: String,
        default: ''
      }
    }
  },
  barberos: {
        type: Array,
        default: []
      },
  productos: [],
  servicios: []
});

const Barberia = mongoose.model('barbershops', barberiaSchema);

module.exports = Barberia;
