// const {API_KEY} =  process.env
const {Dog, Temperament} = require("../db");
const axios= require('axios')
const {Router} = require('express'); 
const router = Router();



//OBTENEMOS LA INFORMACION DESDE LA API Y PROCEDEMOS A A MAPEAR TODA LA IFORMACION
    //QUE NECESITAMOS

    //BUSCAR CON EL FECTH: -----------------
const getApiMainRout = async () =>{
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=a7cffd8e-c9f6-48c3-98c2-702721313f0f`)
    const infoDog = await api.data.map( e =>{
        return{
            id: e.id,
            name: e.name,
            height: e.height.metric,
            weight: e.weight.metric,
            image: e.image.url,
            life_span: e.life_span,
            origin: e.origin,
            temperament: e.temperament
        }
    })
    return infoDog;
}

//OBTENEMOS LA INFORMACION DE DOG DESDE NUESTRA BASE DATOS
//INCLUYENDO TAMBIEN LA INFORMACION DE TEMPERAMENTO
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
//ACA EJECUTAMOS getApiMainRout Y getDbMainRout RESPECTIVAMENTE
// YA QUE DEBEMOS CARGAR LA INFORMACION CONTINUAMENTE
// POR LO CUAL CONCATENAMOS EL RESULTADO getApiMainRout CON getDbMainRout Y RETORNAMOS
// SI NO CONSIGUE INFORMACION EN NUESTRA BASE DE DATOS SIMPLEMENTE DEVUELVE LA INFORMACION
//DE LA API
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
        // AL MOMENTO DE ENCONTRAR UN NOMBRE MEDIANTE POR QUERY. 
        // PROCEDEMOS A FILTRAR LA INFORMACION QUE OBTUVIMOS DESDE LA BASE DE DATOS,
        // LA RECORREMOS Y COMPARAMOS SI EN LA POSICION DONDE NOS ENCONTRAMOS EN EL APARTADO DE NAME
        // ESTA INCLUIDO EL NAME PREVIAMENTE RECIBIDO POR QUERY (TRANSFORMAMOS AMBOS DATOS EN MINUSCULAS
        // PARA EVITAR CUALQUIER PERCANCE). TODO ESO GUARDANDO EN nameDog
        const nameDog = total.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        // COMPARAMOS SI TENEMOS ALGUN DATO EN nameDog, ENVIAMOS LA INFORMACION, SINO, SE ARROJA
        // UN ERRROR
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
        // UNA VEZ OBTENIDO EL ID DEL PERRO QUE QUEREMOS LOCALIZAR, PROCEDEMOS A LOCALIZAR
        // MEDIANTE EL FILTER COMPARANDO AMBOS ID,
        // UNA VEZ ENCONTRADO SE ENVIA EL RESULTADO CON TODA LA INFOMACION
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
            res.status(202).send(resultado);}
            catch (e){
                res.status(404).send("***Error***")
            }
        });

//OBTENEMOS LA INFORMACION MEDIANTE EL BODY QUE MANDAMOS ATRAVES DEL FRONT
router.post('/', async (req,res,next)=>{
    const {
        name,
        height,
        weight,
        life_span,
        image,
        temperament,
        created,
    } = req.body;
    
    //CREAMOS EL REGISTRO CON TODA LA INFORMACION
    // OJO SI EL USUARIO NO COLOCA LA IMAGEN, AUTOMATICAMENTE SE LE ASIGNARIA UNA PREDETERMINADAMENTE
    let dog = await Dog.create({
        name,
        height,
        weight,
        life_span,
        image: image ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj69dz8tM7tixlt4hTLPnGwVPavHB1QYeGtA&usqp=CAU",
        created,
    });
    
    //BUSCAMOS LOS TIPOS DE TEMPERAMENTOS QUE EL CLIENTE HAYA ELEGIDO PARA SU NUEVA RAZA
    //Y ENLAZAMOS LA TABLAS CON LA INFORMACION DEL TEMPERAMENTO CON LA RAZA
    let temperamentDb = await Temperament.findAll({
        where: {
            name: temperament,
        },
    });

    dog.addTemperament(temperamentDb);
    
    res.status(200).send("Perrito creado! :D");
});

module.exports = router