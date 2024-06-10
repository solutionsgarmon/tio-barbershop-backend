require('dotenv').config();
const Cita = require('../models/cita');

const sendMessage = async (req, res, next) => {
console.log("[ejecución] sendMessage()")
const { cita } = req.body;
const clientNumber = "+523113913306"
const message = "Recordatorio de cita, barberia Revolucion, 10:00 horas"
  try {
    const accountSid =  process.env.ACCOUNT_SID;
    const authToken =  process.env.AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    // Enviar el mensaje utilizando Twilio
    client.messages
      .create({
        body: message, // Mensaje a enviar
        from:  process.env.TWILO_NUMER, // Número de teléfono Twilio
        to: clientNumber // Número de teléfono del destinatario
      })
      .then(message => {
        console.log("[éxito] Mensaje enviado con éxito:", message.sid);
        return res.json({ success: true, message: "Mensaje enviado con éxito" });
      })
      .catch(error => {
        console.error("Error al enviar el mensaje:", error);
        return res.status(500).json({ success: false, error: 'Error al enviar el mensaje' });
      });
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    return res.status(500).json({ success: false, error: 'Error al enviar el mensaje' });
  }
};

// FUNCION PARA MANDAR MENSAJES DE WHATSAPP
// Find your Account SID and Auth Token at twilio.com/console
const sendWhatsappMessage = async (req, res, next) => {
  try {  
    console.log("[ejecución] sendWhatsappMessage()");
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  let client = require('twilio')(accountSid, authToken);

  const { cita } = req.body;
  const citaDoc = await Cita.findById(cita);

  const clientName= citaDoc.datos_cliente.nombre;
  const clientNumber = citaDoc.datos_cliente.telefono;
  const barbershopName= citaDoc.nombre_barberia_asignada;
  const barberName= citaDoc.nombre_barbero_asignado;
  const citaDate= traducirFechaAAAAMMDD( citaDoc.fecha_asignada);
  const citaHour= citaDoc.hora_inicio_asignada;

  client.messages
        .create({
          contentSid: 'HX38c01376179b34701a6c63e2fbe969f3', //plantilla
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
    return res.status(200).json({ success: true});
  } catch(error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error al enviar el mensaje' });
  }
};



//FUNCITION
 function traducirFechaAAAAMMDD(fechaString) {
    const fecha = new Date(fechaString);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-MX', opciones);
}


module.exports = {
  sendWhatsappMessage,
  sendMessage
};


