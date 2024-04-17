const Admin = require('../models/admin');
const bcrypt = require('bcryptjs'); 

// Obtener todos los barberos
const getAdmins = async (req, res, next) => {
  try {
    const documents = await Admin.find();
    res.json({ data: documents, error: null , success: true});
  } catch (error) {
    console.error("Error al obtener los documentos ADMINS:", error);
    res.status(500).json({ data: null,  success: false, error: `Error al obtener los documentos de ADMINS: ${error}` });
  }
};

// Obtener un Administrador por su ID
const getAdminById = async (req, res, next) => {
  try {
    const document = await Admin.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ success: false, error: 'Admin no encontrado' });
    }
    res.json({ data: document, error: null, success: true });
  } catch (error) {
    console.error("Error al obtener el Administrador por ID:", error);
    res.status(500).json({ success: false, error: `Error al obtener el Administrador por ID: ${error.message}` });
  }
};

// Crear un nuevo Administrador
const createAdmin = async (req, res, next) => {
  try {
      const hashedPassword = await bcrypt.hash( req.body.password, 10); 
      req.body.password = hashedPassword
    const newDocument = new Admin(req.body);
    await newDocument.save();
    console.error("[Éxito] Nuevo Administrador creado:", newDocument);
    res.status(201).json({ data: newDocument, error: null, success: true });
  } catch (error) {
    console.error("Error al crear un nuevo Administrador:", error);
    res.status(500).json({ error: "Error al crear un nuevo Administrador", success: false });
  }
};

// Actualizar un Administrador existente
const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedDocument = await Admin.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDocument) {
      return res.status(404).json({ success: false, error: 'Admin no encontrado' });
    }
    console.error("[Éxito] Admin actualizado:", updatedDocument);
    res.json({ data: updatedDocument, error: null, success: true });
  } catch (error) {
    console.error("Error al actualizar el Administrador:", error);
    res.status(500).json({ error: "Error al actualizar el Administrador", success: false });
  }
};

// Eliminar un Administrador existente
const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedDocument = await Admin.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ success: false, error: 'Admin no encontrado' });
    }
    console.error("[Éxito] Admin eliminado:", deletedDocument);
    res.json({ data: {}, error: null, success: true });
  } catch (error) {
    console.error("Error al eliminar el Administrador:", error);
    res.status(500).json({ error: "Error al eliminar el Administrador", success: false });
  }
};

module.exports = {
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin
};
