const App = require('../models/appSettings');

// Obtener todas las configuraciones de la aplicación
const getApps = async (req, res, next) => {
  try {
    const apps = await App.find();
    res.json({ data: apps, error: null, success: true });
  } catch (error) {
    console.error("Error al obtener las configuraciones de la aplicación:", error);
    res.status(500).json({ data: null, success: false, error: `Error al obtener las configuraciones de la aplicación: ${error}` });
  }
};


// Crear una nueva configuración de la aplicación
const createApp = async (req, res, next) => {
  try {
    const newApp = new App(req.body);
    const savedApp = await newApp.save();
    res.status(201).json({ data: savedApp, error: null, success: true });
  } catch (error) {
    console.error("Error al crear una nueva configuración de la aplicación:", error);
    res.status(500).json({ data: null, success: false, error: `Error al crear una nueva configuración de la aplicación: ${error}` });
  }
};

// Actualizar una configuración de la aplicación
const updateApp = async (req, res, next) => {
  console.log("[ejecución] updateApp(")
  try {
    const appId = req.params.id;
    console.log("appId",appId)
    console.log("req.body",req.body)
    const updatedApp = await App.findByIdAndUpdate(appId, req.body, { new: true });
    res.json({ data: updatedApp, error: null, success: true });
  } catch (error) {
    console.error("Error al actualizar la configuración de la aplicación:", error);
    res.status(500).json({ data: null, success: false, error: `Error al actualizar la configuración de la aplicación: ${error}` });
  }
};

// Eliminar una configuración de la aplicación
const deleteApp = async (req, res, next) => {
  try {
    const appId = req.params.id;
    await App.findByIdAndDelete(appId);
    res.json({ data: null, error: null, success: true });
  } catch (error) {
    console.error("Error al eliminar la configuración de la aplicación:", error);
    res.status(500).json({ data: null, success: false, error: `Error al eliminar la configuración de la aplicación: ${error}` });
  }
};

module.exports = {
  getApps,
  createApp,
  updateApp,
  deleteApp,

};
