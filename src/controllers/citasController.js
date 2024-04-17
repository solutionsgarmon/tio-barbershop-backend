const Cita = require('../models/cita');

// Obtener todas las citas
const getCitas = async (req, res, next) => {
  try {
    const citas = await Cita.find();
    res.json({ data: citas, error: null , success: true});
  } catch (error) {
    console.error("Error al obtener los documentos de CITAS:", error);
    res.status(500).json({ data: null,  success: false, error: `Error al obtener los documentos de CITAS: ${error}` });
  }
};

// Crear una nueva cita
const createCita = async (req, res, next) => {
  try {
    const newCita = new Cita(req.body);
    await newCita.save();
    console.error("[Éxito] Nueva cita creada:", newCita);
    res.status(201).json({ data: newCita, error: null, success: true });
  } catch (error) {
    console.error("Error al crear una nueva cita:", error);
    res.status(500).json({ error: "Error al crear una nueva cita", success: false });
  }
};

// Actualizar una cita existente
const updateCita = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCita = await Cita.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCita) {
      return res.status(404).json({ success: false, error: 'Cita no encontrada' });
    }
    console.error("[Éxito] Cita actualizada:", updatedCita);
    res.json({ data: updatedCita, error: null, success: true });
  } catch (error) {
    console.error("Error al actualizar la cita:", error);
    res.status(500).json({ error: "Error al actualizar la cita", success: false });
  }
};

// Eliminar una cita existente
const deleteCita = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCita = await Cita.findByIdAndDelete(id);
    if (!deletedCita) {
      return res.status(404).json({ success: false, error: 'Cita no encontrada' });
    }
    console.error("[Éxito] Cita eliminada:", deletedCita);
    res.json({ data: {}, error: null, success: true });
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
    res.status(500).json({ error: "Error al eliminar la cita", success: false });
  }
};

module.exports = {
  getCitas,
  createCita,
  updateCita,
  deleteCita
};
