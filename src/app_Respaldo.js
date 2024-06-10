require('dotenv').config();
const express = require("express");
const app = express();
const apiRoutes = require("./routes/apiRoutes"); 
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const Cita = require('./models/cita'); // Importa el modelo de cita
const Cita_Registro = require('./models/cita_registro'); // Importa el modelo de cita


app.use(express.json());
app.use(cors());
app.use("/api", apiRoutes); // Todas las rutas de la API deben comenzar con '/api'

const fecha = new Date(); 
console.log('Hora actual del servidor (005) toLocaleString --->', fecha.toLocaleString());
console.log('Hora actual del servidor (005)   new Date()   --->', fecha); 
fecha.setHours(fecha.getHours() - 6); //Restamos 6 horas
console.log("fecha Real (CDMX):",fecha)
    

// MONGO CONNECTION
mongoose.connect(`${process.env.CONNECTION_STRING}${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then(() => {
    console.log("Conexión a MongoDB Atlas establecida");
})
.catch(err => {
    console.error("Error al conectar a MongoDB Atlas:", err);
});

const PORT = process.env.PORT || 3000;


//Actualizar el estatus de la cita
const actualizarEstadoCitas = async () => {
    console.log("[******** Ejecución JOB *********]")
    try {
        const fechaReal = new Date();  
        console.log("fecha server (fly.io):",fechaReal)
        console.log("fecha server (fly.io) (toLocaleString):",fechaReal.toLocaleString())
        fechaReal.setHours(fechaReal.getHours() - 6); //Restamos 6 horas
        console.log("fecha Real (CDMX):",fechaReal)
        console.log("fecha Real (CDMX) (toLocaleString):",fechaReal.toLocaleString())

        const horaActual = fechaReal.getHours(); // obtiene un numero '10'
        const fechaHoy = fechaReal.toISOString().split('T')[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'

        //Buscamos las citas que sea la fecha sea igual o anterior que HOY
        const citas = await Cita.find({ estatus: 'PENDIENTE', fecha_asignada: { $lte: fechaHoy } });
   

        citas.forEach(async (cita) => {
            // Si la fecha_asignada es hoy, verificar si la hora_fin_asignada ya pasó

          
            if(cita.tipo_cita=="CITA"){
                  ////// ES CITA ///////
          if (cita.fecha_asignada == fechaHoy) {
               console.log(">Mapeando citas HOY:",cita.datos_cliente.nombre,"-",cita.fecha_asignada,"-",cita.hora_inicio_asignada)
                const horaFinParts = cita.hora_fin_asignada.split(':');
                const horaFin = new Date(fechaReal);
                horaFin.setHours(parseInt(horaFinParts[0], 10)); // Establecer la hora
                horaFin.setMinutes(parseInt(horaFinParts[1], 10)); // Establecer los minutos

                // console.info("La cita tiene fecha IGUAL a hoy: ",cita.datos_cliente.nombre)     
                // console.info("horaActual: ",horaActual)
                // console.info("fechaReal.getTime(): ",fechaReal.getTime())
                // console.info("horaFin.getHours(): ",horaFin.getHours())
                // console.info("horaFin.getTime(): ",horaFin.getTime())
                // Verificar si la hora de finalización ha pasado
                if (horaActual >= horaFin.getHours() && fechaReal.getTime() >= horaFin.getTime()) {
                    console.info("Cambiando estatus de cita de HOY a COMPLETADA...")
                    await moverCitaARegistro(cita, 'COMPLETADA');
                }
            } else {
              console.info("Cambiando estatus de Cita Anterior  a HOY a COMPLETADA...")
              await moverCitaARegistro(cita, 'COMPLETADA');
            }
            }else{
                ////// ES DESCANSO ///////
                if (cita.fecha_asignada_fin == fechaHoy) {
                const horaFinParts = cita.hora_fin_asignada.split(':');
                const horaFin = new Date(fechaReal);
                horaFin.setHours(parseInt(horaFinParts[0], 10)); // Establecer la hora
                horaFin.setMinutes(parseInt(horaFinParts[1], 10)); // Establecer los minutos

                // console.info("La cita tiene fecha IGUAL a hoy: ",cita.datos_cliente.nombre)     
                // console.info("horaActual: ",horaActual)
                // console.info("fechaReal.getTime(): ",fechaReal.getTime())
                // console.info("horaFin.getHours(): ",horaFin.getHours())
                // console.info("horaFin.getTime(): ",horaFin.getTime())
                // Verificar si la hora de finalización ha pasado
                if (horaActual >= horaFin.getHours() && fechaReal.getTime() >= horaFin.getTime()) {
                    console.info("Cambiando estatus del Descanso de HOY a COMPLETADA...")
                    await moverCitaARegistro(cita, 'COMPLETADA');
                }

                console.log("xd")
            } else {
              console.info("Cambiando estatus de Cita Anterior  a HOY a COMPLETADA...")
              await moverCitaARegistro(cita, 'COMPLETADA');
            }

            }
           
  
        });
    } catch (error) {
        console.error('Error al actualizar el estado de las citas:', error);
    }
};

const moverCitaARegistro = async (cita, estado) => {
    try {
        const citaClonada = await Cita.findById(cita._id).lean();
        
        // Modificar el estatus en la copia clonada
        citaClonada.estatus = estado;

        const registroCita = new Cita_Registro(citaClonada);
        await registroCita.save();

        // Eliminar la cita de la colección de citas pendientes
        await Cita.findByIdAndDelete(cita._id);
    } catch (error) {
        console.error('Error al mover la cita a registro_citas:', error);
    }
};


// Programa un cronjob para ejecutar la función de actualización cada diez minutos, solo de 10:00 am a 10:00 pm
// cron.schedule('*/10 10-22 * * *', () => {
//     actualizarEstadoCitas();
// });

// hacer cada 10 minutos de 10am a 10pm (se restan las 6h de adelanto del server)

//Cada hora se ejecuta en un horario de 10am-12pm
cron.schedule('*/2 * * * *', () => {
    actualizarEstadoCitas();
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
