const { Router } = require('express');
const  dogs = require('../controllers/dogs.js');
const  tem = require('../controllers/temperament.js');

// Importar todos los routers;

// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// DOGS Y TEMPERAMENT SERAN LAS RUTAS DEL BACKENDO QUE USAREMOS.
// dogs y tem SERAN NUESTROS CONTROLADORES
router.use('/dogs', dogs);
router.use('/temperament', tem);
module.exports = router;
