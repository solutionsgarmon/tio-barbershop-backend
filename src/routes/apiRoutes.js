const express = require("express");
const router = express.Router();
router.get("/resources", (req, res) => {
  const resources = [
    { id: 1, name: "Recurso 1" },
    { id: 2, name: "Recurso 2" },
    { id: 3, name: "Recurso 3" },
  ];
  res.json(resources);
});
// Ruta para obtener un recurso por ID
router.get("/resources/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const resources = [
    { id: 1, name: "Recurso 1" },
    { id: 2, name: "Recurso 2" },
    { id: 3, name: "Recurso 3" },
  ];
  const resource = resources.find((r) => r.id === id);
  if (!resource) {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }
  res.json(resource);
});
// Ruta para crear un nuevo recurso
router.post("/resources", (req, res) => {
  // Aquí podrías procesar los datos enviados en el cuerpo de la solicitud y guardarlos
  const newResource = req.body;
  // Simplemente devolvemos el nuevo recurso creado
  res.status(201).json(newResource);
});
// Ruta para actualizar un recurso existente por ID
router.put("/resources/:id", (req, res) => {
  const resourceId = parseInt(req.params.id);
  // Consultar la base de datos o actualizar el recurso por ID
  const updatedResource = {
    id: resourceId,
    name: `Recurso ${resourceId} (actualizado)`,
  };
  res.json(updatedResource);
});
// Ruta para eliminar un recurso por ID
router.delete("/resources/:id", (req, res) => {
  const resourceId = parseInt(req.params.id);
  // Consultar la base de datos o eliminar el recurso por ID
  res.status(204).send();
});
module.exports = router;