const {Router} = require('express'); 
const router = Router();
//const axios = require('axios');
const {Temperament} = require('../db'); 

// GET /temperament:
// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get('/', async (req,res,next)=>{
  const temp = await Temperament.findAll();
  res.send(temp)
});


module.exports = router;