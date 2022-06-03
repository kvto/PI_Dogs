// const {API_KEY} =  process.env
const {Dog, Temperament} = require("../db");
const axios= require('axios')
const {Router} = require('express'); 
const router = Router();

const getApiMainRout = async () =>{
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=a7cffd8e-c9f6-48c3-98c2-702721313f0f`)

    const infoDog = await api.data.map( e =>{
        return{
            id: e.id,
            name: e.name,
            height: e.height.metric,
            weight: e.weight.metric,
            image: e.image.url,
            temperament: e.temperament
        }
    })
    return infoDog;
}


const getDbMainRout = async () =>{
    try{
        return await Dog.findAll({
            include:{
                model: Temperament,
                attributes: ['name'],
                through:{
                    attributes:[]
                }
            }
        })
    } catch(e){
        return e
    }
     
}

const allDogs = async () => {
    try{
        let infoDb = await getDbMainRout();
        let infoApi = await getApiMainRout();
        if(infoDb[0]){
            let infor = infoDb.concat(infoApi);
            return infor;
        }else{
        return infoApi;
            }
    } catch(e){
    return e    
}
}



router.get("/", async (req,res) => {
    const {name} = req.query;
    // GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
    const total = await allDogs();
    // GET /dogs?name="...":
    // Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
    // Si no existe ninguna raza de perro mostrar un mensaje adecuado
    if (name) {
        const nameDog = total.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        nameDog.length ? res.status(200).send(nameDog) : res.status(400).send("El perro descrito no se encuentra guardado");
    } else {
        res.status(200).send(total);
    }
})

// GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados

router.get("/:id", async (req,res) =>{
    try{  
        const {id}=req.params;
        const all= await allDogs();
        if(id){
            const dogNew=all.filter((e)=>e.id==id)
            var resultado={      
                    name :dogNew[0].name,
                    height:dogNew[0].height,
                    weight:dogNew[0].weight,
                    life_span:dogNew[0].life_span,
                    image:dogNew[0].image,
                    temperament:dogNew[0].temperament
                    }
               }
    
    
            //newDog[0].temperaments=oso
            //console.log(temps);
            res.status(202).send(resultado);}
            catch (e){
                res.status(404).send("***Error***")
            }
        });


router.post('/', async (req,res,next)=>{
    const {
        name,
        height,
        weight,
        life_span,
        image,
        temperament,
    } = req.body;
    
    let dog = await Dog.create({
        name,
        height,
        weight,
        life_span,
        image: image ? image : "https://pbs.twimg.com/media/FGfgmSPWQAUDu4l.jpg",
    });
    
    
    let temperamentDb = await Temperament.findAll({
        where: {
            name: temperament,
        },
    });

    dog.addTemperament(temperamentDb);
    
    res.status(200).send("Perrito creado! :D");
});

module.exports = router