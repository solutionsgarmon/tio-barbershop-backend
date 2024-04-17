const BARBERSHOPS = require('../models/barbershop');

const getBarbershops = async (req, res, next) => {
  try {
    const documents = await BARBERSHOPS.find();
    res.json({ data: documents, success: true, error: null });
  } catch (error) {
    console.error("Error al obtener los documentos:", error);
    res.status(500).json({ data: null, success: false, error: `Error al obtener los documentos de BARBERSHOPS: ${error}` });
  }
};

const createBarbershop = async (req, res, next) => {
  try {
    const newBarbershop = new BARBERSHOPS(req.body);
    const savedBarbershop = await newBarbershop.save();
    res.status(201).json({ data: savedBarbershop, success: true, error: null });
  } catch (error) {
    console.error("Error al crear el barbershop:", error);
    res.status(500).json({ data: null, success: false, error: `Error al crear el barbershop: ${error}` });
  }
};

const updateBarbershop = async (req, res, next) => {
  try {
    const updatedBarbershop = await BARBERSHOPS.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ data: updatedBarbershop, success: true, error: null });
  } catch (error) {
    console.error("Error al actualizar el barbershop:", error);
    res.status(500).json({ data: null, success: false, error: `Error al actualizar el barbershop: ${error}` });
  }
};

const deleteBarbershop = async (req, res, next) => {
  try {
    await BARBERSHOPS.findByIdAndDelete(req.params.id);
    res.json({ data: null, success: true, error: null });
  } catch (error) {
    console.error("Error al eliminar el barbershop:", error);
    res.status(500).json({ data: null, success: false, error: `Error al eliminar el barbershop: ${error}` });
  }
};

module.exports = {
  getBarbershops,
  createBarbershop,
  updateBarbershop,
  deleteBarbershop
};
