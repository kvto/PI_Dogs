import {
    GET_ALL_DOGS,
GET_ALL_TEMPS,
FILTER_BY_TEMP,
FILTER_CREATED,
ORDER_BY_NAME,
ORDER_BY_WEIGTH,
GET_BY_NAME,
POST_DOG,
GET_DETAIL,
CLEAN_DOG_ID,
} from "../actions/action"

const initialState = {
    dogsBreed : [],
    allTemps: [],
    dogsAll :[],
    detail:[],
    byName:[]
}

export default function reducer(state=initialState, {type, payload}){
   switch(type){  
    
    
       case GET_ALL_DOGS:
           return {
               ...state,
               dogsBreed : payload, /*INFORMACION QUE IRA HASTA EL FRONT*/
               dogsAll : payload /*INFORMACION QUE VIENE DESDE LA BACKEND*/
           };


       case GET_ALL_TEMPS:
           return {
               ...state,
               allTemps : payload
           };

      case POST_DOG:
                 return {
                     ...state,
                 };
             
       
       case FILTER_CREATED :
               // console.log('GET_ALL_TEMPS')
               const Dogs = state.dogsAll;
            const createdFilter = (
                payload === "All" ? state.dogsAll :
                Dogs.filter((e) => {
                        if (payload==="Create") {
                            if (e.created) {
                                return e;
                            }
                        } else if(payload==="Api"){
                            if (!e.created) {
                                return e;
                            }
                        }
                    return false;
                })
            );
            return {
                ...state,
                dogsBreed:createdFilter
            }

    

               case FILTER_BY_TEMP :
            const dogs = state.dogsAll;
            /*TODA LA INFORMACION QUE TENEMOS EN NUESTRA BD Y API*/
            console.log("putoooo");
            console.log(dogs)
            const dogsFilter = state.dogsAll
            /* REALIZAMOS UN MAPEO DE TODA NUESTRA INFORMACION 
            EN DONDE REALIZAMOS LA CONSULTA DE SI NUESTRO TEMPERAMENTO
            DE NUESTRO PERRO ES UN ARRAY O NO.
            
            SI ES ARRAY, REALIZO UN NUEVO MAPEO DE ESA INFORMACION
            Y LA TRANSFORMO EN UN STRING, SI NO LO ES, SEGUIMOS TRABAJANDO CON LA
            INFORMACION OBTENIDA*/
            dogs.map((dog) => {
                return(
                Array.isArray(dog.temperaments)
                
                    ? dog.temperaments = dog.temperaments.map((t) => { return t.name }).join(", ")
                    
                    : dog.temperament
            )})
            console.log("despues del mapeo : ")
            console.log(dogs);
            /* COMPARAMOS SI LA SELECCION DEL CLIENTE:
            
            SI ES IGUAL A ALL -> ES DECIR NO HA ESCOGIDO NINGUN TEMPERAMENTO PARA FILTRAR
            ARROJA EL MISMO ESTADO DEL ORDEN
            
            SI ES DIFERENTE A ALL -> FILTRAMOS TODOS LOS PERROS QUE SU TEMPERAMENTO
            ESTE INCLUIDO LA SELECCION DEL CLIENTE*/
            const temperamentFilter =
                payload === 'All' ? state.dogsAll
                    : dogsFilter.filter((e)=> (
                        e.temperament?.includes(payload) || e.temperaments?.includes(payload) ))     
                            
            /*RETORNAMOS UNA COPIA */     
            return {
                ...state,
                dogsBreed: temperamentFilter,
            }
            






           case ORDER_BY_NAME :
               // console.log('GET_ALL_TEMPS')
               /*TOMAMOS LA SELECCION DEL CLIENTE
               VARIA SI ES ASC O DESC, DEPENDIENDO
               DE LA ELECCION LO ORDENA */
               let sortedDog= payload==='asc'?
               state.dogsBreed.sort(function (a,b){
                   if(a.name>b.name){
                       return 1;
                   }
                   if(a.name<b.name){
                       return -1;
                   }
                   else
                       return 0;
                   
               }) : state.dogsBreed.sort(function (a,b){
                   if(a.name>b.name){
                       return -1;
                   }
                   if(a.name<b.name){
                       return 1;
                   }
                   else
                       return 0;
                   
               })
                 return{
                   ...state,
                   dogsBreed : sortedDog,
                   
                }
                
           case ORDER_BY_WEIGTH :
               /*   PRINCIPALMENTE DEBEMOS TENER EN CUENTA QUE PARA ORDENAR POR EL PESO
               TENEMOS VARIOS CASOS ESPECIALES EN LA API, LOS CUALES SON AQUELLAS RAZAS
               QUE TIENE SOLAMENTE UN MARGEN DE DE PESO Y AQUELLOS QUE NO TIENEN
               EL DATO CONCRETO.
               
               POR LO CUAL ANTES DE COMPARAR DEBEMOS EXCLUIR TANTOS A LAS RAZAS QUE TENGA
               LA LONGUITUD EN EL CAMPO DE WEIGHT MENOR A 3 YA QUE SE TRABAJA COMO MINIMO
               UNA LONGUITUD DE TRES DATOS => (1-4) / state.dogsBreed.filter((e)=>e.weight.length>3)
               
               
               
               COMO LA RAZA QUE NO TENGA DATO => NAN  / newState2.filter((e)=>!e.weight.includes('NaN'))*/
               console.log('ORDER_BY_WEIGTH',state.dogsBreed)
                let newState2=state.dogsBreed.filter((e)=>e.weight.length>3);
                console.log("nuewstate2: ");
                console.log(newState2);
                let newState=newState2.filter((e)=>!e.weight.includes('NaN'));
                console.log("nuewstate: ");
                console.log(newState)
                /* YA TENIENDO TODO FILTRADO, PROCEDEMOS A OBTENER LA SELECCION DEL CLIENTE
                Y DECIMOS SI ES ASC */
                let sortedWeigth= payload==='asc'?
                /* ORDENAMOS MEDIANTE SORT, TRANSFORMANDO EN NUMERO Y A SU VEZ REEMPLAZANDO
                EL - POR EL ' ' */
                newState.sort(function (a,b){
                    if(parseInt(a.weight.replace(/ - /g,'')) > parseInt(b.weight.replace(/ - /g,'')) ){
                        return 1;
                    }
                    if(parseInt(a.weight.replace(/ - /g,'')) < parseInt(b.weight.replace(/ - /g,''))){
                        return -1;
                    }
                    else
                        return 0;
                    
                })
                : newState.sort(function (a,b){
                    if(parseInt(a.weight.replace(/ - /g,'')) > parseInt(b.weight.replace(/ - /g,'')) ){
                        return -1;
                    }
                    if(parseInt(a.weight.replace(/ - /g,'')) < parseInt(b.weight.replace(/ - /g,''))){
                        return 1;
                    }
                    else
                        return 0;
                    
                })
                  return{
                    ...state,
                    dogsBreed : sortedWeigth,
                 }

           case GET_BY_NAME :
            return {
                ...state,
                dogsBreed: payload
            }


           case GET_DETAIL : 
            if(!payload.err){
                return{
                    ...state,
                    detail : payload,
                }
                
            }else{
                alert(payload.err)
               return{ ...state }
            }



            case CLEAN_DOG_ID:
                return {
                    ...state,
                    detail: [],
                };
        default:
            return state;
   }  



};
