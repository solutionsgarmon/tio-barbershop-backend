const express = require("express");
const app = express();
const apiRoutes = require("./routes/apiRoutes"); 
app.use(express.json());
app.use("/api", apiRoutes); // Todas las rutas de la API deben comenzar con '/api'
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});