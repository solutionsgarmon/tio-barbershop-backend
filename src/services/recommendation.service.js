const RECOMMENDATIONS = require('../models/recommendation');


async function getRecommendations() {
    try {
       const documents = await RECOMMENDATIONS.find();

        return documents

    } catch (error) {
        console.error("Error al obtener los documentos Recomendacion:", error);
        throw new Error(`Error al obtener los documentos de Recomendacion: ${error}`);
    }
}


module.exports = { getRecommendations };
