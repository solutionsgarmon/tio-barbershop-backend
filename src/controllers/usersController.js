const bcrypt = require('bcryptjs'); 
const USERS = require('../models/user');

const getUsers = async (req, res, next) => {
  console.log("getUsers()");
  try {
    const documents = await USERS.find();
    res.json({ data: documents, error: null, success: true });
  } catch (error) {
    console.error("Error al obtener los documentos:", error);
    res.status(500).json({ data: null, success: false, error: `Error al obtener los documentos de Usuarios: ${error}` });
  }
};

const createUser = async (req, res, next) => {
   console.log("createUser()",req.body);
   const { nombre, correo , password, datos_personales = "", historial_servicios = [] } = req.body;
  try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password using bcryptjs
        const newProduct = new USERS({ 
            nombre,
            correo,
            password: hashedPassword, // Saving the hashed password
            datos_personales,
            historial_servicios
        });

        await newProduct.save();
        console.error("[exito] postProduct");
       res.json({  error: null, success: true, message: "Usuario registrado" });
        
    } catch (error) {
        console.error("Error al crear un nuevo usuario:", error);
       res.json({  error: true, success: false, error: error, message:`Error al crear Usuario`  });
    } 
}

const deleteUser = async (req, res, next) => {
    console.log("deleteUser()");
    const { id } = req.body; 

    try {
        const deletedUser = await USERS.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

      console.log("[Éxito] Usuario eliminado:", deletedUser);
      res.json({  error: null, success: true, message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      res.json({ error: true, success: false, error: error,message:`No se pudo eliminar el usuario con id [${id}}]`  });
    }
};

const updateUser = async (req, res, next) => {
     const { id } = req.params; 
    const updateFields = req.body; 

    try {
        const updatedUser = await USERS.findByIdAndUpdate(
            id, 
            updateFields, 
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        console.log("[Éxito] Usuario actualizado:",);
        res.json({  error: null, success: true, message: "Usuario actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.json({  error: true, success: false, message: "No se pudo actualizar el usuario"});
    }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser
};
