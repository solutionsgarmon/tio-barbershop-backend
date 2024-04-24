const Barber = require('../models/barber');
const Service = require('../models/service');
const Cita = require('../models/cita');
const bcrypt = require('bcryptjs'); 

// Obtener todos los barberos
const getBarbers = async (req, res, next) => {
  try {
    const barbers = await Barber.find();
    res.json({ data: barbers, error: null , success: true});
  } catch (error) {
    console.error("Error al obtener los documentos BARBERS:", error);
    res.status(500).json({ data: null,  success: false, error: `Error al obtener los documentos de BARBERS: ${error}` });
  }
};

// Obtener un barbero por su ID
const getBarberById = async (req, res, next) => {
  try {
    const barber = await Barber.findById(req.params.id);
    if (!barber) {
      return res.status(404).json({ success: false, error: 'Barbero no encontrado' });
    }
    res.json({ data: barber, error: null, success: true });
  } catch (error) {
    console.error("Error al obtener el barbero por ID:", error);
    res.status(500).json({ success: false, error: `Error al obtener el barbero por ID: ${error.message}` });
  }
};

const getHorarioDisponibleBarbero = async (req, res, next) => {
  console.log(">>>>> getHorarioDisponibleBarbero")
  console.log("req.body",req.body)
  const { idBarbero, idServicio } = req.body;

  try {
    const barber = await Barber.findById(idBarbero);
    const service = await Service.findById(idServicio);

    // Obtener todas las citas programadas futuras para el barbero seleccionado
 const citasProgramadas = await Cita.find({ 
      barbero_asignado: idBarbero,
      fecha_asignada: { $gte: new Date().toISOString().split('T')[0] } // Filtrar citas con fecha futura o igual a hoy
    });


    // Calcular horarios disponibles
    const horarioDisponible = {};

    // Obtener la duración del servicio en minutos
    const duracionServicio = service.duracion; // Suponiendo que la duración se almacena en minutos

    // Definir el horario de trabajo del barbero (por ejemplo, de 8:00 AM a 6:00 PM)
    const horaInicioTrabajo = 8 * 60; // 8:00 AM en minutos
    const horaFinTrabajo = 18 * 60; // 6:00 PM en minutos

    // Iterar sobre los próximos 15 días
    for (let i = 0; i < 15; i++) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() + i);
      const fechaFormato = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD

      // Inicializar el horario disponible para esta fecha
      const horarioDia = [];

      // Iterar sobre cada intervalo de 10 minutos en el horario de trabajo
      for (let hora = horaInicioTrabajo; hora < horaFinTrabajo; hora += 10) {
        let horaDisponible = true;

        // Verificar si hay alguna cita programada durante este intervalo de tiempo
        for (const cita of citasProgramadas) {
          const horaInicioCita = parseInt(cita.hora_inicio_asignada.split(':')[0]) * 60 + parseInt(cita.hora_inicio_asignada.split(':')[1]);
          const horaFinCita = parseInt(cita.hora_fin_asignada.split(':')[0]) * 60 + parseInt(cita.hora_fin_asignada.split(':')[1]);

          // Verificar si la cita se superpone con el intervalo de tiempo actual
          if (hora >= horaInicioCita && hora < horaFinCita) {
            horaDisponible = false;
            break;
          }
        }

        // Si el intervalo de tiempo actual no se superpone con ninguna cita, agregarlo al horario disponible
        if (horaDisponible) {
          horarioDia.push(`${String(Math.floor(hora / 60)).padStart(2, '0')}:${String(hora % 60).padStart(2, '0')}`);
        }
      }

      // Agregar el horario disponible para esta fecha al objeto horarioDisponible
      horarioDisponible[fechaFormato] = horarioDia;
    }

    // Enviar respuesta con los horarios disponibles
    res.status(200).json({ success: true, horarioDisponible });
  } catch (error) {
    console.error("Error al obtener el Horario disponible por ID:", error);
    res.status(500).json({ success: false, error: `Error al obtener el horario disponible del barbero: ${error.message}` });
  }
};

// Crear un nuevo barbero
const createBarber = async (req, res, next) => {
  console.log("createBarber()")
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 
     req.body.password=hashedPassword;
    const newBarber = new Barber(req.body);
    await newBarber.save();
    console.error("[Éxito] Nuevo barbero creado:", newBarber);
    res.status(201).json({ data: newBarber, error: null, success: true });
  } catch (error) {
    console.error("Error al crear un nuevo barbero:", error);
    res.status(500).json({ error: "Error al crear un nuevo barbero", success: false });
  }
};

// Actualizar un barbero existente
const updatePassword= async (req, res, next) => {
  console.log("updatePassword()")
  try {
     const { id } = req.params;
      const hashedPassword = await bcrypt.hash(req.body.password, 10); 
    console.log(" hashedPassword",hashedPassword)
      req.body.password=hashedPassword;
    const updatedBarber = await Barber.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBarber) {
      return res.status(404).json({ success: false, error: 'Barbero no encontrado' });
    }
    console.error("[Éxito] Barbero.updatePassword actualizado:");
    res.json({ data: updatedBarber, error: null, success: true });
  } catch (error) {
    console.error("Error al actualizar el Barbero.updatePassword:", error);
    res.status(500).json({ error: "Error al actualizar el barbero", success: false });
  }
};


// Actualizar un barbero existente
const updateBarber = async (req, res, next) => {
    console.log("updateBarber()")
  console.log(" req.body", req.body)
  try {
    const { id } = req.params;
    // const hashedPassword = await bcrypt.hash(req.body.password, 10); 
    // console.log(" hashedPassword",hashedPassword)
    //   req.body.password=hashedPassword;
    const updatedBarber = await Barber.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBarber) {
      return res.status(404).json({ success: false, error: 'Barbero no encontrado' });
    }
    console.error("[Éxito] Barbero actualizado:", updatedBarber);
    res.json({ data: updatedBarber, error: null, success: true });
  } catch (error) {
    console.error("Error al actualizar el barbero:", error);
    res.status(500).json({ error: "Error al actualizar el barbero", success: false });
  }
};

// Eliminar un barbero existente
const deleteBarber = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBarber = await Barber.findByIdAndDelete(id);
    if (!deletedBarber) {
      return res.status(404).json({ success: false, error: 'Barbero no encontrado' });
    }
    console.error("[Éxito] Barbero eliminado:", deletedBarber);
    res.json({ data: {}, error: null, success: true });
  } catch (error) {
    console.error("Error al eliminar el barbero:", error);
    res.status(500).json({ error: "Error al eliminar el barbero", success: false });
  }
};

module.exports = {
  getBarbers,
  getHorarioDisponibleBarbero,
  getBarberById,
  createBarber,
  updateBarber,
  deleteBarber,updatePassword
};
