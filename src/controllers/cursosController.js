const Curso = require('../models/cursos');

// Obtener todos los barberos
const getCursos = async (req, res, next) => {
  try {
    const documents = await Curso.find();
    res.json({ data: documents, error: null , success: true});
  } catch (error) {
    console.error("Error al obtener los documentos CURSOS:", error);
    res.status(500).json({ data: null,  success: false, error: `Error al obtener los documentos de CURSOS: ${error}` });
  }
};

// Obtener un CURSO por su ID
const getCursoById = async (req, res, next) => {
  try {
    const document = await Curso.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ success: false, error: 'Curso no encontrado' });
    }
    res.json({ data: document, error: null, success: true });
  } catch (error) {
    console.error("Error al obtener el CURSO por ID:", error);
    res.status(500).json({ success: false, error: `Error al obtener el CURSO por ID: ${error.message}` });
  }
};

// Crear un nuevo CURSO
const createCurso = async (req, res, next) => {
  try {
    const newDocument = new Curso(req.body);
    await newDocument.save();
    console.error("[Éxito] Nuevo CURSO creado:", newDocument);
    res.status(201).json({ data: newDocument, error: null, success: true });
  } catch (error) {
    console.error("Error al crear un nuevo CURSO:", error);
    res.status(500).json({ error: "Error al crear un nuevo CURSO", success: false });
  }
};

// Actualizar un CURSO existente
const updateCurso = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedDocument = await Curso.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDocument) {
      return res.status(404).json({ success: false, error: 'Curso no encontrado' });
    }
    console.error("[Éxito] Curso actualizado:", updatedDocument);
    res.json({ data: updatedDocument, error: null, success: true });
  } catch (error) {
    console.error("Error al actualizar el CURSO:", error);
    res.status(500).json({ error: "Error al actualizar el CURSO", success: false });
  }
};

// Eliminar un CURSO existente
const deleteCurso = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedDocument = await Curso.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ success: false, error: 'Curso no encontrado' });
    }
    console.error("[Éxito] Curso eliminado:", deletedDocument);
    res.json({ data: {}, error: null, success: true });
  } catch (error) {
    console.error("Error al eliminar el CURSO:", error);
    res.status(500).json({ error: "Error al eliminar el CURSO", success: false });
  }
};

module.exports = {
  getCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso
};
