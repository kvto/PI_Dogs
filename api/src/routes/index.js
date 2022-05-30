const { Router } = require('express');
const  dogs = require('../controllers/dogs.js');
const  tem = require('../controllers/temperament.js');

// Importar todos los routers;

// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado

router.use('/dogs', dogs);
router.use('/temperament', tem);
module.exports = router;
