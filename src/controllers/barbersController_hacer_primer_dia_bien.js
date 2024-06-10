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
  console.log("[ejecución] getHorarioDisponibleBarbero()");
  const { idBarbero, idServicio, idBarberia } = req.body;

  try {
    const barber = await Barber.findById(idBarbero);
    const service = await Service.findById(idServicio);

    // Obtener la fecha y hora actual
    const fechaReal = new Date();
    fechaReal.setHours(fechaReal.getHours() - 6); // Retroceder 6 horas

    // Obtener todas las citas programadas futuras para el barbero seleccionado
    const citasProgramadas = await Cita.find({ 
      barbero_asignado: idBarbero,
      estatus: "PENDIENTE",
    });

    const horarioDisponible = {};

    // Iterar sobre los próximos 15 días, comenzando desde hoy
    for (let i = 0; i < 15; i++) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() + i);
      fecha.setHours(fecha.getHours() - 6); // Retroceder 6 horas

      const diaSemana = fecha.getDay(); // 0 para Domingo, 1 para Lunes, ..., 6 para Sábado
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const fechaFormatoAAAAMMDD = fecha.toLocaleDateString('es-ES', options).split('/').reverse().join('-');

      // Obtener el horario de trabajo del barbero para este día de la semana en esa barbería
      const horarioBarberoEnEsaBarberia = barber.barberias_asignadas.find((barberia) => barberia.idBarberia == idBarberia);
      const horarioDiaBarbero = horarioBarberoEnEsaBarberia.horario[Object.keys(barber.horario)[diaSemana]];

      // Verificar si el barbero trabaja en este día
      if (horarioDiaBarbero.trabaja === 'S') {
        const horaInicioTrabajo = parseInt(horarioDiaBarbero.hora_inicio.split(':')[0]) * 60 + parseInt(horarioDiaBarbero.hora_inicio.split(':')[1]);
        const horaFinTrabajo = parseInt(horarioDiaBarbero.hora_fin.split(':')[0]) * 60 + parseInt(horarioDiaBarbero.hora_fin.split(':')[1]);

        // Inicializar el horario disponible para este día
        const horarioDia = [];

        // Iterar sobre cada intervalo de 10 minutos en el horario de trabajo
        for (let hora = horaInicioTrabajo; hora <= horaFinTrabajo - service.duracion; hora += 10) {
          let horaDisponible = true;

          // Verificar si hay alguna cita programada durante este intervalo de tiempo
          for (const cita of citasProgramadas) {
            const fecha_cita_inicio = new Date(cita.fecha_asignada);
            const fecha_cita_fin = new Date(cita.fecha_asignada_fin || cita.fecha_asignada); // Asume que la fecha fin es igual a fecha inicio si no está definida
            const fecha_actual = new Date(fechaFormatoAAAAMMDD);

            let horaInicioCita = parseInt(cita.hora_inicio_asignada.split(':')[0]) * 60 + parseInt(cita.hora_inicio_asignada.split(':')[1]);
            let horaFinCita = parseInt(cita.hora_fin_asignada.split(':')[0]) * 60 + parseInt(cita.hora_fin_asignada.split(':')[1]);

            // Verificar si la cita se superpone con el intervalo de tiempo actual
            if (cita.tipo_cita == "CITA") {
              if (
                fecha_actual >= fecha_cita_inicio && fecha_actual <= fecha_cita_fin &&
                hora >= horaInicioCita && hora < horaFinCita
              ) {
                horaDisponible = false;
                break;
              }
            } else {
              // ES DESCANSO
              if(cita.fecha_asignada==cita.fecha_asignada_fin ){
                  //Es descanso de 1 dia
                 console.log(">Es descanso de 1 dia")
               if (fecha_actual >= fecha_cita_inicio && fecha_actual <= fecha_cita_fin &&
                 hora >= horaInicioCita && hora < horaFinCita) {
                 horaDisponible = false;
                 break;
              }

              }else{
                 //ES DESCANSO DE VARIOS DIAS!!
                 console.log(">Es descanso de varios dias - fecha_actual - fecha_cita_inicio",fecha_actual, "-",fecha_cita_inicio)
                if (fecha_actual.getTime() == fecha_cita_inicio.getTime() ) {
                   //Es el primer dia del descanso
                    if(hora > (horaInicioCita-service.duracion) ){
                     horaDisponible = false;
                     break;
                    }
                  
                  }
                //else if(fecha_actual == fecha_cita_fin){
                //    //Es el ultimo dia del sescanso 
                //      if(hora < horaInicioCita ){
                //      horaDisponible = false;
                //      break;
                //    }
                //  }else{
                //    horaDisponible = false;
                //    break;
                //  }
              }    
            }
          }// FIN FOR INTERNO

          // Si el intervalo de tiempo actual no se superpone con ninguna cita, agregarlo al horario disponible
          if (horaDisponible) {
            horarioDia.push(`${String(Math.floor(hora / 60)).padStart(2, '0')}:${String(hora % 60).padStart(2, '0')}`);
          }
        } //FIN

        // Agregar el horario disponible para este día al objeto horarioDisponible
        horarioDisponible[fechaFormatoAAAAMMDD] = horarioDia;

      } else {
        // Si el barbero no trabaja en este día, agregar un arreglo vacío al horario disponible
        horarioDisponible[fechaFormatoAAAAMMDD] = [];
 
      }
    }

    // Enviar respuesta con los horarios disponibles
    res.status(200).json({ success: true, horarioDisponible });
  } catch (error) {
    console.error("Error al obtener el Horario disponible por ID:", error);
    res.status(500).json({ success: false, error: `Error al obtener el horario disponible del barbero: ${error.message}` });
  }
};




const createBarber = async (req, res, next) => {
  console.log("createBarber()")
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 
     req.body.password=hashedPassword;
    const newBarber = new Barber(req.body);
    await newBarber.save();
    console.error("[Éxito] Nuevo barbero creado:");
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
    if(req.body.password){
       req.body.password = await bcrypt.hash( req.body.password, 10); 
    }
  
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
  try {
    const { id } = req.params;
     if(req.body.password){
       req.body.password = await bcrypt.hash( req.body.password, 10); 
    }

    const updatedBarber = await Barber.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBarber) {
      return res.status(404).json({ success: false, error: 'Barbero no encontrado' });
    }
    console.error("[Éxito] Barbero actualizado:");
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
    console.error("[Éxito] Barbero eliminado:");
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
