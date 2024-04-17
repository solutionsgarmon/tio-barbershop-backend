const Service = require('../models/service');

// Obtener todos los servicios
const getServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.json({ data: services, error: null, success: true });
  } catch (error) {
    console.error("Error al obtener los documentos de Servicios:", error);
    res.status(500).json({ error: "Error al obtener los documentos de Servicios", success: false });
  }
};

const createService = async (req, res, next) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json({ data: savedService, error: null, success: true });
  } catch (error) {
    console.error("Error al crear un nuevo servicio:", error);
    res.status(500).json({ error: "Error al crear un nuevo servicio", success: false });
  }
};


const updateService = async (req, res, next) => {
  try {
    const serviceId = req.params.id;
    const updatedService = await Service.findByIdAndUpdate(serviceId, req.body, { new: true });
    res.json({ data: updatedService, error: null, success: true });
  } catch (error) {
    console.error("Error al actualizar el servicio:", error);
    res.status(500).json({ error: "Error al actualizar el servicio", success: false });
  }
};


const deleteService = async (req, res, next) => {
  try {
    const serviceId = req.params.id;
    await Service.findByIdAndDelete(serviceId);
    res.json({ data: null, error: null, success: true });
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
    res.status(500).json({ error: "Error al eliminar el servicio", success: false });
  }
};


module.exports = {
  getServices,
  createService,
  updateService,
  deleteService
};
