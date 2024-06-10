 function traducirFechaAAAAMMDD(fechaString) {
    const fecha = new Date(fechaString);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-MX', opciones);
}

module.exports = { traducirFechaAAAAMMDD };