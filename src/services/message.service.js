require('dotenv').config();
const Cita = require('../models/cita');
const Barber = require('../models/barber');

//Enviar mensaje de creación de cita al Cliente
const sendNotificationCreationCita = async (cita) => {
  console.log("[ejecución] sendNotificationCreationCita()");
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  let client = require('twilio')(accountSid, authToken);

  const clientName= cita.datos_cliente.nombre;
  const clientNumber = cita.datos_cliente.telefono;
  const barbershopName= cita.nombre_barberia_asignada;
  const barberName= cita.nombre_barbero_asignado;
  const citaDate= traducirFechaAAAAMMDD( cita.fecha_asignada);
  const citaHourConvertir= cita.hora_inicio_asignada;
  const citaHour = convertirHora(citaHourConvertir);


  try {
  client.messages
        .create({
          contentSid: 'HX20f58cc9084846a6c3b1aca431bf10f6', //plantilla
          from: 'MG3f8c82e8dc11010c100c569ebab54e9d',//sender
          contentVariables: JSON.stringify({
              1: clientName,
              2: barbershopName,
              3: citaDate,
              4: citaHour,
              5: barberName
          }),
          to: `whatsapp:+52${clientNumber}`
        })
      .then(message => console.log(message));
    console.log("Mensaje de Whsta Enviado Correctamente")
  } catch(error) {
    console.error(error);
    console.error("Error al tratar de enviar emnsaje de WhatsApp:",error)
  }
};

//Enviar mensaje de creación de DESCANSO al barbero
const sendNotificationCreationDescanso = async (cita) => {
  console.log("[ejecución] sendNotificationCreationDescanso()");
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  let client = require('twilio')(accountSid, authToken);


  const barberName= cita.nombre_barbero_asignado;
  const citaDate= traducirFechaAAAAMMDD( cita.fecha_asignada);
  const citaDateFin= traducirFechaAAAAMMDD( cita.fecha_asignada_fin);
  const citaHourConvertir= cita.hora_inicio_asignada;
  const citaHourFinConvertir= cita.hora_fin_asignada;
  const citaHour = convertirHora(citaHourFinConvertir);
  const citaHourFin = convertirHora(citaHourConvertir);


  try {
     const barber = await Barber.findById(cita.barbero_asignado);

  client.messages
        .create({
          contentSid: 'HX6c01f030517ef2b345887506ef610876', //plantilla
          from: 'MG3f8c82e8dc11010c100c569ebab54e9d',//sender
          contentVariables: JSON.stringify({
              1: barberName,
              2: citaDate,
              3: citaHour,
   
          }),
          // to: `whatsapp:+52${barber.datos_personales.telefono}`
           to: `whatsapp:+523113913306`
        })
      .then(message => console.log(message));
    console.log("Mensaje de Whsta Enviado Correctamente")
  } catch(error) {
    console.error(error);
    console.error("Error al tratar de enviar mensaje de WhatsApp:",error)
  }
};

//Enviar mensaje de cancelacion de cita al Cliente
const sendNotificationCancelCitaCliente = async (cita) => {
  console.log("[ejecución] sendNotificationCancelCitaCliente()");
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  let client = require('twilio')(accountSid, authToken);

  const clientName= cita.datos_cliente.nombre;
  const clientNumber = cita.datos_cliente.telefono;
  const barbershopName= cita.nombre_barberia_asignada;
  const citaDate= traducirFechaAAAAMMDD( cita.fecha_asignada);
    const citaHourConvertir= cita.hora_inicio_asignada;
  const citaHour = convertirHora(citaHourConvertir);

  try {
  client.messages
        .create({
          contentSid: 'HX8996f22502d30c27aef4edc9785a6540', //plantilla
          from: 'MG3f8c82e8dc11010c100c569ebab54e9d',//sender
          contentVariables: JSON.stringify({
              1: clientName,
              2: barbershopName,
              3: citaDate,
              4: citaHour,
          }),
          to: `whatsapp:+52${clientNumber}`
        })
      .then(message => console.log(message));
    console.log("Mensaje de Whatsapp Enviado Correctamente")
  } catch(error) {
    console.error(error);
    console.error("Error al tratar de enviar emnsaje de WhatsApp:",error)
  }
};

//plantilla cancelacion cita barbero
const sendNotificationCancelCitaBarbero = async (cita) => {
  console.log("[ejecución] sendNotificationCancelCitaBarbero()");
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  let client = require('twilio')(accountSid, authToken);

  // const clientName= cita.datos_cliente.nombre;
  // const clientNumber = cita.datos_cliente.telefono;
  const barbershopName= cita.nombre_barberia_asignada;
  const citaDate= traducirFechaAAAAMMDD( cita.fecha_asignada);
  const citaHourConvertir= cita.hora_inicio_asignada;
  const barberName= cita.nombre_barbero_asignado;
  const citaHour = convertirHora(citaHourConvertir);


  try {
        const barber = await Barber.findById(cita.barbero_asignado);

  client.messages
        .create({
          contentSid: 'HXa53ac84e95016bb78b5ee9c3b6097606', //plantilla
          from: 'MG3f8c82e8dc11010c100c569ebab54e9d',//sender
          contentVariables: JSON.stringify({
              1: barberName,
              2: barbershopName,
              3: citaDate,
              4: citaHour
          }),     
         to: `whatsapp:+52${barber.datos_personales.telefono}`
        })
      .then(message => console.log(message));
    console.log("Mensaje de Whatsapp Enviado Correctamente")
  } catch(error) {
    console.error(error);
    console.error("Error al tratar de enviar emnsaje de WhatsApp:",error)
  }
};




//**************  F U N C I O N E S   ************
function traducirFechaAAAAMMDD(fechaString) {
    const [year, month, day] = fechaString.split('-');
    // JavaScript months are 0-based, so subtract 1 from the month
    const fecha = new Date(year, month - 1, day);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-MX', opciones);
}

// Ejemplo de uso
const fechaString = "2024-05-24";
const fechaTraducida = traducirFechaAAAAMMDD(fechaString);
console.log(fechaTraducida); // Debe mostrar "24 de mayo de 2024" o un formato similar dependiendo de la configuración regional


function convertirHora(hora24) {
    const [horas, minutos] = hora24.split(':');
    let hora12 = parseInt(horas);
    let periodo;

    if (hora12 === 0) {
        // Medianoche
        hora12 = 12;
        periodo = 'AM';
    } else if (hora12 === 12) {
        // Mediodía
        hora12 = 12;
        periodo = 'PM';
    } else if (hora12 > 12) {
        // PM horas después del mediodía
        hora12 = hora12 - 12;
        periodo = 'PM';
    } else {
        // AM horas antes del mediodía
        periodo = 'AM';
    }

    return `${hora12}:${minutos} ${periodo}`;
}


module.exports = { sendNotificationCreationCita,sendNotificationCancelCitaCliente,sendNotificationCancelCitaBarbero,sendNotificationCreationDescanso };