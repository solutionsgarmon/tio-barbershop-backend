const Recommendation = require('../models/recommendation');
const recommendationService = require('../services/recommendation.service');
const getTemplateHTMLOpinion = require('../templates/templateEmailOpinion');


// Obtener todas las recomendaciones
const getRecommendations = async (req, res, next) => {
  try {
    const recommendations = await recommendationService.getRecommendations();
    res.json({ data: recommendations, error: null, success: true });
  } catch (error) {
    console.error("Error al obtener las recomendaciones:", error);
    res.status(500).json({ error: "Error al obtener las recomendaciones", success: false });
  }
};

// Crear una nueva recomendación
const createRecommendation = async (req, res, next) => {
  const recommendation = req.body;

  try {
    const newRecommendation = new Recommendation(recommendation);
    await newRecommendation.save();
    console.log("[Éxito] Nueva recomendación creada:", newRecommendation);

    // Envío de correo electrónico (descomenta esta parte si lo necesitas y asegúrate de tener el servicio sendMail definido)
    /* const emailData = {
      to: ["contacto@garmon.com.mx", recommendation.email],
      subject: "Nueva reseña para Garmon Solutions",
      html: getTemplateHTMLOpinion(recommendation),
    };
    sendMail(emailData); */

    res.status(201).json({ data: newRecommendation, error: null, success: true });
  } catch (error) {
    console.error("Error al crear una nueva recomendación:", error);
    res.status(500).json({ error: "Error al crear una nueva recomendación", success: false });
  }
};

// Eliminar una recomendación existente
const deleteRecommendation = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRecommendation = await Recommendation.findByIdAndDelete(id);
    if (!deletedRecommendation) {
      return res.status(404).json({ success: false, error: 'Recomendación no encontrada' });
    }
    console.error("[Éxito] Recomendación eliminada:", deletedRecommendation);
    res.json({ data: {}, error: null, success: true });
  } catch (error) {
    console.error("Error al eliminar la recomendación:", error);
    res.status(500).json({ error: "Error al eliminar la recomendación", success: false });
  }
};

// Actualizar una recomendación existente
const updateRecommendation = async (req, res, next) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const updatedRecommendation = await Recommendation.findByIdAndUpdate(id, newData, { new: true });
    if (!updatedRecommendation) {
      return res.status(404).json({ success: false, error: 'Recomendación no encontrada' });
    }
    console.error("[Éxito] Recomendación actualizada:", updatedRecommendation);
    res.json({ data: updatedRecommendation, error: null, success: true });
  } catch (error) {
    console.error("Error al actualizar la recomendación:", error);
    res.status(500).json({ error: "Error al actualizar la recomendación", success: false });
  }
};

module.exports = {
  getRecommendations,
  createRecommendation,
  deleteRecommendation,
  updateRecommendation
};
