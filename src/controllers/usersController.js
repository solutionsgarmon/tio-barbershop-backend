const bcrypt = require('bcryptjs'); 
const USERS = require('../models/user');
const BARBER = require('../models/barber');
const ADMINISTRADOR = require('../models/admin');

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

//Verifica si existe el correo en usuarios, barberos o admins, si existe, retorna su ROL, si no, crea un usuario por que ya se validó en google auth
const existeUsuario = async (req, res, next) => {
    const correo = req.query.correo;

    try {
        // Buscar en la tabla de usuarios
        let usuario = await USERS.findOne({ correo: correo });

        if (usuario) {
            // Si se encuentra en la tabla de usuarios, retornar el rol
            res.json({data:{ encontrado: true, rol: 'USUARIO'} , error: null, success: true, });
            return;
        }

        // Si no se encuentra en la tabla de usuarios, buscar en la tabla de barberos
        let barbero = await BARBER.findOne({ correo: correo });

        if (barbero) {
            // Si se encuentra en la tabla de barberos, retornar el rol
          res.json({data:{ encontrado: true, rol: 'BARBERO'} , error: null, success: true, });
            return;
        }

        // Si no se encuentra en la tabla de barberos, buscar en la tabla de administradores
        let admin = await ADMINISTRADOR.findOne({ correo: correo });

        if (admin) {
            // Si se encuentra en la tabla de administradores, retornar el rol
          res.json({data:{ encontrado: true, rol: 'ADMINISTRADOR'} , error: null, success: true, });
            return;
        }

        // Si no se encuentra en ninguna tabla, retornar como no encontrado
        res.json({data:{ encontrado: false, rol: ''} , error: false, success: true, });
    } catch (error) {
        console.error('Error al buscar el correo:', error);
         res.json({ success: false, error: error, message:`Error al buscar el correo del usuario en las colecciones.`  });
    }
};

const createUser = async (req, res, next) => {
  console.log("createUser()", req.body);
  const { nombre, correo, password, datos_personales = "", historial_servicios = [] } = req.body;

  try {
    // Verificar si el correo electrónico ya está en uso
    const usuarioExistente = await USERS.findOne({ correo: correo });
    if (usuarioExistente) {
      return res.status(400).json({ success: false, error: 'El correo electrónico ya está en uso' });
    }

    // Hash de la contraseña utilizando bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con los datos proporcionados
    const nuevoUsuario = new USERS({
      nombre,
      correo,
      password: hashedPassword,
      datos_personales,
      historial_servicios
    });

    // Guardar el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    console.log("[éxito] Usuario creado con éxito");
    return res.json({ success: true, message: "Usuario registrado" });
  } catch (error) {
    console.error("Error al crear un nuevo usuario:", error);
    return res.status(500).json({ success: false, error: 'Error al crear un nuevo usuario' });
  }
};


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
      res.json({  success: false, error: error,message:`No se pudo eliminar el usuario con id [${id}}]`  });
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
  existeUsuario,
  createUser,
  deleteUser,
  updateUser
};
