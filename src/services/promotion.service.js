const PROMOTIONS = require('../models/promotion');
const PRODUCTS = require('../models/product');

async function getValidPromotions() {
    try {
        const currentDate = new Date();
        const documents = await PROMOTIONS.find();

        // Filtrar promociones válidas por fecha
        const validPromotions = await Promise.all(documents.map(async promotion => {
            const startDate = parseDateString(promotion.dateStart);
            const endDate = parseDateString(promotion.dateEnd);
            if (currentDate >= startDate && currentDate <= endDate) {
                // Mapear los ID de productos a los objetos de productos
                const products = await Promise.all(promotion.products.map(async productId => {
                    return await PRODUCTS.findOne({ id: productId }).lean();
                }));
                // Reemplazar los ID de productos con los objetos de productos en la promoción
                promotion.products = products;
                return promotion;
            }
        }));

        return validPromotions.filter(promotion => promotion !== undefined); // Eliminar elementos undefined

    } catch (error) {
        console.error("Error al obtener los documentos Promociones:", error);
        throw new Error(`Error al obtener los documentos de Promociones: ${error}`);
    }
}

async function verifyPromotionProduct(productBD) {
   let productWithPromo = { ...productBD };
    const promociones = await getValidPromotions();
    promociones.forEach(promo => {
        let prodWithPromo = promo.products.find(p => p.id === productBD.id);

        if (prodWithPromo) {
            // Aplicar la promoción al producto
            productWithPromo.isInPromotion = true; // Marcar que el producto está en promoción
            productWithPromo.newPrice = ((100 - promo.discount_percentage) / 100) * productBD.price; // Calcular el nuevo precio con el descuento de la promoción
            productWithPromo.discount_percentage = promo.discount_percentage;
            console.log("productWithPromo ======> 3",productWithPromo)
        }
    });
console.log("productWithPromo",productWithPromo)
    return productWithPromo;
}


// Función para convertir cadena de fecha en objeto Date
function parseDateString(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
}

module.exports = { getValidPromotions,verifyPromotionProduct };
