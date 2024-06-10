const express = require("express");
const router = express.Router();
const productsController  = require("../controllers/productsController");
const authController = require('../controllers/authController');
const { getRecommendations, postRecommendations } = require("../controllers/recommendationsController ");
const barbershopsController = require("../controllers/barbershopsController");
const barbersController = require("../controllers/barbersController");
const adminsController = require("../controllers/adminsController");
const cursosController = require("../controllers/cursosController");
const citasController = require("../controllers/citasController");
const citasRegistroController = require("../controllers/citas_registroController");
const usersController = require("../controllers/usersController");
const servicesController= require("../controllers/servicesController");
const messageController= require("../controllers/messageController");
const appSettingsController = require('../controllers/appSettingsController');

//SECURITY
router.post('/create-session', authController.createSession);
router.post('/login', authController.loginUser);
//router.post('/roles', );


 //Clientes 
 router.get('/users',usersController.getUsers);
 router.get('/users/existe-usuario', usersController.existeUsuario);
 router.post('/users',usersController.createUser);
 router.delete('/users',usersController.deleteUser);
 router.patch('/users/:id', usersController.updateUser);
 
// BARBERS
router.get('/barber/:id', barbersController.getBarberById);
router.get('/barbers', barbersController.getBarbers);
router.post('/barbers', barbersController.createBarber);
router.post('/barber/horario-disponible', barbersController.getHorarioDisponibleBarbero);
router.patch('/barbers/update/:id', barbersController.updateBarber);
router.patch('/barbers/update-password/:id', barbersController.updatePassword);
router.delete('/barbers/:id', barbersController.deleteBarber);


//ADMINS
router.get('/admins', adminsController.getAdmins);
router.post('/admins', adminsController.createAdmin);
router.delete('/admins/:id', adminsController.deleteAdmin);
router.patch('/admins/:id', adminsController.updateAdmin);

//CURSOS
router.get('/cursos', cursosController.getCursos);
router.post('/cursos', cursosController.createCurso);
router.delete('/cursos/:id', cursosController.deleteCurso);
router.patch('/cursos/:id', cursosController.updateCurso);

// BARBERSHOPS
router.get('/barbershops', barbershopsController.getBarbershops);
router.post('/barbershops', barbershopsController.createBarbershop);
router.delete('/barbershops/:id', barbershopsController.deleteBarbershop);
router.patch('/barbershops/:id', barbershopsController.updateBarbershop);

// PRODUCTS
router.get('/products', productsController.getProducts);
router.get('/product', productsController.getProductById);
router.post('/products', productsController.createProduct);
router.delete('/products/:id', productsController.deleteProduct);
router.patch('/products/:id', productsController.updateProduct);

// CITAS
router.get('/citas', citasController.getCitas);
router.get('/citas/getByIdCorreo/:correo', citasController.getCitasCliente);
router.get('/citas/getByIdBarbero/:id', citasController.getCitasBarbero);
router.get('/citas/getPendientesByIdBarbero/:id', citasController.getCitasPendientesBarbero);
router.post('/citas', citasController.createCita);
router.delete('/citas/:id', citasController.deleteCita);
router.patch('/citas/:id', citasController.updateCita);

// CITAS_REGISTRO
router.get('/citas_registro/getCompletadasByIdBarbero/:id', citasRegistroController.getCitasRegistroCompletadasBarbero);
router.get('/citas_registro/getCanceladasByIdBarbero/:id', citasRegistroController.getCitasRegistroCanceladasBarbero);
router.get('/citas_registro', citasRegistroController.getCitasRegistro);
router.get('/citas_registro/getByIdCorreo/:correo', citasRegistroController.getCitasRegistroCliente);
router.get('/citas_registro/getByIdBarbero/:id', citasRegistroController.getCitasRegistroBarbero);
router.post('/citas_registro', citasRegistroController.createCitaRegistro);
router.delete('/citas_registro/:id', citasRegistroController.deleteCitaRegistro);
router.patch('/citas_registro/:id', citasRegistroController.updateCitaRegistro);




// SERVICES
router.get('/services', servicesController.getServices);
router.post('/services', servicesController.createService);
router.delete('/services/:id', servicesController.deleteService);
router.patch('/services/:id', servicesController.updateService);

//MESSAGES
router.post('/send-message',messageController.sendMessage);
router.post('/send-whasapp-message',messageController.sendWhatsappMessage);

//APP SETTINGS
router.get('/app-settings', appSettingsController.getApps);
//router.post('/app-settings', appSettingsController.createApp); //No es necesario mas post
router.patch('/app-settings/:id', appSettingsController.updateApp);
router.delete('/app-settings/:id', appSettingsController.deleteApp);

/*
// RECOMMENDATIONS
router.get('/recommendations', recommendationsController.getRecommendations);
router.post('/recommendations', recommendationsController.createRecommendation);
router.delete('/recommendations/:id', recommendationsController.deleteRecommendation);
router.patch('/recommendations/:id', recommendationsController.updateRecommendation);

// GALERIA
router.get('/gallery', galleryController.getImages);
router.post('/gallery', galleryController.uploadImage);
router.delete('/gallery/:id', galleryController.deleteImage); */ 


module.exports = router;