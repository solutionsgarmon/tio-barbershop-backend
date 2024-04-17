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
const usersController = require("../controllers/usersController");
const servicesController= require("../controllers/servicesController");

//SECURITY
router.post('/create-session', authController.createSession);
router.post('/login', authController.loginUser);
//router.post('/roles', );

 //USERS 
 router.get('/users',usersController.getUsers);
 router.post('/users',usersController.createUser);
 router.delete('/users',usersController.deleteUser);
 router.patch('/users/:id', usersController.updateUser);

// BARBERS
router.get('/barbers', barbersController.getBarbers);
router.post('/barbers', barbersController.createBarber);
router.patch('/barbers/update-password/:id', barbersController.updatePassword);
router.delete('/barbers/:id', barbersController.deleteBarber);
router.patch('/barbers/:id', barbersController.updateBarber);

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
router.post('/citas', citasController.createCita);
router.delete('/citas/:id', citasController.deleteCita);
router.patch('/citas/:id', citasController.updateCita);


// SERVICES
router.get('/services', servicesController.getServices);
router.post('/services', servicesController.createService);
router.delete('/services/:id', servicesController.deleteService);
router.patch('/services/:id', servicesController.updateService);

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