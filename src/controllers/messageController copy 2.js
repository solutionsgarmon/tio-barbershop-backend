require('dotenv').config();

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


// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const sendWhatappMessage = async (req, res, next) => {
  console.log("[ejecución] sendWhatsappMessage()");

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  let client = require('twilio')(accountSid, authToken);
  
  try {
    const message = await client.messages.create({
      from: 'whatsapp:+5215513386822', // Remitente
      body: 'Hello there!', // Este campo se ignora cuando se usa una plantilla de mensaje
      to: 'whatsapp:+523113913306', // Destino
      provideFeedback: true, // Esto permite recibir información sobre el estado del mensaje
      templateName: 'notificacion', // Nombre de la plantilla que has creado en Twilio
      substitutions: {
        // Aquí debes incluir las variables requeridas por la plantilla y sus valores correspondientes
        variable1: 'valor1',
        variable2: 'valor2',
        variable3: 'valor3',
        variable4: 'valor4',
        variable5: 'valor5',
 
      }
    });
    
    console.log(message.sid);
    return res.status(200).json({ success: true, messageSid: message.sid });
  } catch(error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error al enviar el mensaje' });
  }
};

module.exports = {
  sendWhatappMessage,
  sendMessage
};


