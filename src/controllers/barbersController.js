const Barber = require('../models/barber');
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
  try {
    const { id } = req.params;
     const { password } = req.params;
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


// Actualizar un barbero existente
const updateBarber = async (req, res, next) => {
  try {
    const { id } = req.params;
        console.log(" req.body.password", req.body.password)
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 
    console.log(" hashedPassword",hashedPassword)
      req.body.password=hashedPassword;
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
  getBarberById,
  createBarber,
  updateBarber,
  deleteBarber,updatePassword
};
