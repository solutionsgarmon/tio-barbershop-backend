const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Barber = require('../models/barber');
const Admin = require('../models/admin');

function generarToken(usuario) {
  return jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

async function createSession(req, res) {
  const { correo, password } = req.body;
  
  try {
    const usuario = await User.findOne({ correo }).lean();
    if (!usuario) {
      return res.status(400).json({ mensaje: 'No se encontró el usuario' });
    }

    // const coincideContraseña = await bcrypt.compare(password, usuario.password);

    if (!password== usuario.password) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = generarToken(usuario);
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

const loginUser = async (req, res, next) => {
    console.log("loginUser()", req.body);
    const { correo, password } = req.body;

    try {
        let user;

        // Buscar el usuario en la colección User
        user = await User.findOne({ correo });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: "Credenciales incorrectas", success: false, message: "Inicio de sesión fallido" });
            }
          
            console.log("Inicio de sesión exitoso CLIENTE");
            delete user.password;
            return res.json({ error: null, success: true, message: "Inicio de sesión exitoso", data: user });
        }

        // Si no se encuentra en User, buscar en la colección Barber
        user = await Barber.findOne({ correo });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: "Credenciales incorrectas", success: false, message: "Inicio de sesión fallido" });
            }
           
            console.log("Inicio de sesión exitoso BARBER");
            delete user.password;
            return res.json({ error: null, success: true, message: "Inicio de sesión exitoso", data: user });
        }

        // Si no se encuentra en Barber, buscar en la colección Admin
        user = await Admin.findOne({ correo });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: "Credenciales incorrectas", success: false, message: "Inicio de sesión fallido" });
            }
       
            console.log("Inicio de sesión exitoso ADMIN");
            delete user.password;
            return res.json({ error: null, success: true, message: "Inicio de sesión exitoso", data: user });
        }

        // Si no se encuentra en ninguna colección, responder con error
        return res.status(400).json({ mensaje: 'No se encontró el usuario' });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: error.message, success: false, message: "Error al iniciar sesión" });
    }
};

module.exports = { createSession,loginUser };
