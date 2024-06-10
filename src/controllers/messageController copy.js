require('dotenv').config();

const sendMessage = async (req, res, next) => {
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

// const sendWhatappMessage = async (req, res, next) => {
//   // const { cita } = req.body;
//   const name_client= '';
//   const name_barbershop= '';
//    const name_barber= '';
//   const date_cita= '';
//   const hour_cita= '';
//   const clientNumber = "+523113913306";
//   const EL_TIO_NUMBER=""
//   const message = `¡Hola ${name_client}! Tu cita en la barbería ${name_barber} ha sido generada exitosamente. Te esperamos el día ${date_cita} a las ${hour_cita}, nuestro Barber ${name_barber} te dará el mejor estilo.¡Nos veremos pronto! cualquier duda o cambio, no dudes en ponerte en contacto con nosotros.`

//   try {
//     const accountSid = process.env.ACCOUNT_SID;
//     const authToken = process.env.AUTH_TOKEN;
//     const client = require('twilio')(accountSid, authToken);

//     // Enviar el mensaje utilizando Twilio
//     client.messages
//       .create({
//         body: message, // Mensaje a enviar
//         messagingServiceSid: '298576966675329',
//         //from: process.env.TWILO_WHASAPP_NUMBER, // Número de teléfono Twilio para WhatsApp
//         from: 'whatsapp:+5215513386822',
//         to: 'whatsapp:+5213113913306' // Número de teléfono del destinatario para WhatsApp
//       })
//       .then(message => {
//         console.log("[éxito] Mensaje enviado con éxito:", message.sid);
//         return res.json({ success: true, message: "Mensaje enviado con éxito" });
//       })
//       .catch(error => {
//         console.error("Error al enviar el mensaje:", error);
//         return res.status(500).json({ success: false, error: 'Error al enviar el mensaje' });
//       });
//   } catch (error) {
//     console.error("Error al enviar el mensaje:", error);
//     return res.status(500).json({ success: false, error: 'Error al enviar el mensaje' });
//   }
// };

const sendWhatappMessage = async (req, res, next) => {
  const Twilio = require('twilio');
  console.log("[ejecución] sendWhatappMessage()")
  // const { cita } = req.body;
  // const name_client= '';
  // const name_barbershop= '';
  //  const name_barber= '';
  // const date_cita= '';
  // const hour_cita= '';
  // const clientNumber = "+523113913306";
  // const EL_TIO_NUMBER=""
  // const message = `¡Hola ${name_client}! Tu cita en la barbería ${name_barber} ha sido generada exitosamente. Te esperamos el día ${date_cita} a las ${hour_cita}, nuestro Barber ${name_barber} te dará el mejor estilo.¡Nos veremos pronto! cualquier duda o cambio, no dudes en ponerte en contacto con nosotros.`

try {
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const options = {
          to: `whatsapp:${appointment.phoneNumber}`,
          from: `whatsapp:${cfg.twilioPhoneNumber}`,
          body: `Hola ${appointment.name}. Este es un recordatorio de tu cita.`,
        };

        const message = await client.messages.create(options);


/////////// FORMA 1
// client.messages
//       .create({
//          contentSid: 'HXcbbea9e1fae9747fe965eda00b935089',
//          from: 'MG886b6e2b0f6cf5a576edd64276624ef5',
//          contentVariables: JSON.stringify({
//            1: 'Carlos',
//            2: 'Principal',
//            3: '20024/12/25',
//            4: '16:20',
//            5: 'Nicole Medina'
//          }),
    
//          to: 'whatsapp:+523113913306'
//        })
//       .then(message => console.log(message.sid));

//////// FORMA 2
// client.messages
//       .create({
//          contentSid: 'HXcbbea9e1fae9747fe965eda00b935089',
//          from: 'whatsapp:+5215513386822',
//          contentVariables: JSON.stringify({
//            1: 'Carlos',
//            2: 'Principal',
//            3: '20024/12/25',
//            4: '16:20',
//            5: 'Nicole Medina'
//          }),
//            messagingServiceSid: 'MG886b6e2b0f6cf5a576edd64276624ef5',
//          to: 'whatsapp:+523113913306'
//        })
//       .then(message => console.log(message.sid));

  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    return res.status(500).json({ success: false, error: 'Error al enviar el mensaje' });
  }
};

module.exports = {
  sendWhatappMessage,
  sendMessage
};


