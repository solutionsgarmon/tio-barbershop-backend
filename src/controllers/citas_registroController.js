const Cita_Registro = require('../models/cita_registro');
const { sendNotificationCancelCitaCliente, sendNotificationCancelCitaBarbero } = require('../services/message.service');


// Obtener todas las citas
const getCitasRegistro = async (req, res, next) => {
  try {
    const citas = await Cita_Registro.find();
    res.json({ data: citas, error: null , success: true});
  } catch (error) {
    console.error("Error al obtener los documentos de CITAS:", error);
    res.status(500).json({ data: null,  success: false, error: `Error al obtener los documentos de CITAS: ${error}` });
  }
};

const getCitasRegistroCliente = async (req, res, next) => {
  console.log("getCitasCliente()");
  const { correo } = req.params;
  
  try {
    const citas = await Cita_Registro.find({ "datos_cliente.correo": correo });
    
    if (!citas || citas.length === 0) {
      // Si no se encuentra ninguna cita, enviar una respuesta indicando que no se encontraron citas para ese correo
      return res.json({ data: [], success: true, message: `No se encontraron citas para el correo electrónico ${correo}` });
    }

    
    // Si se encuentran citas, enviar la información
    res.json({ data: citas, error: null, success: true });
  } catch (error) {
    console.error("Error al obtener los documentos de CITAS:", error);
    res.status(500).json({ data: null, success: false, error: `Error al obtener los documentos de CITAS: ${error}` });
  }
};

const getCitasRegistroBarbero= async (req, res, next) => {
  console.log("getCitasBarbero()");
  const { id } = req.params;
  
  try {
    const citas = await Cita_Registro.find({ "barbero_asignado": id });
    
 if (!citas || citas.length === 0) {
      // Si no se encuentra ninguna cita completada, enviar una respuesta indicando que no se encontraron citas Pendientes para ese barbero
      return res.json({ data: [], success: true, message: `No se encontraron citas para el barbero con el ID ${id}`,error:false });
    }

    
    // Si se encuentran citas, enviar la información
    res.json({ data: citas, error: null, success: true });
  } catch (error) {
    console.error("Error al obtener los documentos de CITAS:", error);
    res.status(500).json({ data: null, success: false, error: `Error al obtener los documentos de CITAS: ${error}` });
  }
};

const getCitasRegistroCompletadasBarbero = async (req, res, next) => {
  console.log("getCitasCompletadasBarbero()");
  const { id } = req.params;
  
  try {
    // Filtrar las citas por el estado "COMPLETADA"
    const citas = await Cita_Registro.find({ "barbero_asignado": id, "estatus": "COMPLETADA" });
    
    if (!citas || citas.length === 0) {
      // Si no se encuentra ninguna cita completada, enviar una respuesta indicando que no se encontraron citas Pendientes para ese barbero
      return res.json({ data: [], success: true, message: `No se encontraron citas COMPLETADAS para el barbero con el ID ${id}`,error:false });
    }

    // Si se encuentran citas completadas, enviar la información
    res.json({ data: citas, error: null, success: true });

  } catch (error) {
    console.error("Error al obtener los documentos de CITAS:", error);
    res.status(500).json({ data: null, success: false, error: `Error al obtener los documentos de CITAS: ${error}` });
  }
};




const getCitasRegistroPendientesBarbero= async (req, res, next) => {
  const { id } = req.params;
   console.log("getCitasPendientesBarbero()",id);
  try {
    // Filtrar las citas por el estado "COMPLETADA"
    const citas = await Cita_Registro.find({ "barbero_asignado": id, "estatus": "PENDIENTE" });
    
    if (!citas || citas.length === 0) {
      // Si no se encuentra ninguna cita completada, enviar una respuesta indicando que no se encontraron citas Pendientes para ese barbero
      return res.json({ data: [], success: true, message: `No se encontraron citas Pendientes para el barbero con el ID ${id}`,error:false });
    }

    // Si se encuentran citas Pendientes, enviar la información
    res.json({ data: citas, error: null, success: true });
  } catch (error) {
    console.error("Error al obtener los documentos de CITAS:", error);
    res.status(500).json({ data: null, success: false, error: `Error al obtener los documentos de CITAS: ${error}` });
  }
};

const getCitasRegistroCanceladasBarbero= async (req, res, next) => {
  console.log("getCitasRegistroCanceladasBarbero()");
  const { id } = req.params;
  
  try {
    // Filtrar las citas por el estado "COMPLETADA"
    const citas = await Cita_Registro.find({ "barbero_asignado": id, "estatus": "CANCELADA" });
    
    if (!citas || citas.length === 0) {
      // Si no se encuentra ninguna cita completada, enviar una respuesta indicando que no se encontraron citas Pendientes para ese barbero
      return res.json({ data: [], success: true, message: `No se encontraron citas CANCELADAS para el barbero con el ID ${id}`,error:false });
    }

    // Si se encuentran citas Canceladas, enviar la información
    res.json({ data: citas, error: null, success: true });
  } catch (error) {
    console.error("Error al obtener los documentos de CITAS:", error);
    res.status(500).json({ data: null, success: false, error: `Error al obtener los documentos de CITAS: ${error}` });
  }
};



// Crear una nueva cita
const createCitaRegistro = async (req, res, next) => {
  try {
    const newCita = new Cita_Registro(req.body);
    await newCita.save(); 

    if(newCita.estatus == "CANCELADA"){
 
      await sendNotificationCancelCitaCliente(newCita)
      await sendNotificationCancelCitaBarbero(newCita)
    }
    console.error("[Éxito] Nueva cita creada:");
   
    res.status(201).json({ data: newCita, error: null, success: true });
  } catch (error) {
    console.error("Error al crear una nueva cita:", error);
    res.status(500).json({ error: "Error al crear una nueva cita", success: false });
  }
};

// Actualizar una cita existente
const updateCitaRegistro = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCita = await Cita_Registro.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCita) {
      return res.status(404).json({ success: false, error: 'Cita_Registro no encontrada' });
    }
    console.error("[Éxito] Cita_Registro actualizada:", updatedCita);
    res.json({ data: updatedCita, error: null, success: true });
  } catch (error) {
    console.error("Error al actualizar la cita:", error);
    res.status(500).json({ error: "Error al actualizar la cita", success: false });
  }
};

// Eliminar una cita existente
const deleteCitaRegistro = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCita = await Cita_Registro.findByIdAndDelete(id);
    if (!deletedCita) {
      return res.status(404).json({ success: false, error: 'Cita_Registro no encontrada' });
    }
    console.error("[Éxito] Cita_Registro eliminada:", deletedCita);
    res.json({ data: {}, error: null, success: true });
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
    res.status(500).json({ error: "Error al eliminar la cita", success: false });
  }
};

module.exports = {
  getCitasRegistro,
  createCitaRegistro,
  updateCitaRegistro,
  deleteCitaRegistro,
  getCitasRegistroBarbero,
  getCitasRegistroCliente,
  getCitasRegistroPendientesBarbero,
  getCitasRegistroCompletadasBarbero,
  getCitasRegistroCanceladasBarbero
};
