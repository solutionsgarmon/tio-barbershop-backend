// Función para clonar profundamente un objeto
function clonarProfundamente(objeto) {
    if (objeto === null || typeof objeto !== 'object') {
        return objeto; // Si el objeto no es un objeto, o es null, devolver tal cual
    }

    // Crear una copia vacía del objeto
    const copia = Array.isArray(objeto) ? [] : {};

    // Recorrer todas las propiedades del objeto
    for (let clave in objeto) {
        if (Object.hasOwnProperty.call(objeto, clave)) {
            // Clonar recursivamente las propiedades del objeto
            copia[clave] = clonarProfundamente(objeto[clave]);
        }
    }

    return copia; // Devolver la copia del objeto clonado
}

module.exports = { clonarProfundamente };