require('dotenv').config();
const express = require("express");
const app = express();
const apiRoutes = require("./routes/apiRoutes"); 
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use("/api", apiRoutes); // Todas las rutas de la API deben comenzar con '/api'

// MONGO CONNECTION
mongoose.connect(`${process.env.CONNECTION_STRING}${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then(() => {
    console.log("Conexión a MongoDB Atlas establecida");
})
.catch(err => {
    console.error("Error al conectar a MongoDB Atlas:", err);
});

const PORT = process.env.PORT || 3000;

//Restringir los orígenes permitidos o configurar otras opciones avanzadas
// app.use(cors({
//   origin: 'http://example.com', // Solo permite solicitudes desde http://example.com
//   methods: ['GET', 'POST'], // Solo permite los métodos GET y POST
//   allowedHeaders: ['Content-Type', 'Authorization'], // Solo permite ciertos encabezados
// }));


app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});